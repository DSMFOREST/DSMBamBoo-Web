import React, { FC, useCallback } from "react";
import { useLocation, useHistory, useParams } from "react-router-dom";

import { NoticeItem } from "data/middleware/api/apiTypes";
import * as S from "./style";

interface OwnProps {
  isLogin: boolean;
  data: NoticeItem[];
  noticePath?: string;
}

const Table: FC<OwnProps> = ({ isLogin, data, noticePath }) => {
  const { push } = useHistory();
  const { search } = useLocation();
  const { id } = useParams();
  const pageNum = search.split("=")[1];

  const goToDetailed = useCallback(
    (id: number) => {
      push(`${noticePath}/${id}?page=${pageNum}`);
    },
    [pageNum, noticePath, push]
  );

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
            <S.Tr
              isLogin={isLogin}
              isActive={v.id === Number(id)}
              onClick={() => goToDetailed(v.id)}
              key={v.id}
            >
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
            </S.Tr>
          ))}
        </tbody>
      </table>
    </S.TableWrapper>
  );
};

export default Table;
