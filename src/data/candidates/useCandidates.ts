import { Candidate } from "@/types/Candidate";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function useCandidates() {
  const { data, error, isLoading } = useSWR<Candidate[]>(
    "/api/admin/candidates",
    fetcher
  );

  return {
    candidates: data,
    isLoading,
    error,
  };
}
