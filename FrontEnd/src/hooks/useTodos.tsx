import axios from "axios";
import { useEffect, useState } from "react";
import { TODO } from "../types/todoType";

const useTodos = () => {
  const [newTodo, setNewTodo] = useState<string>("");
  const [todos, setTodos] = useState<TODO[]>([]);
  const [url] = useState<string>("http://localhost:3000/api/todo");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        setTodos(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const addTodo = async () => {
    try {
      const response = await axios.post(url, {
        todo: newTodo,
      });
      setTodos((prev) => [...prev, response.data]);
      setNewTodo("");
    } catch (err) {
      console.log(err);
    }
  };
  const updateTodo = async (id: string, currentText: string) => {
    try {
      const newText = window.prompt("Edit your task:", currentText);
      if (!newText || newText === currentText) return;

      await axios.put(`${url}/${id}`, {
        todo: newText,
      });

      setTodos((prev) =>
        prev.map((item) =>
          item._id === id ? { ...item, todo: newText } : item
        )
      );
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };
  const deleteTodo = async (id: string) => {
    try {
      await axios.delete(`${url}/${id}`);
      setTodos((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };
  return { todos, newTodo, setNewTodo, addTodo, updateTodo, deleteTodo };
};

export default useTodos;
