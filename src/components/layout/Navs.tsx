"use client"

import { useEffect, useRef } from "react"
import { Calendar03Icon, DollarSquareIcon, Home01Icon, UserListIcon, StickyNote01Icon, MessageMultipleIcon } from "../icons"
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export function NavTracker() {
  const backdropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const nav = document.getElementById('desktop-nav');
    const listItems = nav?.querySelectorAll('li');
    const backdrop = backdropRef.current;

    if (!nav || !listItems || !backdrop) return;

    const handleMouseMove = (e: MouseEvent) => {
      const navRect = nav.getBoundingClientRect();
      const mouseX = e.clientX - navRect.left;
      const mouseY = e.clientY - navRect.top;

      listItems.forEach((item) => {
        const rect = item.getBoundingClientRect();
        const itemX = rect.left - navRect.left;
        const itemY = rect.top - navRect.top;

        if (
          mouseX >= itemX &&
          mouseX <= itemX + rect.width &&
          mouseY >= itemY &&
          mouseY <= itemY + rect.height
        ) {
          backdrop.style.setProperty('--left', `${itemX}px`);
          backdrop.style.setProperty('--top', `${itemY}px`);
          backdrop.style.setProperty('--width', `${rect.width}px`);
          backdrop.style.setProperty('--height', `${rect.height}px`);
          backdrop.style.opacity = '1';
          backdrop.style.visibility = 'visible';
        }
      });
    };

    const handleMouseLeave = () => {
      backdrop.style.opacity = '0';
      backdrop.style.visibility = 'hidden';
    };

    nav.addEventListener('mousemove', handleMouseMove);
    nav.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      nav.removeEventListener('mousemove', handleMouseMove);
      nav.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={backdropRef}
      id="menu-backdrop"
      className="absolute -z-10 bg-primary/5 left-[var(--left)] top-[var(--top)] w-[var(--width)] h-[var(--height)] rounded-lg transition-all duration-300 ease-in-out opacity-0 invisible"
    />
  );
}

export function DesktopNav() {
  return (
    <nav>
      <ul id="desktop-nav" className="relative flex flex-col items-center gap-4 w-9">
        <NavLink href="/dashboard" description="Dashboard">
          <Home01Icon height={22} width={22} />
        </NavLink>
        <NavLink href="/dashboard/agenda" description="Agenda">
          <Calendar03Icon height={22} width={22} />
        </NavLink>
        <NavLink href="/dashboard/pacientes" description="Pacientes">
          <UserListIcon height={22} width={22} />
        </NavLink>
        <NavLink href="/dashboard/finanzas" description="Finanzas">
          <DollarSquareIcon height={22} width={22} />
        </NavLink>
        <NavLink href="/dashboard/herramientas" description="Herramientas">
          <StickyNote01Icon height={22} width={22} />
        </NavLink>
        <NavLink href="/dashboard/comunidad" description="Comunidad">
          <MessageMultipleIcon height={22} width={22} />
        </NavLink>

        <NavTracker />
      </ul>
    </nav>
  )
}

export function NavLink({ href, description, children }: { href: string; description: string; children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <li>
      <TooltipProvider>
        <Tooltip delayDuration={400}>
          <TooltipTrigger>
            <Link
              href={href}
              className={
                cn(`flex items-center justify-center rounded-lg p-3 stroke-foreground/45 
            ${pathname === href ? 'bg-primary/15 stroke-foreground' : 'opacity-55'}
            
          `)}>
              {children}
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right" sideOffset={6}>
            <p>{description}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </li>
  )
}