import styled from "@emotion/styled";
import HeroList from "../components/Hero/HeroList";
import { Outlet } from "react-router-dom";
import breakpoints from "../style/breakPoint";

export default function HeroPage() {
  return (
    <PageLayout>
      <SectionWrapper>
        <HeroList />
      </SectionWrapper>
      <SectionWrapper>
        <Outlet />
      </SectionWrapper>
    </PageLayout>
  );
}

const PageLayout = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  padding: 40px;

  @media (max-width: ${breakpoints.minDesktop}) {
    padding: 20px;
    gap: 20px;
  }
`;

const SectionWrapper = styled.section`
  max-width: 960px;
  width: 100%;
`;
