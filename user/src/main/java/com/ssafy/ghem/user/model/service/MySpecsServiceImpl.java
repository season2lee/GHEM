package com.ssafy.ghem.user.model.service;

import com.ssafy.ghem.user.controller.exception.DoesNotExistData;
import com.ssafy.ghem.user.model.entity.*;
import com.ssafy.ghem.user.model.respository.common.CpuCommonRepository;
import com.ssafy.ghem.user.model.respository.common.GameCommonRepository;
import com.ssafy.ghem.user.model.respository.common.GpuCommonRepository;
import com.ssafy.ghem.user.model.respository.common.UserCommonRepository;
import com.ssafy.ghem.user.model.respository.individual.MySpecsIndividualRepository;
import com.ssafy.ghem.user.model.vo.HttpVo;
import com.ssafy.ghem.user.model.vo.MyPcSpecsVO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.rmi.AlreadyBoundException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Slf4j
@RequiredArgsConstructor
public class MySpecsServiceImpl implements MySpecsService{

    private final UserCommonRepository userCommonRepository;
    private final GameCommonRepository gameCommonRepository;
    private final MySpecsIndividualRepository mySpecsIndividualRepository;
    private final CpuCommonRepository cpuCommonRepository;
    private final GpuCommonRepository gpuCommonRepository;

    @Override
    public HttpVo makeMySpecs(MyPcSpecsVO myPcSpecsVO) {
        HttpVo http = new HttpVo();
        Map<String, Object> map = new HashMap<>();

        User user = getUser(myPcSpecsVO.getUser_id());
        MyPcSpecs myPcSpecsExit = mySpecsIndividualRepository.getMyPcSpecsByUserId(user.getUser_id());

        try {
            if(myPcSpecsExit == null) throw new AlreadyBoundException("해당 데이터는 이미 존재합니다");
        } catch (AlreadyBoundException a){
            a.printStackTrace();
        }

        MyPcSpecs myPcSpecs = MyPcSpecs.builder()
                .cpu_com(myPcSpecsVO.getCpu_com())
                .cpu_series(myPcSpecsVO.getCpu_series())
                .gpu_com(myPcSpecsVO.getGpu_com())
                .gpu_name(myPcSpecsVO.getGpu_name())
                .ram(myPcSpecsVO.getRam())
                .os(myPcSpecsVO.getOs())
                .user_id(myPcSpecsVO.getUser_id())
                .build();

        mySpecsIndividualRepository.save(myPcSpecs);

        http.setFlag(true);
        return http;
    }

    @Override
    @Transactional
    public HttpVo updateMySpecs(MyPcSpecsVO myPcSpecsVO) {
        HttpVo http = new HttpVo();

        MyPcSpecs myPcSpecs = mySpecsIndividualRepository.findById(myPcSpecsVO.getSpec_id())
                        .orElseThrow(() -> new DoesNotExistData("해당하는 유저 컴퓨터 사양 데이터가 없습니다."));

        myPcSpecs.setCpu_com(myPcSpecsVO.getCpu_com());
        myPcSpecs.setCpu_series(myPcSpecsVO.getCpu_series());
        myPcSpecs.setGpu_com(myPcSpecsVO.getGpu_com());
        myPcSpecs.setGpu_name(myPcSpecsVO.getGpu_name());
        myPcSpecs.setRam(myPcSpecsVO.getRam());
        myPcSpecs.setOs(myPcSpecsVO.getOs());

        mySpecsIndividualRepository.save(myPcSpecs);

        http.setFlag(true);
        return http;
    }

    @Override
    public HttpVo getMySpecs(Long user_id) {
        HttpVo http = new HttpVo();
        Map<String, Object> map = new HashMap<>();

        MyPcSpecs myPcSpecs = mySpecsIndividualRepository.getMyPcSpecsByUserId(user_id);
        map.put("MyPcSpecs", myPcSpecs);

        http.setFlag(true);
        http.setData(map);
        return http;
    }

    @Override
    public HttpVo getCpuBrand() {
        HttpVo http = new HttpVo();
        Map<String, Object> map = new HashMap<>();

        List<String> list = cpuCommonRepository.getAllDistnct();
        map.put("cpu_brand_list", list);

        http.setFlag(true);
        http.setData(map);
        return http;
    }

    @Override
    public HttpVo getCpuModel(String brand, String input) {
        HttpVo http = new HttpVo();
        Map<String, Object> map = new HashMap<>();

        List<String> list = cpuCommonRepository.getCpuByBrand(brand, input);
        map.put("cpu_brand_list", list);

        http.setFlag(true);
        http.setData(map);
        return http;
    }

    @Override
    public HttpVo getGpuBrand() {
        HttpVo http = new HttpVo();
        Map<String, Object> map = new HashMap<>();

        List<String> list = gpuCommonRepository.getAllDistnct();
        map.put("gpu_brand_list", list);

        http.setFlag(true);
        http.setData(map);
        return http;
    }

    @Override
    public HttpVo getGpuModel(String brand, String input) {
        HttpVo http = new HttpVo();
        Map<String, Object> map = new HashMap<>();

        List<String> list = gpuCommonRepository.getGpuByBrand(brand, input);
        map.put("gpu_brand_list", list);

        http.setFlag(true);
        http.setData(map);
        return http;
    }

    @Override
    public HttpVo getCompareCpu(String my_model, String game_model) {
        HttpVo http = new HttpVo();
        Map<String, Object> map = new HashMap<>();

        Cpu myCpu = cpuCommonRepository.getCpuByModel(my_model);
        if(myCpu == null) throw new DoesNotExistData("해당하는 유저의 CPU Model이 존재하지 않습니다. my_model: "+my_model);
        Cpu GameCpu = cpuCommonRepository.getCpuByModel(game_model);
        if(GameCpu == null) throw new DoesNotExistData("해당하는 게임의 CPU Model이 존재하지 않습니다. game_model: "+game_model);

        if(myCpu.getRanking() <= GameCpu.getRanking()){
            map.put("suitable", true);
        } else{
            map.put("suitable", false);
        }

        http.setFlag(true);
        http.setData(map);
        return http;
    }

    @Override
    public HttpVo getCompareGpu(String my_model, String game_model) {
        HttpVo http = new HttpVo();
        Map<String, Object> map = new HashMap<>();

//        log.info("my_model: {}, game_model: {}", my_model, game_model);

        Gpu myGpu = gpuCommonRepository.getGpuByModel(my_model);
        if(myGpu == null) throw new DoesNotExistData("해당하는 유저의 GPU Model이 존재하지 않습니다. my_model: "+my_model);
        Gpu GameGpu = gpuCommonRepository.getGpuByModel(game_model);
        if(GameGpu == null) throw new DoesNotExistData("해당하는 게임의 GPU Model이 존재하지 않습니다. game_model: "+game_model);

        if(myGpu.getRanking() <= GameGpu.getRanking()){
            map.put("suitable", true);
        } else{
            map.put("suitable", false);
        }

        http.setFlag(true);
        http.setData(map);
        return http;
    }

    @Transactional
    public User getUser(Long user_id){
        User user = userCommonRepository.findById(user_id)
                .orElseThrow(() -> new DoesNotExistData("해당하는 유저가 없습니다."));

        return user;
    }

    @Transactional
    public Game getGame(Long app_id){
        Game game = gameCommonRepository.findById(app_id)
                .orElseThrow(() -> new DoesNotExistData("해당하는 유저가 없습니다."));

        return game;
    }
}
