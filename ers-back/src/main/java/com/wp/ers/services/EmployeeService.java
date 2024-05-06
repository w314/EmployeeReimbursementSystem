package com.wp.ers.services;

import com.wp.ers.DTOs.EmployeeDTO;
import com.wp.ers.DTOs.Mapper;
import com.wp.ers.models.Employee;
import com.wp.ers.repositories.EmployeeRepository;
//import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

//@AllArgsConstructor
@Service // makes it a bean
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;
    @Autowired
    private Mapper mapper;

    public Employee addEmployee(Employee employee) {
        return employeeRepository.save(employee);
    }


    public List<EmployeeDTO> listAllEmployees() {

        List<Employee> employeesData = employeeRepository.findAll();
        return employeesData
                .stream()
                .map(employee -> mapper.toEmployeeDTO(employee))
                .toList();
    }


    public EmployeeDTO login(String username, String password) {

        Employee employee = employeeRepository.findByUserName(username);

        if(employee == null) return null;

        if(employee.getPassword().equals(password)) {
            return mapper.toEmployeeDTO(employee);
        }

        return null;
    }

    public void deleteEmployee(Integer employeeId) {
        employeeRepository.deleteById(employeeId);

    }


}
