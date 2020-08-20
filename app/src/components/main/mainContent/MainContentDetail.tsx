import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import * as S from "./style";
import { LoadingImg } from "assets";
import { useAuthRedux } from "container/auth";
import { useArticleRedux } from "container/article";
import { responseStatus } from "data/reducers";
import DetailReportItem from "components/common/DetailReportItem";

const ArticleDetail: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const {
    authStore: { access_token },
  } = useAuthRedux();
  const {
    articleStore: { getArticleDetailStatus, articleDetail },
    articleReducer: { getArticleDetail, resetStatus },
  } = useArticleRedux();

  useEffect(() => {
    const { _200 } = responseStatus(getArticleDetailStatus);

    if (_200) {
      setIsLoading(false);
    }

    resetStatus();
  }, [getArticleDetailStatus, resetStatus]);

  useEffect(() => {
    setIsLoading(true);
    if (access_token) {
      getArticleDetail({ accessToken: access_token, id });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, access_token]);

  return isLoading ? (
    <S.Loading>
      <img src={LoadingImg} alt="로딩.." />
    </S.Loading>
  ) : (
    <DetailReportItem itemDictionary="main" noticeDetail={articleDetail} />
  );
};

export default ArticleDetail;
