'use client';

import { useState, type ReactNode } from 'react';
import { useTranslations } from 'next-intl';

import { useAuth } from '@/features/auth';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { LanguageSwitcher } from './language-switcher';

export function Navbar(): ReactNode {
  const t = useTranslations('nav');
  const { user, handleLogout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-card/80 backdrop-blur-lg">
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

        <div className="hidden items-center gap-3 sm:flex">
          <LanguageSwitcher />
          <div className="h-5 w-px bg-border" />
          <span className="text-sm text-muted-foreground">{user?.name}</span>
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            {t('logout')}
          </Button>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg p-2 text-muted-foreground hover:bg-secondary sm:hidden"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          aria-expanded={isMobileMenuOpen}
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
            {isMobileMenuOpen ? (
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

      <div
        id="mobile-menu"
        className={cn(
          'border-t border-border bg-card px-4 py-3 sm:hidden',
          !isMobileMenuOpen && 'hidden',
        )}
      >
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">
              {user?.name}
            </span>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              {t('logout')}
            </Button>
          </div>
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
