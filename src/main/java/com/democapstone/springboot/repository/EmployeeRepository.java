package com.democapstone.springboot.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.democapstone.springboot.model.Employee;

//Long is the type of primary key
//JpaRepository supplies a lot of built in methods
@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long>{

}


