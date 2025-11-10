import React from 'react';
import { BriefcaseIcon, SearchIcon, EditIcon, FolderIcon } from '../../../../packages/icons/src';
import { Box } from '../../../../packages/layout/src';

const JobsPage: React.FC = () => {

  return (
    <Box className="layera-padding--lg">
      <Box className="layera-text-center layera-margin-bottom--lg">
        <p className="la-text-lg la-text-secondary la-leading-normal">
          Βρείτε ή προσφέρετε εργασία με τοπική στόχευση
        </p>
      </Box>

          <Box className="layera-grid layera-grid--cols-1 layera-grid--tablet-cols-2 layera-grid--desktop-cols-3 layera-grid--gap-lg">
            {/* Search Jobs Card */}
            <Box className="la-card la-bg-surface-medium">
              <Box className="la-text-3xl la-mb-4">
                <SearchIcon size="md" />
              </Box>
              <h3 className="la-text-xl la-font-semibold la-text-primary la-leading-snug la-mb-3">Αναζήτηση Εργασίας</h3>
              <p className="la-text-base la-text-secondary la-leading-normal la-mb-4">
                Ψάξτε για θέσεις εργασίας στην περιοχή σας
              </p>
              <Box as="button" className="layera-full-width layera-padding--md la-bg-accent-green la-text-white">
                Αναζήτηση
              </Box>
            </Box>

            {/* Post Job Card */}
            <Box className="la-card la-bg-surface-medium">
              <Box className="la-text-3xl la-mb-4">
                <EditIcon size="md" />
              </Box>
              <h3 className="la-text-xl la-font-semibold la-text-primary la-leading-snug la-mb-3">Καταχώρηση Θέσης</h3>
              <p className="la-text-base la-text-secondary la-leading-normal la-mb-4">
                Δημοσιεύστε μια θέση εργασίας στην επιχείρησή σας
              </p>
              <Box as="button" className="layera-full-width layera-padding--md la-bg-accent-blue la-text-white">
                Καταχώρηση
              </Box>
            </Box>

            {/* Browse Categories Card */}
            <Box className="la-card la-bg-surface-medium">
              <Box className="la-text-3xl la-mb-4">
                <FolderIcon size="md" />
              </Box>
              <h3 className="la-text-xl la-font-semibold la-text-primary la-leading-snug la-mb-3">Κατηγορίες</h3>
              <p className="la-text-base la-text-secondary la-leading-normal la-mb-4">
                Περιηγηθείτε σε διαφορετικές κατηγορίες εργασίας
              </p>
              <Box as="button" className="layera-full-width layera-padding--md la-bg-accent-purple la-text-white">
                Κατηγορίες
              </Box>
            </Box>
      </Box>

    </Box>
  );
};

export default JobsPage;