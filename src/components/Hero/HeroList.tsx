import { Link, useParams } from "react-router-dom";
import styled from "@emotion/styled";
import { useHeroList } from "../../hooks/useHeroData";
import SkeletonList from "../Common/SkeletonList";
import breakpoints from "../../style/breakPoint";

export default function HeroListPage() {
  const { heroId } = useParams<{ heroId: string }>();
  const { data, isLoading } = useHeroList();

  return (
    <CardContainer>
      {isLoading && <SkeletonList />}
      {data?.map((hero) => (
        <Card
          data-active={hero.id === heroId ? "true" : undefined}
          key={hero.id}
          to={`/heroes/${hero.id}`}
        >
          <CardImage src={hero.image} alt={hero.name} />
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
  border: solid 2px ${(props) => props.theme.colorNeutral900};
  width: 100%;
  @media (max-width: ${breakpoints.minDesktop}) {
    border: 0px;
  }
`;

const Card = styled(Link)`
  width: 200px;
  aspect-ratio: 6/9;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  border: 2px solid ${(props) => props.theme.colorNeutral800};
  background: ${(props) => props.theme.colorNeutral100};
  text-decoration: none;
  transition:
    transform 150ms ease,
    box-shadow 150ms ease;

  &[data-active="true"] {
    border: 3px solid ${(props) => props.theme.colorPrimary500};
    transform: translateY(-5px);
    box-shadow: 10px 10px 10px ${(props) => props.theme.colorTransparent100};
  }

  @media (max-width: ${breakpoints.minDesktop}) {
    width: 300px;
  }
`;

const CardImage = styled.img`
  width: 100%;
  aspect-ratio: 1;
  margin-bottom: 12px;
  border: 2px solid ${(props) => props.theme.colorNeutral800};
`;

const CardName = styled.span`
  font-size: 20px;
  font-weight: 600;
  color: ${(props) => props.theme.colorNeutral800};
`;
