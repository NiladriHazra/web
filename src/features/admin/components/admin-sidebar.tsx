"use client";

import { useRef, useLayoutEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  DashboardSpeed02Icon,
  UserMultipleIcon,
  MailAtSign01Icon,
  Logout03Icon,
} from "@hugeicons/core-free-icons";
import { siteConfig } from "@klipeo/shared";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { authClient } from "@/features/auth/client";
import { BrandLogo } from "@/features/marketing/components/brand-logo";

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", icon: DashboardSpeed02Icon },
  { href: "/admin/users", label: "Users", icon: UserMultipleIcon },
  { href: "/admin/waitlist", label: "Waitlist", icon: MailAtSign01Icon },
] as const;

export function AdminSidebar() {
  const pathname = usePathname();
  const { data: session } = authClient.useSession();
  const menuRef = useRef<HTMLUListElement>(null);
  const hasAnimated = useRef(false);

  const isActive = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  useLayoutEffect(() => {
    if (hasAnimated.current || !menuRef.current) return;
    hasAnimated.current = true;

    const items = menuRef.current.querySelectorAll("li");
    gsap.fromTo(
      items,
      { opacity: 0, x: -12 },
      { opacity: 1, x: 0, duration: 0.35, ease: "power2.out", stagger: 0.06 },
    );
  }, []);

  return (
    <Sidebar>
      <SidebarHeader className="h-12 justify-center border-b border-sidebar-border p-0 px-4">
        <div className="flex items-center gap-2">
          <BrandLogo size="sm" />
          <span className="text-sm font-semibold tracking-tight text-white">
            {siteConfig.name}
          </span>
          <span className="ml-auto rounded bg-amber-500/15 px-1.5 py-0.5 text-[0.6rem] font-medium text-amber-400">
            Admin
          </span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu ref={menuRef}>
              {NAV_ITEMS.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    isActive={isActive(item.href)}
                    render={<Link href={item.href} prefetch />}
                  >
                    <HugeiconsIcon icon={item.icon} size={18} />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        {session && (
          <div className="flex items-center gap-3 px-2 py-2">
            <Avatar className="h-8 w-8">
              {session.user.image && (
                <AvatarImage src={session.user.image} alt={session.user.name} />
              )}
              <AvatarFallback className="text-xs">
                {session.user.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{session.user.name}</p>
              <p className="truncate text-xs text-muted-foreground">
                {session.user.email}
              </p>
            </div>
          </div>
        )}
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() =>
                authClient.signOut({
                  fetchOptions: {
                    onSuccess: () => window.location.assign("/"),
                  },
                })
              }
              className="text-muted-foreground hover:text-destructive"
            >
              <HugeiconsIcon icon={Logout03Icon} size={18} />
              <span>Sign Out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
