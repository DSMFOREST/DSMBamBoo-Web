import React, { FC } from "react";

import * as S from "./style";

interface OwnProps {
  isLogin: boolean;
}

const Table: FC<OwnProps> = ({ isLogin }) => {
  return (
    <S.TableWrapper isLogin={isLogin}>
      <table>
        <thead>
          <tr>
            <td className="index">번호</td>
            <td className="title">제목</td>
            <td className="createdAt">등록일</td>
            {isLogin && <td className="check">승인</td>}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="index">공지</td>
            <td className="title">대나무숲 운영 지침</td>
            <td className="createdAt">2019-04.01 23:55:00</td>
            {isLogin && (
              <td className="check">
                <div>
                  <button>수락</button>
                  <button>거절</button>
                </div>
              </td>
            )}
          </tr>
        </tbody>
      </table>
    </S.TableWrapper>
  );
};

export default Table;
