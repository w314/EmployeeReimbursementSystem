package com.wp.ers.controllers;

import com.wp.ers.DTOs.OutgoingEmployeeDTO;
import com.wp.ers.models.Employee;
import com.wp.ers.services.EmployeeService;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Controller // makes it a bean
@RequestMapping("/employees") // maps URI to controller
@CrossOrigin
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;


    @GetMapping
    public ResponseEntity<List<OutgoingEmployeeDTO>> getAllEmployees() {
        List<OutgoingEmployeeDTO> employees = employeeService.listAllEmployees();
        return ResponseEntity.ok().body(employees);
    }

    @PostMapping("")
    public ResponseEntity<Employee> getEmployeeById(@RequestBody Employee employee) {

        Employee newEmployee = employeeService.addEmployee(employee);
        return ResponseEntity.accepted().body(employee);
    }

}