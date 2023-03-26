package com.ssafy.ghem.user.controller.exception;

public class AlreadyExistData extends RuntimeException{
    public AlreadyExistData(String message) {
        super(message);
    }
}
