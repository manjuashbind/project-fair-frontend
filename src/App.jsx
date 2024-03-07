
import './App.css';
import Footer from './Components/Footer';
import Header from './Components/Header';
import { Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Authentication from './Pages/Authentication';
import Dashboard from './Pages/Dashboard';
import Project from './Pages/Project';
import Pagenotfound from './Pages/Pagenotfound';



function App() {
  return (
    <div className="App">
      {/* <Header/> */}
<Routes>
  <Route path='/' element={<Home/>} ></Route>
  {/* login and register based on a key register */}
  <Route path='/login' element={<Authentication/>} ></Route>
  <Route path='/register' element={<Authentication register/>} ></Route>  
  <Route path='/dashboard' element={<Dashboard/>} ></Route>
  <Route path='/project' element={<Project/>} ></Route>
  <Route path='*' element={<Pagenotfound/>} ></Route>
</Routes>


      <Footer/>
    </div>
  );
}

export default App;
