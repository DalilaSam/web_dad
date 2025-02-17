import {DarkmodeContext} from "./DarkmodeContext";
import {useState} from "react";

export const DarkmodeProvider = ({children}) => {
    const [darkmodeData, setDarkmodeData] = useState({isDark: true});

    const updateDarkmodeData = (data) => {
        setDarkmodeData(data)
        console.log(data)
    }

    return(
        <DarkmodeContext.Provider value={{darkmodeData, updateDarkmodeData}}>
            {children}
        </DarkmodeContext.Provider>
    )


}