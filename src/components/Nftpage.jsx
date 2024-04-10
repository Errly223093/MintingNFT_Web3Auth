import React from "react";
import { HeaderArea } from "./HeaderArea";
import styled from "styled-components";

const MainWrapper = styled.div`
  background-color: #ffffff;
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
`;

const OverlapWrapper = styled.div`
  background-color: #ffffff;
  height: 800px;
  width: 360px;
  background-image: url(../image/bgPage.png);
  background-position: 50% 50%;
  background-size: cover;
  height: 800px;
  position: relative;
`;

const HeaderAreaInstance = styled.div`
  left: 21px !important;
  position: absolute !important;
  top: 19px !important;
`;

const Group = styled.div`
  height: 88px;
  left: 39px;
  position: absolute;
  top: 87px;
  width: 284px;
`;

const FlexContainer = styled.div`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  gap: 8px;
  height: 43px;
  left: 115px;
  position: absolute;
  top: 23px;
  width: 167px;
`;

const Text = styled.p`
  align-self: stretch;
  color: #ffffff;
  font-family: "Roboto-Bold", Helvetica;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0;
  line-height: normal;
  position: relative;
`;

const Span = styled.span`
  color: #ffffff;
  font-family: "Roboto-Bold", Helvetica;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0;
`;

const Ellipse = styled.div`
  background-color: #d9d9d9;
  border-radius: 44px;
  height: 88px;
  left: 0;
  position: absolute;
  top: 0;
  width: 88px;
`;

const Div = styled.div`
  height: 31px;
  left: 44px;
  position: absolute;
  top: 202px;
  width: 277px;
`;

const OverlapGroup = styled.div`
  background-image: url(../image/Rectangle4.png);
  background-size: 100% 100%;
  height: 35px;
  left: -2px;
  position: absolute;
  top: -2px;
  width: 132px;
  border-radius: full;
`;

const TextWrapper3 = styled.button`
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  color: #baf8fc;
  font-family: "Roboto-Bold", Helvetica;
  font-size: 12px;
  font-weight: 700;
  height: 14px;
  left: 24px;
  letter-spacing: 0;
  line-height: normal;
  position: absolute;
  top: 10px;
  white-space: nowrap;
`;

const DivWrapper = styled.div`
  background-image: url(../image/Rectangle4.png);
  background-size: 100% 100%;
  height: 35px;
  left: 143px;
  position: absolute;
  top: -2px;
  width: 132px;
`;

const TextWrapper4 = styled.button`
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  color: #baf8fc;
  font-family: "Roboto-Bold", Helvetica;
  font-size: 12px;
  font-weight: 700;
  height: 14px;
  left: 32px;
  letter-spacing: 0;
  line-height: normal;
  position: absolute;
  top: 10px;
  white-space: nowrap;
`;

const GroupWrapper = styled.div`
  height: 84px;
  left: 45px;
  position: absolute;
  top: 670px;
  width: 270px;
`;

const Group2 = styled.div`
  height: 84px;
  position: relative;
`;

const Image = styled.img`
  height: 84px;
  left: 0;
  object-fit: cover;
  position: absolute;
  top: 0;
  width: 84px;
`;

const Img = styled.img`
  height: 84px;
  left: 93px;
  object-fit: cover;
  position: absolute;
  top: 0;
  width: 84px;
`;

const Image2 = styled.img`
  height: 84px;
  left: 186px;
  object-fit: cover;
  position: absolute;
  top: 0;
  width: 84px;
`;

const Group3 = styled.div`
  height: 24px;
  left: 39px;
  position: absolute;
  top: 269px;
  width: 282px;
`;

const Group4 = styled.div`
  height: 24px;
  position: relative;
  width: 288px;
`;

const OverlapGroup2 = styled.div`
  height: 16px;
  left: 32px;
  position: absolute;
  top: 4px;
  width: 138px;
`;

