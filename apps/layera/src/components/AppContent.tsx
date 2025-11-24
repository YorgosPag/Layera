/**
 * ARXES COMPLIANT App Content - FullAppLayout as Main Page
 *
 * Αντικατέστησε την παλιά εφαρμογή με χάρτες/pipelines
 * Τώρα εμφανίζει το FullAppLayout που αναπαράγει το HTML mockup
 */

import React from 'react';
import { CleanFullAppLayout } from './layout/CleanFullAppLayout';

export const AppContent: React.FC = () => {
  return <CleanFullAppLayout />;
};