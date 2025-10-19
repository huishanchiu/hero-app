import styled from "@emotion/styled";
import HeroList from "../components/Hero/HeroList";
import { Outlet } from "react-router-dom";

const PageLayout = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  padding: 40px;
`;

const SectionWrapper = styled.section`
  min-width: 320px;
  max-width: 960px;
  width: 100%;
`;

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
