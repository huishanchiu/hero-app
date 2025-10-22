import styled from "@emotion/styled";
import { useParams, useBlocker } from "react-router-dom";
import { objectEntries } from "../../utils/objectEntries";
import { useHeroStatPoints } from "../../hooks/useHeroStatPoints";
import { useToast } from "../../context/ToastProvider";
import Loading from "../Common/Loading";
import CustomModal from "../Common/CustomModal";
import breakpoints from "../../style/breakPoint";

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
  const dataIsNotReady = isLoading || isError;

  // 當有未儲存的變更時，阻擋路由切換
  const routerBlocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      !isPointsEqual && currentLocation.pathname !== nextLocation.pathname
  );

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
      {(isLoading || isPending) && <Loading />}
      {routerBlocker.state === "blocked" && (
        <CustomModal
          title="尚未儲存"
          contents="你有未儲存的變更，確定要離開嗎？"
          onClose={() => routerBlocker.reset()}
          onConfirm={() => routerBlocker.proceed()}
          closeText="離開"
          confirmText="  取消"
        />
      )}
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
              <StatValue>{dataIsNotReady ? "?" : value}</StatValue>
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
          <SummaryText>剩餘點數：{dataIsNotReady ? "?" : remainingPoints}</SummaryText>
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
  border: 2px solid ${(props) => props.theme.colorNeutral800};
  @media (max-width: ${breakpoints.minDesktop}) {
    flex-direction: column;
  }
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

  @media (max-width: ${breakpoints.minDesktop}) {
    grid-template-columns: 65px repeat(3, 58px);
    gap: 12px;
  }
`;

const Text = styled.span`
  font-weight: 600;
  color: ${(props) => props.theme.colorNeutral800};
`;

const StatLabel = styled(Text)`
  font-size: 18px;
  text-align: left;
`;

const StatValue = styled(Text)`
  font-size: 20px;
  text-align: center;
`;

const AdjustButton = styled.button`
  width: 48px;
  aspect-ratio: 1/1;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid ${(props) => props.theme.colorNeutral800};
  border-radius: 8px;
  background: ${(props) => props.theme.colorNeutral200};
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
  @media (max-width: ${breakpoints.minDesktop}) {
    padding-top: 30px;
    align-items: center;
  }
`;

const SummaryText = styled.div`
  display: flex;
  gap: 6px;
  align-items: baseline;
`;

const Button = styled.button`
  min-width: 140px;
  padding: 12px 16px;
  border: 2px solid ${(props) => props.theme.colorNeutral800};
  border-radius: 8px;
  background: ${(props) => props.theme.colorNeutral200};
  color: ${(props) => props.theme.colorNeutral800};
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
