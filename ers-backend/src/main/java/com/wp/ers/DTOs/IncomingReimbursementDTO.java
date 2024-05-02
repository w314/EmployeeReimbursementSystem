package com.wp.ers.DTOs;

import com.wp.ers.utilities.Utilities;

public record IncomingReimbursementDTO(
        String description,
        float amount,
        int employeeId
) {
}
