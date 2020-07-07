import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import * as S from "./style";
import { LoadingImg } from "assets";
import { useAuthRedux } from "container/auth";
import { useNoticeRedux } from "container/notice";
import { responseStatus } from "data/reducers";
import DetailReportItem from "components/common/DetailReportItem";

const NoticeDetail: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const {
    authStore: { access_token },
  } = useAuthRedux();
  const {
    noticeStore: { getNoticeDetailStatus, noticeDetail },
    noticeReducer: { getNoticeDetail, resetStatus },
  } = useNoticeRedux();

  useEffect(() => {
    const { _200 } = responseStatus(getNoticeDetailStatus);

    if (_200) {
      setIsLoading(false);
    }

    resetStatus();
  }, [getNoticeDetailStatus, resetStatus]);

  useEffect(() => {
    setIsLoading(true);
    getNoticeDetail({ accessToken: access_token, id });
  }, [access_token, getNoticeDetail, id]);

  return isLoading ? (
    <S.Loading>
      <img src={LoadingImg} alt="로딩.." />
    </S.Loading>
  ) : (
    <DetailReportItem noticeDetail={noticeDetail} />
  );
};

export default NoticeDetail;
