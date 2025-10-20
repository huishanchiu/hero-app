export interface IHeroDetail {
  id: string;
  name: string;
  image: string;
}

export interface IHeroProfile {
  str: number;
  int: number;
  agi: number;
  luk: number;
}

export type TStatKey = "str" | "int" | "agi" | "luk";
