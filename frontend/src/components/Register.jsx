import React,{useState} from "react";
import axios from "axios";
export default function Register() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [contact, setContact] = useState("");
    async function register(ev) {
        ev.preventDefault();
        if(!name || !email || !password || !contact){
            alert("All fields are required");
            return;
        }
        try{
            const response = await axios.post("http://localhost:8002/register",{
                name,
                email,
                password,
                contact
            });
            console.log(response);
            if(response.status >= 200 && response.status < 300){
                alert("Registration successful");
            }
            else{
                alert("Registration failed");
            } 
        }
        catch (error) {
            console.error("There was an error registering!", error);
            alert("Registration failed");
        }
    
    }
    return (
        <div className="login">
            <form style={{margin:"20px"}} onSubmit={register}>
                <h1>
                    <img src="verify.png" alt="" />
                    Register here!!
                </h1>
                {/* <h3 style={{padding: "0px", marginBottom:"0px"}}>Name:</h3> */}
                <input type="text" 
                placeholder = "Enter name"
                value={name}
                onChange={(ev) => setName(ev.target.value)}
                />
                {/* <h3 style={{padding: "0px", marginBottom:"0px"}}>Email:</h3> */}
                <input type="text" 
                placeholder = "Enter email"
                value={email} 
                onChange={(ev)=>setEmail(ev.target.value)}
                />
                {/* <h3 style={{padding: "0px", marginBottom:"0px"}}>Password:</h3> */}
                <input type="password" 
                placeholder = "Enter password" 
                value={password}
                onChange={(ev)=>setPassword(ev.target.value)}
                />
                {/* <h3 style={{padding: "0px", marginBottom:"0px"}}>Contact No.:</h3> */}
                <input type="text" 
                placeholder = "Enter contact" 
                value={contact}
                onChange={(ev)=> setContact(ev.target.value)}
                />
                <button type="submit">Register</button>
            </form>

        </div>

    )
}