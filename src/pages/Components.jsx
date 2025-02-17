import {Caja} from '../components/Caja'
import gato1 from '../images/gato1.png'
import gato2 from '../images/gato2.png'
import gatonegro from '../images/gatonegro.png'

export const Components = () => {
    const cajaData = [
        {id: 1, name:"Guerrero de las montañas", image:gato1, description:"Cometió muchos delitos contra la humanidad. El concejo gatuno lo sentenció a 2 días de cárcel."},
        {id: 2, name:"Pedro", image:gato2, description:"Gato viajero, se le suele ver por las costas."},
        {id: 3, name:"Mimi", image:gatonegro, description:"Traviesa de nacimiento, verdaderamente es la típica gata de una bruja."},
    ];

    return (
        <div className="cajas">
            {cajaData.map((caja)=> (
                <div className="caja">
                    <Caja key={caja.key} name={caja.name} image={caja.image} description={caja.description}/>
                </div>
            ))}
        </div>
    )
}