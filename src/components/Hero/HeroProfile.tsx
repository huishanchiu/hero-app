import { useMemo, useState } from "react";
import styled from "@emotion/styled";

type TStatKey = "str" | "int" | "agi" | "luk";

const initialStats: Record<TStatKey, number> = {
  str: 3,
  int: 5,
  agi: 1,
  luk: 2,
};

export default function HeroProfile() {
  const [statusPoints, setStatusPoints] = useState(initialStats);

  const TOTAL_POINTS = initialStats
    ? Object.values(initialStats).reduce((acc, value) => acc + value, 0)
    : 0;

  const remainingPoints = useMemo(() => {
    const spent = Object.values(statusPoints).reduce((acc, value) => acc + value, 0);
    return Math.max(TOTAL_POINTS - spent, 0);
  }, [TOTAL_POINTS, statusPoints]);

  const handleIncrement = (key: TStatKey) => {
    if (remainingPoints === 0) return;
    setStatusPoints((prev) => ({ ...prev, [key]: prev[key] + 1 }));
  };

  const handleDecrement = (key: TStatKey) => {
    setStatusPoints((prev) => {
      if (prev[key] === 0) return prev;
      return { ...prev, [key]: prev[key] - 1 };
    });
  };

  return (
    <Container>
      <StatList>
        {Object.entries(statusPoints).map(([key, value]) => {
          const label = key.toUpperCase();

          return (
            <StatRow key={key}>
              <StatLabel>{label}</StatLabel>
              <AdjustButton onClick={() => handleIncrement(key as TStatKey)}>+</AdjustButton>
              <StatValue>{value}</StatValue>
              <AdjustButton
                type="button"
                onClick={() => handleDecrement(key as TStatKey)}
                disabled={value === 0}
              >
                -
              </AdjustButton>
            </StatRow>
          );
        })}
      </StatList>
      {TOTAL_POINTS}
      <Summary>
        <SummaryText>剩餘點數：{remainingPoints}</SummaryText>
        <SaveButton disabled={remainingPoints !== 0}>儲存</SaveButton>
      </Summary>
    </Container>
  );
}

const Container = styled.section`
  display: flex;
  justify-content: space-around;
  padding: 24px;
  border: 2px solid #1f2937;
`;

const StatList = styled.div`
  display: grid;
  gap: 18px;
`;

const StatRow = styled.div`
  display: grid;
  grid-template-columns: 60px repeat(3, 56px);
  align-items: center;
  gap: 12px;
`;

const StatLabel = styled.span`
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
  text-align: left;
`;

const StatValue = styled.span`
  font-size: 20px;
  font-weight: 600;
  text-align: center;
  color: #1f2937;
`;

const AdjustButton = styled.button`
  width: 48px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid #1f2937;
  border-radius: 8px;
  background: #f9fafb;
  font-size: 24px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 120ms ease;

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
    transform: none;
  }

  &:hover:not(:disabled),
  &:focus-visible:not(:disabled) {
    transform: translateY(-2px);
  }
`;

const Summary = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  min-width: 180px;
`;

const SummaryText = styled.div`
  font-size: 18px;
  display: flex;
  gap: 6px;
  align-items: baseline;
`;

const SaveButton = styled.button`
  min-width: 140px;
  padding: 12px 16px;
  border: 2px solid #1f2937;
  border-radius: 8px;
  background: #f3f4f6;
  color: #1f2937;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
