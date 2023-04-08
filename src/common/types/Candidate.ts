import { Party } from "./Party";

export type Candidate = {
  id: number;
  name: string;
  party: Party | null;
};
