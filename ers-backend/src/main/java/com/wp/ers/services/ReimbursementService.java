package com.wp.ers.services;

import com.wp.ers.models.Reimbursement;
import com.wp.ers.repositories.ReimbursementRepository;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

    public List<Reimbursement> listReimbursements() {
        return reimbursementRepository.findAll();
    }
}
