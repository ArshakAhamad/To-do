import React, { useState } from 'react';

export default function HomePage() {

const [taskList, setTaskList] = useState([]);
const[searchTask, setSearchTask] = useState("");

const [task, setTask] = useState({
        TaskName: "",
        Description: "",
        Estimation: "",
        Type: "",
        People:"",
        Priority:"",
        isCompleted: false

    });

const [editFormData, setEditFormData] = useState({
        id: null,
        TaskName: "",
        Description: "",
        Estimation: "",
        Type: "",
        People:"",
        Priority:"",
        isCompleted: false

    });
        
const handleSubmit = async (e) => {
     e.preventDefault();
const formData = new FormData();

formData.append("TaskName", task.TaskName);
formData.append("Description", task.Description);
formData.append("Estimation", task.Estimation);
formData.append("Type", task.Type);
formData.append("People", task.People);
formData.append("Priority", task.Priority);
formData.append("Status", task.isCompleted);

// Reset the form fields after submit
        setTask({ TaskName: "", Description: "", Estimation: "", Type: "", People: "", Priority: "", isCompleted: false });
    
    };


const handleChange = (e) => {
        const { name, value } = e.target;
        setTask({
            ...task
             [name], checked : value
        })
    }

const handleSwitchChange = (e) => {
        setTask({
            ...task,
            isCompleted: e.target.checked
        })
    }

    

const editTask = (selectedTask) => {
setEditFormData({
    id: selectedTask.id,
    TaskName: selectedTask.TaskName,
    Description: selectedTask.Description,
    Estimation: selectedTask.Estimation,
Type: selectedTask.Type,
People: selectedTask.People,
Priority: selectedTask.Priority,
isCompleted: selectedTask.isCompleted

});

}

const deleteTask = (idToDelete) =>{
const updatedTasks = taskList.filter(item => item.id !== idToDelete);
        setTaskList(updatedTasks);
}

const markTaskAsCompleted = () =>{
 setTaskList(taskList.map(t => t.id === id ? { ...t, isCompleted: !t.isCompleted } : t));
    };
}

return(
 <div className='main-content p-6 flex flex-col justify-center items-center min-h-screen bg-gray-100'>
            <div className='w-full max-w-md bg-white rounded-lg shadow-md p-6 mb-6'>
                <form onSubmit={handleSubmit} className='space-y-4'>
                    <input 
                        className="w-full border p-2 rounded" 
                        name="TaskName" 
                        placeholder="Task Name" 
                        value={task.TaskName} 
                        onChange={handleChange} 
                    />
                    {/* Add other input fields here matching your state keys */}
                    <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Add Task</button>
                </form>
            </div>
            </div>
);

