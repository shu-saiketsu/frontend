import type { Party } from "@/types/Party";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function useParty(id: number) {
  const { data, error, isLoading } = useSWR<Party>(
    `/api/admin/parties/${id}`,
    fetcher
  );

  return {
    party: data,
    isLoading,
    error,
  };
}
