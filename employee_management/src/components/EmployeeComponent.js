import React, { Component } from "react";
import EmployeeService from "../services/EmployeeService";

class EmployeeComponent extends Component {
  //constructor gets invoked before the component is mounted. By using .bind I can access all 
  //the variables from the state inside render()
  constructor(props) {
    super(props);

    this.state = {
      //Displaying the list of employees in the state
      //on the web page right here with an array
      employees: [],
    };
    this.addEmployee = this.addEmployee.bind(this);
    this.editEmployee = this.editEmployee.bind(this);
    this.deleteEmployee = this.deleteEmployee.bind(this);

  }

  deleteEmployee(id){
    EmployeeService.deleteEmployee(id).then( res => {
      //.filter filters out deleted employees
        this.setState({employees: this.state.employees.filter(employee => employee.id !== id)});
    });
}
//id allows me to access the specific Id of the employees
viewEmployee(id){
    this.props.history.push(`/view-employee/${id}`);
}
editEmployee(id){
    this.props.history.push(`/add-employee/${id}`);
}

  //Calling the REST API here
  //ComponentDidMount executes once the component is mounted for the first time.
  componentDidMount(){
        EmployeeService.getEmployees().then((res) => {
            //Setting the data to the state of the component
            //storing the res data into the employees array here
            this.setState({ employees: res.data })
        });
  }

  //method for adding employees
  //get history object via props and allows me to control the history of the browser
  addEmployee(){
    this.props.history.push('/add-employee');
  }

  render() {
    return (
      <div>
        <h2 className="text-center">Employees List</h2>

        <div className = "row">
          <button className= "btn btn-primary" onClick={this.addEmployee}> Add Employee </button>
        </div>
        <br></br>
        <div className="row">
          <table className="table table-striped table-bordered">
            {/* Head of the table */}
            <thead>
              <tr>
                <th> Employee First Name </th>
                <th> Employee Last Name </th>
                <th> Employee Email ID </th>
                <th> Actions </th>
              </tr>
            </thead>
            {/* Table Body, going to dynamically add the rows to the 
            table here */}
            <tbody>
                {
                    //mapping through the employees array here
                    this.state.employees.map(
                        employee =>
                        <tr key = {employee.id}>
                            <td> {employee.firstName} </td>
                            <td> {employee.lastName} </td>
                            <td> {employee.emailId} </td>
                       
                           <td>
                           <button onClick={ () => this.editEmployee(employee.id)} className="btn btn-info">Update </button>
                           <button style={{marginLeft: "10px"}} onClick={ () => this.deleteEmployee(employee.id)} className="btn btn-danger">Delete </button>
                           <button style={{marginLeft: "10px"}} onClick={ () => this.viewEmployee(employee.id)} className="btn btn-info">View </button>
                       </td>
                         </tr>

                    )
                }
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default EmployeeComponent;
