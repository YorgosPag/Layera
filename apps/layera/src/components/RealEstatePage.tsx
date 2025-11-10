import React from 'react';
import { BuildingIcon, SearchIcon, EuroIcon, StoreIcon } from '../../../../packages/icons/src';
import { Box } from '../../../../packages/layout/src';

const RealEstatePage: React.FC = () => {
  return (
    <Box className="layera-padding--lg">
      <Box className="layera-text-center layera-margin-bottom--lg">
        <p className="la-text-lg la-text-secondary la-leading-normal">
          Βρείτε το ιδανικό ακίνητο με γεωγραφικό εντοπισμό
        </p>
      </Box>

      <Box className="layera-grid layera-grid--cols-1 layera-grid--tablet-cols-2 layera-grid--desktop-cols-3 layera-grid--gap-lg">
        {/* Search Card */}
        <Box className="la-card la-bg-surface-medium">
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
        <Box className="la-card la-bg-surface-medium">
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
        <Box className="la-card la-bg-surface-medium">
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

    </Box>
  );
};

export default RealEstatePage;