import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import { Kbd } from "@nextui-org/kbd";
import { Link } from "@nextui-org/link";
import { Input } from "@nextui-org/input";
import { link as linkStyles } from "@nextui-org/theme";
import NextLink from "next/link";
import clsx from "clsx";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import {
  TwitterIcon,
  GithubIcon,
  DiscordIcon,
  HeartFilledIcon,
  SearchIcon,
  Logo,
} from "@/components/icons";
import { UserContextI, useUser } from "@/context/UserContext";
import { User } from "@nextui-org/user";
import { LogOut } from "lucide-react";
import { deleteCookie } from "cookies-next";

export const Navbar = () => {
  const { user } = useUser() as UserContextI;
  const handleOnLogout = () => {
    localStorage.clear();
    deleteCookie('currentUser');
    window.location.href = '/login';

  }

  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Logo />
            <p className="font-bold text-inherit">EASY URL</p>
          </NextLink>
        </NavbarBrand>
        <ul className="hidden lg:flex gap-4 justify-start ml-2">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium",
                )}
                color="foreground"
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <Link isExternal aria-label="Github" href={siteConfig.links.github}>
            <GithubIcon className="text-default-500" />
          </Link>
          <ThemeSwitch />
        </NavbarItem>
        <NavbarItem className="hidden md:flex">
          {
            user.isAuthenticaded ?
              <User
                name={user.name}
                description={user.email}
              />
              :
              <Button
                as={Link}
                className="text-sm font-normal text-default-600 bg-default-100"
                href={siteConfig.navMenuItems[8].href}
                startContent={<HeartFilledIcon className="text-danger" />}
                variant="flat"
              >
                Login
              </Button>

          }
        </NavbarItem>
        <NavbarItem>
          <Button
            // as={Link}
            className="text-sm font-normal text-default-600 bg-default-100"
            // href={'/login'}
            startContent={<LogOut />}
            variant="flat"
            onClick={handleOnLogout}
          >
          </Button>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <Link isExternal aria-label="Github" href={siteConfig.links.github}>
          <GithubIcon className="text-default-500" />
        </Link>
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>
      {/* {
        siteConfig.navMenuItems.map((item) => (
          <NavbarContent
            key={item.label}
            className="sm:hidden basis-1 pl-4" justify="end"
          >
            <NavbarItem
              className="hidden sm:flex gap-2"
            >
              <Link
                aria-label={item.label}
                href={item.href}
              >
                {
                  item.label
                }
              </Link>
            </NavbarItem>
          </NavbarContent>

        ))
      } */}


    </NextUINavbar>
  );
};
