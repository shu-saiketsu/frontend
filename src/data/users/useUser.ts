import { User } from "@/types/User";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function useUser(id: string) {
  const { data, error, isLoading } = useSWR<User>(
    `/api/admin/users/${id}`,
    fetcher
  );

  return {
    user: data,
    isLoading,
    error,
  };
}
