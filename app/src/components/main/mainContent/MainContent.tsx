import React, { FC, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

import { LoadingImg } from "assets";
import { useArticleRedux } from "container/article";
import { useAuthRedux } from "container/auth";
import * as S from "./style";
import Table from "components/common/Table";
// import Search from "components/common/Search";
import Pagination from "components/common/pagination";
import TitleWrapper from "./TitleWrapper";
import MainContentDetail from "./MainContentDetail";

const MainContent: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { search } = useLocation();
  const { id } = useParams();
  const pageNum = Number(search.split("=")[1]) - 1;
  const {
    authStore: { isAdmin, access_token },
  } = useAuthRedux();
  const {
    articleStore: { getArticleStatus, articleData },
    articleReducer: { getArticleList, resetStatus },
  } = useArticleRedux();

  useEffect(() => {
    setIsLoading(true);

    if (access_token) {
      getArticleList({
        accessToken: access_token,
        page: pageNum,
        size: 10,
        sort: "createdAt,desc",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNum, access_token]);

  useEffect(() => {
    setIsLoading(false);
    resetStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getArticleStatus]);

  return (
    <div>
      {!id && <TitleWrapper title="대나무숲 이야기" />}
      {/* <Search /> */}
      {id && <MainContentDetail />}
      {isLoading ? (
        <S.Loading>
          <img src={LoadingImg} alt="로딩 중..." />
        </S.Loading>
      ) : (
        <Table
          data={articleData?.content ?? []}
          isLogin={isAdmin}
          noticePath="/default"
        />
      )}
      <Pagination
        lastPage={articleData?.total_pages as number}
        isPostSave={!!articleData?.content.length}
        noticePath="/default"
      />
    </div>
  );
};

export default MainContent;
