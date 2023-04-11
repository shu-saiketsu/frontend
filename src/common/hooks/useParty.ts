import useSWR from "swr";

import { Party } from "../types/Party";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function useParty(id: number) {
  const { data, error, isLoading } = useSWR<Party>(
    `/api/parties/${id}`,
    fetcher
  );

  return {
    party: data,
    isLoading,
    error,
  };
}
