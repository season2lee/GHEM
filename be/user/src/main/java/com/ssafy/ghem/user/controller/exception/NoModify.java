package com.ssafy.ghem.user.controller.exception;

import lombok.NoArgsConstructor;

@NoArgsConstructor
public class NoModify extends RuntimeException {
    public NoModify(String message) {
        super(message);
    }
}
