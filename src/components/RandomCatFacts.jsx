import { useEffect, useState  } from "react"

export const RandomCatFacts = () => {
    //url de la api
    const urlbase = 'https://catfact.ninja/fact'

    //Estado donde guardar los facts
    const [catData, setCatData] = useState('')

    //Estado donde guardar el maxlength
    const [maxLength, setMaxLength] = useState("");

    //coje el dato de la api
    const fecthAPIFacts = async () => {
        try{
            if(maxLength==""){
                const response = await fetch(urlbase);
                const data = await response.json();
                setCatData(data.fact);
            }
            else{
                const maxLengthNumber = parseInt(maxLength, 10);
                if(maxLengthNumber<=0){
                    alert("Número no permitodo");
                    return;
                }
                //para ello usa un fetch con la url, esta vez con un parametro
                const url = `${urlbase}?max_length=${maxLengthNumber}`
                const response = await fetch(url);

                if(!response.ok){
                    throw new Error("Error al obtener datos de la API");
                }

                //mete la respuesa jason en una variable data
                const data = await response.json();
                
                //y de esa variable data solo cogemos fact, que es el dato de por si, y lo metemos en el usestate
                setCatData(data.fact);
            }
        }catch(error){
            console.error('Ocurrio el siguiente error: ', error)
        }
    }

    const handleInputChange =(e)=>{
        setMaxLength(e.target.value);
    }

    const generateFact=()=>{
        fecthAPIFacts();
    }

    return (
        <div>
            <h2 className="text-center">Dato random de los gatos</h2>

            <div>
                <div>
                    <button  onClick={generateFact}type="button">New Cat Fact</button>
                    <input 
                        type="text"
                        value={maxLength}
                        onChange={handleInputChange}
                        placeholder="Ingrese un numero"/>
                </div>
                
                <p className="text-center">{catData}</p>
            </div>
        </div>
    )
}