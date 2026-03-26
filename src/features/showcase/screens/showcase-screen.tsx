'use client';

import { useState, type ReactNode } from 'react';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { InputField } from '@/components/ui/input-field';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup } from '@/components/ui/radio';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { Modal } from '@/components/ui/modal';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

import { Section, ThemeSection } from '../components';

type ModalVariant = 'info' | 'alert' | 'destructive';

export function ShowcaseScreen(): ReactNode {
  const t = useTranslations('showcase');
  const [sliderVal, setSliderVal] = useState(50);
  const [switchOn, setSwitchOn] = useState(true);
  const [radio, setRadio] = useState('option1');
  const [openModal, setOpenModal] = useState<ModalVariant | null>(null);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          {t('title')}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">{t('subtitle')}</p>
      </div>

      {/* Theme */}
      <ThemeSection />

      {/* Buttons */}
      <Section title={t('buttons')}>
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="ghost">Ghost</Button>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button isLoading>Loading</Button>
            <Button disabled>Disabled</Button>
          </div>
        </div>
      </Section>

      {/* Inputs */}
      <Section title={t('inputs')}>
        <div className="grid gap-4 sm:grid-cols-2">
          <InputField label="Default" placeholder="Type something..." />
          <InputField label="With value" defaultValue="Hello world" />
          <InputField
            label="With error"
            defaultValue="bad"
            error="This field has an error"
          />
          <InputField label="Disabled" placeholder="Disabled" disabled />
          <InputField
            label="With icon"
            placeholder="Search..."
            icon={
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            }
          />
          <InputField label="Password" type="password" placeholder="••••••••" />
        </div>
      </Section>

      {/* Textarea */}
      <Section title={t('textarea')}>
        <div className="grid gap-4 sm:grid-cols-2">
          <Textarea label="Message" placeholder="Write your message..." />
          <Textarea
            label="With error"
            defaultValue="Too short"
            error="Must be at least 20 characters"
          />
        </div>
      </Section>

      {/* Select */}
      <Section title={t('selects')}>
        <div className="grid gap-4 sm:grid-cols-2">
          <Select
            label="Country"
            placeholder="Select a country"
            options={[
              { value: 'us', label: 'United States' },
              { value: 'in', label: 'India' },
              { value: 'uk', label: 'United Kingdom' },
              { value: 'de', label: 'Germany' },
            ]}
          />
          <Select
            label="With error"
            placeholder="Select..."
            options={[{ value: 'a', label: 'Option A' }]}
            error="Selection is required"
          />
        </div>
      </Section>

      {/* Checkbox & Radio */}
      <Section title={t('checkboxRadio')}>
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-3">
            <Checkbox label="Accept terms and conditions" />
            <Checkbox label="Checked by default" defaultChecked />
            <Checkbox label="Disabled" disabled />
            <Checkbox label="With error" error="You must accept this" />
          </div>
          <RadioGroup
            name="demo-radio"
            label="Choose an option"
            value={radio}
            onChange={setRadio}
            options={[
              { value: 'option1', label: 'Option One' },
              { value: 'option2', label: 'Option Two' },
              { value: 'option3', label: 'Option Three' },
              { value: 'option4', label: 'Disabled', disabled: true },
            ]}
          />
        </div>
      </Section>

      {/* Switch & Slider */}
      <Section title={t('switchSlider')}>
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-4">
            <Switch
              label="Notifications"
              checked={switchOn}
              onChange={() => setSwitchOn(!switchOn)}
            />
            <Switch label="Dark mode" />
            <Switch label="Disabled" disabled />
          </div>
          <div className="space-y-4">
            <Slider
              label="Volume"
              showValue
              min={0}
              max={100}
              value={sliderVal}
              onChange={(e) => setSliderVal(Number(e.target.value))}
            />
            <Slider label="Disabled" value={30} disabled />
          </div>
        </div>
      </Section>

      {/* Badges */}
      <Section title={t('badges')}>
        <div className="flex flex-wrap gap-2">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="outline">Outline</Badge>
        </div>
      </Section>

      {/* Avatars */}
      <Section title={t('avatars')}>
        <div className="flex flex-wrap items-end gap-4">
          <Avatar name="John Doe" size="sm" />
          <Avatar name="Jane Smith" size="md" />
          <Avatar name="Bob Wilson" size="lg" />
          <Avatar
            name="User"
            size="lg"
            src="https://i.pravatar.cc/150?img=32"
          />
        </div>
      </Section>

      {/* Cards */}
      <Section title={t('cards')}>
        <div className="grid gap-4 sm:grid-cols-3">
          <Card>
            <h3 className="font-semibold text-foreground">Default Card</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              A simple card with default styling.
            </p>
          </Card>
          <Card className="border-primary/30">
            <h3 className="font-semibold text-foreground">Highlighted</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Card with primary border accent.
            </p>
          </Card>
          <Card className="bg-primary-light">
            <h3 className="font-semibold text-foreground">Tinted</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Card with primary light background.
            </p>
          </Card>
        </div>
      </Section>

      {/* Modals */}
      <Section title={t('modals')}>
        <div className="flex flex-wrap gap-2">
          <Button variant="primary" onClick={() => setOpenModal('info')}>
            {t('openInfo')}
          </Button>
          <Button variant="secondary" onClick={() => setOpenModal('alert')}>
            {t('openAlert')}
          </Button>
          <Button
            variant="destructive"
            onClick={() => setOpenModal('destructive')}
          >
            {t('openDelete')}
          </Button>
        </div>

        <Modal
          open={openModal === 'info'}
          onClose={() => setOpenModal(null)}
          variant="info"
          title={t('modalInfoTitle')}
          description={t('modalInfoDesc')}
          confirmLabel={t('confirm')}
          cancelLabel={t('cancel')}
          onConfirm={() => setOpenModal(null)}
        />
        <Modal
          open={openModal === 'alert'}
          onClose={() => setOpenModal(null)}
          variant="alert"
          title={t('modalAlertTitle')}
          description={t('modalAlertDesc')}
          confirmLabel={t('confirm')}
          cancelLabel={t('cancel')}
          onConfirm={() => setOpenModal(null)}
        />
        <Modal
          open={openModal === 'destructive'}
          onClose={() => setOpenModal(null)}
          variant="destructive"
          title={t('modalDeleteTitle')}
          description={t('modalDeleteDesc')}
          confirmLabel={t('delete')}
          cancelLabel={t('cancel')}
          onConfirm={() => setOpenModal(null)}
        />
      </Section>

      {/* Loading */}
      <Section title="Loading Spinner">
        <div className="flex flex-wrap items-center gap-6">
          <LoadingSpinner size="sm" fullScreen={false} message="Small" />
          <LoadingSpinner size="md" fullScreen={false} message="Medium" />
          <LoadingSpinner size="lg" fullScreen={false} message="Large" />
        </div>
      </Section>
    </div>
  );
}
