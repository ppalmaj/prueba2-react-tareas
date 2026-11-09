import { useState, useEffect } from "react";

import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc
} from "firebase/firestore";

import { db } from "./services/firebase";

import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

function App() {

  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const refreshTasks = async () => {

    try {

      const snapshot = await getDocs(
        collection(db, "tasks")
      );

      const taskList = snapshot.docs.map(
        (documento) => ({
          id: documento.id,
          ...documento.data()
        })
      );

      setTasks(taskList);

    } catch (error) {

      console.error(
        "Error cargando tareas:",
        error
      );

    }

  };

  useEffect(() => {

    const fetchTasks = async () => {

      try {

        const snapshot = await getDocs(
          collection(db, "tasks")
        );

        const taskList = snapshot.docs.map(
          (documento) => ({
            id: documento.id,
            ...documento.data()
          })
        );

        setTasks(taskList);

      } catch (error) {

        console.error(
          "Error cargando tareas:",
          error
        );

      }

    };

    fetchTasks();

  }, []);

  const addTask = async (task) => {

    try {

      await addDoc(
        collection(db, "tasks"),
        task
      );

      await refreshTasks();

    } catch (error) {

      console.error(
        "Error agregando tarea:",
        error
      );

    }

  };

  const deleteTask = async (id) => {

    try {

      await deleteDoc(
        doc(db, "tasks", id)
      );

      await refreshTasks();

    } catch (error) {

      console.error(
        "Error eliminando tarea:",
        error
      );

    }

  };

  return (

    <div style={{ padding: "20px" }}>

      <h1>
        Gestión de Tareas
      </h1>

      <button
        onClick={() =>
          setShowForm(!showForm)
        }
      >
        Agregar Tarea
      </button>

      {showForm && (
        <TaskForm
          addTask={addTask}
        />
      )}

      <hr />

      {tasks.length === 0 ? (

        <h2>
          No hay tareas pendientes
        </h2>

      ) : (

        <TaskList
          tasks={tasks}
          deleteTask={deleteTask}
        />

      )}

    </div>

  );
}

export default App;