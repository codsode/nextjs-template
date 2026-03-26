'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { useTranslations } from 'next-intl';

import { useAuth } from '@/features/auth';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { LanguageSwitcher } from './language-switcher';

export function Navbar(): ReactNode {
  const t = useTranslations('nav');
  const { user, handleLogout } = useAuth();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent): void => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  return (
    <header
      ref={menuRef}
      className="sticky top-0 z-40 border-b border-border bg-card/80 backdrop-blur-lg"
    >
      {/* Top bar */}
      <nav
        className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        <Link
          href="/home"
          className="text-lg font-bold tracking-tight text-foreground"
        >
          {t('appName')}
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-3 sm:flex">
          <LanguageSwitcher />
          <div className="h-5 w-px bg-border" />
          <span className="text-sm text-muted-foreground">{user?.name}</span>
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            {t('logout')}
          </Button>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-secondary sm:hidden"
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={t('toggleMenu')}
        >
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            {open ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile dropdown */}
      <div
        id="mobile-menu"
        className={cn(
          'overflow-hidden transition-all duration-200 ease-in-out sm:hidden',
          open ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0',
        )}
      >
        <div className="border-t border-border bg-card px-4 py-4">
          {/* User info */}
          <div className="flex items-center gap-3">
            <Avatar name={user?.name ?? ''} size="sm" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-foreground">
                {user?.name}
              </p>
              <p className="truncate text-xs text-muted-foreground">
                {user?.email}
              </p>
            </div>
          </div>

          {/* Actions row */}
          <div className="mt-4 flex items-center gap-2">
            <LanguageSwitcher />
            <div className="flex-1" />
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setOpen(false);
                handleLogout();
              }}
            >
              {t('logout')}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
