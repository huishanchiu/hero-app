import type { IHeroDetail, IHeroProfile } from "../type/HeroType";
import { apiClient } from "./apiClient";
import type { AxiosRequestConfig } from "axios";

interface IHeroAPI {
  fetchHeroList: (config?: AxiosRequestConfig) => Promise<IHeroDetail[]>;
  fetchHeroDetail: (heroId: string, config?: AxiosRequestConfig) => Promise<IHeroDetail>;
  fetchHeroProfile: (heroId: string, config?: AxiosRequestConfig) => Promise<IHeroProfile>;
  updateHeroProfile: (params: {
    heroId: string;
    profile: IHeroProfile;
    config?: AxiosRequestConfig;
  }) => Promise<string>;
}

const heroAPI: IHeroAPI = {
  fetchHeroList: async (config) => {
    const { data } = await apiClient.get<IHeroDetail[]>("/heroes", config);
    return data;
  },
  fetchHeroDetail: async (heroId, config) => {
    const { data } = await apiClient.get<IHeroDetail>(`/heroes/${heroId}`, config);
    return data;
  },
  fetchHeroProfile: async (heroId, config) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const { data } = await apiClient.get<IHeroProfile>(`/heroes/${heroId}/profile`, config);
    return data;
  },
  updateHeroProfile: async ({ heroId, profile, config }) => {
    const { data } = await apiClient.patch<string>(`/heroes/${heroId}/profile`, profile, config);
    return data;
  },
};

export default heroAPI;
