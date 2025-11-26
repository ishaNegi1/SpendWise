import { redirect } from "next/navigation";
import { checkAuth } from "@/lib/checkAuth";
import Transaction from "./Transaction";

export default async function DashboardPage() {
  const user = await checkAuth();

  if (!user) {
    redirect("/login");
  }

  return <Transaction />;
}
