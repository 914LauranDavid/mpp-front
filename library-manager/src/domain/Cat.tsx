export interface Cat {
  id: number;
  name: string;
  age: number;
  weight: number;
  cuteness: number;
  ownerId: string;
  avatarUrl: string;
}

export interface CatWithoutId { name: string, age: number, weight: number, cuteness: number, ownerId: string, avatarUrl: string };

export const errorCat: Cat = { id: -1, name: "Error", age: -1, weight: -1, cuteness: -1, ownerId: "error", avatarUrl: "error" };
