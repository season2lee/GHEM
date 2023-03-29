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

    @GetMapping("/cpu/brand")
    @ApiOperation(value = "cpu brand 데이터 호출 API",
    response = String.class)
    ResponseEntity<?> getCpuBrand(){
        HttpVo http = mySpecsService.getCpuBrand();
        return new ResponseEntity<HttpVo>(http, HttpStatus.OK);
    }

    @GetMapping("/cpu/{brand}/{input}")
    @ApiOperation(value = "cpu 모델데이터 호출 API",
            notes = "brand = cpu 브랜드 명\n" +
                    "input = 검색하고자 하는 모델명",
            response = String.class)
    ResponseEntity<?> getCpuModel(@PathVariable String brand, @PathVariable String input){
        HttpVo http = mySpecsService.getCpuModel(brand, input);
        return new ResponseEntity<HttpVo>(http, HttpStatus.OK);
    }

    @GetMapping("/gpu/brand")
    @ApiOperation(value = "gpu brand 데이터 호출 API",
            response = String.class)
    ResponseEntity<?> getGpuBrand(){
        HttpVo http = mySpecsService.getGpuBrand();
        return new ResponseEntity<HttpVo>(http, HttpStatus.OK);
    }

    @GetMapping("/gpu/{brand}/{input}")
    @ApiOperation(value = "cpu 모델데이터 호출 API",
            notes = "brand = gpu 브랜드 명\n"+
            "input = 검색하고자 하는 모델명",
            response = String.class)
    ResponseEntity<?> getGpuModel(@PathVariable String brand, @PathVariable String input){
        HttpVo http = mySpecsService.getGpuModel(brand, input);
        return new ResponseEntity<HttpVo>(http, HttpStatus.OK);
    }

    @GetMapping("/cpu/compare/{my_model}/{game_model}")
    @ApiOperation(value = "cpu 적합여부 확인 API",
            notes = "my_model = 내가 적은 cpu 모델 이름\n" +
                    "game_model = 내가 적은 cpu 모델 이름",
            response = String.class)
    ResponseEntity<?> getCompareCpu(@PathVariable String my_model, @PathVariable String game_model){
        HttpVo http = mySpecsService.getCompareCpu(my_model, game_model);
        return new ResponseEntity<HttpVo>(http, HttpStatus.OK);
    }
    @GetMapping("/gpu/compare/{my_model}/{game_model}")
    @ApiOperation(value = "gpu 적합여부 확인 API",
            notes = "my_model = 내가 적은 gpu 모델 이름\n" +
                    "game_model = 내가 적은 gpu 모델 이름",
            response = String.class)
    ResponseEntity<?> getCompareGpu(@PathVariable String my_model, @PathVariable String game_model){
        HttpVo http = mySpecsService.getCompareGpu(my_model, game_model);
        return new ResponseEntity<HttpVo>(http, HttpStatus.OK);
    }

}
