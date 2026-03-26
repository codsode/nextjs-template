'use client';

import type { ReactNode } from 'react';
import { useTranslations } from 'next-intl';

import { useTheme } from '@/providers/theme-provider';
import { Button } from '@/components/ui/button';
import type { ThemeMode, ThemeName } from '@/config/themes';
import { Section } from './section';

const palettes: { name: ThemeName; label: string; color: string }[] = [
  { name: 'blue', label: 'Blue', color: 'bg-[rgb(37,99,235)]' },
  { name: 'green', label: 'Green', color: 'bg-[rgb(22,163,74)]' },
  { name: 'purple', label: 'Purple', color: 'bg-[rgb(124,58,237)]' },
];

const modes: { value: ThemeMode; labelKey: 'light' | 'dark' | 'system' }[] = [
  { value: 'light', labelKey: 'light' },
  { value: 'dark', labelKey: 'dark' },
  { value: 'system', labelKey: 'system' },
];

export function ThemeSection(): ReactNode {
  const t = useTranslations('showcase');
  const { theme, mode, setTheme, setMode } = useTheme();

  return (
    <Section title={t('theme')}>
      <p className="mb-4 text-sm text-muted-foreground">{t('themeDesc')}</p>

      <div className="space-y-5">
        {/* Color Palette */}
        <div>
          <p className="mb-2 text-sm font-medium text-foreground">
            {t('colorPalette')}
          </p>
          <div className="flex flex-wrap gap-2">
            {palettes.map((p) => (
              <button
                key={p.name}
                onClick={() => setTheme(p.name)}
                className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm transition-colors ${
                  theme === p.name
                    ? 'border-primary bg-primary-light text-foreground'
                    : 'border-border text-muted-foreground hover:border-primary/40'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 rounded-full ${p.color}`}
                />
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Mode */}
        <div>
          <p className="mb-2 text-sm font-medium text-foreground">
            {t('mode')}
          </p>
          <div className="flex flex-wrap gap-2">
            {modes.map((m) => (
              <Button
                key={m.value}
                variant={mode === m.value ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setMode(m.value)}
              >
                {t(m.labelKey)}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
