import React, { FC, useCallback, useState, useEffect } from "react";
import { useLocation, useHistory, useParams } from "react-router-dom";

import { shuffle } from "assets";
import { responseStatus } from "data/reducers";
import { useDraftRedux } from "container/draft";
import { useAuthRedux } from "container/auth";
import { NoticeItem } from "data/middleware/api/apiTypes";
import { LoadingImg } from "assets";
import * as S from "./style";

interface OwnProps {
  isLogin: boolean;
  isDraft?: boolean;
  data: NoticeItem[];
  noticePath?: string;
}

const Table: FC<OwnProps> = ({ isLogin, isDraft, data, noticePath }) => {
  const {
    authStore: { access_token },
  } = useAuthRedux();
  const {
    draftStore: { approveDraftStatus, rejectDraftStatus, getDraftStatus },
    draftReducer: { approveDraft, rejectDraft, getDraftList, resetStatus },
  } = useDraftRedux();

  const [isLoading, setIsLoading] = useState(false);
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

  const preventDefault = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, action) => {
      e.stopPropagation();
      setIsLoading(true);
      action();
    },
    []
  );

  useEffect(() => {
    const { _200, _404 } = responseStatus(approveDraftStatus);

    if (_200) {
      getDraftList({
        accessToken: access_token,
        page: Number(pageNum) - 1,
        size: 10,
        sort: "createdAt,desc",
      });
    } else if (_404) {
      alert("다른 관리자가 이미 처리하였습니다.");
      setIsLoading(false);
    }

    resetStatus();
  }, [access_token, approveDraftStatus, getDraftList, pageNum, resetStatus]);

  useEffect(() => {
    const { _200, _404 } = responseStatus(rejectDraftStatus);

    if (_200) {
      getDraftList({
        accessToken: access_token,
        page: Number(pageNum) - 1,
        size: 10,
        sort: "createdAt,desc",
      });
    } else if (_404) {
      alert("다른 관리자가 이미 처리하였습니다.");
      setIsLoading(false);
    }

    resetStatus();
  }, [access_token, getDraftList, pageNum, rejectDraftStatus, resetStatus]);

  useEffect(() => {
    const { _200 } = responseStatus(getDraftStatus);

    if (_200) {
      setIsLoading(false);
    }

    resetStatus();
  }, [getDraftStatus, resetStatus]);

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
          {data.length === 0 ? (
            <S.EmptyTr>
              <td colSpan={4}>데이터가 존재하지 않습니다.</td>
            </S.EmptyTr>
          ) : (
            data.map((v) => (
              <S.Tr
                isLogin={isDraftPage}
                isActive={v.id === Number(id)}
                onClick={() => goToDetailed(v.id)}
                key={v.id}
              >
                <td className="index">
                  {isDraft ? `😉 ${v.id}번째 게시글` : `# ${v.id}번째_대마`}
                </td>
                <td className="title">{v.title}</td>
                <td className="createdAt">{v.recent_created_at}</td>
                {isDraftPage && (
                  <td className="check">
                    {isLoading ? (
                      <S.Loading>
                        <img src={LoadingImg} alt="로딩.." />
                      </S.Loading>
                    ) : (
                      <div>
                        <button
                          onClick={(e) =>
                            preventDefault(e, () =>
                              approveDraft({
                                accessToken: access_token,
                                draftId: v.id,
                              })
                            )
                          }
                        >
                          수락
                        </button>
                        <button
                          onClick={(e) =>
                            preventDefault(e, () =>
                              rejectDraft({
                                accessToken: access_token,
                                draftId: v.id,
                              })
                            )
                          }
                        >
                          거절
                        </button>
                      </div>
                    )}
                  </td>
                )}
              </S.Tr>
            ))
          )}
        </tbody>
      </table>
    </S.TableWrapper>
  );
};

export default Table;
