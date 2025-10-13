
"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Script from "next/script";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("auth");
    router.push("/login");
  };

  return (
    <>
      {/* Google Analytics 4 */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GA4_PROPERTY_ID}`}
      />
      <Script
        id="ga4-init"
        strategy="afterInteractive"
      >
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.GA4_PROPERTY_ID}', { send_page_view: true });
        `}
      </Script>

      {/* Sidebar + Main Layout */}
      <div className="flex h-screen">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-800 text-white flex flex-col p-4">
          <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
          <nav className="flex-1">
            <ul className="space-y-3">
              <li>
                <Link href="/dashboard" className="hover:underline">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/dashboard/add" className="hover:underline">
                  Add Project
                </Link>
              </li>
            </ul>
          </nav>
          <button
            onClick={handleLogout}
            className="bg-red-600 px-3 py-2 rounded mt-auto"
          >
            Logout
          </button>
        </aside>

        {/* Main Content */}
        <main className="flex-1 bg-gray-50 p-6 overflow-y-auto">{children}</main>
      </div>
    </>
  );
}
