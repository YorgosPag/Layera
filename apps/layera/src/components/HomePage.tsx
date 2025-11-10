import React from 'react';
import { Link } from 'react-router-dom';
import { BuildingIcon, BriefcaseIcon } from '@layera/icons';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center la-bg-gradient-primary">
      <div className="text-center p-8">
        <h1 className="la-text-5xl la-font-bold la-text-primary la-leading-tight">
          Layera
        </h1>
        <p className="la-text-xl la-text-secondary la-leading-relaxed la-mb-12">
          Ενοποιημένη πλατφόρμα για Ακίνητα και Εργασία με Geo-Location
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
          <Link
            to="/marketplace"
            className="p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow border-l-4 la-bg-primary la-card-accent-primary"
          >
            <div className="la-text-4xl la-mb-4">
              <BuildingIcon size="xxl" />
            </div>
            <h2 className="la-text-2xl la-font-semibold la-text-primary la-leading-snug la-mb-3">Ακίνητα</h2>
            <p className="la-text-base la-text-secondary la-leading-normal">
              Αναζήτηση και καταχώρηση ακινήτων με γεωγραφικό εντοπισμό
            </p>
          </Link>

          <Link
            to="/jobs"
            className="p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow border-l-4 la-bg-primary la-card-accent-green"
          >
            <div className="la-text-4xl la-mb-4">
              <BriefcaseIcon size="xxl" />
            </div>
            <h2 className="la-text-2xl la-font-semibold la-text-primary la-leading-snug la-mb-3">Εργασία</h2>
            <p className="la-text-base la-text-secondary la-leading-normal">
              Αναζήτηση και προσφορά εργασίας με τοπική στόχευση
            </p>
          </Link>
        </div>

        <div className="mt-12">
          <Link
            to="/login"
            className="px-8 py-3 rounded-lg la-text-lg la-font-semibold la-btn-primary"
          >
            Είσοδος / Εγγραφή
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;