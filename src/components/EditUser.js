import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
export default function CreateUser(){
    
    
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({})
    const {id} = useParams();
    const [error, setError] = useState([]);

    useEffect(()=>{
        getUser();
    }, [])
   function getUser(){
    axios.get(`http://localhost/api/user/${id}`,inputs).then(function(response){
        // setError(response.data['message']);
        setInputs(response.data);
    });
   }



    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }

    const handleSubmit = (event) => {
        
        event.preventDefault();
        axios.put(`http://localhost/api/user/${id}/edit`,inputs).then(function(response){
            setError(response.data['message']);
            setInputs(response.data);
            navigate("/");
            
        });
    }
    return(
        <div>
            <h1>Edit User</h1>
            {error.map((ele,key) => <h5 key={key} className="error">{ele}</h5>)}
        <form onSubmit={handleSubmit}>
                <table cellSpacing="20">
                    <tbody>
                    <tr>
                            <th>
                                <label>Name: </label>
                            </th>
                            <td>
                                <input type="text" name="name" onChange={handleChange} value={inputs.name} controled />                               
                                <input type="hidden" name="id" value={id} />                               
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <label>E-Mail: </label>
                            </th>
                            <td>
                                <input type="text" name="email" onChange={handleChange} value={inputs.email} />
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <label>Mobile: </label>
                            </th>
                            <td>
                                <input type="number" name="phone" onChange={handleChange} value={inputs.phone}/>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2" align="right">
                                <button onClick={handleChange}>Save</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
        </form>
        </div>
    )
}