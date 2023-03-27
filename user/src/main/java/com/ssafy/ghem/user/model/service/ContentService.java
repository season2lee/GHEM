package com.ssafy.ghem.user.model.service;

import com.ssafy.ghem.user.model.vo.ContentVO;
import com.ssafy.ghem.user.model.vo.HttpVo;
import org.springframework.data.domain.Pageable;

public interface ContentService {
    HttpVo writeContent(ContentVO contentInfo);
    HttpVo listContent(Long app_id, Pageable pageable);
    HttpVo updateContent(ContentVO contentInfo);
}
