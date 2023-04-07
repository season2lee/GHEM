package com.ssafy.ghem.convenience.controller.exception;

public class AlreadyExistData extends RuntimeException{
    public AlreadyExistData(String message) {
        super(message);
    }
}
