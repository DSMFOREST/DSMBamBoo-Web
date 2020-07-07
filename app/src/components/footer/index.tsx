import React, { FC } from "react";

import { DEVELOPER } from "./presenter";
import * as S from "./style";

const Footer: FC = () => {
  return (
    <S.Wrapper>
      <div>
        <S.Header>
          <h1>대마고 대나무숲</h1>
          <p>
            <S.Button to="/policy/privacy">개인정보처리방침</S.Button>
            <S.Button to="/policy/privacy">서비스 약관</S.Button>
          </p>
        </S.Header>
        <S.Infomation>
          <p>DSMBAMBOO Developers</p>
          {DEVELOPER.map((v) => (
            <p key={v.type}>
              {v.type}
              <span>{v.name}</span>
            </p>
          ))}
        </S.Infomation>
      </div>
    </S.Wrapper>
  );
};

export default Footer;
