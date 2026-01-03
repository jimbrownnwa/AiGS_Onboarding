import { useState } from 'react';
import { startOnboarding } from '../utils/api';

export const useOnboardingSubmit = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const submitOnboarding = async (formData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await startOnboarding(formData);
      setIsSubmitting(false);
      return response;
    } catch (err) {
      setError(err.message || 'Failed to start onboarding');
      setIsSubmitting(false);
      throw err;
    }
  };

  const resetError = () => setError(null);

  return { submitOnboarding, isSubmitting, error, resetError };
};
