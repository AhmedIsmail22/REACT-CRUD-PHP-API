import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Alert from "react-bootstrap/Alert";

export default function ListUser(){
    const [users, setUsers] = useState([]);
    useEffect(() => {
        getUsers();
    }, []);

    function getUsers(){
        axios.get('http://localhost/api/users').then(function(response){
            setUsers(response.data);
        })
    }

    const deleteUser = (id) => {
        axios.delete(`http://localhost/api/user/${id}/delete`).then((response) => {
            console.log(response.data);
            // setUsers(response.data['message']);
            getUsers();
        })
    }
    return(
        <div>
            <h1>List Users</h1>
            {users.length < 1 ?
             <Alert className="alert" variant={'danger'}>No Users is exist! </Alert>
           
           :<table className="list-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>E-Mail</th>
                        <th>Mobile</th>
                        <th>Created_at</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((element,key) => 
                            <tr key={key}>
                                <td>{key+1}</td>
                                <td>{element[1]}</td>
                                <td>{element[2]}</td>
                                <td>{element[3]}</td>
                                <td>{element[4]}</td>
                                <td className="actions">
                                    <Link className="link link-edit" to={`user/${element[0]}/edit`}>Edit</Link>
                                    <button className="link link-delete" onClick={() => deleteUser(element[0])} >Delete</button>
                             </td>
                            </tr>
                        )}
                </tbody>
            </table>
            }
        </div>
    )
}