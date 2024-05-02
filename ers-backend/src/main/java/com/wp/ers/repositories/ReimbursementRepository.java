package com.wp.ers.repositories;

import com.wp.ers.models.Reimbursement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
// extends JpaRepository to perform CRUD operations on the Employee entity
// in <> are the Model name and the type of the primary key
public interface ReimbursementRepository extends JpaRepository<Reimbursement, Integer> {

    // Spring Data JPA automatically generates the implementation of the DAO interface
    // based on conventions and provides a wide range of database operations out of the box,
    // reducing the need for boilerplate code.

//    public List<Reimbursement> findByEmployeeId(int employeeId);
}
