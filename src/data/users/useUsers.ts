import { User } from "@/types/User";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function useUsers() {
  const { data, error, isLoading } = useSWR<User[]>(
    "/api/admin/users",
    fetcher
  );

  return {
    users: data,
    isLoading,
    error,
  };
}
