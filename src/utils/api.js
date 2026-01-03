import { WEBHOOK_START_URL, WEBHOOK_STATUS_URL } from '../config/constants';

export const startOnboarding = async (formData) => {
  const response = await fetch(WEBHOOK_START_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Failed to start onboarding' }));
    throw new Error(error.message || 'Failed to start onboarding');
  }

  return response.json();
};

export const getOnboardingStatus = async (onboardingId) => {
  const url = `${WEBHOOK_STATUS_URL}?id=${onboardingId}`;
  console.log('[API] Calling status webhook:', url);
  console.log('[API] Onboarding ID being sent:', onboardingId);

  const response = await fetch(url);

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Failed to fetch status' }));
    throw new Error(error.message || 'Failed to fetch status');
  }

  const data = await response.json();

  // If webhook returns an array, unwrap it to get the first object
  const result = Array.isArray(data) ? data[0] : data;

  console.log('[API] Status webhook returned:', result);

  return result;
};
