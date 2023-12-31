import { useEffect } from 'react';

export const useUtilities = () => {
  const useOutsideClickDetector = (ref, callback) => {
    useEffect(() => {
      /**
       * clicked outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          callback();
        }
      }
      // Bind the event listener
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [ref]);
  };
  return { useOutsideClickDetector };
};
