import useSWR from "swr";

import { Candidate } from "../types/Candidate";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function useCandidate(id: number) {
  const { data, error, isLoading } = useSWR<Candidate>(
    `/api/candidates/${id}`,
    fetcher
  );

  return {
    candidate: data,
    isLoading,
    error,
  };
}
