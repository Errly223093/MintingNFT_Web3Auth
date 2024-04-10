import React from "react";
import styled from "styled-components";

const HeaderWrapper = styled.div`
  background-image: url(../image/headerArea.png);
  background-size: 100% 100%;
  height: 50px;
  position: relative;
  width: 318px;
`;

const TextWrapper = styled.div`
  color: #b9f8fb;
  font-family: "Nico Moji", Helvetica;
  font-size: 14px;
  font-weight: 400;
  height: 14px;
  left: 18px;
  letter-spacing: 0;
  line-height: normal;
  position: absolute;
  top: 17px;
  white-space: nowrap;
`;

const Icon = styled.img`
  margin-top: 5px;
  height: 17px;
  left: ${({ left }) => left || "0"};
  position: absolute;
  top: ${({ top }) => top || "0"};
  width: 17px;
`;

export const HeaderArea = ({ className, divClassName }) => {
  return (
    <HeaderWrapper className={`header-area ${className}`}>
      <TextWrapper className={`text-wrapper ${divClassName}`}>
        @WE-ING with_ Wepublic
      </TextWrapper>
      <Icon
        className="iconly-broken-chat"
        alt="Iconly broken chat"
        src="/image/Chat.png"
        left="249px"
        top="13px"
      />
      <Icon
        className="iconly-broken-chat additional-icons"
        alt="Iconly broken chat"
        src="/image/vector.png"
        left="276px"
        top="13px"
      />
    </HeaderWrapper>
  );
};
