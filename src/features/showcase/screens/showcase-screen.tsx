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
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          {t('title')}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">{t('subtitle')}</p>
      </div>

      <ThemeSection />

      {/* Buttons */}
      <Section title={t('buttons')}>
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <Button variant="primary">{t('btnPrimary')}</Button>
            <Button variant="secondary">{t('btnSecondary')}</Button>
            <Button variant="outline">{t('btnOutline')}</Button>
            <Button variant="destructive">{t('btnDestructive')}</Button>
            <Button variant="ghost">{t('btnGhost')}</Button>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button size="sm">{t('btnSmall')}</Button>
            <Button size="md">{t('btnMedium')}</Button>
            <Button size="lg">{t('btnLarge')}</Button>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button isLoading>{t('btnLoading')}</Button>
            <Button disabled>{t('btnDisabled')}</Button>
          </div>
        </div>
      </Section>

      {/* Inputs */}
      <Section title={t('inputs')}>
        <div className="grid gap-4 sm:grid-cols-2">
          <InputField
            label={t('inputDefault')}
            placeholder={t('inputPlaceholder')}
          />
          <InputField
            label={t('inputWithValue')}
            defaultValue={t('inputHello')}
          />
          <InputField
            label={t('inputWithError')}
            defaultValue="bad"
            error={t('inputErrorMsg')}
          />
          <InputField
            label={t('inputDisabled')}
            placeholder={t('inputDisabled')}
            disabled
          />
          <InputField
            label={t('inputWithIcon')}
            placeholder={t('inputSearch')}
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
          <InputField
            label={t('inputPassword')}
            type="password"
            placeholder="••••••••"
          />
        </div>
      </Section>

      {/* Textarea */}
      <Section title={t('textarea')}>
        <div className="grid gap-4 sm:grid-cols-2">
          <Textarea
            label={t('textareaMessage')}
            placeholder={t('textareaPlaceholder')}
          />
          <Textarea
            label={t('textareaWithError')}
            defaultValue={t('textareaErrorVal')}
            error={t('textareaErrorMsg')}
          />
        </div>
      </Section>

      {/* Select */}
      <Section title={t('selects')}>
        <div className="grid gap-4 sm:grid-cols-2">
          <Select
            label={t('selectCountry')}
            placeholder={t('selectPlaceholder')}
            options={[
              { value: 'us', label: t('selectUS') },
              { value: 'in', label: t('selectIN') },
              { value: 'uk', label: t('selectUK') },
              { value: 'de', label: t('selectDE') },
            ]}
          />
          <Select
            label={t('selectWithError')}
            placeholder={t('selectErrorPlaceholder')}
            options={[{ value: 'a', label: t('selectOptionA') }]}
            error={t('selectErrorMsg')}
          />
        </div>
      </Section>

      {/* Checkbox & Radio */}
      <Section title={t('checkboxRadio')}>
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-3">
            <Checkbox label={t('cbAccept')} />
            <Checkbox label={t('cbChecked')} defaultChecked />
            <Checkbox label={t('cbDisabled')} disabled />
            <Checkbox label={t('cbWithError')} error={t('cbErrorMsg')} />
          </div>
          <RadioGroup
            name="demo-radio"
            label={t('radioLabel')}
            value={radio}
            onChange={setRadio}
            options={[
              { value: 'option1', label: t('radioOpt1') },
              { value: 'option2', label: t('radioOpt2') },
              { value: 'option3', label: t('radioOpt3') },
              { value: 'option4', label: t('radioDisabled'), disabled: true },
            ]}
          />
        </div>
      </Section>

      {/* Switch & Slider */}
      <Section title={t('switchSlider')}>
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-4">
            <Switch
              label={t('switchNotifications')}
              checked={switchOn}
              onChange={() => setSwitchOn(!switchOn)}
            />
            <Switch label={t('switchDarkMode')} />
            <Switch label={t('switchDisabled')} disabled />
          </div>
          <div className="space-y-4">
            <Slider
              label={t('sliderVolume')}
              showValue
              min={0}
              max={100}
              value={sliderVal}
              onChange={(e) => setSliderVal(Number(e.target.value))}
            />
            <Slider label={t('sliderDisabled')} value={30} disabled />
          </div>
        </div>
      </Section>

      {/* Badges */}
      <Section title={t('badges')}>
        <div className="flex flex-wrap gap-2">
          <Badge>{t('badgeDefault')}</Badge>
          <Badge variant="secondary">{t('badgeSecondary')}</Badge>
          <Badge variant="destructive">{t('badgeDestructive')}</Badge>
          <Badge variant="success">{t('badgeSuccess')}</Badge>
          <Badge variant="warning">{t('badgeWarning')}</Badge>
          <Badge variant="outline">{t('badgeOutline')}</Badge>
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
            <h3 className="font-semibold text-foreground">
              {t('cardDefault')}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {t('cardDefaultDesc')}
            </p>
          </Card>
          <Card className="border-primary/30">
            <h3 className="font-semibold text-foreground">
              {t('cardHighlighted')}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {t('cardHighlightedDesc')}
            </p>
          </Card>
          <Card className="bg-primary-light">
            <h3 className="font-semibold text-foreground">{t('cardTinted')}</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {t('cardTintedDesc')}
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

      {/* Loading Spinner */}
      <Section title={t('loadingSpinner')}>
        <div className="flex flex-wrap items-center gap-6">
          <LoadingSpinner
            size="sm"
            fullScreen={false}
            message={t('spinnerSmall')}
          />
          <LoadingSpinner
            size="md"
            fullScreen={false}
            message={t('spinnerMedium')}
          />
          <LoadingSpinner
            size="lg"
            fullScreen={false}
            message={t('spinnerLarge')}
          />
        </div>
      </Section>
    </div>
  );
}
