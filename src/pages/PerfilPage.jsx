import { useContext } from "react"
import { LoginContext } from "../context/LoginContext"
import { SearchNav } from "../components/SearchNav"

export const PerfilPage = () => {
    const {loginData}= useContext(LoginContext)
    console.log(loginData)

    return(
      <div className="taskcontainer">
        <div className="taskcontainer-centered">
          <h2>{`Bienvenido de nuevo ${loginData.name}¡!`}</h2>
        </div>
      </div>
    )
  }