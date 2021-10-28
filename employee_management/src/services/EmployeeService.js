//imports
import axios from "axios";

// setting our employee link to a const variable to avoid typos
const EMPLOYEE_API_BASE_URL = "http://localhost:8080/api/v1/employees"

class EmployeeService {


    //We are returning a response of .get
    getEmployees(){
        return axios.get(EMPLOYEE_API_BASE_URL);
    }

    createEmployee(employee){
        return axios.post(EMPLOYEE_API_BASE_URL, employee);
    }

    getEmployeeById(employeeId){
        return axios.get(EMPLOYEE_API_BASE_URL + '/' + employeeId);
    }

    
    updateEmployee(employee, employeeId){
        return axios.put(EMPLOYEE_API_BASE_URL + '/' + employeeId, employee);
    }

    deleteEmployee(employeeId){
        return axios.delete(EMPLOYEE_API_BASE_URL + '/' + employeeId);
    }

}


//We are an object of this class so we can directly use that object
//inside of a component
export default new EmployeeService()