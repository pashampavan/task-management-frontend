import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar';
import SignIn from './Components/SignIn';
import { Route, Routes} from 'react-router-dom';
import Dashboard from './Components/Dashboard';
import TaskList from './Components/TaskList';
import Context from './Context/Context';
function App() {
  return (
    <Context>
    <div className="App">
      <Navbar/>
      <Routes >
        <Route  path='/*' element={<SignIn type="signin"/>}/>
        <Route  path='/' element={<SignIn type="signin"/>}/>
        <Route  path='/task-management-frontend' element={<SignIn type="signin"/>}/>
        <Route  path='/dashboard' element={<Dashboard/>}/>
        <Route  path='/tasklist' element={<TaskList/>}/>
        <Route  path='/signup' element={<SignIn type="signup"/>}/>
      </Routes >
    </div>

    </Context>
  );
}

export default App;
