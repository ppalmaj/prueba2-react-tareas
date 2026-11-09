import React from "react";

function TaskList({
  tasks,
  deleteTask
}) {

  return (

    <>
      {tasks.map(task => (

        <React.Fragment
          key={task.id}
        >

          <div>

            <h3>
              {task.name}
            </h3>

            <p>
              Fecha límite:
              {" "}
              {task.dueDate}
            </p>

            <p>
              Prioridad:
              {" "}
              {task.priority}
            </p>

            <button
              onClick={() =>
                deleteTask(task.id)
              }
            >
              Eliminar
            </button>

          </div>

          <hr />

        </React.Fragment>

      ))}
    </>

  );
}

export default TaskList;