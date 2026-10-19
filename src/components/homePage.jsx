
import React, { useState } from "react";

export default function HomePage() {
  const emptyTask = {
    TaskName: "",
    Description: "",
    Estimation: "",
    Type: "",
    People: "",
    Priority: "Medium",
    isCompleted: false,
  };

  const [taskList, setTaskList] = useState([]);
  const [searchTask, setSearchTask] = useState("");
  const [task, setTask] = useState(emptyTask);
  const [editingId, setEditingId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setTask((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!task.TaskName.trim()) return;

    if (editingId !== null) {
      setTaskList((prev) =>
        prev.map((item) =>
          item.id === editingId ? { ...item, ...task } : item
        )
      );
      setEditingId(null);
    } else {
      const newTask = {
        ...task,
        id: Date.now(),
      };

      setTaskList((prev) => [...prev, newTask]);
    }

    setTask(emptyTask);
  };

  const editTask = (selectedTask) => {
    setTask({
      TaskName: selectedTask.TaskName,
      Description: selectedTask.Description,
      Estimation: selectedTask.Estimation,
      Type: selectedTask.Type,
      People: selectedTask.People,
      Priority: selectedTask.Priority,
      isCompleted: selectedTask.isCompleted,
    });

    setEditingId(selectedTask.id);
  };

  const deleteTask = (idToDelete) => {
    setTaskList((prev) =>
      prev.filter((item) => item.id !== idToDelete)
    );

    if (editingId === idToDelete) {
      setEditingId(null);
      setTask(emptyTask);
    }
  };

  const markTaskAsCompleted = (id) => {
    setTaskList((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, isCompleted: !item.isCompleted }
          : item
      )
    );
  };

  const filteredTasks = taskList.filter((item) =>
    item.TaskName.toLowerCase().includes(searchTask.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-2xl">

        <h1 className="mb-6 text-center text-3xl font-bold">
          My To-Do App
        </h1>

        <form
          onSubmit={handleSubmit}
          className="mb-6 space-y-4 rounded-lg bg-white p-6 shadow-md"
        >
          <input
            className="w-full rounded border p-2"
            name="TaskName"
            placeholder="Task Name *"
            value={task.TaskName}
            onChange={handleChange}
            required
          />

          <textarea
            className="w-full rounded border p-2"
            name="Description"
            placeholder="Description"
            value={task.Description}
            onChange={handleChange}
          />

          <input
            className="w-full rounded border p-2"
            name="Estimation"
            placeholder="Estimated time (e.g. 2 hours)"
            value={task.Estimation}
            onChange={handleChange}
          />

          <input
            className="w-full rounded border p-2"
            name="Type"
            placeholder="Task Type"
            value={task.Type}
            onChange={handleChange}
          />

          <input
            className="w-full rounded border p-2"
            name="People"
            placeholder="Assigned Person"
            value={task.People}
            onChange={handleChange}
          />

          <select
            className="w-full rounded border p-2"
            name="Priority"
            value={task.Priority}
            onChange={handleChange}
          >
            <option value="Low">Low Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="High">High Priority</option>
          </select>

          <button
            type="submit"
            className="w-full rounded bg-blue-600 p-2 text-white hover:bg-blue-700"
          >
            {editingId !== null ? "Update Task" : "Add Task"}
          </button>

          {editingId !== null && (
            <button
              type="button"
              onClick={() => {
                setEditingId(null);
                setTask(emptyTask);
              }}
              className="w-full rounded bg-gray-500 p-2 text-white"
            >
              Cancel Edit
            </button>
          )}
        </form>

        <input
          className="mb-4 w-full rounded border bg-white p-3"
          placeholder="Search tasks..."
          value={searchTask}
          onChange={(e) => setSearchTask(e.target.value)}
        />

        <p className="mb-3 text-gray-600">
          Total: {taskList.length} | Completed:{" "}
          {taskList.filter((item) => item.isCompleted).length}
        </p>

        <div className="space-y-3">
          {filteredTasks.map((item) => (
            <div
              key={item.id}
              className="rounded-lg bg-white p-4 shadow"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h2
                    className={`text-lg font-bold ${
                      item.isCompleted
                        ? "text-gray-400 line-through"
                        : ""
                    }`}
                  >
                    {item.TaskName}
                  </h2>

                  {item.Description && (
                    <p className="mt-1 text-gray-600">
                      {item.Description}
                    </p>
                  )}

                  <p className="mt-2 text-sm text-gray-500">
                    Type: {item.Type || "N/A"} | Person:{" "}
                    {item.People || "N/A"}
                  </p>

                  <p className="text-sm text-gray-500">
                    Estimation: {item.Estimation || "N/A"} | Priority:{" "}
                    {item.Priority}
                  </p>
                </div>

                <input
                  type="checkbox"
                  checked={item.isCompleted}
                  onChange={() => markTaskAsCompleted(item.id)}
                  aria-label={`Complete ${item.TaskName}`}
                />
              </div>

              <div className="mt-4 flex gap-2">
                <button
                  type="button"
                  onClick={() => editTask(item)}
                  className="rounded bg-yellow-500 px-3 py-1 text-white"
                >
                  Edit
                </button>

                <button
                  type="button"
                  onClick={() => deleteTask(item.id)}
                  className="rounded bg-red-600 px-3 py-1 text-white"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}

          {filteredTasks.length === 0 && (
            <p className="py-6 text-center text-gray-500">
              {searchTask
                ? "No matching tasks found."
                : "No tasks yet. Add your first task!"}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
