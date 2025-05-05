import React, { useEffect, useState } from "react";
import {  CheckCheck, Circle, Trash2 } from "lucide-react";
const ListTodo = () => {
  const [allTodos, setAllTodos] = useState([]);
  //listing
  const getAllTodos = async () => {
    try {
      const response = await fetch("http://localhost:5000/todos");
      const data = await response.json();
      setAllTodos(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getAllTodos();
  }, []);
  //deleting
  const deleteTodo = async (id) => {
    try {
      await fetch(`http://localhost:5000/todos/${id}`, {
        method: "DELETE",
      });
      setAllTodos(allTodos.filter((todo) => todo.id !== id));
    } catch (error) {
      alert("Unable to delete!");
    }
  };
  //completing
  const toggleComplete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/todos/${id}`, {
        method: "PUT",
      });
      const updatedTodo = await response.json();

      setAllTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id
            ? { ...todo, is_completed: updatedTodo.is_completed }
            : todo
        )
      );
    } catch (error) {
      console.error("Toggle complete failed", error);
    }
  };

  return (
    <div className="h-screen font-serif bg-gradient-to-t from-[#443627] to-[#DBDBDB] ">
      <h1 className="text-4xl  text-slate-600 m-1 p-4 text-center underline">All tasks</h1>
      <ul className="space-y-3 max-w-3xl mx-auto ">
      {allTodos.length === 0 ? (
        <p className="text-black/40 text-xl mt-5 justify-center text-center">  No tasks yet — add one above!</p>
      ) : allTodos.map((todo) => (
          <li
            key={todo.id}
            className="bg-white shadow-md rounded-lg overflow-hidden"
          >
            <div className="p-5 bg-[#D8D8D8]">
              <div className="flex items-start gap-3">
                <button
                  className="hover:text-violet-800"
                  onClick={() => toggleComplete(todo.id)}
                >
                  {todo.is_completed ? (
                    <CheckCheck className="h-5 w-5 text-green-500" />
                  ) : (
                    <Circle className="h-5 w-5" />
                  )}
                </button>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h2
                      className={`text-2xl  font-medium ${
                        todo.is_completed
                          ? "text-gray-400 line-through"
                          : "text-gray-900"
                      }`}
                    >
                      {todo.title}
                    </h2>
                  </div>
                  <p
                    className={`text-md  font-medium ${
                      todo.is_completed
                        ? "text-gray-400 line-through"
                        : "text-gray-900"
                    }`}
                  >
                    {todo.description}
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    {new Date(todo.created_at).toLocaleString()}
                  </p>
                </div>

                <button
                  className="text-gray-600 hover:text-red-500"
                  onClick={() => deleteTodo(todo.id)}
                >
                  <Trash2 />
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListTodo;
