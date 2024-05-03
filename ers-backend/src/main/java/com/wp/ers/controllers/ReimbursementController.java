package com.wp.ers.controllers;

import com.wp.ers.DTOs.ReimbursemenCreationtDTO;
import com.wp.ers.DTOs.ReimbursementDTO;
import com.wp.ers.models.Reimbursement;
import com.wp.ers.services.ReimbursementService;
import com.wp.ers.utilities.Utilities;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@NoArgsConstructor
@AllArgsConstructor
@RequestMapping("/reimbursements")  // maps controller to the /reimburement URI path
@Controller // makes it a bean
@CrossOrigin
public class ReimbursementController {

    @Autowired // injects the depencency
    private ReimbursementService reimbursementService;


    @PostMapping("/employees/{employeeId}")
    public ResponseEntity<Reimbursement> addReimbursement(
            @RequestBody ReimbursemenCreationtDTO reimbursement,
            @PathVariable int employeeId) {
        Reimbursement newReimbursement = reimbursementService.addReimbursement(reimbursement, employeeId);
        return ResponseEntity.accepted().body(newReimbursement);
    }

    @GetMapping()
    public ResponseEntity<List<ReimbursementDTO>> getAllReimbursements() {
        List<ReimbursementDTO> reimbursements = reimbursementService.listReimbursements();
        return ResponseEntity.ok().body(reimbursements);

    }

    @GetMapping("/{reimbursementId}")
    public ResponseEntity<Reimbursement> getReimbursementById(@PathVariable int reimbursementId) {
        Reimbursement reimbursement =  reimbursementService.getReimbursementById(reimbursementId);
        return ResponseEntity.ok().body(reimbursement);
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<ReimbursementDTO>> getReimbursementsByStatus(@PathVariable Utilities.Status status) {
        List<ReimbursementDTO> reimbursements = reimbursementService.getReimbursementsByStatus(status);
        return ResponseEntity.ok().body(reimbursements);
    }

    @PatchMapping("/{reimbursementId}/status/{status}")
    public ResponseEntity<Reimbursement> updateReimbursementStatus(@PathVariable int reimbursementId, @PathVariable Utilities.Status status) {
        Reimbursement reimbursement = reimbursementService.updateReimbursementStatus(reimbursementId, status);
        return ResponseEntity.ok().body(reimbursement);
    }
}
