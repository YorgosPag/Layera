import React from 'react';
import { Link } from 'react-router-dom';
import { BriefcaseIcon, SearchIcon, EditIcon, FolderIcon, MapIcon } from '@layera/icons';

const JobsPage: React.FC = () => {
  return (
    <div className="min-h-screen la-bg-surface-light">
      {/* Header */}
      <header className="la-header la-bg-primary">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="la-text-2xl la-font-bold la-text-primary la-no-underline">
              Layera
            </Link>
            <nav className="flex space-x-6">
              <Link to="/marketplace" className="la-text-secondary la-no-underline">
                Ακίνητα
              </Link>
              <Link to="/login" className="la-text-secondary la-no-underline">
                Είσοδος
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="la-text-4xl la-font-bold la-text-primary la-leading-tight la-mb-4 la-page-title">
            <BriefcaseIcon size="xxl" />
            Εργασία
          </h1>
          <p className="la-text-xl la-text-secondary la-leading-normal">
            Βρείτε ή προσφέρετε εργασία με τοπική στόχευση
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Search Jobs Card */}
          <div className="la-card la-bg-primary">
            <div className="la-text-3xl la-mb-4">
              <SearchIcon size="md" />
            </div>
            <h3 className="la-text-xl la-font-semibold la-text-primary la-leading-snug la-mb-3">Αναζήτηση Εργασίας</h3>
            <p className="la-text-base la-text-secondary la-leading-normal la-mb-4">
              Ψάξτε για θέσεις εργασίας στην περιοχή σας
            </p>
            <button className="w-full py-2 px-4 rounded transition-colors la-bg-accent-green la-text-white">
              Αναζήτηση
            </button>
          </div>

          {/* Post Job Card */}
          <div className="la-card la-bg-primary">
            <div className="la-text-3xl la-mb-4">
              <EditIcon size="md" />
            </div>
            <h3 className="la-text-xl la-font-semibold la-text-primary la-leading-snug la-mb-3">Καταχώρηση Θέσης</h3>
            <p className="la-text-base la-text-secondary la-leading-normal la-mb-4">
              Δημοσιεύστε μια θέση εργασίας στην επιχείρησή σας
            </p>
            <button className="w-full py-2 px-4 rounded transition-colors la-bg-accent-blue la-text-white">
              Καταχώρηση
            </button>
          </div>

          {/* Browse Categories Card */}
          <div className="la-card la-bg-primary">
            <div className="la-text-3xl la-mb-4">
              <FolderIcon size="md" />
            </div>
            <h3 className="la-text-xl la-font-semibold la-text-primary la-leading-snug la-mb-3">Κατηγορίες</h3>
            <p className="la-text-base la-text-secondary la-leading-normal la-mb-4">
              Περιηγηθείτε σε διαφορετικές κατηγορίες εργασίας
            </p>
            <button className="w-full py-2 px-4 rounded transition-colors la-bg-accent-purple la-text-white">
              Κατηγορίες
            </button>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-12 la-card la-bg-primary">
          <h2 className="la-text-2xl la-font-bold la-text-primary la-leading-snug la-mb-4 la-section-title">
            <MapIcon size="md" />
            Χάρτης Θέσεων Εργασίας
          </h2>
          <div className="la-map-placeholder la-bg-surface-medium">
            <div className="text-center la-text-tertiary">
              <p>Ο χάρτης θέσεων εργασίας θα εμφανιστεί εδώ</p>
              <p className="la-text-sm la-text-tertiary la-leading-normal">(Leaflet integration coming soon)</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default JobsPage;