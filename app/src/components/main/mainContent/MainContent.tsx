import React, { FC, useState, useCallback } from "react";

import * as S from "./style";
import Table from "components/common/Table";
import Search from "components/common/Search";
import Pagination from "components/common/pagination";
import TitleWrapper from "./TitleWrapper";

const MainContent: FC = () => {
  return (
    <div>
      <TitleWrapper title="대나무숲 이야기" />
      <Search />
      <Table isLogin={false} />
      <Pagination lastPage={33} isPostSave={true} noticePath="/" />
    </div>
  );
};

export default MainContent;
