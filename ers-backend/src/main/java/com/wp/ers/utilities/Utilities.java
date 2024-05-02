package com.wp.ers.utilities;


import org.springframework.stereotype.Component;

@Component
public class Utilities {

    // enum for possible roles
    public enum Role {
        associate,
        manager
    }

    public enum Status {
        pending,
        approved,
        denied
    }
}
