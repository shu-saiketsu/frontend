import { Candidate } from "@/types/Candidate";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function useCandidate(id: number) {
  const { data, error, isLoading } = useSWR<Candidate>(
    `/api/admin/candidates/${id}`,
    fetcher
  );

  return {
    candidate: data,
    isLoading,
    error,
  };
}
