import styled from "@emotion/styled";
import { useParams } from "react-router-dom";
import { objectEntries } from "../../utils/objectEntries";
import { useHeroStatPoints } from "../../hooks/useHeroStatPoints";
import { useToast } from "../../context/ToastProvider";

export default function HeroProfile() {
  const { heroId } = useParams<{ heroId: string }>();
  const { showToast } = useToast();

  const {
    currentPoints,
    remainingPoints,
    data,
    isLoading,
    isError,
    isPointsEqual,
    isPending,
    handleIncrement,
    handleDecrement,
    handleSave,
    resetToSaved,
  } = useHeroStatPoints(heroId);

  const buttonDisabled = !data || isPending || isPointsEqual;

  const onSave = async () => {
    try {
      await handleSave();
      showToast("儲存成功");
    } catch {
      showToast("儲存失敗");
    }
  };

  return (
    <Container>
      <StatList>
        {objectEntries(currentPoints).map(([key, value]) => {
          const label = key.toUpperCase();
          return (
            <StatRow key={key}>
              <StatLabel>{label}</StatLabel>
              <AdjustButton
                type="button"
                onClick={() => handleIncrement(key)}
                disabled={remainingPoints === 0}
              >
                +
              </AdjustButton>
              <StatValue>{isLoading || isError ? "?" : value}</StatValue>
              <AdjustButton
                type="button"
                onClick={() => handleDecrement(key)}
                disabled={value === 0}
              >
                -
              </AdjustButton>
            </StatRow>
          );
        })}
      </StatList>
      {isError ? (
        <Summary>😱有些東西出錯了...</Summary>
      ) : (
        <Summary>
          <SummaryText>剩餘點數：{remainingPoints}</SummaryText>
          <Button type="button" onClick={onSave} disabled={remainingPoints !== 0 || buttonDisabled}>
            {isPending ? "儲存中..." : "儲存"}
          </Button>
          <Button type="button" onClick={resetToSaved} disabled={buttonDisabled}>
            還原
          </Button>
        </Summary>
      )}
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
`;

const Summary = styled.div`
  font-weight: 600;
  display: flex;
  font-size: 20px;
  justify-content: flex-end;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  min-width: 180px;
`;

const SummaryText = styled.div`
  display: flex;
  gap: 6px;
  align-items: baseline;
`;

const Button = styled.button`
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
