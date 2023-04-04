//import com.ssafy.ghem.user.model.entity.User;
//import com.ssafy.ghem.user.model.respository.common.UserCommonRepository;
//import lombok.RequiredArgsConstructor;
//import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
//import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
//import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
//import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
//import org.springframework.security.oauth2.core.user.OAuth2User;
//import org.springframework.stereotype.Service;
//
//import java.util.Map;
//
//@Service
//@RequiredArgsConstructor
//public class CustomOAuth2UserService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {
//
//    private final UserCommonRepository userCommonRepository;
//
//    @Override
//    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
//        OAuth2UserService<OAuth2UserRequest, OAuth2User> delegate = new DefaultOAuth2UserService();
//        OAuth2User oauth2User = delegate.loadUser(userRequest);
//
//        Map<String, Object> attributes = oauth2User.getAttributes();
//
//        for (Map.Entry<String, Object> entry : attributes.entrySet()) {
//            System.out.println("Key: " + entry.getKey() + ", Value: " + entry.getValue());
//        }
//
//        return oauth2User;
//        // 사용자 정보를 가져오고 필요한 경우 사용자를 저장하거나 업데이트합니다.
//        //User user = saveOrUpdateUser(oauth2User);
//
//        // 사용자 정보를 가진 커스텀 OAuth2User 객체를 반환합니다.
//        //return new CustomOAuth2User(user, oauth2User.getAttributes());
//    }
//
////    private User saveOrUpdateUser(OAuth2User oauth2User) {
////        // Steam에서 제공하는 사용자 정보를 사용하여 데이터베이스에 사용자를 저장하거나 업데이트하는 로직을 구현합니다.
////        // 예를 들어, 사용자의 고유 ID를 기준으로 데이터베이스에서 사용자를 찾고, 없으면 새 사용자를 생성합니다.
////    }
//}