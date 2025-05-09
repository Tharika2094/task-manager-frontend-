import TaskList from "./components/TaskList"; 
import { ToastContainer, toast } from 'react-toastify';

export const URL = process.env.REACT_APP_SERVER_URL


function App() {
  return (
    <div className="app">
      <div className="task-container">
        <TaskList/>
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
