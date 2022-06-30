export interface Item {
  key: string;
  index: number;
  type: string;
  name: string;
  count?: number;
}

export interface Items extends Array<Item> {}

export interface Type {
  key: string;
  value: string;
}

export interface Types extends Array<Type> {}
