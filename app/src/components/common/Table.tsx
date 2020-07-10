import React, { FC, useCallback } from "react";
import { useLocation, useHistory, useParams } from "react-router-dom";

import { shuffle } from "assets";
import { NoticeItem } from "data/middleware/api/apiTypes";
import * as S from "./style";

interface OwnProps {
  isLogin: boolean;
  isDraft?: boolean;
  data: NoticeItem[];
  noticePath?: string;
}

const Table: FC<OwnProps> = ({ isLogin, isDraft, data, noticePath }) => {
  const { push } = useHistory();
  const { search } = useLocation();
  const { id, type } = useParams();
  const pageNum = search.split("=")[1];
  const isDraftPage = (isDraft && isLogin) || false;

  const goToDetailed = useCallback(
    (id: number) => {
      push(`${noticePath}/${id}?page=${pageNum}`);
    },
    [pageNum, noticePath, push]
  );

  const goToDraftsHandle = useCallback(() => {
    if (type === "draft") {
      push("/default?page=1");
    } else {
      push("/draft?page=1");
    }
  }, [push, type]);

  return (
    <S.TableWrapper isLogin={isDraftPage}>
      {isLogin && (
        <button onClick={goToDraftsHandle} className="shuffle">
          <img src={shuffle} alt="초안보기" />
          <div className="description">
            <p>{type === "draft" ? "대숲보기" : "초안보기"}</p>
          </div>
        </button>
      )}
      <table>
        <thead>
          <tr>
            <td className="index">번호</td>
            <td className="title">제목</td>
            <td className="createdAt">등록일</td>
            {isDraftPage && <td className="check">승인</td>}
          </tr>
        </thead>
        <tbody>
          {data.map((v) => (
            <S.Tr
              isLogin={isDraftPage}
              isActive={v.id === Number(id)}
              onClick={() => goToDetailed(v.id)}
              key={v.id}
            >
              <td className="index">
                {isDraft ? `😉 ${v.id}번째 개시글` : `# ${v.id}번째_대마`}
              </td>
              <td className="title">{v.title}</td>
              <td className="createdAt">{v.recent_created_at}</td>
              {isDraftPage && (
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
