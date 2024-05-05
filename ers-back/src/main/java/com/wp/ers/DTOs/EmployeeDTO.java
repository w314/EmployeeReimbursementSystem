package com.wp.ers.DTOs;

import com.wp.ers.utilities.Utilities;

public record EmployeeDTO(
        int employeeId,
        String firstName,
        String lastName,
        Utilities.Role role
) { }
