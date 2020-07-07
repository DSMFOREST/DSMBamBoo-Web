import React, { FC } from "react";

import { accessTime, eventAvailable, facebook, openInNew } from "assets";
import { NoticeItem } from "data/middleware/api/apiTypes";
import * as S from "./style";

interface OwnProps {
  noticeDetail: NoticeItem | null;
}

const DetailReportItem: FC<OwnProps> = ({ noticeDetail }) => {
  return (
    <S.DetailReportWrapper>
      <h1>
        #{noticeDetail?.id}번째_대마{" "}
        {noticeDetail?.categories.map((v) => `#${v} `)}
      </h1>
      <h2>{noticeDetail?.title}</h2>
      <article>
        <p>
          <img src={accessTime} alt="업로드 일자" />
          {noticeDetail?.recent_created_at} •{" "}
          <span>{noticeDetail?.created_at}</span>
        </p>
        <p>
          <img src={eventAvailable} alt="업로드 일자" />
          {noticeDetail?.approved_at}
        </p>
      </article>
      <section>
        <p>{noticeDetail?.content}</p>
        <div className="imageWrapper">
          {noticeDetail?.images.map((v) => (
            <img key={v} src={v} alt={v} />
          ))}
        </div>
      </section>
      <div>
        <a
          href={noticeDetail?.facebook_link}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={facebook} alt="페이스북 로고" className="facebook" />
          페이스북에서 열기
          <img src={openInNew} alt="바로가기" className="open" />
        </a>
      </div>
    </S.DetailReportWrapper>
  );
};

export default DetailReportItem;
