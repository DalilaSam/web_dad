import { RandomCatFacts } from "../components/RandomCatFacts"
import { LoginContext } from "../context/LoginContext"
import { DarkmodeContext } from "../context/DarkmodeContext"
import { useContext } from "react"
import { RandomCatImages } from "../components/RandomCatImages"


export const ApiPage = () => {

    const {loginData}= useContext(LoginContext)
        console.log(loginData)

    const {darkmodeData}= useContext(DarkmodeContext)
        console.log(darkmodeData)

    return(
        <div className="apimain">
            <div className="text-center">
                <p>Solo una página dedicada a contenido variado de gatos</p>
            </div>
            <div className="apicontainer">
                    <div className="card text-center">
                        <RandomCatFacts/>
                        <RandomCatImages/>
                    </div>
            </div>
        </div>
    )
}