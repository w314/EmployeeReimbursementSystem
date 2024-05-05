package com.wp.ers.DTOs;

public record ReimbursemenCreationtDTO(
        String description,
        float amount,
        int employeeId
) {
}
