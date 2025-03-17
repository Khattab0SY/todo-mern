import { IoAdd } from "react-icons/io5";
import { RiEditFill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [newTodo, setNewTodo] = useState<string>("");
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/todo");
        console.log("API Response:", response); // عرض الاستجابة بالكامل
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const addTodo = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/todo", {
        todo: newTodo,
      });
      setData((prevData) => [...prevData, response.data]);
      setNewTodo("");
    } catch (err) {
      console.log(err);
    }
  };
  const updateTodo = async (id: string, currentText: string) => {
    try {
      const newText = window.prompt("Edit your task:", currentText);
      if (!newText || newText === currentText) return;

      await axios.put(`http://localhost:3000/api/todo/${id}`, {
        todo: newText,
      });

      setData((prevData) =>
        prevData.map((item) =>
          item._id === id ? { ...item, todo: newText } : item
        )
      );
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };
  const deleteTodo = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3000/api/todo/${id}`);
      setData((prevData) => prevData.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <div className="py-20 flex flex-col justify-center items-center">
      <div className="w-96 flex gap-2">
        <input
          type="text"
          onChange={(e) => setNewTodo(e.target.value)}
          value={newTodo}
          placeholder="Add a new task"
          className="px-3 py-2 bg-none outline-none border-2 border-disable rounded-md placeholder:text-white/30 text-white w-full"
        />
        <button
          onClick={addTodo}
          className="w-13 flex justify-center items-center bg-secondary hover:bg-secondary/70 duration-300 cursor-pointer rounded-lg"
        >
          <IoAdd className="text-white text-2xl" />
        </button>
      </div>
      <div className="flex flex-col gap-4 py-4">
        <p className="text-white">Tasks to do - {data.length}</p>
        {data.map((e: any) => {
          return (
            <div
              className="bg-primary w-96 py-4 px-6 rounded-xl flex justify-between items-center"
              key={e._id}
            >
              <p>{e.todo}</p>
              <div className="flex gap-4 justify-center items-center">
                <RiEditFill
                  onClick={() => updateTodo(e._id, e.todo)}
                  className="text-xl duration-300 hover:text-secondary/60 cursor-pointer"
                />
                <MdDelete
                  onClick={() => deleteTodo(e._id)}
                  className="text-2xl duration-300 hover:text-secondary/60 cursor-pointer"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;
