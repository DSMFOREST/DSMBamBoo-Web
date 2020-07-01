import React, { FC, useState, useCallback } from "react";
import * as S from "./style";

interface SearchType {
  type: "default" | "category" | "search";
  naming: "태그 선택" | "카테고리" | "검색어";
}

const Search: FC = () => {
  const [isDropDown, setIsDropDown] = useState(false);
  const [searchType, setSearchType] = useState<SearchType>({
    type: "default",
    naming: "태그 선택",
  });

  const handleDropDown = useCallback(() => {
    setIsDropDown(!isDropDown);
  }, [isDropDown]);

  const choiceSearchType = useCallback((search: SearchType) => {
    setSearchType(search);
    setIsDropDown(false);
  }, []);

  return (
    <S.SearchWrapper>
      <div>
        <S.Category isDropDown={isDropDown}>
          <button onClick={handleDropDown}>
            {searchType.naming}
            <S.UpDownIcon isUp={isDropDown} />
          </button>
          {isDropDown && (
            <>
              <hr />
              <button
                onClick={() =>
                  choiceSearchType({ type: "search", naming: "검색어" })
                }
              >
                검색어
              </button>
              <button
                onClick={() =>
                  choiceSearchType({ type: "category", naming: "카테고리" })
                }
              >
                카테고리
              </button>
            </>
          )}
        </S.Category>
        <S.InputBox>
          <input type="text" placeholder="검색어를 입력하세요" />
        </S.InputBox>
      </div>
    </S.SearchWrapper>
  );
};

export default Search;
