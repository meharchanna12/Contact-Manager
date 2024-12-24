import React,{useState} from "react";

export default function Register() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [contact, setContact] = useState("");

    return (
        <div className="login">
            <form style={{margin:"20px"}}>
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