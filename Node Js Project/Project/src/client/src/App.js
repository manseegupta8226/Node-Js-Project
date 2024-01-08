
import './App.css';
import React from 'react';
import {Route, BrowserRouter,Routes} from 'react-router-dom';
import Home from './components/Home';
import Signup from './components/Signup';
import AddOrder from './components/AddOrder';
import Orders from './components/Orders';
import Login from './components/Login';
import { RequireAuth } from './components/RequireAuth';


function App() {
  return (
  
         <div className="App">
        <BrowserRouter>
            <Routes>
                <Route exact path='/' element={<Home/>}/>
                <Route exact path='/signup' element={<Signup/>}/>
                <Route exact path='/login' element={<Login/>}/>
                <Route exact path='/addOrder' element={<RequireAuth><AddOrder/></RequireAuth>}/>
                <Route exact path='/allOrders' element={<RequireAuth><Orders/></RequireAuth>}/>
            </Routes>
        </BrowserRouter>
    </div>
    
   
  );
}

export default App;