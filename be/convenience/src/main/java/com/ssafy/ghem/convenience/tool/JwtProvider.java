package com.ssafy.ghem.convenience.tool;

import java.time.Duration;
import java.util.Base64;
import java.util.Date;

import javax.annotation.PostConstruct;
import javax.xml.bind.DatatypeConverter;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class JwtProvider {
    private String secretKey = "com.ssafy.ghem.secretKey.leeleeSagongParkleekim";

    private long tokenValidTime = Duration.ofMinutes(2).toMillis();
    private long refreshTokenValidTime = Duration.ofDays(90).toMillis();

    @PostConstruct
    protected void init() {
        secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
    }

    public String createToken(Long userId) {
        Date now = new Date();

        Claims claims = Jwts.claims();
        claims.put("userId", userId);
        claims.put("expire", new Date((now.getTime() + tokenValidTime)));

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();
    }

    public String createRefreshToken(Long userId) {
        Date now = new Date();

        Claims claims = Jwts.claims();
        claims.put("userId", userId);
        claims.put("expire", new Date((now.getTime() + refreshTokenValidTime)));

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();
    }
    public String createExpireToken(Long userId) {
        Date now = new Date();

        Claims claims = Jwts.claims();
        claims.put("userId", userId);
        claims.put("expire", new Date((now.getTime())));

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();
    }

    public String createExpireRefreshToken(Long userId) {
        Date now = new Date();

        Claims claims = Jwts.claims();
        claims.put("userId", userId);
        claims.put("expire", new Date((now.getTime())));

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();
    }

    public String getUserId(String token) {
        return Jwts.parser().
                setSigningKey(secretKey).
                parseClaimsJws(token).
                getBody().
                get("userId").
                toString();
    }
    public String getUserNickname(String token) {
        return Jwts.parser().
                setSigningKey(secretKey).
                parseClaimsJws(token).
                getBody().
                get("nickname").
                toString();
    }
    public String getExp(String token) {
        try {
            return Jwts.parser().
                    setSigningKey(secretKey).
                    parseClaimsJws(token).
                    getBody().
                    get("expire").
                    toString();
        }catch (Exception e){
            return "jwt parse error";
        }
    }

    public boolean validateToken(String jwtToken) {
        try {
            Claims claims = Jwts.parser()
                    .setSigningKey(DatatypeConverter.parseBase64Binary(secretKey))
                    .parseClaimsJws(jwtToken)
                    .getBody();

            return !claims.getExpiration().before(new Date());
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("jwt 오류");
            return false;
        }
    }

}
