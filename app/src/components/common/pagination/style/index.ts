import styled from "styled-components";
import { Link } from "react-router-dom";

import GothicBold from "assets/font/NanumGothicBold.ttf";

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;

  > div {
    width: 50vw;
    min-width: 600px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

interface PageLinkProps {
  isactive: "true" | "false";
  isicon: "true" | "false";
}
export const PageLink = styled(Link)<PageLinkProps>`
  text-align: center;
  margin: 0 12px;
  color: ${({ isicon }) => (isicon === "true" ? "#7bbb5a" : "#444444")};
  padding: 2px;
  display: inline-block;
  transition: 0.1s;
  font-size: 0.6em;
  font-family: ${({ isactive }) => isactive === "true" && GothicBold};

  &:hover {
    font-family: ${GothicBold};
  }
`;
