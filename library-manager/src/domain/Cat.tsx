export interface Cat {
  id: number;
  name: string;
  age: number;
  weight: number;
}

export interface CatWithoutId { name: string, age: number, weight: number };

export const errorCat: Cat = { id: -1, name: "Error", age: -1, weight: -1 };
