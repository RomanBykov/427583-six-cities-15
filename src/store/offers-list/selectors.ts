import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../store.types';

export const selectOffersList = (state: RootState) => state.offersList.offersList;

const selectCity = (state: RootState) => state.global.city;

export const selectOffersByCity = createSelector(
  [selectOffersList, selectCity],
  (offersList, city) => offersList.filter((offer) => offer.city.name === city)
);
