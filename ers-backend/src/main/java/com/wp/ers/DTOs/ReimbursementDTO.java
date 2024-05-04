package com.wp.ers.DTOs;

import com.wp.ers.utilities.Utilities;


public record ReimbursementDTO(
        int reimbursementId,
        String description,
        Float amount,
        Utilities.Status status,
        String employee
) { }
