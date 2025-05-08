
import { FaEdit,FaCheckDouble,FaRegTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";

const Task = ({task,index,deleteTask,getSingleTask,setToComplte}) => {
  return (
    <div className={task.completed ? "task completed" : "task"}>
        <p>
          <b>{index +1}. </b>
          {task.name}
        </p>
        <div className="task-icons">
          <FaCheckDouble color="green" onClick={()=>setToComplte(task)}/>
          <FaEdit color="purple" onClick={()=>
            getSingleTask(task)
          }/>
          <FaRegTrashAlt color="red" onClick={()=>{
            if(window.confirm("Are you sure you want to delete this task?")){
          deleteTask(task._id)}
            }
          }/>
        </div>
    </div>
  )
}

export default Task