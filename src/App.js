import './App.css';
import Navbar from './Components/Navbar';
import SignIn from './Components/SignIn';
import { Route, Routes, HashRouter as Router } from 'react-router-dom'; // Use HashRouter
import Dashboard from './Components/Dashboard';
import TaskList from './Components/TaskList';
import Context from './Context/Context';

function App() {
  return (
    <Context>
      <div className="App">
        <>
          <Navbar />
          <Routes>
            {/* Default route */}
            <Route path="/" element={<SignIn type="signin" />} />
            {/* Routes for other paths */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/tasklist" element={<TaskList />} />
            <Route path="/signup" element={<SignIn type="signup" />} />
            {/* Wildcard route */}
            <Route path="*" element={<SignIn type="signin" />} />
          </Routes>
        </>
      </div>
    </Context>
  );
}

export default App;
