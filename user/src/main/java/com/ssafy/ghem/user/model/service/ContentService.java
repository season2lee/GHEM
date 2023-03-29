package com.ssafy.ghem.user.model.service;

import com.ssafy.ghem.user.model.vo.ContentVO;
import com.ssafy.ghem.user.model.vo.HttpVO;
import org.springframework.data.domain.Pageable;

public interface ContentService {
    HttpVO writeContent(ContentVO contentInfo);
    HttpVO listContent(Long app_id, Pageable pageable);
    HttpVO updateContent(ContentVO contentInfo);
    HttpVO checkContent(Long app_id, Long user_id);
}
