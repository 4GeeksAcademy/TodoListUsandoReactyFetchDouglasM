import React, { useEffect, useState } from 'react';
import "/workspaces/TodoListUsandoReactyFetchDouglasM/src/styles/index.css";

function List() {

    
    const addToDo = async () => {
        if (tareaNombre === '') {
            alert('Por Favor Agrega Una Tarea');
            return;
        }
        const body = {
            label: tareaNombre,
            "is_done": false
        };
        try {
            const response = await fetch("https://playground.4geeks.com/todo/todos/Douglas", {
                method: "POST",
                headers: {
                    "accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            });
            const data = await response.json();
            console.log(data);

        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        addToDo();
    }, [])

    const [tareas, setTareas] = useState([]);
    const [tareaNombre, setTareaNombre] = useState('');

    const agregarTarea = () => {
        if (tareaNombre === '') {
            alert('Por Favor Agrega Una Tarea');
            return;
        }

        setTareas([...tareas, tareaNombre]);
        setTareaNombre('');
    };

    const eliminarTarea = (index) => {
        const nuevasTareas = tareas.filter((tarea, i) => {
            return i !== index;
        });
        setTareas(nuevasTareas);
    };

    const pressEnter = (e) => {
        if (e.key === 'Enter') {
            addToDo(tareaNombre);
        }
    };

    const borrarTodasLasTareas = () => {
        setTareas([]);
    };

    return (
        <div className="contenedor">
            <div className="hoja">
                <h1>Lista de Tareas</h1>
                <div className="divBotonInput d-flex">
                    <input
                        type="text"
                        value={tareaNombre}
                        onChange={(e) => setTareaNombre(e.target.value)}
                        onKeyDown={pressEnter}
                        placeholder="Agregar Tareas"
                    />
                    <button onClick={addToDo}>Agregar</button>
                    <button>Borrar todas las tareas</button>
                </div>
                <div className='headLista2'>
                    <div className='headLista3'></div>
                </div>
                <div className="headLista1"></div>
                <div className="lista">
                    <ul>
                        {tareas.map((tarea, index) => (
                        <li key={index}>
                            <span className="viñeta">•</span>
                            <span className="textoTarea">{tarea}</span>
                            <span
                                // className="BotonEliminarTarea"
                                // onClick={() => eliminarTarea(index)}
                            >
                                X
                            </span>
                        </li>
                    ))}
                    </ul>

                    <div className='d-flex align-items-end mt-5'>
                        {/* <span className='spanNumTareas'>Numero de tareas: {tareas.length}</span> */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default List;
