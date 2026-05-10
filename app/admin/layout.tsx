import { requireAdmin } from "../api/_lib/adminAuth";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin();
  return children;
}
