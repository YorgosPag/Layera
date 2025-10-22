/**
 * Enterprise Navigation Service Tests
 *
 * Αυτά τα tests εξασφαλίζουν ότι το navigation system
 * δεν θα σπάσει ΠΟΤΕ κάτω από οποιεσδήποτε συνθήκες.
 */

import { NavigationService } from '../NavigationService';
import { NavigationState, Category } from '../types';

describe('NavigationService - Enterprise Safety Tests', () => {
  let navigationService: NavigationService;

  beforeEach(() => {
    navigationService = new NavigationService();
  });

  describe('🛡️ Back Navigation Safety', () => {
    test('should NEVER allow going back from category step', () => {
      // Arrange: Είμαστε στο category step
      expect(navigationService.getCurrentStep()).toBe('category');
      expect(navigationService.getStepIndex()).toBe(0);

      // Act & Assert: Το goBack δεν πρέπει να λειτουργήσει
      expect(() => navigationService.goBack()).toThrow('Cannot go back from first step');
      expect(navigationService.getCurrentStep()).toBe('category');
      expect(navigationService.getStepIndex()).toBe(0);
    });

    test('should safely go back from intent step to category', async () => {
      // Arrange: Προχωράμε στο intent step
      await navigationService.selectCategory('property');
      expect(navigationService.getCurrentStep()).toBe('intent');
      expect(navigationService.getStepIndex()).toBe(1);

      // Act: Πάμε πίσω
      await navigationService.goBack();

      // Assert: Είμαστε πίσω στο category και το state είναι clean
      expect(navigationService.getCurrentStep()).toBe('category');
      expect(navigationService.getStepIndex()).toBe(0);
      expect(navigationService.getSelectedCategory()).toBe(null);
    });

    test('should handle rapid back button clicks safely', async () => {
      // Arrange: Είμαστε στο intent step
      await navigationService.selectCategory('property');
      expect(navigationService.getStepIndex()).toBe(1);

      // Act: Πολλαπλά γρήγορα clicks
      const promises = [
        navigationService.goBack(),
        navigationService.goBack(),
        navigationService.goBack(),
        navigationService.goBack()
      ];

      // Assert: Δεν πρέπει να crash, μόνο το πρώτο να περάσει
      const results = await Promise.allSettled(promises);

      expect(results[0].status).toBe('fulfilled');
      expect(results[1].status).toBe('rejected');
      expect(results[2].status).toBe('rejected');
      expect(results[3].status).toBe('rejected');

      expect(navigationService.getStepIndex()).toBe(0);
    });
  });

  describe('🔒 State Consistency', () => {
    test('should maintain consistent state during category selection', async () => {
      // Act: Επιλέγουμε κατηγορία
      await navigationService.selectCategory('property');

      // Assert: Όλα τα state fields είναι συνεπή
      const state = navigationService.getState();
      expect(state.selectedCategory).toBe('property');
      expect(state.currentStepId).toBe('intent');
      expect(state.stepIndex).toBe(1);
      expect(state.canGoNext).toBe(true);
      expect(state.canGoPrevious).toBe(true);
      expect(state.totalSteps).toBe(7); // Property pipeline
    });

    test('should never have invalid state combinations', async () => {
      // Test όλες τις πιθανές transitions
      const scenarios = [
        { category: 'property' as Category, expectedSteps: 7 },
        { category: 'job' as Category, expectedSteps: 8 }
      ];

      for (const scenario of scenarios) {
        // Reset
        navigationService.reset();

        // Act
        await navigationService.selectCategory(scenario.category);

        // Assert
        const state = navigationService.getState();
        expect(state.selectedCategory).toBe(scenario.category);
        expect(state.totalSteps).toBe(scenario.expectedSteps);
        expect(state.stepIndex).toBeGreaterThan(0);
        expect(state.canGoPrevious).toBe(true);
      }
    });
  });

  describe('🚨 Error Recovery', () => {
    test('should recover from corrupted state', () => {
      // Arrange: Simulate corrupted state
      (navigationService as any).state = {
        stepIndex: 999,
        currentStepId: 'invalid',
        selectedCategory: 'invalid' as any,
        canGoNext: true,
        canGoPrevious: true
      };

      // Act: Try to use the service
      expect(() => navigationService.validateState()).toThrow();

      // Act: Recovery
      navigationService.recover();

      // Assert: State is back to safe defaults
      const state = navigationService.getState();
      expect(state.stepIndex).toBe(0);
      expect(state.currentStepId).toBe('category');
      expect(state.selectedCategory).toBe(null);
    });

    test('should handle network failures gracefully', async () => {
      // Simulate network failure during category selection
      const originalFetch = global.fetch;
      global.fetch = jest.fn().mockRejectedValue(new Error('Network error'));

      try {
        await navigationService.selectCategory('property');
        // Should still work offline with cached data
        expect(navigationService.getSelectedCategory()).toBe('property');
      } finally {
        global.fetch = originalFetch;
      }
    });
  });

  describe('🔄 Concurrency Safety', () => {
    test('should handle concurrent state changes safely', async () => {
      // Act: Simultaneous operations
      const operations = [
        navigationService.selectCategory('property'),
        navigationService.selectCategory('job'),
        navigationService.goNext(),
        navigationService.reset()
      ];

      // Assert: No race conditions, final state is consistent
      await Promise.allSettled(operations);

      const state = navigationService.getState();
      expect(state).toBeDefined();
      expect(typeof state.stepIndex).toBe('number');
      expect(state.stepIndex).toBeGreaterThanOrEqual(0);
    });
  });
});