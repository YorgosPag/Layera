import React from 'react';
import { Link } from 'react-router-dom';
import { BriefcaseIcon, SearchIcon, EditIcon, FolderIcon, MapIcon } from '@layera/icons';

const JobsPage: React.FC = () => {
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
              <Link to="/marketplace" className="text-gray-600 hover:text-blue-600">
                Ακίνητα
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
            <BriefcaseIcon size="xl" />
            Εργασία
          </h1>
          <p className="text-xl text-gray-600">
            Βρείτε ή προσφέρετε εργασία με τοπική στόχευση
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Search Jobs Card */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-3xl mb-4">
              <SearchIcon size="lg" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Αναζήτηση Εργασίας</h3>
            <p className="text-gray-600 mb-4">
              Ψάξτε για θέσεις εργασίας στην περιοχή σας
            </p>
            <button className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition-colors">
              Αναζήτηση
            </button>
          </div>

          {/* Post Job Card */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-3xl mb-4">
              <EditIcon size="lg" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Καταχώρηση Θέσης</h3>
            <p className="text-gray-600 mb-4">
              Δημοσιεύστε μια θέση εργασίας στην επιχείρησή σας
            </p>
            <button className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors">
              Καταχώρηση
            </button>
          </div>

          {/* Browse Categories Card */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-3xl mb-4">
              <FolderIcon size="lg" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Κατηγορίες</h3>
            <p className="text-gray-600 mb-4">
              Περιηγηθείτε σε διαφορετικές κατηγορίες εργασίας
            </p>
            <button className="w-full bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 transition-colors">
              Κατηγορίες
            </button>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-12 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <MapIcon size="md" />
            Χάρτης Θέσεων Εργασίας
          </h2>
          <div className="h-96 bg-gray-200 rounded-lg flex items-center justify-center">
            <div className="text-center text-gray-500">
              <p>Ο χάρτης θέσεων εργασίας θα εμφανιστεί εδώ</p>
              <p className="text-sm">(Leaflet integration coming soon)</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default JobsPage;