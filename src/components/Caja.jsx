import { useState } from "react";

export const Caja = ({name, image, description}) => {
    const [view, setView] = useState(false);

    return (
        <div>
                <h1>{name}</h1>
                <img src={image} alt={name}/>
                <br/>
                <button onClick={() => setView(!view)}>
                    {view ? 'cerrar' : 'abrir'}
                </button>
                    {view ? 
                <p>{description}</p>
                :
                <p></p>
                }
                
        </div>
    )
}