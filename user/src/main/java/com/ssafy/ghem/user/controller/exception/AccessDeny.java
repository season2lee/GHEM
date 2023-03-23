package com.ssafy.ghem.user.controller.exception;

import lombok.NoArgsConstructor;

@NoArgsConstructor
public class AccessDeny extends RuntimeException {
    public AccessDeny(String message) {
        super(message);
    }
}
