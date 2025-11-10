import React from 'react';
import { Link } from 'react-router-dom';
import { BuildingIcon, SearchIcon, EuroIcon, StoreIcon, MapIcon } from '../../../../packages/icons/src';
import { Box, Flex, Stack, LayeraHeader, HeaderActionsGroup } from '../../../../packages/layout/src';
import { ThemeSwitcher } from '@layera/theme-switcher';

const RealEstatePage: React.FC = () => {
  const navigation = (
    <>
      <Link to="/jobs" className="la-text-secondary la-no-underline">
        Εργασία
      </Link>
      <Link to="/login" className="la-text-secondary la-no-underline">
        Είσοδος
      </Link>
    </>
  );

  return (
    <Box className="layera-full-height la-bg-surface-light">
      <LayeraHeader
        title="Layera"
        subtitle="Ακίνητα - Βρείτε το ιδανικό ακίνητο"
        variant="standard"
        navigation={navigation}
        actions={
          <HeaderActionsGroup>
            <ThemeSwitcher variant="icon" size="md" />
          </HeaderActionsGroup>
        }
      />

      {/* Main Content */}
      <Box as="main" className="layera-container--fullscreen layera-padding--lg">
        <Box className="layera-text-center layera-margin-bottom--xl">
          <h1 className="la-text-4xl la-font-bold la-text-primary la-leading-tight la-mb-4 la-page-title">
            <BuildingIcon size="xxl" />
            Ακίνητα
          </h1>
          <p className="la-text-xl la-text-secondary la-leading-normal">
            Βρείτε το ιδανικό ακίνητο με γεωγραφικό εντοπισμό
          </p>
        </Box>

        <Box className="layera-grid layera-grid--cols-1 layera-grid--tablet-cols-2 layera-grid--desktop-cols-3 layera-grid--gap-lg">
          {/* Search Card */}
          <Box className="la-card la-bg-primary">
            <Box className="la-text-3xl la-mb-4">
              <SearchIcon size="md" />
            </Box>
            <h3 className="la-text-xl la-font-semibold la-text-primary la-leading-snug la-mb-3">Αναζήτηση</h3>
            <p className="la-text-base la-text-secondary la-leading-normal la-mb-4">
              Ψάξτε για ακίνητα βάσει τοποθεσίας και κριτηρίων
            </p>
            <Box as="button" className="layera-full-width layera-padding--md la-bg-accent-blue la-text-white">
              Ξεκινήστε Αναζήτηση
            </Box>
          </Box>

          {/* Sell Card */}
          <Box className="la-card la-bg-primary">
            <Box className="la-text-3xl la-mb-4">
              <EuroIcon size="md" />
            </Box>
            <h3 className="la-text-xl la-font-semibold la-text-primary la-leading-snug la-mb-3">Πώληση</h3>
            <p className="la-text-base la-text-secondary la-leading-normal la-mb-4">
              Καταχωρήστε το ακίνητό σας για πώληση
            </p>
            <Box as="button" className="layera-full-width layera-padding--md la-bg-accent-green la-text-white">
              Καταχώρηση Πώλησης
            </Box>
          </Box>

          {/* Rent Card */}
          <Box className="la-card la-bg-primary">
            <Box className="la-text-3xl la-mb-4">
              <StoreIcon size="md" />
            </Box>
            <h3 className="la-text-xl la-font-semibold la-text-primary la-leading-snug la-mb-3">Ενοικίαση</h3>
            <p className="la-text-base la-text-secondary la-leading-normal la-mb-4">
              Βρείτε ή προσφέρετε ακίνητα προς ενοικίαση
            </p>
            <Box as="button" className="layera-full-width layera-padding--md la-bg-accent-purple la-text-white">
              Ενοικίαση
            </Box>
          </Box>
        </Box>

        {/* Map Section */}
        <Box className="layera-margin-top--xl la-card la-bg-primary">
          <h2 className="la-text-2xl la-font-bold la-text-primary la-leading-snug la-mb-4 la-section-title">
            <MapIcon size="md" />
            Χάρτης Περιοχών
          </h2>
          <Box className="la-map-placeholder la-bg-surface-medium">
            <Box className="layera-text-center la-text-tertiary">
              <p>Ο χάρτης θα εμφανιστεί εδώ</p>
              <p className="la-text-sm la-text-tertiary la-leading-normal">(Leaflet integration coming soon)</p>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default RealEstatePage;