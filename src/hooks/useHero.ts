import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import heroAPI from "../api/heroApi";
import type { IHeroProfile } from "../type/HeroType";

export function useHeroList() {
  return useQuery({
    queryKey: ["heroes"],
    queryFn: heroAPI.fetchHeroList,
    throwOnError: true,
    refetchOnWindowFocus: false,
    retry: 1,
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
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    retry: 1,
  });
}

export function useUpdateHeroProfile(heroId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (profile: IHeroProfile) => heroAPI.updateHeroProfile({ heroId, profile }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["heroProfile", heroId] });
    },
  });
}
