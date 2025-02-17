import { useContext, useState } from "react";
import { LoginContext } from "../context/LoginContext";

export function Form() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {updateLoginData} = useContext(LoginContext);

    const handleChange = (event) => {
        const {name, value} = event.target;
        if(name === "name") setName(value);
        else if(name === "email") setEmail(value);
        else if (name == "password") setPassword(value);
    }

    const handleSubmit = (event) => {
        event.preventDefault(); //evita que la pagina recarque al enviar el formulario
        
        updateLoginData({
            name,
            email,
            password
        });
        
        console.log("Formulario enviado con el nombre: "+name)
        alert("Sesion iniciada")
    }


    return (
        <div className="section">
            <h2 className="text-center">Iniciar Sesión</h2>
            <form onSubmit={handleSubmit}>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">@</span>
                    <input 
                    type="text" 
                    name = "name"
                    value = {name}
                    onChange = {handleChange}
                    className="form-control" 
                    placeholder="Username" 
                    aria-label="Username" 
                    aria-describedby="basic-addon1"/>
                </div>

                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">@</span>
                    <input 
                    type="email"
                    name = "email"
                    value = {email}
                    onChange = {handleChange}
                    className="form-control" 
                    placeholder="Email" 
                    aria-label="Username" 
                    aria-describedby="basic-addon1"/>
                </div>

                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">@</span>
                    <input 
                    type="password"
                    name = "password"
                    value = {password}
                    onChange = {handleChange}
                    className="form-control" 
                    placeholder="Password" 
                    aria-label="Username" 
                    aria-describedby="basic-addon1"/>
                </div>
                <button type="submit">Enviar</button>
            </form>
        </div>
    )
}