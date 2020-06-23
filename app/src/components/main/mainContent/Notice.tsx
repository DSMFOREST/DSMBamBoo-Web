import React, { FC } from "react";

import Table from "components/common/Table";
import Search from "components/common/Search";
import Pagination from "components/common/pagination";
import TitleWrapper from "./TitleWrapper";

const Notice: FC = () => {
  return (
    <div>
      <TitleWrapper title="공지사항" />
      <Search />
      <Table isLogin={false} />
      <Pagination lastPage={33} isPostSave={true} noticePath="/notice" />
    </div>
  );
};

export default Notice;
