import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import heroAPI from "../api/heroApi";
import type { IHeroProfile } from "../type/HeroType";

export function useHeroList() {
  return useQuery({
    queryKey: ["heroes"],
    queryFn: heroAPI.fetchHeroList,
  });
}

export function useHeroDetail(heroId: string) {
  return useQuery({
    queryKey: ["heroDetail", heroId],
    queryFn: () => heroAPI.fetchHeroDetail(heroId),
    enabled: !!heroId,
  });
}

export function useHeroProfile(heroId: string) {
  return useQuery({
    queryKey: ["heroProfile", heroId],
    queryFn: () => heroAPI.fetchHeroProfile(heroId),
    enabled: !!heroId,
  });
}

export function useUpdateHeroProfile(heroId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (profile: IHeroProfile) => heroAPI.updateHeroProfile({ heroId, profile }),
    onSuccess: () => {
      // PATCH 成功後，重新抓資料
      queryClient.invalidateQueries({ queryKey: ["heroProfile", heroId] });
    },
  });
}
