import React, { useEffect, useState } from "react";
import TaskQuantity from "./TaskQuantity";
import "/workspaces/TodoListUsandoReactyFetchDouglasM/src/styles/index.css";

const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    const [tasksName, setTasksName] = useState("");

    useEffect(() => {
        showTasks();
    }, []);

    async function showTasks() {
        const response = await fetch(`https://playground.4geeks.com/todo/users/Douglas`);
        const data = await response.json();
        const newTodos = data.todos;
        setTasks(newTodos);
    }

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
            setTasks([...tasks, data]);
        } catch (error) {
            console.log(error);
        }
        setTasksName("");
    };

    const deleteTask = async (id) => {
        try {
            const response = await fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
                method: "DELETE",
            });
            if (response.ok) {
                setTasks(tasks.filter(task => task.id !== id));
            } else {
                console.log('error: ', response.status, response.statusText);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const pressEnter = async (e) => {
        if (e.key === "Enter") {
            await addTask();
        }
    };

    const deleteAllTasks = async () => {
        try {
            const promises = tasks.map(task =>
                fetch(`https://playground.4geeks.com/todo/todos/${task.id}`, {
                    method: "DELETE",
                })
            );

            const responses = await Promise.all(promises);

            const allDeleted = responses.every(response => response.ok);

            if (allDeleted) {
                setTasks([]);
            } else {
                console.log('Some tasks could not be deleted');
            }
        } catch (error) {
            console.log(error);
        }
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
                        {tasks.map((task) => (
                            <li key={task.id}>
                                <span className="viñeta">•</span>
                                <span className="textoTarea">{task.label}</span>
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
