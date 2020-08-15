import React, { FC, useState, useCallback, useEffect } from "react";

import { LoadingImg } from "assets";
import { useCommunityRedux } from "container/community";
import { useSubmitRedux } from "container/submit";
import { useModalRedux } from "container/modal";
import { useAuthRedux } from "container/auth";
import { responseStatus } from "data/reducers/index";
import * as S from "./style";

interface OwnProps {
  title: string;
  content: string;
  categories: number[];
  images: File[] | null;
}

const SubmitButton: FC<OwnProps> = ({ title, content, categories, images }) => {
  const {
    submitStore: {
      imagesUploadStatus,
      postNoticeStatus,
      postDraftStatus,
      exchangeImageData,
    },
    submitReducer: { imagesUpload, postNotice, postDraft, resetStatus },
  } = useSubmitRedux();
  const {
    modalReducer: { handleReportModal },
  } = useModalRedux();
  const {
    communityStore: { document_key },
  } = useCommunityRedux();
  const {
    authStore: { access_token },
  } = useAuthRedux();

  const [newImages, setNewImages] = useState<number[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const submit = useCallback(() => {
    const checker = [];
    // eslint-disable-next-line no-restricted-globals
    if (confirm("제보하시겠습니까?")) {
      if (!title.trim()) {
        checker.push("제목");
      }

      if (!content.trim()) {
        checker.push("내용");
      }

      if (categories.length === 0) {
        checker.push("카테고리 1개 이상");
      }

      if (checker.length !== 0) {
        alert(`정보를 입력하여주십시오. (${checker.join(", ")})`);
        return;
      }

      setIsLoading(true);
      imagesUpload({ images: images ?? [], accessToken: access_token });
    }
  }, [access_token, images, imagesUpload, title, content, categories]);

  useEffect(() => {
    if (newImages !== null) {
      if (categories.includes(1)) {
        postNotice({
          accessToken: access_token,
          title,
          content,
          categories,
          images: newImages,
        });
      } else {
        postDraft({
          accessToken: access_token,
          title,
          content,
          categories,
          document_key,
          images: newImages,
        });
      }
    }
  }, [
    access_token,
    categories,
    content,
    newImages,
    title,
    document_key,
    postNotice,
    postDraft,
  ]);

  useEffect(() => {
    const { _200, _400, _413 } = responseStatus(imagesUploadStatus);

    if (_200) {
      setNewImages(exchangeImageData?.images.map((v) => v.id) || []);
    } else if (_400) {
      alert(
        "잘못된 인자를 감지하였습니다. 이미지 타입, 빈 칸등을 확인하십시오."
      );
      setIsLoading(false);
    } else if (_413) {
      alert("파일 업로드 용량의 한도를 초과하였습니다.");
      setIsLoading(false);
    }

    resetStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imagesUploadStatus]);

  useEffect(() => {
    const { _201, _400, _403, _413 } = responseStatus(postNoticeStatus);

    if (_201) {
      alert("공지사항 등록이 완료되었습니다.");
      handleReportModal();
      setIsLoading(false);
    } else if (_400) {
      alert("잘못된 인자를 감지하였습니다. 빈 내용이 없는지 확인하십시오.");
      setIsLoading(false);
    } else if (_403) {
      alert("공지사항 권한이 없습니다.");
      setIsLoading(false);
    } else if (_413) {
      alert("파일 업로드 용량의 한도를 초과하였습니다.");
      setIsLoading(false);
    }

    resetStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postNoticeStatus]);

  useEffect(() => {
    const { _201, _400, _403, _413 } = responseStatus(postDraftStatus);

    if (_201) {
      alert("게시글 검토 요청이 완료되었습니다.");
      handleReportModal();
      setIsLoading(false);
    } else if (_400) {
      alert("잘못된 인자를 감지하였습니다. 빈 내용이 없는지 확인하십시오.");
      setIsLoading(false);
    } else if (_403) {
      alert(
        "document_key가 유효하지 않습니다. 다시 모달을 닫고 다시 열어주시기 바랍니다."
      );
      setIsLoading(false);
    } else if (_413) {
      alert("파일 업로드 용량의 한도를 초과하였습니다.");
      setIsLoading(false);
    }

    resetStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postDraftStatus]);

  return (
    <S.SubmitButton onClick={isLoading ? () => null : submit}>
      {isLoading ? <img src={LoadingImg} alt="로딩..." /> : "제보하기"}
    </S.SubmitButton>
  );
};

export default SubmitButton;
