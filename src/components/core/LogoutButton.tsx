import Link from "next/link";

export default function LogoutButton() {
  return <Link href="/api/auth/logout">Logout</Link>;
}
