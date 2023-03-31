type Type = {
  id: number;
  name: string;
};

type Owner = {
  id: number;
};

export type Election = {
  id: number;
  name: string;
  typeId: number;
  type: Type;
  ownerId: string;
  owner: Owner;
};
