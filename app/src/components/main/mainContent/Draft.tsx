/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect, useCallback, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

import { LoadingImg } from "assets";
import { useDraftRedux } from "container/draft";
import { useAuthRedux } from "container/auth";
import * as S from "./style";
import Table from "components/common/Table";
import Pagination from "components/common/pagination";
import TitleWrapper from "./TitleWrapper";
import DraftDetail from "./DraftDetail";

const Draft: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { search } = useLocation();
  const { id } = useParams();
  const pageNum = Number(search.split("=")[1]) - 1;
  const {
    authStore: { isAdmin, access_token },
  } = useAuthRedux();
  const {
    draftStore: { getDraftStatus, draftData },
    draftReducer: { getDraftList, resetStatus },
  } = useDraftRedux();

  const refreshData = useCallback(() => {
    setIsLoading(true);

    if (access_token) {
      getDraftList({
        accessToken: access_token,
        page: pageNum,
        size: 10,
        sort: "createdAt,desc",
      });
    }
  }, [pageNum, access_token]);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  useEffect(() => {
    setIsLoading(false);
    resetStatus();
  }, [getDraftStatus]);

  return (
    <div>
      {!id && <TitleWrapper title="대나무숲 이야기 (초안)" />}
      {/* <Search /> */}
      {id && <DraftDetail />}
      {isLoading ? (
        <S.Loading>
          <img src={LoadingImg} alt="로딩 중..." />
        </S.Loading>
      ) : (
        <Table
          refreshData={refreshData}
          data={draftData?.content ?? []}
          isLogin={isAdmin}
          itemDictionary="draft"
          noticePath="/draft"
        />
      )}
      <Pagination
        lastPage={draftData?.total_pages as number}
        isPostSave={!!draftData?.content.length}
        noticePath="/draft"
      />
    </div>
  );
};

export default Draft;
