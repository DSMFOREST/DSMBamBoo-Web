import React, { FC } from "react";
import * as S from "./style";

const Search: FC = () => {
  return (
    <S.SearchWrapper>
      <div>
        <S.Category>
          <button>
            카테고리
            <i />
          </button>
        </S.Category>
        <S.InputBox>
          <input type="text" placeholder="검색어를 입력하세요" />
        </S.InputBox>
      </div>
    </S.SearchWrapper>
  );
};

export default Search;
