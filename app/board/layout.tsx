import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";

export default function ReportLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Sidebar />
            <Header />
            <main className="min-h-[calc(100vh-64px)]">{children}</main>
        </>
    );
}
