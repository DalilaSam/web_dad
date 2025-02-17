import { useContext } from "react"
import { LoginContext } from "../context/LoginContext"
import {MainTask} from "../components/MainTask"

export const Boton = () => {
    const {loginData}= useContext(LoginContext)
    console.log(loginData)

    return(
      <>
        {`Hola ${loginData.name}`}
        <p>LLLL</p>

        <MainTask/>

        <input 
                    type="text"
                    className="form-control" 
                    placeholder="Username" 
                    aria-label="Username" 
                    aria-describedby="basic-addon1"/>
      </>
    )
  }