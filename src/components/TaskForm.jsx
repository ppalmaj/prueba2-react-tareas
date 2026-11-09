import { useState, useRef } from "react";
import axios from "axios";
import SimpleReactValidator from "simple-react-validator";

function TaskForm({ addTask }) {

  const [name, setName] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [, forceUpdate] = useState(0);

  const validator = useRef(
    new SimpleReactValidator({
      messages: {
        required: "El campo :attribute es obligatorio."
      }
    })
  );

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (validator.current.allValid()) {

      const randomId =
        Math.floor(Math.random() * 10) + 1;

      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/todos/${randomId}`
      );

      const priority =
        response.data.completed
          ? "Alta"
          : "Media";

      await addTask({
        name,
        dueDate,
        priority
      });

      setName("");
      setDueDate("");

    } else {

      validator.current.showMessages();
      forceUpdate(n => n + 1);

    }
  };

  return (

    <form onSubmit={handleSubmit}>

      <div>

        <label>Nombre Tarea</label>

        <br />

        <input
          type="text"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />

        <div>
          {/* eslint-disable-next-line react-hooks/refs */}
          {
            validator.current.message(
              "Tarea",
              name,
              "required"
            )
          }
        </div>

      </div>

      <br />

      <div>

        <label>Fecha Límite</label>

        <br />

        <input
          type="date"
          value={dueDate}
          onChange={(e) =>
            setDueDate(e.target.value)
          }
        />

        <div>
          {/* eslint-disable-next-line react-hooks/refs */}
          {
            validator.current.message(
              "Fecha Límite",
              dueDate,
              "required"
            )
          }
        </div>

      </div>

      <br />

      <button type="submit">
        Guardar Tarea
      </button>

    </form>

  );
}

export default TaskForm;