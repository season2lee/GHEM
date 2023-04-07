package com.ssafy.ghem.user.tool;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.List;
import java.util.Map;


@Component
public class SteamAPI {

    @Value("${steam.api.key}")
    private String API_KEY;
    private static final String STEAM_API_BASE_URL = "https://api.steampowered.com";

    public Map<String, Object> getPlayerSummaries(String steamId) {
        RestTemplate restTemplate = new RestTemplate();

        UriComponentsBuilder builder = UriComponentsBuilder
                .fromHttpUrl(STEAM_API_BASE_URL + "/ISteamUser/GetPlayerSummaries/v0002/")
                .queryParam("key", API_KEY)
                .queryParam("steamids", steamId);

        Map<String, Object> response = restTemplate.getForObject(builder.toUriString(), Map.class);


        Map<String, Object> playersWrapper = (Map<String, Object>) response.get("response");
        List<Map<String, Object>> players = (List<Map<String, Object>>) playersWrapper.get("players");

        if (!players.isEmpty()) {
            return players.get(0);
        }

        return null;
    }
}
