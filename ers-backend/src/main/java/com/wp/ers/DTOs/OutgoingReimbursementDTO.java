package com.wp.ers.DTOs;

import com.wp.ers.utilities.Utilities;


public record OutgoingReimbursementDTO(

        String description,
        Float amount,
        Utilities.Status status,
        String employee
) { }
