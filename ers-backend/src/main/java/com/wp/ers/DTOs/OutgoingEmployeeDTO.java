package com.wp.ers.DTOs;

import com.wp.ers.utilities.Utilities;

public record OutgoingEmployeeDTO(
    String firstName,
    String lastName,
    Utilities.Role role
) { }
