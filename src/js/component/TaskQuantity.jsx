import React from "react";
import "/workspaces/TodoListUsandoReactyFetchDouglasM/src/styles/index.css";

const TaskQuantity = ({ tasks }) => {
    return (
        <div className="d-flex align-items-end mt-5">
            <span className="spanNumTareas">
                Numero de tareas: {tasks?.length}
            </span>
        </div>
    );
};

export default TaskQuantity;
