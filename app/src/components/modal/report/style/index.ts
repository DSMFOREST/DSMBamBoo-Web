import styled from "styled-components";

export const Wrapper = styled.div`
  width: 600px;
  height: 420px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 3px 10px 0 rgba(105, 124, 78, 0.61);
  border: solid 2px #697c4e;

  > header {
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
    border-bottom: solid 1px #e2e2e2;

    > p {
      font-size: 0.925em;
      font-family: "나눔고딕 Bold";
      margin-left: 40px;
      color: #707070;
    }
  }
`;

export const CloseButton = styled.button`
  color: #95989a;
  width: 18px;
  height: 18px;
  font-size: 1em;
  margin-right: 20px;
`;
