import { useEffect, useRef } from 'react';

const useThrottle = (callback, delay = 200) => {
  const lastCall = useRef(0); // persists between renders

  useEffect(() => {
    const throttled = (e) => {
      const now = Date.now();
      if (now - lastCall.current >= delay) {
        lastCall.current = now;
        callback(e);
      }
    };

    window.addEventListener('scroll', throttled);
    return () => {
      window.removeEventListener('scroll', throttled);
    };
  }, [callback, delay]);
};

export default useThrottle;
