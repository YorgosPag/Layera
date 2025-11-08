// Layera GeoAlert V1 - UserLocation Micro-Module
// Single Responsibility: Handle user location detection and management
// Enterprise pattern: Promise-based geolocation service

import React from "react";
import { Coordinate } from '../geometry/coordinate-utils';
import { EARTH_CONSTANTS } from '@layera/constants';

/**
 * Location service result interfaces
 */
export interface LocationResult {
  success: boolean;
  coordinate?: Coordinate;
  error?: string;
  accuracy?: number; // meters
}

export interface LocationOptions {
  enableHighAccuracy?: boolean;
  timeout?: number; // milliseconds
  maximumAge?: number; // milliseconds
}

/**
 * Default location options
 */
const DEFAULT_OPTIONS: Required<LocationOptions> = {
  enableHighAccuracy: true,
  timeout: 10000, // 10 seconds
  maximumAge: 300000 // 5 minutes
};

/**
 * Get user's current location
 */
export const getCurrentLocation = (options: LocationOptions = {}): Promise<LocationResult> => {
  return new Promise((resolve) => {
    // Check if geolocation is supported
    if (!navigator.geolocation) {
      resolve({
        success: false,
        error: 'Geolocation is not supported by this browser'
      });
      return;
    }

    const opts = { ...DEFAULT_OPTIONS, ...options };

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          success: true,
          coordinate: {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          },
          accuracy: position.coords.accuracy
        });
      },
      (error) => {
        resolve({
          success: false,
          error: getLocationErrorMessage(error)
        });
      },
      opts
    );
  });
};

/**
 * Watch user location changes
 */
export const watchLocation = (
  callback: (result: LocationResult) => React.ReactNode,
  options: LocationOptions = {}
): number | null => {
  if (!navigator.geolocation) {
    callback({
      success: false,
      error: 'Geolocation is not supported by this browser'
    });
    return null;
  }

  const opts = { ...DEFAULT_OPTIONS, ...options };

  return navigator.geolocation.watchPosition(
    (position) => {
      callback({
        success: true,
        coordinate: {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        },
        accuracy: position.coords.accuracy
      });
    },
    (error) => {
      callback({
        success: false,
        error: getLocationErrorMessage(error)
      });
    },
    opts
  );
};

/**
 * Clear location watching
 */
export const clearLocationWatch = (watchId: number): void => {
  if (navigator.geolocation) {
    navigator.geolocation.clearWatch(watchId);
  }
};

/**
 * Check if location services are available
 */
export const isLocationAvailable = (): boolean => {
  return 'geolocation' in navigator;
};

/**
 * Request location permission (modern browsers)
 */
export const requestLocationPermission = async (): Promise<'granted' | 'denied' | 'prompt' | 'unsupported'> => {
  if (!navigator.permissions) {
    return 'unsupported';
  }

  try {
    const permission = await navigator.permissions.query({ name: 'geolocation' });
    return permission.state;
  } catch (error) {
    return 'unsupported';
  }
};

/**
 * Get user-friendly error messages for geolocation errors
 */
const getLocationErrorMessage = (error: GeolocationPositionError): string => {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      return 'Η πρόσβαση στη θέση σας απορρίφθηκε. Παρακαλώ ενεργοποιήστε την τοποθεσία στον browser σας.';

    case error.POSITION_UNAVAILABLE:
      return 'Δεν είναι δυνατός ο εντοπισμός της θέσης σας. Παρακαλώ δοκιμάστε ξανά.';

    case error.TIMEOUT:
      return 'Το αίτημα εντοπισμού θέσης έληξε. Παρακαλώ δοκιμάστε ξανά.';

    default:
      return 'Παρουσιάστηκε σφάλμα κατά τον εντοπισμό της θέσης σας.';
  }
};

/**
 * Calculate distance from user location to target coordinate
 */
export const getDistanceFromUser = async (target: Coordinate): Promise<number | null> => {
  const userLocation = await getCurrentLocation();

  if (!userLocation.success || !userLocation.coordinate) {
    return null;
  }

  // Simple distance calculation (Haversine formula)
  const R = EARTH_CONSTANTS.RADIUS_METERS;
  const dLat = toRadians(target.lat - userLocation.coordinate.lat);
  const dLng = toRadians(target.lng - userLocation.coordinate.lng);

  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRadians(userLocation.coordinate.lat)) * Math.cos(toRadians(target.lat)) *
            Math.sin(dLng / 2) * Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

/**
 * Helper: Convert degrees to radians
 */
const toRadians = (degrees: number): number => degrees * (Math.PI / 180);

/**
 * Get default location (Πάτρα, Greece) για fallback
 */
export const getDefaultLocation = (): Coordinate => ({
  lat: 38.246639,
  lng: 21.734573
});