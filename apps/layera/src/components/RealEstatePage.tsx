import React from 'react';
import { Link } from 'react-router-dom';
import { BuildingIcon, SearchIcon, EuroIcon, StoreIcon, MapIcon } from '@layera/icons';

const RealEstatePage: React.FC = () => {
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
              <Link to="/jobs" className="la-text-secondary la-no-underline">
                Εργασία
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
            <BuildingIcon size="xxl" />
            Ακίνητα
          </h1>
          <p className="la-text-xl la-text-secondary la-leading-normal">
            Βρείτε το ιδανικό ακίνητο με γεωγραφικό εντοπισμό
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Search Card */}
          <div className="la-card la-bg-primary">
            <div className="la-text-3xl la-mb-4">
              <SearchIcon size="md" />
            </div>
            <h3 className="la-text-xl la-font-semibold la-text-primary la-leading-snug la-mb-3">Αναζήτηση</h3>
            <p className="la-text-base la-text-secondary la-leading-normal la-mb-4">
              Ψάξτε για ακίνητα βάσει τοποθεσίας και κριτηρίων
            </p>
            <button className="w-full py-2 px-4 rounded transition-colors la-bg-accent-blue la-text-white">
              Ξεκινήστε Αναζήτηση
            </button>
          </div>

          {/* Sell Card */}
          <div className="la-card la-bg-primary">
            <div className="la-text-3xl la-mb-4">
              <EuroIcon size="md" />
            </div>
            <h3 className="la-text-xl la-font-semibold la-text-primary la-leading-snug la-mb-3">Πώληση</h3>
            <p className="la-text-base la-text-secondary la-leading-normal la-mb-4">
              Καταχωρήστε το ακίνητό σας για πώληση
            </p>
            <button className="w-full py-2 px-4 rounded transition-colors la-bg-accent-green la-text-white">
              Καταχώρηση Πώλησης
            </button>
          </div>

          {/* Rent Card */}
          <div className="la-card la-bg-primary">
            <div className="la-text-3xl la-mb-4">
              <StoreIcon size="md" />
            </div>
            <h3 className="la-text-xl la-font-semibold la-text-primary la-leading-snug la-mb-3">Ενοικίαση</h3>
            <p className="la-text-base la-text-secondary la-leading-normal la-mb-4">
              Βρείτε ή προσφέρετε ακίνητα προς ενοικίαση
            </p>
            <button className="w-full py-2 px-4 rounded transition-colors la-bg-accent-purple la-text-white">
              Ενοικίαση
            </button>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-12 la-card la-bg-primary">
          <h2 className="la-text-2xl la-font-bold la-text-primary la-leading-snug la-mb-4 la-section-title">
            <MapIcon size="md" />
            Χάρτης Περιοχών
          </h2>
          <div className="la-map-placeholder la-bg-surface-medium">
            <div className="text-center la-text-tertiary">
              <p>Ο χάρτης θα εμφανιστεί εδώ</p>
              <p className="la-text-sm la-text-tertiary la-leading-normal">(Leaflet integration coming soon)</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RealEstatePage;