import { Party } from "./Party";

export type Candidate = {
  id: string;
  name: string;
  party: Party | null;
};
