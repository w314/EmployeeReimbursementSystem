package com.wp.ers.DTOs;

import com.wp.ers.models.Employee;
import com.wp.ers.models.Reimbursement;
import com.wp.ers.repositories.EmployeeRepository;
import com.wp.ers.utilities.Utilities;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class Mapper {

    @Autowired
    private EmployeeRepository employeeRepository;

    public EmployeeDTO toEmployeeDTO (Employee employee) {
        return new EmployeeDTO(
                employee.getEmployeeId(),
                employee.getFirstName(),
                employee.getLastName(),
                employee.getRole()
        );
    }

    public Reimbursement toReimbursement (ReimbursemenCreationtDTO reimbursementInput, int employeeId) {
        return new Reimbursement(
                reimbursementInput.description(),
                reimbursementInput.amount(),
                Utilities.Status.pending,
                employeeRepository.findById(employeeId).get());
    }


    public ReimbursementDTO toReimbursementDTO(Reimbursement reimbursement) {
        return  new ReimbursementDTO(
                reimbursement.getReimbursementId(),
                reimbursement.getDescription(),
                reimbursement.getAmount(),
                reimbursement.getStatus(),
                reimbursement.getEmployee().getFirstName() + " " + reimbursement.getEmployee().getLastName()
        );
    }
}
