/**
 * MobileGeoMap.tsx - ΜΟΝΟ για κινητά τηλέφωνα
 * Εδώ θα γράφουμε μόνο τα UI elements για mobile συσκευές
 */

import React from 'react';

export interface MobileGeoMapProps {
  // Props που χρειάζονται για το mobile UI
}

/**
 * Mobile-specific UI elements για το GeoMap
 * Περιλαμβάνει: πλήκτρα, κάρτες, mobile navigation κλπ
 */
export const MobileGeoMap: React.FC<MobileGeoMapProps> = () => {
  return (
    <>
      {/* Permanent Category Buttons - MOBILE ONLY */}
      <div style={{
        position: 'absolute',
        top: '70px',
        left: '10px',
        right: '10px',
        zIndex: 1000,
        display: 'flex',
        gap: '8px',
        padding: '0 4px'
      }}>
        {/* Ακίνητα Button - Green */}
        <button style={{
          flex: 1,
          backgroundColor: '#22c55e',
          border: '1px solid #16a34a',
          borderRadius: '8px',
          padding: '10px',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          boxShadow: '0 2px 4px rgba(34, 197, 94, 0.2)',
          minHeight: '45px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        onClick={() => {
          console.log('Mobile: Ακίνητα selected');
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor = '#16a34a';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.backgroundColor = '#22c55e';
        }}
        >
          <span style={{
            fontSize: '0.8rem',
            fontWeight: 'bold',
            color: 'white',
            textAlign: 'center'
          }}>
            Ακίνητα
          </span>
        </button>

        {/* Εργασία Button - Blue */}
        <button style={{
          flex: 1,
          backgroundColor: '#3b82f6',
          border: '1px solid #2563eb',
          borderRadius: '8px',
          padding: '10px',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          boxShadow: '0 2px 4px rgba(59, 130, 246, 0.2)',
          minHeight: '45px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        onClick={() => {
          console.log('Mobile: Εργασία selected');
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor = '#2563eb';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.backgroundColor = '#3b82f6';
        }}
        >
          <span style={{
            fontSize: '0.8rem',
            fontWeight: 'bold',
            color: 'white',
            textAlign: 'center'
          }}>
            Εργασία
          </span>
        </button>
      </div>

      {/* Εδώ θα προσθέτουμε περισσότερα mobile-specific UI elements */}
    </>
  );
};