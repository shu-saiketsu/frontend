import useSWR from "swr";

import { Election } from "@/types/Election";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function useElections() {
  const { data, error, isLoading } = useSWR<Election[]>(
    "/api/admin/elections",
    fetcher
  );

  return {
    elections: data,
    isLoading,
    error,
  };
}
