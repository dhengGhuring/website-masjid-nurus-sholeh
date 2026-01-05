"use client";

import React, { useState, useEffect } from "react";
import {
    LayoutDashboard,
    ReceiptText,
    FileCheck,
    Tags,
    Users,
    LogOut,
    ChevronRight,
    ChevronLeft,
    Building2,
    Menu,
    X
} from "lucide-react";
import { Button, Tooltip } from "@heroui/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export const Sidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isTablet, setIsTablet] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // For mobile/tablet drawer

    const pathname = usePathname();
    const router = useRouter();
    const supabase = createClient();

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            const mobile = width < 768;
            const tablet = width >= 768 && width < 1200;

            setIsMobile(mobile);
            setIsTablet(tablet);

            // Auto-collapse logic
            if (tablet) {
                setIsCollapsed(true); // Default to collapsed on tablet
                setIsSidebarOpen(false); // Close mobile/tablet overlay if resizing from mobile to tablet
            } else if (!mobile) {
                // Desktop
                setIsCollapsed(false); // Default to expanded on desktop
                setIsSidebarOpen(false); // Close mobile/tablet overlay if resizing from mobile to desktop
            } else {
                // Mobile
                setIsCollapsed(false); // isCollapsed state is not directly used for mobile sidebar width
            }
        };

        // Initial check
        handleResize();

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.refresh();
    };

    const toggleSidebar = () => {
        // This toggle is for desktop collapse/expand and tablet overlay expand/collapse
        setIsCollapsed(!isCollapsed);
    };

    // For mobile, we toggle the whole sidebar visibility
    const toggleMobileSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const menuItems = [
        { name: "Beranda", icon: LayoutDashboard, href: "/admin" },
        { name: "Transaksi", icon: ReceiptText, href: "/admin/transactions" },
        { name: "Laporan", icon: FileCheck, href: "/admin/reports" },
        { name: "Kategori", icon: Tags, href: "/admin/categories" },
        { name: "Pengguna", icon: Users, href: "/admin/users" },
    ];

    // Render Mobile Top Bar
    if (isMobile) {
        return (
            <>
                {/* Top Bar */}
                <header className="fixed top-0 left-0 right-0 h-16 bg-[#2D8161] text-white flex items-center justify-between px-4 z-50 shadow-md">
                    <div className="flex items-center gap-3">
                        <div className="bg-white text-[#2D8161] p-1.5 rounded-lg shrink-0">
                            <Building2 size={20} />
                        </div>
                        <div>
                            <h1 className="font-bold text-base whitespace-nowrap">Masjid Al-Ikhlas</h1>
                            <p className="text-[10px] text-green-100 whitespace-nowrap">Admin Panel</p>
                        </div>
                    </div>
                    <button onClick={toggleMobileSidebar} className="p-2 text-white hover:bg-[#1E5D44] rounded-lg transition-colors">
                        <Menu size={24} />
                    </button>
                </header>

                {/* Spacer for content */}
                <div className="h-16 w-full"></div>

                {/* Mobile Drawer (Sidebar) */}
                {isSidebarOpen && (
                    <div className="fixed inset-0 z-50 flex">
                        {/* Backdrop */}
                        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsSidebarOpen(false)} />

                        {/* Sidebar Content */}
                        <aside className="relative w-64 h-full bg-[#2D8161] text-white shadow-xl flex flex-col animate-in slide-in-from-left duration-200">
                            <div className="p-4 flex items-center justify-between border-b border-white/10">
                                <span className="font-bold text-lg">Menu</span>
                                <button onClick={() => setIsSidebarOpen(false)} className="p-1 hover:bg-[#1E5D44] rounded-lg">
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="flex-1 py-4 px-3 space-y-2 overflow-y-auto">
                                {menuItems.map((item) => {
                                    const isActive = pathname === item.href;
                                    return (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            onClick={() => setIsSidebarOpen(false)}
                                            className={`
                                                flex items-center gap-3 px-4 py-3 rounded-xl transition-all
                                                ${isActive
                                                    ? "bg-[#1E5D44] text-white shadow-lg"
                                                    : "text-green-100 hover:bg-[#349670] hover:text-white"
                                                }
                                            `}
                                        >
                                            <item.icon size={20} />
                                            <span className="font-medium">{item.name}</span>
                                        </Link>
                                    );
                                })}
                            </div>

                            <div className="p-4 border-t border-white/10">
                                <Button className="w-full bg-transparent flex items-center gap-3 px-4 py-3 rounded-xl text-green-100 hover:bg-[#349670] hover:text-white transition-colors" onPress={handleLogout}>
                                    <LogOut size={20} />
                                    <span className="font-medium">Keluar</span>
                                </Button>
                            </div>
                        </aside>
                    </div>
                )}
            </>
        );
    }

    // Desktop & Tablet Logic
    // Tablet:
    // - Collapsed: normal sticky flow, w-20.
    // - Expanded: Collapsed state visually acts as 'placeholder' (still w-20 in flow), but we show a fixed overlay w-64 on top.

    // Actually, simply relying on `isCollapsed` state for width is easiest, 
    // BUT for Tablet expanded, it needs to be `fixed` position to overlay content, OR just push content?
    // User requested: "ketika di expand akan jadi Drawer yang beda di atas content halaman".
    // This implies overlay.

    const isTabletOverlay = isTablet && !isCollapsed;

    return (
        <>
            {/* Backdrop for Tablet Overlay */}
            {isTabletOverlay && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
                    onClick={() => setIsCollapsed(true)}
                />
            )}

            <aside
                className={`
                    sticky top-0 h-screen bg-[#2D8161] text-white transition-all duration-300 ease-in-out flex flex-col z-50
                    ${isCollapsed ? "w-20" : "w-64"}
                    ${isTabletOverlay ? "fixed left-0 shadow-2xl" : ""}
                `}
            >
                {/* Header */}
                <div className="p-4 flex items-center justify-between border-b border-white/10">
                    <div className={`flex items-center gap-3 ${isCollapsed ? "justify-center w-full" : ""}`}>
                        <div className="bg-white text-[#2D8161] p-2 rounded-lg shrink-0">
                            <Building2 size={24} />
                        </div>
                        {!isCollapsed && (
                            <div className="overflow-hidden">
                                <h1 className="font-bold text-lg whitespace-nowrap">Masjid Al-Ikhlas</h1>
                                <p className="text-xs text-green-100 whitespace-nowrap">Admin Panel</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Collapse Button (Floating) */}
                <button
                    onClick={toggleSidebar}
                    className="absolute -right-3 top-20 bg-white text-[#2D8161] p-1 rounded-full shadow-md border border-gray-100 hover:bg-gray-50 transition-colors z-50"
                >
                    {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
                </button>

                {/* Menu Items */}
                <div className="flex-1 py-6 px-3 space-y-2 overflow-y-auto">
                    {menuItems.map((item) => {
                        const isActive = pathname === item.href;
                        // On Tablet overlay (isTabletOverlay), we want full text, so it behaves like !isCollapsed

                        // If collapsed (and not overlay), show icons.
                        // If overlay (which implies !isCollapsed), show full text.
                        // If desktop expanded, show full text.

                        return isCollapsed && !isTabletOverlay ? (
                            <Tooltip
                                key={item.href}
                                content={item.name}
                                placement="right"
                                classNames={{ content: "bg-[#1E5D44] text-white" }}
                            >
                                <Link
                                    href={item.href}
                                    className={`
                                        flex items-center justify-center p-3 rounded-xl transition-all
                                        ${isActive
                                            ? "bg-[#1E5D44] text-white shadow-lg"
                                            : "text-green-100 hover:bg-[#349670] hover:text-white"
                                        }
                                    `}
                                >
                                    <item.icon size={22} />
                                </Link>
                            </Tooltip>
                        ) : (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`
                                    flex items-center gap-3 px-4 py-3 rounded-xl transition-all
                                    ${isActive
                                        ? "bg-[#1E5D44] text-white shadow-lg"
                                        : "text-green-100 hover:bg-[#349670] hover:text-white"
                                    }
                                `}
                            >
                                <item.icon size={20} />
                                <span className="font-medium">{item.name}</span>
                            </Link>
                        );
                    })}
                </div>

                {/* Logout Section */}
                <div className="p-4 border-t border-white/10">
                    {isCollapsed && !isTabletOverlay ? (
                        <Tooltip
                            content="Keluar"
                            placement="right"
                            classNames={{ content: "bg-red-500 text-white" }}
                        >
                            <Button className="w-full bg-transparent flex items-center justify-center p-3 rounded-xl text-green-100 hover:bg-[#349670] hover:text-white transition-colors" onPress={handleLogout}>
                                <LogOut size={22} />
                            </Button>
                        </Tooltip>
                    ) : (
                        <Button className="w-full bg-transparent flex items-center gap-3 px-4 py-3 rounded-xl text-green-100 hover:bg-[#349670] hover:text-white transition-colors" onPress={handleLogout}>
                            <LogOut size={20} />
                            <span className="font-medium">Keluar</span>
                        </Button>
                    )}
                </div>
            </aside>

            {/* 
              Tablet Placeholder: tracking the space when collapsed.
              If isTablet and using sticky mode, it's fine.
              If expanded (overlay), the 'aside' becomes fixed. 
              We need a dummy spacer to keep the content pushed to the right side of the visual area if we want to "reserve" space.
              BUT, usually overlay drawer implies it floats OVER content without reserving space.
              However, the requirement says "ketika di expand akan jadi Drawer yang beda di atas content halaman".
              The default state for tablet is collapsed (w-20). So we always need w-20 space reserved.
            */}
            {isTabletOverlay && (
                <div className="w-20 shrink-0 h-screen hidden md:block"></div>
            )}
        </>
    );
};
