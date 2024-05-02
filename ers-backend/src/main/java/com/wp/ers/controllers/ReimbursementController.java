package com.wp.ers.controllers;

import com.wp.ers.models.Reimbursement;
import com.wp.ers.services.ReimbursementService;
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


    @PostMapping()
    public ResponseEntity<Reimbursement> addReibursement(@RequestBody Reimbursement reimbursement) {
        Reimbursement newReimbursement = reimbursementService.addReimbursement(reimbursement);
        return ResponseEntity.accepted().body(newReimbursement);
    }

    @GetMapping()
    public ResponseEntity<List<Reimbursement>> getAllReimbursements() {
        List<Reimbursement> reimbursements = reimbursementService.listReimbursements();
        return ResponseEntity.ok().body(reimbursements);

    }
}
