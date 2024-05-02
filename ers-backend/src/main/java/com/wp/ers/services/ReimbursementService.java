package com.wp.ers.services;

import com.wp.ers.DTOs.OutgoingReimbursementDTO;
import com.wp.ers.models.Reimbursement;
import com.wp.ers.repositories.ReimbursementRepository;
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

    public Reimbursement addReimbursement(Reimbursement reimbursement) {
        return reimbursementRepository.save(reimbursement);
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
