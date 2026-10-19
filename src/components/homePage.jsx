
import React, { useState } from "react";

export default function HomePage() {

  // Store all tasks
  const [taskList, setTaskList] = useState([]);

  // Store the search text
  const [searchTask, setSearchTask] = useState("");

  // Store the form input values
  const [task, setTask] = useState({
    TaskName: "",
    Description: "",
    Estimation: "",
    Type: "",
    People: "",
    Priority: "",
    isCompleted: false
  });

  // Update form fields
  const handleChange = (e) => {
    const { name, value } = e.target;

    setTask({
      ...task,
      [name]: value
    });
  };

  // Add a new task
  const handleSubmit = (e) => {
    e.preventDefault();

    if (task.TaskName.trim() === "") {
      alert("Please enter a task name");
      return;
    }

    const newTask = {
      ...task,
      id: Date.now()
    };

    setTaskList([...taskList, newTask]);

    // Clear the form
    setTask({
      TaskName: "",
      Description: "",
      Estimation: "",
      Type: "",
      People: "",
      Priority: "",
      isCompleted: false
    });
  };

  // Delete a task
  const deleteTask = (id) => {
    setTaskList(
      taskList.filter((item) => item.id !== id)
    );
  };

  // Mark a task as completed or incomplete
  const markTaskAsCompleted = (id) => {
    setTaskList(
      taskList.map((item) =>
        item.id === id
          ? { ...item, isCompleted: !item.isCompleted }
          : item
      )
    );
  };

  // Show tasks matching the search
  const filteredTasks = taskList.filter((item) =>
    item.TaskName.toLowerCase().includes(
      searchTask.toLowerCase()
    )
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <h1 className="text-3xl font-bold text-center mb-6">
        My To-Do App
      </h1>

      {/* Task form */}
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto bg-white p-6 rounded-lg shadow space-y-4"
      >

        <input
          className="w-full border p-2 rounded"
          name="TaskName"
          placeholder="Task Name"
          value={task.TaskName}
          onChange={handleChange}
        />

        <textarea
          className="w-full border p-2 rounded"
          name="Description"
          placeholder="Description"
          value={task.Description}
          onChange={handleChange}
        />

        <input
          className="w-full border p-2 rounded"
          name="Estimation"
          placeholder="Estimation (e.g. 2 hours)"
          value={task.Estimation}
          onChange={handleChange}
        />

        <select
          className="w-full border p-2 rounded"
          name="Type"
          value={task.Type}
          onChange={handleChange}
        >
          <option value="">Select Type</option>
          <option value="Study">Study</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
        </select>

        <input
          className="w-full border p-2 rounded"
          name="People"
          placeholder="Assigned Person"
          value={task.People}
          onChange={handleChange}
        />

        <select
          className="w-full border p-2 rounded"
          name="Priority"
          value={task.Priority}
          onChange={handleChange}
        >
          <option value="">Select Priority</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Add Task
        </button>

      </form>

      {/* Search box */}
      <div className="max-w-md mx-auto mt-6">
        <input
          className="w-full border p-2 rounded"
          placeholder="Search tasks..."
          value={searchTask}
          onChange={(e) => setSearchTask(e.target.value)}
        />
      </div>

      {/* Display tasks */}
      <div className="max-w-md mx-auto mt-6 space-y-4">

        {filteredTasks.map((item) => (

          <div
            key={item.id}
            className="bg-white p-4 rounded-lg shadow"
          >

            <h2
              className={
                item.isCompleted
                  ? "text-lg font-bold line-through text-gray-400"
                  : "text-lg font-bold"
              }
            >
              {item.TaskName}
            </h2>

            <p>{item.Description}</p>
            <p>Estimation: {item.Estimation}</p>
            <p>Type: {item.Type}</p>
            <p>Person: {item.People}</p>
            <p>Priority: {item.Priority}</p>

            <div className="flex gap-2 mt-3">

              <button
                type="button"
                onClick={() => markTaskAsCompleted(item.id)}
                className="bg-green-500 text-white px-3 py-1 rounded"
              >
                {item.isCompleted ? "Undo" : "Complete"}
              </button>

              <button
                type="button"
                onClick={() => deleteTask(item.id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>

            </div>

          </div>

        ))}

        {filteredTasks.length === 0 && (
          <p className="text-center text-gray-500">
            No tasks found.
          </p>
        )}

      </div>

    </div>
  );
}
