import { Party } from "@/types/Party";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function useParties() {
  const { data, error, isLoading } = useSWR<Party[]>(
    "/api/admin/parties",
    fetcher
  );

  return {
    parties: data,
    isLoading,
    error,
  };
}
