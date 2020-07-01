import React, { FC } from "react";

import { useAuthRedux } from "container/auth";
import Table from "components/common/Table";
import Search from "components/common/Search";
import Pagination from "components/common/pagination";
import TitleWrapper from "./TitleWrapper";

const MainContent: FC = () => {
  const {
    authStore: { isAdmin },
  } = useAuthRedux();

  return (
    <div>
      <TitleWrapper title="대나무숲 이야기" />
      <Search />
      <Table data={[]} isLogin={isAdmin} />
      <Pagination lastPage={33} isPostSave={true} noticePath="/" />
    </div>
  );
};

export default MainContent;
