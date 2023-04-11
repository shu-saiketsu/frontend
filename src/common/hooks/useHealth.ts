import useSWR from "swr";

import { Health } from "../types/Health";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function useHealth() {
  const { data, error, isLoading } = useSWR<Health>(`/api/health`, fetcher);

  return {
    health: data,
    isLoading,
    error,
  };
}
