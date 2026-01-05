"use client"

import React from 'react'
import {
  Navbar as HeroNavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@heroui/react";
import { usePathname } from 'next/navigation';
import { Building2 } from "lucide-react";

export const Navbar = () => {
  const pathname = usePathname();

  // Hide Navbar on login page
  if (pathname === '/login') {
    return null;
  }

  return (
    <HeroNavbar maxWidth="xl" position="sticky" className="bg-background/70 backdrop-blur-md border-b border-divider">
      <NavbarBrand className="gap-3">
        <div className="bg-primary/10 p-2 rounded-lg text-primary">
          <Building2 size={24} />
        </div>
        <div className="flex flex-col">
          <p className="font-bold text-foreground leading-none">Masjid Nurus Sholeh</p>
          <p className="text-xs text-muted-foreground">Laporan Keuangan</p>
        </div>
      </NavbarBrand>

      <NavbarContent justify="end">
        <NavbarItem>
          <Button as={Link} href="/login" variant="bordered" size="sm" className="font-medium">
            Login Admin
          </Button>
        </NavbarItem>
      </NavbarContent>
    </HeroNavbar>

  )
}
