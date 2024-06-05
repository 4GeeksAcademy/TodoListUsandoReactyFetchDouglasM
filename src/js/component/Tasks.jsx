import React, { useEffect, useState } from "react";
import TaskQuantity from "./TaskQuantity";
import "/workspaces/TodoListUsandoReactyFetchDouglasM/src/styles/index.css";

const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    const [tasksName, setTasksName] = useState("");

    const addTask = async () => {
        if (!tasksName) {
            alert("Por Favor Agrega Una Tarea");
            return;
        }

        const body = {
            label: tasksName,
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
        setTasksName("");
        setTasks([...tasks, tasksName]);
    };

    const deleteTask = async () => {
        const response = await fetch(`https://playground.4geeks.com/todo/todos/${Tasks.id}}`, {
            method: "DELETE",
        });
        if (response.ok) {
            const data = await response.json();
            return data;
        }
        else {
            console.log('error: ', response.status, response.statusText);
            return { error: { status: response.status, statusText: response.statusText } };
        }
        
    };

    const pressEnter = async (e) => {
        if (e.key === "Enter") {
            await addTask();
        }
    };
    const deleteAllTasks = async () => {
        const answer = prompt(
            "Estás seguro de querer borrar TODAS las tareas? (sí/no)"
        );

        if (answer.toLowerCase() === "si") {
            alert("Todas las tareas han sido borradas");
        }
        setTasks([]);
    };
    return (
        <div className="hoja">
            <div className="divBotonInput d-flex">
                <input
                    type="text"
                    value={tasksName}
                    onChange={(e) => setTasksName(e.target.value)}
                    onKeyDown={pressEnter}
                    placeholder="Agregar Tareas"
                />
                <button onClick={addTask}>Agregar</button>
                <button onClick={deleteAllTasks}>Borrar todas las tareas</button>
            </div>
            <div className="d-flex justify-content-center">
                <div className="headLista2">
                    <div className="headLista3"></div>
                </div>
            </div>
            <div className="d-flex justify-content-center">
                <div className="headLista1"></div>
            </div>
            <div className="d-flex justify-content-center">
                <div className="lista">
                    <ul>
                        {tasks.map((task, id) => (
                            <li key={id}>
                                <span className="viñeta">•</span>
                                <span className="textoTarea">{task}</span>
                                <span
                                    className="BotonEliminarTarea"
                                    onClick={() => deleteTask(task.id)}
                                >
                                    X
                                </span>
                            </li>
                        ))}
                    </ul>
                    <TaskQuantity tasks={tasks} />
                </div>
            </div>

        </div>
    );

}

export default Tasks;
