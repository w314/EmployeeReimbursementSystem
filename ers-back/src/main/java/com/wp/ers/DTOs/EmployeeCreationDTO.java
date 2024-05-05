package com.wp.ers.DTOs;

import com.wp.ers.utilities.Utilities;

public record EmployeeCreationDTO(
        String firstName,
        String lastName,
        String userName,
        String password,
        Utilities.Role role
) {
}
