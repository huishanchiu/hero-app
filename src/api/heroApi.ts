import type { IHeroDetail, IHeroProfile } from "../type/HeroType";
import { apiClient } from "./apiClient";

interface IHeroAPI {
  fetchHeroList: () => Promise<IHeroDetail[]>;
  fetchHeroDetail: (heroId: string) => Promise<IHeroDetail>;
  fetchHeroProfile: (heroId: string) => Promise<IHeroProfile>;
  updateHeroProfile: (params: { heroId: string; profile: IHeroProfile }) => Promise<void>;
}

const heroAPI: IHeroAPI = {
  fetchHeroList: async () => {
    const response = await apiClient.get("/heroes");
    return response.data;
  },
  fetchHeroDetail: async (heroId) => {
    const response = await apiClient.get(`/heroes/${heroId}`);
    return response.data;
  },
  fetchHeroProfile: async (heroId) => {
    const response = await apiClient.get(`/heroes/${heroId}/profile/`);
    return response.data;
  },
  updateHeroProfile: async ({ heroId, profile }) => {
    const response = await apiClient.patch(`/heroes/${heroId}/profile`, profile);
    return response.data;
  },
};

export default heroAPI;
