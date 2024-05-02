package com.wp.ers.services;

import com.wp.ers.models.Employee;
import com.wp.ers.repositories.EmployeeRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@AllArgsConstructor
@Service // makes it a bean
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    public Employee addEmployee(Employee employee) {
        return employeeRepository.save(employee);

    }

    public List<Employee> listAllEmployees() {
        return employeeRepository.findAll();
    }
}
