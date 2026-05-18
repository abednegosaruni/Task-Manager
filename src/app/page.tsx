"use client";

import { useEffect, useState } from "react";

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

export default function Home() {
  const [taskInput, setTaskInput] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);

  // Load tasks
  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");

    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  // Save tasks
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Add task
  const addTask = () => {
    if (!taskInput.trim()) return;

    const newTask: Task = {
      id: Date.now(),
      text: taskInput,
      completed: false,
    };

    setTasks([newTask, ...tasks]);
    setTaskInput("");
  };

  // Toggle task
  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  // Delete task
  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-black to-slate-900 text-white flex items-center justify-center p-6">

      <div className="w-full max-w-3xl bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl shadow-2xl p-8">

        {/* Header */}
        <div className="text-center mb-10">

          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Task Manager
          </h1>

          <p className="text-gray-300 mt-4 text-lg">
            Organize your tasks professionally
          </p>

        </div>

        {/* Input */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">

          <input
            type="text"
            placeholder="Add a new task..."
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
            className="flex-1 px-5 py-4 rounded-2xl bg-slate-900 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-lg"
          />

          <button
            onClick={addTask}
            className="bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 rounded-2xl font-bold hover:scale-105 transition-all duration-300 shadow-lg"
          >
            Add Task
          </button>

        </div>

        {/* Task Counter */}
        <div className="mb-6 text-gray-300">
          Total Tasks: {tasks.length}
        </div>

        {/* Tasks */}
        <div className="space-y-4">

          {tasks.length === 0 && (
            <div className="text-center py-10 text-gray-400 text-lg">
              No tasks yet.
            </div>
          )}

          {tasks.map((task) => (

            <div
              key={task.id}
              className="bg-slate-900/70 border border-gray-700 rounded-2xl p-5 flex items-center justify-between hover:border-cyan-400 transition-all duration-300"
            >

              {/* Task Text */}
              <div
                onClick={() => toggleTask(task.id)}
                className={`flex-1 cursor-pointer text-lg ${
                  task.completed
                    ? "line-through text-gray-500"
                    : "text-white"
                }`}
              >
                {task.text}
              </div>

              {/* Buttons */}
              <div className="flex gap-3 ml-4">

                <button
                  onClick={() => toggleTask(task.id)}
                  className={`px-4 py-2 rounded-xl font-semibold ${
                    task.completed
                      ? "bg-green-500 hover:bg-green-400"
                      : "bg-yellow-500 hover:bg-yellow-400"
                  }`}
                >
                  {task.completed ? "Done" : "Pending"}
                </button>

                <button
                  onClick={() => deleteTask(task.id)}
                  className="bg-red-500 hover:bg-red-400 px-4 py-2 rounded-xl font-semibold"
                >
                  Delete
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

    </main>
  );
}