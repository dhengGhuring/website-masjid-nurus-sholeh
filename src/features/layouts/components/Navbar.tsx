"use client"

import React from 'react'
import {
  Navbar as HeroNavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
} from "@heroui/react";
import { usePathname, useRouter } from 'next/navigation';
import { Building2, LogOut } from "lucide-react";
import { createClient } from '@/lib/supabase/client';
import { User } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';

export const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const supabase = createClient();
  const { isOpen, onOpenChange, onClose } = useDisclosure();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };

    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  // Hide Navbar on login page and admin page
  if (pathname === '/login' || pathname === '/admin') {
    return null;
  }

  return (
    <>
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
            {user ? (
              <div className="flex items-center gap-2">
                <Button as={Link} href="/admin" variant="ghost" color="primary" size="sm" className="font-medium" startContent={<Building2 size={16} />}>
                  Beranda Admin
                </Button>
                <Button
                  onPress={onOpenChange}
                  variant="ghost"
                  color="danger"
                  size="sm"
                  className="font-medium"
                  startContent={<LogOut size={16} />}
                >
                  Keluar
                </Button>
              </div>
            ) : (
              <Button as={Link} href="/login" variant="bordered" size="sm" className="font-medium">
                Login Admin
              </Button>
            )}
          </NavbarItem>
        </NavbarContent>
      </HeroNavbar>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Keluar</ModalHeader>
              <ModalBody className="pb-8 items-center">
                <h1>Apakah Anda yakin ingin keluar?</h1>
                <div className="flex gap-2">
                  <Button variant="ghost" color="danger" size="sm" className="font-medium" onPress={onClose}>
                    Batal
                  </Button>
                  <Button variant="ghost" color="primary" size="sm" className="font-medium" onPress={handleLogout}>
                    Ya
                  </Button>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>

  )
}
