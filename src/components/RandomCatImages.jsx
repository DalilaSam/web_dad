import { useState } from "react";

export const RandomCatImages = () => {
    //url de la api
    const urlBase='https://api.thecatapi.com/v1/images/search'
    //key de la api
    const APIKEY='live_AiybokCr1U5VLUqJgljqvaIiWNFM0e1iF3BeVYi4tAMFqrjotGm2RjWp13wQDK2x'

    const [image, setImages] = useState(null);

    const fetchAPIImage= async () => {
        try {

            const response = await fetch (urlBase, {
                headers: {
                    'x-api-key': APIKEY, // Encabezado correcto para la API key
                },
            });
            const data = await response.json();
            if (data.length > 0) {
                setImages(data[0].url); // Tomar la URL de la primera imagen
            }
        }catch(error){
            console.error('Ocurrio el siguiente error: ', error)
        }
    }

    const generateImage=()=>{
        fetchAPIImage();
    }

    return(
        <div>
            <h2>Imagenes de gatos</h2>

            <div className="imagecat">
                <button  onClick={generateImage}>Nueva imagen de Gato!</button>
                <br/>
                    
                {image ? (
                    <img
                    src={image}
                        className="catimage"
                        alt="Un lindo gato"
                        style={{ width: '300px', height: '300px', objectFit: 'cover' }}
                    />
                ) : (
                    <p>No hay imagen para mostrar. Haz clic en el botón para obtener una.</p>
                )}
            </div>
        </div>
    )


}