import React from "react";
import "/workspaces/TodoListUsandoReactyFetchDouglasM/src/styles/index.css";

export default function TaskList(props) {
  const { tasks, deleteTask } = props;

  return (
    <>
      {tasks.map((task) => (
        <li key={task.id}>
          <span className="viñeta">•</span>
          <span className="textoTarea">{task.label}</span>
          <span
            className="BotonEliminarTarea"
            onClick={() => deleteTask(tarea.id)}
          >
            X
          </span>
        </li>
      ))}
    </>
  );
}