const TextWrapper5 = styled.div`
  color: #b9f8fb;
  font-family: "Nico Moji", Helvetica;
  font-size: 16px;
  font-weight: 400;
  height: 16px;
  left: 0;
  letter-spacing: 0;
  line-height: normal;
  position: absolute;
  top: 0;
  white-space: nowrap;
`;

const TextWrapper6 = styled.div`
  color: #b9f8fb;
  font-family: "Nico Moji", Helvetica;
  font-size: 16px;
  font-weight: 400;
  height: 16px;
  left: 233px;
  letter-spacing: 0;
  line-height: normal;
  position: absolute;
  top: 4px;
  white-space: nowrap;
`;

const IconlyBrokenTicket = styled.img`
  margin-top: 7px;
  height: 17px;
  left: 0;
  position: absolute;
  top: 0;
  width: 20px;
`;

const Frame = styled.div`
  background-color: #ededed;
  border-radius: 8px;
  box-shadow: 0px 0px 11.2px #ddffff;
  height: 320px;
  left: 44px;
  overflow: hidden;
  position: absolute;
  top: 319px;
  width: 273px;
`;

const Image3 = styled.img`
  height: 270px;
  left: 0;
  object-fit: cover;
  position: absolute;
  top: 0;
  width: 273px;
`;

const TextWrapper7 = styled.div`
  color: #868686;
  font-family: "Nico Moji", Helvetica;
  font-size: 12px;
  font-weight: 400;
  height: 12px;
  left: 7px;
  letter-spacing: 0;
  line-height: normal;
  position: absolute;
  top: 274px;
  white-space: nowrap;
`;

const TextWrapper8 = styled.div`
  color: #000000;
  font-family: "Nico Moji", Helvetica;
  font-size: 15px;
  font-weight: 400;
  height: 15px;
  left: 71px;
  letter-spacing: 0;
  line-height: normal;
  position: absolute;
  top: 294px;
  white-space: nowrap;
`;

export const NftPage = () => {
  return (
    <MainWrapper>
      <OverlapWrapper>
        <HeaderAreaInstance>
          <HeaderArea
            className="header-area-instance"
            divClassName="design-component-instance-node"
            iconlyBrokenChat="Chat.png"
          />
        </HeaderAreaInstance>
        <Group>
          <FlexContainer>
            <Text>
              <Span>
                PLZ. 평생 망하지마
                <br />
              </Span>
            </Text>
            <Text>
              <Span>나만알고 싶은 로컬맛.zip</Span>
            </Text>
          </FlexContainer>
          <Ellipse />
        </Group>
        <Div>
          <OverlapGroup>
            <TextWrapper3
              onClick={() =>
                window.open("https://wepublic.com/c/matzip?tab=feed")
              }
            >
              DAO 바로가기
            </TextWrapper3>
          </OverlapGroup>
          <DivWrapper
            onClick={() => window.open("https://matzipdao.vercel.app/")}
          >
            <TextWrapper4>입맛 테스트</TextWrapper4>
          </DivWrapper>
        </Div>
        <GroupWrapper>
          <Group2>
            <Image alt="Image" src="/image/image7.png" />
            <Img alt="Image" src="/image/image7.png" />
            <Image2 alt="Image" src="/image/image7.png" />
          </Group2>
        </GroupWrapper>
        <Group3>
          <Group4>
            <OverlapGroup2>
              <TextWrapper5>My NFT_CARDS</TextWrapper5>
              <TextWrapper5>My NFT_CARDS</TextWrapper5>
            </OverlapGroup2>
            <TextWrapper6>1NFT</TextWrapper6>
            <IconlyBrokenTicket
              alt="Iconly broken ticket"
              src="/image/Ticket.png"
            />
          </Group4>
        </Group3>
        <Frame>
          <Image3 alt="Image" src="/image/image6.png" />
          <TextWrapper7>by Taste Test</TextWrapper7>
          <TextWrapper8>#이게바로 #초딩입맛 #당폭발</TextWrapper8>
        </Frame>
      </OverlapWrapper>
    </MainWrapper>
  );
};
