import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import * as S from "./style";
import { LoadingImg } from "assets";
import { useAuthRedux } from "container/auth";
import { useDraftRedux } from "container/draft";
import { responseStatus } from "data/reducers";
import DetailReportItem from "components/common/DetailReportItem";

const DraftDetail: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const {
    authStore: { access_token },
  } = useAuthRedux();
  const {
    draftStore: { getDraftDetailStatus, draftDetail },
    draftReducer: { getDraftDetail, resetStatus },
  } = useDraftRedux();

  useEffect(() => {
    const { _200 } = responseStatus(getDraftDetailStatus);

    if (_200) {
      setIsLoading(false);
    }

    resetStatus();
  }, [getDraftDetailStatus, resetStatus]);

  useEffect(() => {
    setIsLoading(true);
    if (access_token) {
      getDraftDetail({ accessToken: access_token, id });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, access_token]);

  return isLoading ? (
    <S.Loading>
      <img src={LoadingImg} alt="로딩.." />
    </S.Loading>
  ) : (
    <DetailReportItem itemDictionary="draft" noticeDetail={draftDetail} />
  );
};

export default DraftDetail;
