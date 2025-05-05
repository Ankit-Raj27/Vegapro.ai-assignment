import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const InputTodo = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const onSubmitForm = async (e) => {
    e.preventDefault();
    const body = { title, description };
    try {
      const response = await fetch("http://localhost:5000/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        toast.success("Task added successfully!");

        setTimeout(() => {
          window.location = "/";
        }, 1500);
      } else {
        toast.error("Failed to add task.");
      }
    } catch (error) {
      console.error(error.message);
      toast.error("An error occurred.");
    }
  };

  return (
    <div className="flex flex-col items-center font-serif justify-center bg-gradient-to-tr from-[#F6F0F0] to-[#D5C7A3] ">
      <div className="flex flex-col w-1/2">
        <h1 className="text-center text-5xl underline font-mono mt-10">
          Vegapro.ai Todo App
        </h1>
        <form
          className="flex flex-col items-center justify-center"
          onSubmit={onSubmitForm} 
        >
          <input
            type="text"
            placeholder="What're you thinking to do today?"
            className="border-4 border-gray-500 rounded-full bg-[#FAF0E6] p-2 w-1/2 mt-5 justify-center"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Tell me more about it!"
            className="border-4 border-gray-500 bg-[#FAF0E6] rounded-full p-2 w-1/2 mt-2 justify-center"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button
            type="submit" 
            className="text-gray-900 mt-4 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100
              focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800
              dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          >
            Add task
          </button>
        </form>
      </div>
      <ToastContainer position="bottom-right" theme="dark" autoClose={1000} />
    </div>
  );
};

export default InputTodo;
