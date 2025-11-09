import React from 'react';
import { Link } from 'react-router-dom';
import { BuildingIcon, SearchIcon, EuroIcon, StoreIcon, MapIcon } from '@layera/icons';

const RealEstatePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold text-blue-600">
              Layera
            </Link>
            <nav className="flex space-x-6">
              <Link to="/jobs" className="text-gray-600 hover:text-green-600">
                Εργασία
              </Link>
              <Link to="/login" className="text-gray-600 hover:text-blue-600">
                Είσοδος
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
            <BuildingIcon size="xl" />
            Ακίνητα
          </h1>
          <p className="text-xl text-gray-600">
            Βρείτε το ιδανικό ακίνητο με γεωγραφικό εντοπισμό
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Search Card */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-3xl mb-4">
              <SearchIcon size="lg" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Αναζήτηση</h3>
            <p className="text-gray-600 mb-4">
              Ψάξτε για ακίνητα βάσει τοποθεσίας και κριτηρίων
            </p>
            <button className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors">
              Ξεκινήστε Αναζήτηση
            </button>
          </div>

          {/* Sell Card */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-3xl mb-4">
              <EuroIcon size="lg" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Πώληση</h3>
            <p className="text-gray-600 mb-4">
              Καταχωρήστε το ακίνητό σας για πώληση
            </p>
            <button className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition-colors">
              Καταχώρηση Πώλησης
            </button>
          </div>

          {/* Rent Card */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-3xl mb-4">
              <StoreIcon size="lg" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Ενοικίαση</h3>
            <p className="text-gray-600 mb-4">
              Βρείτε ή προσφέρετε ακίνητα προς ενοικίαση
            </p>
            <button className="w-full bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 transition-colors">
              Ενοικίαση
            </button>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-12 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <MapIcon size="md" />
            Χάρτης Περιοχών
          </h2>
          <div className="h-96 bg-gray-200 rounded-lg flex items-center justify-center">
            <div className="text-center text-gray-500">
              <p>Ο χάρτης θα εμφανιστεί εδώ</p>
              <p className="text-sm">(Leaflet integration coming soon)</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RealEstatePage;