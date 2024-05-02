package com.wp.ers.services;

import com.wp.ers.DTOs.IncomingReimbursementDTO;
import com.wp.ers.DTOs.OutgoingReimbursementDTO;
import com.wp.ers.models.Reimbursement;
import com.wp.ers.repositories.EmployeeRepository;
import com.wp.ers.repositories.ReimbursementRepository;
import com.wp.ers.utilities.Utilities;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Service
public class ReimbursementService {

    @Autowired
    private ReimbursementRepository reimbursementRepository;
    @Autowired
    private EmployeeRepository employeeRepository;

    public Reimbursement addReimbursement(
            IncomingReimbursementDTO reimbursementInput,
            int employeeId) {

        Reimbursement reimbursement = new Reimbursement(
                reimbursementInput.description(),
                reimbursementInput.amount(),
                Utilities.Status.pending,
                employeeRepository.findById(employeeId).get()
        );
        Reimbursement reimbursementAdded =  reimbursementRepository.save(reimbursement);

        return reimbursementAdded;

    }

    public List<OutgoingReimbursementDTO> listReimbursements() {
        List<Reimbursement> reimbursementsData = reimbursementRepository.findAll();

        List<OutgoingReimbursementDTO> reimbursements = new ArrayList<>();

        for(Reimbursement reimbursementData : reimbursementsData) {
            OutgoingReimbursementDTO reimbursement = new OutgoingReimbursementDTO(
                    reimbursementData.getDescription(),
                    reimbursementData.getAmount(),
                    reimbursementData.getStatus(),
                    reimbursementData.getEmployee().getFirstName() + " " + reimbursementData.getEmployee().getLastName()
            );
            reimbursements.add(reimbursement);
        }

        return reimbursements;
    }


    public Reimbursement getReimbursementById(int reimbursementId) {
        return reimbursementRepository.findById(reimbursementId).get();
    }
}
