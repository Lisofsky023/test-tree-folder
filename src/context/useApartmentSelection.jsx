import { useContext } from 'react';
import { ApartmentSelectionContext } from './ApartmentSelectionProvider';

export const useApartmentSelectionContext = () => {
  return useContext(ApartmentSelectionContext);
};

