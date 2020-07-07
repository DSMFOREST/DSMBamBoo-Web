import React, { FC, useState, useCallback, useEffect } from "react";

import SubmitButton from "./SubmitButton";
import { CategoryItem } from "data/middleware/api/apiTypes";
import { useSearchRedux } from "container/search";
import { useAuthRedux } from "container/auth";
import { fileSizeSum } from "utils/math";
import { fileSizeToMb } from "utils/convert";
import { ImageSave } from "assets";
import * as S from "./style";

const ReportContent: FC = () => {
  const {
    authStore: { isAdmin },
  } = useAuthRedux();
  const {
    searchStore: { categoryData },
  } = useSearchRedux();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categories, setCategories] = useState<number[]>([]);
  const [imagesSize, setImagesSize] = useState("용량표기");
  const [images, setImages] = useState<File[] | null>(null);

  const titleHandler = useCallback(
    ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
      setTitle(value);
    },
    []
  );
  const contentHandler = useCallback(
    ({ target: { value } }: React.ChangeEvent<HTMLTextAreaElement>) => {
      setContent(value);
    },
    []
  );
  const categorysHandler = useCallback(
    (
      { target: { checked } }: React.ChangeEvent<HTMLInputElement>,
      id: number
    ) => {
      if (checked) {
        setCategories([...categories, id]);
      } else {
        setCategories(categories.filter((v) => v !== id));
      }
    },
    [categories]
  );
  const fileHandler = useCallback(
    ({ target: { files } }: React.ChangeEvent<HTMLInputElement>) => {
      const filesToArray = Array.from((files as FileList) || []);
      const imagesToArray = images || [];
      const imagesSize = fileSizeSum(imagesToArray);
      const size = imagesSize + fileSizeSum(filesToArray);

      if (size > 10000000) {
        alert(
          "⚠️ 이미지 용량은 총 10MB를 넘을 수 없습니다. (JPEG, PNG, GIF 형식 지원)"
        );
        return;
      }

      setImages([...imagesToArray, ...filesToArray]);
    },
    [images]
  );

  const removeFile = useCallback(
    (name: string) => {
      setImages(images?.filter((v) => v.name !== name) || []);
    },
    [images]
  );

  useEffect(() => {
    const imagesToArray = images || [];
    const imagesSize = fileSizeSum(imagesToArray);

    setImagesSize(fileSizeToMb(imagesSize));
  }, [images]);

  return (
    <S.ReportContent>
      <table>
        <thead>
          <tr className="title">
            <td className="contentHeader">제목</td>
            <td>
              <S.TitleLabel>
                <input
                  value={title}
                  onChange={titleHandler}
                  placeholder="제목을 입력하여주십시오."
                  type="text"
                />
              </S.TitleLabel>
            </td>
          </tr>
          <tr className="category">
            <td className="contentHeader">카테고리</td>
            <td>
              <S.CategoryChecked>
                {categoryData?.map((v: CategoryItem) =>
                  !isAdmin && v.name === "공지사항" ? null : (
                    <label
                      key={v.id.toString()}
                      htmlFor={`category-${v.name}_${v.id}`}
                    >
                      <input
                        onChange={(event) => categorysHandler(event, v.id)}
                        id={`category-${v.name}_${v.id}`}
                        type="checkbox"
                      />
                      {v.name}
                    </label>
                  )
                )}
              </S.CategoryChecked>
            </td>
          </tr>
          <tr className="image">
            <td className="contentHeader">이미지 첨부</td>
            <td>
              <S.ImageSave>
                <p>
                  <span role="img" aria-label="warning">
                    ⚠️
                  </span>
                  이미지 용량은 총 10MB를 넘을 수 없습니다. (JPEG, PNG, GIF 형식
                  지원) [{imagesSize}]
                </p>
                <div>
                  {images?.map((v, i) => (
                    <S.LocalImageButton
                      key={`${v.name}_${i}`}
                      onClick={() => removeFile(v.name)}
                    >
                      <img src={URL.createObjectURL(v)} alt="이미지" />
                    </S.LocalImageButton>
                  ))}
                  <label>
                    <img src={ImageSave} alt="이미지추가.." />
                    <input
                      type="file"
                      multiple={true}
                      accept="image/x-png,image/jpg,image/jpeg,image/jpeg2000,image/gif"
                      onChange={fileHandler}
                    />
                  </label>
                </div>
              </S.ImageSave>
            </td>
          </tr>
        </thead>
        <tbody>
          <tr className="contents">
            <td colSpan={2}>
              <S.ContentInput>
                <textarea
                  value={content}
                  onChange={contentHandler}
                  placeholder="내용을 입력하여주십시오."
                />
              </S.ContentInput>
            </td>
          </tr>
        </tbody>
      </table>
      <SubmitButton
        title={title}
        content={content}
        categories={categories}
        images={images}
      />
    </S.ReportContent>
  );
};

export default ReportContent;
