import { Election } from "@/types/Election";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function useElection(id: number) {
  const { data, error, isLoading } = useSWR<Election>(
    `/api/admin/elections/${id}`,
    fetcher
  );

  return {
    election: data,
    isLoading,
    error,
  };
}
