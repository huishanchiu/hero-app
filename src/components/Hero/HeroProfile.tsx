import { useEffect, useMemo, useRef, useState } from "react";
import styled from "@emotion/styled";
import { useHeroProfile, useUpdateHeroProfile } from "../../hooks/useHero";
import { useParams } from "react-router-dom";
import { useToast } from "../../context/ToastProvider";
import { checkIsEqualObject } from "../../utils/checkIsEqualObject";
import type { TStatKey } from "../../type/HeroType";

const initialStats: Record<TStatKey, number> = { str: 0, int: 0, agi: 0, luk: 0 };

export default function HeroProfile() {
  const { heroId } = useParams<{ heroId: string }>();

  const [currentPoints, setCurrentPoints] = useState(initialStats);
  const currentHeroId = useRef<string | null>(null);
  const prevCount = useRef(initialStats);
  const { data, isLoading, isError } = useHeroProfile(heroId ?? "");
  const updateHero = useUpdateHeroProfile(heroId ?? "");
  const { showToast } = useToast();

  const isPointsEqual = checkIsEqualObject(currentPoints, prevCount.current);
  const buttonDisabled = !data || updateHero.isPending || isPointsEqual;

  useEffect(() => {
    if (!heroId || !data) return;

    currentHeroId.current = heroId;
    const nextStatusPoints = {
      str: data.str,
      int: data.int,
      agi: data.agi,
      luk: data.luk,
    };
    setCurrentPoints(nextStatusPoints);
    prevCount.current = nextStatusPoints;

    return () => {
      currentHeroId.current = null;
      setCurrentPoints({ ...initialStats });
    };
  }, [data, heroId]);

  const remainingPoints = useMemo(() => {
    if (!data || currentHeroId.current !== heroId) return 0;
    const spent = Object.values(currentPoints).reduce((acc, value) => acc + value, 0);
    const totalPoints = data ? Object.values(data).reduce((acc, value) => acc + value, 0) : 0;
    return Math.max(totalPoints - spent, 0);
  }, [data, heroId, currentPoints]);

  const handleIncrement = (key: TStatKey) => {
    if (remainingPoints === 0) return;
    setCurrentPoints((prev) => ({ ...prev, [key]: prev[key] + 1 }));
  };

  const handleDecrement = (key: TStatKey) => {
    setCurrentPoints((prev) => {
      if (prev[key] === 0) return prev;
      return { ...prev, [key]: prev[key] - 1 };
    });
  };

  const handleSave = () => {
    updateHero.mutate(currentPoints, {
      onSuccess: () => {
        prevCount.current = currentPoints;
        showToast("儲存成功");
      },
      onError: () => showToast("儲存失敗"),
    });
  };

  function typedEntries<K extends string, V>(obj: Record<K, V>): [K, V][] {
    return Object.entries(obj) as [K, V][];
  }

  const backToInit = () => {
    setCurrentPoints({
      str: prevCount.current.str,
      int: prevCount.current.int,
      agi: prevCount.current.agi,
      luk: prevCount.current.luk,
    });
  };

  return (
    <Container>
      <StatList>
        {typedEntries(currentPoints).map(([key, value]) => {
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
          <Button
            type="button"
            onClick={handleSave}
            disabled={remainingPoints !== 0 || buttonDisabled}
          >
            {updateHero.isPending ? "儲存中..." : "儲存"}
          </Button>
          <Button type="button" onClick={backToInit} disabled={buttonDisabled}>
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
