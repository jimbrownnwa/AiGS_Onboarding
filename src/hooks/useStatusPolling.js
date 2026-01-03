import { useState, useEffect, useRef } from 'react';
import { getOnboardingStatus } from '../utils/api';
import { POLLING_INTERVAL } from '../config/constants';

export const useStatusPolling = (onboardingId, onComplete) => {
  const [progress, setProgress] = useState(null);
  const [error, setError] = useState(null);
  const [isPolling, setIsPolling] = useState(false);
  const intervalRef = useRef(null);
  const retryCountRef = useRef(0);

  useEffect(() => {
    if (!onboardingId) {
      return;
    }

    setIsPolling(true);

    const poll = async () => {
      try {
        console.log('[Polling] Fetching status for:', onboardingId);
        const data = await getOnboardingStatus(onboardingId);
        console.log('[Polling] Received data:', data);
        console.log('[Polling] data.success:', data.success);
        console.log('[Polling] data.status:', data.status);
        console.log('[Polling] data.progress_percent:', data.progress_percent);

        setProgress(data);
        setError(null);
        retryCountRef.current = 0;

        // Stop polling ONLY when status is 'complete' or 'error'
        // DO NOT check data.success - that just means the API call succeeded
        const isComplete = data.status === 'complete' || data.status === 'error';

        console.log('[Polling] isComplete?', isComplete, '(status:', data.status + ')');

        if (isComplete) {
          console.log('[Polling] Onboarding complete, stopping polling');
          clearInterval(intervalRef.current);
          setIsPolling(false);
          if (onComplete) {
            onComplete(data);
          }
        } else {
          console.log('[Polling] Still processing, will poll again in 2 seconds');
        }
      } catch (err) {
        console.error('[Polling] Error:', err);
        retryCountRef.current += 1;

        // If too many retries, show error but keep trying with backoff
        if (retryCountRef.current > 3) {
          setError(err.message || 'Connection lost - reconnecting...');
        }
      }
    };

    // Initial poll
    console.log('[Polling] Starting initial poll');
    poll();

    // Set up interval
    console.log('[Polling] Setting up interval to poll every', POLLING_INTERVAL, 'ms');
    intervalRef.current = setInterval(poll, POLLING_INTERVAL);

    // Cleanup
    return () => {
      if (intervalRef.current) {
        console.log('[Polling] Cleaning up interval');
        clearInterval(intervalRef.current);
      }
    };
  }, [onboardingId, onComplete]);

  return { progress, error, isPolling };
};
