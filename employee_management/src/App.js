//imports
import React from "react";
import "./App.css";
//Switch causes only 1 component to render at a time
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import EmployeeComponent from "./components/EmployeeComponent";
import CreateEmployee from "./components/CreateEmployee";
import ViewEmployee from "./components/ViewEmployee";

function App() {
  return (
    <div>
        <Router>
          
            <Header />
            {/* // container is a bootstrap css class */}
            <div className="container">
               {/* whenever http://localhost:3000/ gets put into the browser
               it will bring up EmployeeComponent */}
               <Switch> 
                 {/* React Router maintains the history object from EmployeeComponent */}
                 <Route path = "/" exact component = {EmployeeComponent}></Route>
                 <Route path = "/employees" component = {EmployeeComponent}></Route>
                 <Route path = "/add-employee" component = {CreateEmployee}></Route>
                 <Route path = "/view-employee/:id" component = {ViewEmployee}></Route>
               </Switch>
            </div>
            <Footer/>
            
            </Router>
    </div>
  );
}

export default App;
