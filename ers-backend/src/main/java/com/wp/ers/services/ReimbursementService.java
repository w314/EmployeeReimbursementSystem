package com.wp.ers.services;

import com.wp.ers.DTOs.Mapper;
import com.wp.ers.DTOs.ReimbursemenCreationtDTO;
import com.wp.ers.DTOs.ReimbursementDTO;
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
    @Autowired
    private Mapper mapper;

    public Reimbursement addReimbursement(
            ReimbursemenCreationtDTO reimbursementInput,
            int employeeId) {

        Reimbursement reimbursement = mapper.toReimbursement(reimbursementInput, employeeId);
        Reimbursement reimbursementAdded =  reimbursementRepository.save(reimbursement);

        return reimbursementAdded;

    }

    public List<ReimbursementDTO> listReimbursements() {
        List<Reimbursement> reimbursementsData = reimbursementRepository.findAll();

        List<ReimbursementDTO> reimbursements = reimbursementsData
                .stream()
                .map(reimbursement -> mapper.toReimbursementDTO(reimbursement))
                .toList();

        return reimbursements;
    }


    public Reimbursement getReimbursementById(int reimbursementId) {
        return reimbursementRepository.findById(reimbursementId).get();
    }


    public List<ReimbursementDTO> getReimbursementsByStatus(Utilities.Status status) {
        List<Reimbursement> reimbursements = reimbursementRepository.findByStatus(status);
        List<ReimbursementDTO> reimbursementDTOs = reimbursements
                .stream()
                .map(reimbursement -> mapper.toReimbursementDTO(reimbursement))
                .toList();

        return reimbursementDTOs;

    }
}
