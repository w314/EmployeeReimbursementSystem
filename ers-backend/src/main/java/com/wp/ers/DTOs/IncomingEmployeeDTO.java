package com.wp.ers.DTOs;

import com.wp.ers.utilities.Utilities;

public record IncomingEmployeeDTO (
    String firstName,
    String lastName,
    String userName,
    String password,
    Utilities.Role role
) {
}
