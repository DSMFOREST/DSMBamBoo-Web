import React, { FC, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

import { LoadingImg } from "assets";
import { useDraftRedux } from "container/draft";
import { useAuthRedux } from "container/auth";
import * as S from "./style";
import Table from "components/common/Table";
import Search from "components/common/Search";
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

  useEffect(() => {
    setIsLoading(true);

    if (access_token) {
      getDraftList({
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
  }, [getDraftStatus]);

  return (
    <div>
      {!id && <TitleWrapper title="대나무숲 이야기 (초안)" />}
      <Search />
      {id && <DraftDetail />}
      {isLoading ? (
        <S.Loading>
          <img src={LoadingImg} alt="로딩 중..." />
        </S.Loading>
      ) : (
        <Table
          data={draftData?.content ?? []}
          isLogin={isAdmin}
          isDraft={true}
          noticePath="/draft"
        />
      )}
      <Pagination
        lastPage={draftData?.total_pages as number}
        isPostSave={true}
        noticePath="/draft"
      />
    </div>
  );
};

export default Draft;
