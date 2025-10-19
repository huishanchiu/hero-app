import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import { useHeroList } from "../../hooks/useHero";
import SkeletonList from "../Common/SkeletonList";
import { useState } from "react";

export default function HeroListPage() {
  const { data, isLoading } = useHeroList();
  const [activeHero, setActiveHero] = useState<string | null>(null);

  return (
    <CardContainer>
      {isLoading && <SkeletonList />}
      {data?.map((hero) => (
        <Card
          active={hero.id === activeHero}
          key={hero.id}
          to={`/heroes/${hero.id}`}
          onClick={() => setActiveHero(hero.id)}
        >
          <CardImage src={hero.image} />
          <CardName>{hero.name}</CardName>
        </Card>
      ))}
    </CardContainer>
  );
}

const CardContainer = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  padding: 20px;
  border: #000 solid 2px;
  width: 100%;
`;

const Card = styled(Link)<{ active: boolean }>`
  width: 200px;
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  border: 2px solid #1f2937;
  background: #ffffff;
  text-decoration: none;
  transition:
    transform 150ms ease,
    box-shadow 150ms ease;

  border: ${({ active }) => active && "3px #ee0979 solid "};
  transform: ${({ active }) => active && "translateY(-5px)"};
  box-shadow: ${({ active }) => active && "10px 10px 10px rgba(0, 0, 0, 0.12)"};
`;

const CardImage = styled.img`
  width: 100%;
  aspect-ratio: 1;
  margin-bottom: 12px;
  border: 2px solid #1f2937;
`;

const CardName = styled.span`
  font-size: 20px;
  font-weight: 600;
  color: #1f2937;
`;
