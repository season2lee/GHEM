package com.ssafy.ghem.user.controller;

import com.ssafy.ghem.user.model.service.MySpecsService;
import com.ssafy.ghem.user.model.vo.HttpVo;
import com.ssafy.ghem.user.model.vo.MyPcSpecsVO;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/specs")
public class MySpecController {

    private final MySpecsService mySpecsService;

    @PostMapping
    @ApiOperation(value = "스펙사항을 입력하는 API",
    notes = "cpu_com = cpu 제조사\n" +
            "cpu_series = cpu 시리즈\n" +
            "cpu_gen = cpu 세대\n" +
            "gpu_com = gpu 제조사\n" +
            "gpu_name = gpu 모델명\n" +
            "ram = 램 크기\n" +
            "os = 운영체제 이름\n" +
            "user_id = 유저 고유번호",
    response = String.class)
    ResponseEntity<?> makeMySpecs(@RequestBody MyPcSpecsVO myPcSpecsVO){
        HttpVo http = mySpecsService.makeMySpecs(myPcSpecsVO);
        return new ResponseEntity<HttpVo>(http, HttpStatus.OK);
    }

    @PutMapping("/modify")
    @ApiOperation(value = "스펙사항을 수정하는 API",
            notes = "cpu_com = 변경된 cpu 제조사\n" +
                    "cpu_series = 변경된 cpu 시리즈\n" +
                    "cpu_gen = 변경된 cpu 세대\n" +
                    "gpu_com = 변경된 gpu 제조사\n" +
                    "gpu_name = 변경된 gpu 모델명\n" +
                    "ram = 변경된 램 크기\n" +
                    "os = 변경된 운영체제 이름\n" +
                    "spec_id = 스펙 고유번호",
            response = String.class)
    ResponseEntity<?> modifyMySpecs(@RequestBody MyPcSpecsVO myPcSpecsVO){
        HttpVo http = mySpecsService.updateMySpecs(myPcSpecsVO);
        return new ResponseEntity<HttpVo>(http, HttpStatus.OK);
    }

    @GetMapping("/my/{user_id}")
    @ApiOperation(value = "스펙사항 데이터 호출 APU",
    response = String.class)
    ResponseEntity<?> getMySpecs(@PathVariable Long user_id){
        HttpVo http = mySpecsService.getMySpecs(user_id);
        return new ResponseEntity<HttpVo>(http, HttpStatus.OK);
    }

}
