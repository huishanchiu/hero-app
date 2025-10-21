import { useEffect, useMemo, useRef, useState } from "react";
import { useHeroProfile, useUpdateHeroProfile } from "./useHeroData";
import { isObjectShallowEqual } from "../utils/isObjectShallowEqual";
import type { TStatKey } from "../type/HeroType";

const initialStats: Record<TStatKey, number> = { str: 0, int: 0, agi: 0, luk: 0 };

export function useHeroStatPoints(heroId: string | undefined) {
  const [currentPoints, setCurrentPoints] = useState(initialStats);
  const currentHeroId = useRef<string | null>(null);
  const prevCount = useRef(initialStats);
  const { data, isLoading, isError } = useHeroProfile(heroId ?? "");
  const updateHero = useUpdateHeroProfile(heroId ?? "");

  const isPointsEqual = isObjectShallowEqual(currentPoints, prevCount.current);

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

  const handleSave = async () => {
    return new Promise<void>((resolve, reject) => {
      updateHero.mutate(currentPoints, {
        onSuccess: () => {
          prevCount.current = currentPoints;
          resolve();
        },
        onError: reject,
      });
    });
  };

  const resetToSaved = () => {
    setCurrentPoints({
      str: prevCount.current.str,
      int: prevCount.current.int,
      agi: prevCount.current.agi,
      luk: prevCount.current.luk,
    });
  };

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

  return {
    currentPoints,
    remainingPoints,
    data,
    isLoading,
    isError,
    isPointsEqual,
    isPending: updateHero.isPending,
    handleIncrement,
    handleDecrement,
    handleSave,
    resetToSaved,
  };
}
