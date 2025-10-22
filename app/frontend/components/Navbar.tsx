import * as React from "react"
import { Link } from "@inertiajs/react"
import { Button } from "./Button"
import { ThemeToggle } from "./ThemeToggle"
import { Building2, MessageSquare, Menu, X } from "lucide-react"
import { cn } from "../lib/utils"

interface NavbarProps {
  className?: string
  children?: React.ReactNode
}

export function Navbar({ className, children }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)

  return (
    <header className={cn("border-b bg-card", className)} role="banner">
      <div className="container mx-auto px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo/Brand */}
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-primary flex size-8 items-center justify-center rounded-lg">
              <span className="text-lg font-bold text-primary-foreground">F</span>
            </div>
            <span className="text-xl font-semibold text-foreground">Filt.io</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-1 md:flex" role="navigation">
            <NavLink href="/companies" icon={<Building2 className="size-4" />}>
              Companies
            </NavLink>
            <NavLink href="/chats" icon={<MessageSquare className="size-4" />}>
              Chats
            </NavLink>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2">
            {children}
            <div className="hidden md:block">
              <ThemeToggle />
            </div>
            
            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="size-5" />
              ) : (
                <Menu className="size-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="border-t py-4 md:hidden">
            <nav className="flex flex-col gap-2" role="navigation">
              <MobileNavLink
                href="/companies"
                icon={<Building2 className="size-4" />}
                onClick={() => setMobileMenuOpen(false)}
              >
                Companies
              </MobileNavLink>
              <MobileNavLink
                href="/chats"
                icon={<MessageSquare className="size-4" />}
                onClick={() => setMobileMenuOpen(false)}
              >
                Chats
              </MobileNavLink>
              <div className="mt-2 flex items-center justify-between border-t pt-4">
                <span className="text-sm text-muted-foreground">Theme</span>
                <ThemeToggle />
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

interface NavLinkProps {
  href: string
  children: React.ReactNode
  icon?: React.ReactNode
}

function NavLink({ href, children, icon }: NavLinkProps) {
  // Get current path to determine active state
  const isActive = typeof window !== 'undefined' && window.location.pathname.startsWith(href)

  return (
    <Link href={href}>
      <Button
        variant="ghost"
        className={cn(
          "gap-2",
          isActive && "bg-accent text-accent-foreground"
        )}
      >
        {icon}
        {children}
      </Button>
    </Link>
  )
}

function MobileNavLink({ href, children, icon, onClick }: NavLinkProps & { onClick?: () => void }) {
  const isActive = typeof window !== 'undefined' && window.location.pathname.startsWith(href)

  return (
    <Link href={href} onClick={onClick}>
      <Button
        variant="ghost"
        className={cn(
          "w-full justify-start gap-2",
          isActive && "bg-accent text-accent-foreground"
        )}
      >
        {icon}
        {children}
      </Button>
    </Link>
  )
}

export { NavLink, MobileNavLink }

