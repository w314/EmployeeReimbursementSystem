package com.wp.ers.controllers;

import com.wp.ers.DTOs.EmployeeDTO;
import com.wp.ers.DTOs.LoginCredentials;
import com.wp.ers.models.Employee;
import com.wp.ers.services.EmployeeService;
import jakarta.servlet.http.HttpSession;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.HttpSessionRequiredException;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Controller // makes it a bean
@RequestMapping("/employees") // maps URI to controller
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;


    @GetMapping
    public ResponseEntity<List<EmployeeDTO>> getAllEmployees() {
        List<EmployeeDTO> employees = employeeService.listAllEmployees();
        return ResponseEntity.ok().body(employees);
    }

    @PostMapping("")
    public ResponseEntity<Employee> getEmployeeById(@RequestBody Employee employee) {

        Employee newEmployee = employeeService.addEmployee(employee);
        return ResponseEntity.accepted().body(employee);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login
//            ( @RequestBody {String username, @RequestBody String password, @RequestBody HttpSession session) {
        (@RequestBody LoginCredentials loginData, HttpSession session) {
//
            System.out.println("TRYING TO LOG IN " + loginData.username() + " with password: " + loginData.password());
        EmployeeDTO employee = employeeService.login(loginData.username(), loginData.password());
        if(employee == null) {
            return ResponseEntity.status(404).body("Enter valid username and password");
        }

        session.setAttribute("userId", employee.employeeId());
        session.setAttribute("role", employee.role());

        return ResponseEntity.ok().body(employee);
    }

}