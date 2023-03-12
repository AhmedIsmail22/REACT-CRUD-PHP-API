import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function CreateUser(){


    const navigate = useNavigate();
    const [inputs, setInputs] = useState({})
    

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }

    const [err, setErr] = useState([]);
    const handleSubmit = (event) => {
        
        event.preventDefault();
        axios.post('http://localhost/api/user/save',inputs).then(function(response){
            setErr(response.data['message']);
            
        });
    }
    return(
        <div>
            <h1>Create User</h1>
            {err.map((ele,key) => <h5 key={key} className="error">{ele}</h5>)}
        <form onSubmit={handleSubmit}>
                <table cellSpacing="20">
                    <tbody>
                    <tr>
                            <th>
                                <label>Name: </label>
                            </th>
                            <td>
                                <input type="text" name="name" onChange={handleChange}/>                               
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <label>E-Mail: </label>
                            </th>
                            <td>
                                <input type="text" name="email" onChange={handleChange}/>
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <label>Mobile: </label>
                            </th>
                            <td>
                                <input type="number" name="mobile" onChange={handleChange}/>
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