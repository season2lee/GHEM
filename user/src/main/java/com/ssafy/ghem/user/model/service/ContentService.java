package com.ssafy.ghem.user.model.service;

import com.ssafy.ghem.user.model.vo.ContentVO;
import com.ssafy.ghem.user.model.vo.HttpVo;

public interface ContentService {
    HttpVo writeContent(ContentVO contentInfo);
    HttpVo listContent(Long app_id);
    HttpVo updateContent(ContentVO contentInfo);
}
