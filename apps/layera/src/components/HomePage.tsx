import React from 'react';
import { Link } from 'react-router-dom';
import { BuildingIcon, BriefcaseIcon } from '../../../../packages/icons/src';
import { Box, Flex, Stack, LayeraHeader, HeaderActionsGroup } from '../../../../packages/layout/src';
import { ResponsiveContainer, useViewport } from '../../../../packages/viewport/src';
import { ThemeSwitcher } from '@layera/theme-switcher';

const HomePage: React.FC = () => {
  const { deviceType } = useViewport();

  return (
    <Box className="layera-full-height layera-container--fullscreen">
      <LayeraHeader
        title="Layera"
        subtitle="Ενοποιημένη πλατφόρμα για Ακίνητα και Εργασία"
        variant="rich"
        actions={
          <HeaderActionsGroup>
            <ThemeSwitcher variant="icon" size="md" />
          </HeaderActionsGroup>
        }
      />

      <ResponsiveContainer
        className="layera-full-height la-bg-gradient-primary layera-container--fullscreen"
        enableMaxWidth={false}
      >
        <Stack className="layera-text-center layera-responsive-container--with-padding layera-stack--spacing-lg">
        <h1 className="la-text-5xl la-font-bold la-text-primary la-leading-tight">
          Layera
        </h1>
        <p className="la-text-xl la-text-secondary la-leading-relaxed">
          Ενοποιημένη πλατφόρμα για Ακίνητα και Εργασία με Geo-Location
        </p>

        <Flex className="layera-grid layera-grid--cols-1 layera-grid--tablet-cols-2 layera-grid--gap-lg">
          <Link
            to="/marketplace"
            className="layera-padding--lg la-bg-primary la-card-accent-primary"
          >
            <Box className="la-text-4xl layera-margin-bottom--md">
              <BuildingIcon size="xxl" />
            </Box>
            <h2 className="la-text-2xl la-font-semibold la-text-primary la-leading-snug layera-margin-bottom--md">Ακίνητα</h2>
            <p className="la-text-base la-text-secondary la-leading-normal">
              Αναζήτηση και καταχώρηση ακινήτων με γεωγραφικό εντοπισμό
            </p>
          </Link>

          <Link
            to="/jobs"
            className="layera-padding--lg la-bg-primary la-card-accent-green"
          >
            <Box className="la-text-4xl layera-margin-bottom--md">
              <BriefcaseIcon size="xxl" />
            </Box>
            <h2 className="la-text-2xl la-font-semibold la-text-primary la-leading-snug layera-margin-bottom--md">Εργασία</h2>
            <p className="la-text-base la-text-secondary la-leading-normal">
              Αναζήτηση και προσφορά εργασίας με τοπική στόχευση
            </p>
          </Link>
        </Flex>

        <Box className="layera-margin-top--xl">
          <Link
            to="/login"
            className="layera-padding--lg la-text-lg la-font-semibold la-btn-primary"
          >
            Είσοδος / Εγγραφή
          </Link>
        </Box>
      </Stack>
    </ResponsiveContainer>
    </Box>
  );
};

export default HomePage;