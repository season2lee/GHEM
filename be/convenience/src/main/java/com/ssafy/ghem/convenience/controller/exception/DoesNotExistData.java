package com.ssafy.ghem.convenience.controller.exception;

import lombok.NoArgsConstructor;

@NoArgsConstructor
public class DoesNotExistData extends RuntimeException{
    public DoesNotExistData(String message) {
        super(message);
    }
}
