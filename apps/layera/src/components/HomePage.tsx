import React from 'react';
import { Link } from 'react-router-dom';
import { BuildingIcon, BriefcaseIcon } from '@layera/icons';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center">
      <div className="text-center p-8">
        <h1 className="text-5xl font-bold text-blue-600 mb-6">
          Layera
        </h1>
        <p className="text-xl text-gray-600 mb-12">
          Ενοποιημένη πλατφόρμα για Ακίνητα και Εργασία με Geo-Location
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
          <Link
            to="/marketplace"
            className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow border-l-4 border-blue-500"
          >
            <div className="text-4xl mb-4">
              <BuildingIcon size="xl" />
            </div>
            <h2 className="text-2xl font-semibold text-blue-600 mb-3">Ακίνητα</h2>
            <p className="text-gray-600">
              Αναζήτηση και καταχώρηση ακινήτων με γεωγραφικό εντοπισμό
            </p>
          </Link>

          <Link
            to="/jobs"
            className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow border-l-4 border-green-500"
          >
            <div className="text-4xl mb-4">
              <BriefcaseIcon size="xl" />
            </div>
            <h2 className="text-2xl font-semibold text-green-600 mb-3">Εργασία</h2>
            <p className="text-gray-600">
              Αναζήτηση και προσφορά εργασίας με τοπική στόχευση
            </p>
          </Link>
        </div>

        <div className="mt-12">
          <Link
            to="/login"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Είσοδος / Εγγραφή
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;