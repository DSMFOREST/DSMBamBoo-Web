import React, { FC, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

import { LoadingImg } from "assets";
import { useNoticeRedux } from "container/notice";
import { useAuthRedux } from "container/auth";
import * as S from "./style";
import Table from "components/common/Table";
import Search from "components/common/Search";
import Pagination from "components/common/pagination";
import TitleWrapper from "./TitleWrapper";
import NoticeDetail from "./NoticeDetail";
// import { responseStatus } from "data/reducers";

const Notice: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { search } = useLocation();
  const { id } = useParams();
  const pageNum = Number(search.split("=")[1]) - 1;
  const {
    authStore: { isAdmin, access_token },
  } = useAuthRedux();
  const {
    noticeStore: { getNoticeStatus, noticeData },
    noticeReducer: { getNoticeList, resetStatus },
  } = useNoticeRedux();

  useEffect(() => {
    setIsLoading(true);
    getNoticeList({
      accessToken: access_token,
      page: pageNum,
      size: 10,
      sort: "createdAt,desc",
    });
  }, [access_token, getNoticeList, pageNum]);

  useEffect(() => {
    // const { _200 } = responseStatus(getNoticeStatus);

    setIsLoading(false);
    resetStatus();
  }, [getNoticeStatus, resetStatus]);

  return (
    <div>
      {!id && <TitleWrapper title="공지사항" />}
      <Search />
      {id && <NoticeDetail />}
      {isLoading ? (
        <S.Loading>
          <img src={LoadingImg} alt="로딩 중..." />
        </S.Loading>
      ) : (
        <Table
          data={noticeData?.content ?? []}
          isLogin={isAdmin}
          noticePath="/notice"
        />
      )}
      <Pagination
        lastPage={noticeData?.total_pages as number}
        isPostSave={true}
        noticePath="/notice"
      />
    </div>
  );
};

export default Notice;
