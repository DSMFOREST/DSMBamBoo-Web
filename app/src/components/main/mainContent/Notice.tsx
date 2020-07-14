import React, { FC, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

import { LoadingImg } from "assets";
import { useNoticeRedux } from "container/notice";
import { useAuthRedux } from "container/auth";
import * as S from "./style";
import Table from "components/common/Table";
// import Search from "components/common/Search";
import Pagination from "components/common/pagination";
import TitleWrapper from "./TitleWrapper";
import NoticeDetail from "./NoticeDetail";

const Notice: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { search } = useLocation();
  const { id } = useParams();
  const pageNum = Number(search.split("=")[1]) - 1;
  const {
    authStore: { access_token },
  } = useAuthRedux();
  const {
    noticeStore: { getNoticeStatus, noticeData },
    noticeReducer: { getNoticeList, resetStatus },
  } = useNoticeRedux();

  useEffect(() => {
    setIsLoading(true);
    if (access_token) {
      getNoticeList({
        accessToken: access_token,
        page: pageNum,
        size: 10,
        sort: "createdAt,desc",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [access_token, pageNum]);

  useEffect(() => {
    setIsLoading(false);
    resetStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getNoticeStatus]);

  return (
    <div>
      {!id && <TitleWrapper title="공지사항" />}
      {/* <Search /> */}
      {id && <NoticeDetail />}
      {isLoading ? (
        <S.Loading>
          <img src={LoadingImg} alt="로딩 중..." />
        </S.Loading>
      ) : (
        <Table
          data={noticeData?.content ?? []}
          isLogin={false}
          noticePath="/notice"
        />
      )}
      <Pagination
        lastPage={noticeData?.total_pages as number}
        isPostSave={!!noticeData?.content.length}
        noticePath="/notice"
      />
    </div>
  );
};

export default Notice;
