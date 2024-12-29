import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar';
import SignIn from './Components/SignIn';
import { Route, Routes} from 'react-router-dom';
import Dashboard from './Components/Dashboard';
import TaskList from './Components/TaskList';
function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes basename="/" >
        <Route  path='/' element={<SignIn/>}/>
        <Route  path='/dashboard' element={<Dashboard/>}/>
        <Route  path='/tasklist' element={<TaskList/>}/>
      </Routes >
    </div>
  );
}

export default App;
