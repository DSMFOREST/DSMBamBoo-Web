import React, { FC, useState, useCallback, useEffect } from "react";

import { LoadingImg } from "assets";
import { useSubmitRedux } from "container/submit";
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
    submitStore: { imagesUploadStatus, postNoticeStatus, exchangeImageData },
    submitReducer: { imagesUpload, postNotice, resetStatus },
  } = useSubmitRedux();
  const {
    authStore: { access_token },
  } = useAuthRedux();

  const [newImages, setNewImages] = useState<number[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const submit = useCallback(() => {
    const checker = [];
    // eslint-disable-next-line no-restricted-globals
    if (confirm("제보하시겠습니까?")) {
      if (!title) {
        checker.push("제목");
      }

      if (!content) {
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
        // 대나무숲 글 작성 API
      }
    }
  }, [access_token, categories, content, newImages, postNotice, title]);

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

  return (
    <S.SubmitButton onClick={isLoading ? () => null : submit}>
      {isLoading ? <img src={LoadingImg} alt="로딩..." /> : "제보하기"}
    </S.SubmitButton>
  );
};

export default SubmitButton;
