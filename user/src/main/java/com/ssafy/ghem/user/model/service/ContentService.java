package com.ssafy.ghem.user.model.service;

import com.ssafy.ghem.user.model.vo.ContentInfo;
import com.ssafy.ghem.user.model.vo.HttpVo;

public interface ContentService {
    HttpVo writeContent(ContentInfo contentInfo);
    HttpVo listContent(Long app_id);
    HttpVo updateContent(ContentInfo contentInfo);
}
