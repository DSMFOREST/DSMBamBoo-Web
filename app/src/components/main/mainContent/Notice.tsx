import React, { FC, useCallback, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

import { LoadingImg } from "assets";
import { useNoticeRedux } from "container/notice";
import { useAuthRedux } from "container/auth";
import Table from "components/common/Table";
import Search from "components/common/Search";
import Pagination from "components/common/pagination";
import TitleWrapper from "./TitleWrapper";
import { responseStatus } from "data/reducers";

const Notice: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { search } = useLocation();
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
    const { _200 } = responseStatus(getNoticeStatus);

    setIsLoading(false);
    resetStatus();
  }, [getNoticeStatus, resetStatus]);

  return (
    <div>
      <TitleWrapper title="공지사항" />
      <Search />
      {isLoading ? (
        <img src={LoadingImg} alt="로딩 중..." />
      ) : (
        <Table data={noticeData?.content ?? []} isLogin={isAdmin} />
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
