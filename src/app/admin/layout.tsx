"use client";

import { usePathname } from "next/navigation";
import AuthProvider from "@/components/AuthProvider";
import AdminSidebar from "@/components/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLogin = pathname === "/admin/login";

  return (
    <AuthProvider>
      {isLogin ? (
        <div className="flex min-h-screen items-center justify-center bg-ink-900 px-5">
          {children}
        </div>
      ) : (
        <div className="flex min-h-screen flex-col bg-ink-900 md:flex-row">
          <AdminSidebar />
          <div className="flex-1 overflow-y-auto">
            <div className="mx-auto max-w-5xl px-5 py-10">{children}</div>
          </div>
        </div>
      )}
    </AuthProvider>
  );
}
