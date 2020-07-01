import React, { FC } from "react";

import { NoticeItem } from "data/middleware/api/apiTypes";
import * as S from "./style";

interface OwnProps {
  isLogin: boolean;
  data: NoticeItem[];
}

const Table: FC<OwnProps> = ({ isLogin, data }) => {
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
          {data.map((v) => (
            <tr key={v.id}>
              <td className="index">{`# ${v.id}번째 대나무숲`}</td>
              <td className="title">{v.title}</td>
              <td className="createdAt">{v.recent_approved_at}</td>
              {isLogin && (
                <td className="check">
                  <div>
                    <button>수락</button>
                    <button>거절</button>
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </S.TableWrapper>
  );
};

export default Table;
