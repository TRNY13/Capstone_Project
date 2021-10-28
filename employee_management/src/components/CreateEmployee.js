import React, { Component } from 'react';
import EmployeeService from '../services/EmployeeService';

class CreateEmployee extends Component {
   
   
    constructor(props) {
        super(props)

        this.state = {
            //this.props.match.params.id gets employee id from the route
            //declaring state variables
            id: this.props.match.params.id,
            firstName: '',
            lastName: '',
            emailId: ''
        }
        this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
        this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
        this.saveOrUpdateEmployee = this.saveOrUpdateEmployee.bind(this);

    }
    
  //executes once the component is mounted

  componentDidMount(){

    //whenever id is _add nothing extra needs to be done & employee id is grab id using EmployeeService.getEmployeeById
    if(this.state.id === '_add'){
        return
    }else{
        EmployeeService.getEmployeeById(this.state.id).then( (res) =>{
            let employee = res.data;
            this.setState({firstName: employee.firstName,
                lastName: employee.lastName,
                emailId : employee.emailId
            });
        });
    }        
}
//saveOrUpdateEmployee () checks if id is _add
//then call EmployeeService.createEmployee(), makes the REST API call to store employee data.
//if id is a positive number EmployeeService.updateEmployee() is called and makes the REST API call
//to store the updated data in the database
saveOrUpdateEmployee = (e) => {
    e.preventDefault();
    let employee = {firstName: this.state.firstName, lastName: this.state.lastName, emailId: this.state.emailId};
    console.log('employee => ' + JSON.stringify(employee));

    
    if(this.state.id === '_add'){
        EmployeeService.createEmployee(employee).then(res =>{
            this.props.history.push('/employees');
        });
    }else{
        EmployeeService.updateEmployee(employee, this.state.id).then( res => {
            this.props.history.push('/employees');
        });
    }
}

changeFirstNameHandler= (event) => {
    this.setState({firstName: event.target.value});
}

changeLastNameHandler= (event) => {
    this.setState({lastName: event.target.value});
}

changeEmailHandler= (event) => {
    this.setState({emailId: event.target.value});
}

cancel(){
    this.props.history.push('/employees');
}

//getTitle is pretty SE, gets the title for Add & Employee based on id
getTitle(){
    if(this.state.id === '_add'){
        return <h3 className="text-center">Add Employee</h3>
    }else{
        return <h3 className="text-center">Update Employee</h3>
    }
}
render() {
    return (
        <div>
            <br></br>
               <div className = "container">
                    <div className = "row">
                        <div className = "card col-md-6 offset-md-3 offset-md-3">
                            {
                                this.getTitle()
                            }
                            <div className = "card-body">
                                <form>
                                    <div className = "form-group">
                                        <label> First Name: </label>
                                        <input placeholder="First Name" name="firstName" className="form-control" 
                                            value={this.state.firstName} onChange={this.changeFirstNameHandler}/>
                                    </div>
                                    <div className = "form-group">
                                        <label> Last Name: </label>
                                        <input placeholder="Last Name" name="lastName" className="form-control" 
                                            value={this.state.lastName} onChange={this.changeLastNameHandler}/>
                                    </div>
                                    <div className = "form-group">
                                        <label> Email Id: </label>
                                        <input placeholder="Email Address" name="emailId" className="form-control" 
                                            value={this.state.emailId} onChange={this.changeEmailHandler}/>
                                    </div>

                                    <button className="btn btn-success" onClick={this.saveOrUpdateEmployee}>Save</button>
                                    <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                                </form>
                            </div>
                        </div>
                    </div>

               </div>
        </div>
    )
}
}

export default CreateEmployee;