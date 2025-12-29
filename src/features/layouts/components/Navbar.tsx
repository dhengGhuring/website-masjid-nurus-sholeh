"use client"

import React from 'react'
import {
  Navbar as HeroNavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  NavbarMenuToggle,
  NavbarMenu,
  Accordion,
  AccordionItem,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
} from "@heroui/react";
import { usePathname } from 'next/navigation';

export const Navbar = () => {
  const pathname = usePathname();

  // Hide Navbar on login page
  if (pathname === '/login') {
    return null;
  }

  return (
    <HeroNavbar position="static">
      <NavbarBrand>
        {/* <AcmeLogo /> */}
        <p className="font-bold text-inherit">ACME</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="#">
            Features
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link aria-current="page" href="#">
            Customers
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Integrations
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="#">Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="#" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
    </HeroNavbar>

  )
}
