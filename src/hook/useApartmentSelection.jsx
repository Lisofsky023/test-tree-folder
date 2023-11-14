import { useContext } from 'react';
import { ApartmentSelectionContext } from '../context/ApartmentSelectionProvider';

export const useApartmentSelectionContext = () => {
  return useContext(ApartmentSelectionContext);
};

