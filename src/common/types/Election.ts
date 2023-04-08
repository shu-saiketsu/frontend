import { ElectionTypeEnum } from "../enums/ElectionTypeEnum";

type ElectionType = {
  id: number;
  name: string;
};

type ElectionOwner = {
  id: number;
};

export type Election = {
  id: number;
  name: string;
  typeId: ElectionTypeEnum;
  type: ElectionType;
  ownerId: string;
  owner: ElectionOwner;
  startDate: string;
  endDate: string;
};
