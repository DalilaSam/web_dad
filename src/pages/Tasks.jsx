import { useReducer, useRef } from "react";

export const Tasks = () => {
    const inputRef = useRef();

    const [tasks, dispatch] = useReducer((state = [], action)=>{
        switch(action.type){
            case 'add_task' : {
                return[
                    ...state,
                    {id: state.length, title: action.title}
                ]
            }
            case 'remove_task': {
                return state.filter((task, index)=>index != action.index)
            }
            default: {
                return state;
            }
        }
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch({
            type: 'add_task',
            title: inputRef.current.value
        })
        inputRef.current.value = "";
    }

    return(
        <div className="taskcontainer">
            <div className="taskcontainer-centered">
                <h1 className="text-center">Gestor de tareas</h1>
                <form onSubmit={handleSubmit}>
                    <input className="text_input" type="text" name="title" ref={inputRef}/>
                    <input type="submit" value="Enviar"/>
                </form>

                <ol > 
                    {tasks && tasks.map((task, index) => (
                        <li key={index}>
                            {task.title}
                            <button className="delete_button" onClick={() => dispatch({type: 'remove_task', index})}>Borrar</button>
                        </li>
                    ))}
                </ol>

            </div>
        </div>
    )
}
