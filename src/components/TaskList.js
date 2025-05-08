import TaskForm from "./TaskForm"
import Task from "./Task"
import { useEffect, useState } from "react"
import { toast } from 'react-toastify';
import axios from "axios"
import { URL } from "../App";
import loadingImg from "../assets/loader.gif"

const TaskList = () => {
  const [formData,setFormData]=useState({
    name:"",
    completed:false
  })

  const [tasks, setTasks] = useState([])
  const [completedTask, setCompletedTask] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [taskId, setTaskId] = useState("")
  

  const {name} = formData

 const handleInputChange=(e)=>{
    const {name,value}=e.target
    setFormData({...formData,[name]:value})
 }

 const createTask=async(e)=>{
  e.preventDefault()
    if(name===""){
      return toast.error("Input field cannot be empty.");
    }
    try {
     await axios.post(`${URL}/api/tasks`,formData)
     getTasks()
     toast.success("Task added successfully..")
     setFormData({...formData,name:""})
    } catch (error) {
      toast.error(error.message)
    }
 }

 const getTasks= async () => {
  setIsLoading(true);
  try {
    const {data}= await axios.get(`${URL}/api/tasks`);
    setTasks(data);
    setIsLoading(false);
  } catch (error) {
    toast.error(error.message);
    setIsLoading(false);
  }
 }

 useEffect(()=>{
  getTasks()
 },[])

 const deleteTask=async (id) => {
  try {
    await axios.delete(`${URL}/api/tasks/${id}`)
    getTasks();
  } catch (error) {
    toast.error(error.message);
  }
 }

 const getSingleTask = async (task) => {
  await setFormData({name:task.name, completed:false})
  setTaskId(task._id)
  setIsEditing(true)
 }

 const updateTask=async (e) => {
  e.preventDefault()
  if(name===""){
    return toast.error("Input field cannot be empty.")
  }
  try {
    await axios.put(`${URL}/api/tasks/${taskId}`,formData)
    setFormData({...formData,name:""})
    setIsEditing(false)
    getTasks()  //refresh the task and display all tasks
  } catch (error) {
    toast.error(error.message)
  }
 }

 const setToComplte =async (task) => {
  const newformData ={
    name:task.name,
    completed:true,
  } 
  try {
    await axios.put(`${URL}/api/tasks/${task._id}`,newformData)
    getTasks() 
  } catch (error) {
    toast.error(error.message)
  }
 }

 useEffect(()=>{
  const comTasks=tasks.filter((task)=>{
    return task.completed===true
  })
  setCompletedTask(comTasks)
 },[tasks])

  return (
    
    <div>
        <h2>Task Manager</h2>
        <TaskForm name={name} 
        handleInputChange={handleInputChange} 
        createTask={createTask} 
        isEditing={isEditing}
        updateTask={updateTask}/>
        
        {tasks.length>0 && (
          <div className="--flex-between --p">
          <p>
            <b>Total Tasks:</b> {tasks.length}
          </p>
          <p>
            <b>Completed Tasks:</b> {completedTask.length}
          </p>
        </div>
        )}
        
        <hr></hr>
        {
          isLoading && (
            <div className="--flex-center">
              <img src={loadingImg} alt="Loading"/>
            </div>
          )
        }
        {
          !isLoading && tasks.length===0 ? (
            <p className="--py">No task added. Please add a task</p>
          ):(
            <>
              {tasks.map((task, index)=>{
                return(
                  <Task key={task._id} 
                  deleteTask={deleteTask} 
                  task={task} index={index} 
                  getSingleTask={getSingleTask}
                  setToComplte={setToComplte}/>
                )
              })}
            </>
          )
        }
        
    </div>
    
  )
}

export default TaskList