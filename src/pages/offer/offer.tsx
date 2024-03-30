import { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { CITIES, OfferType } from '@/common/const';
import { getPointsFromOffers } from '@/common/utils';
import Header from '@/components/header';
import Map from '@/components/map';
import Rating from '@/components/rating';
import useAppDispatch from '@/hooks/use-app-dispatch';
import useAppSelector from '@/hooks/use-app-selector';
import { selectNearbyOffers, selectOffer } from '@/store/offer/selectors';
import { fetchNearbyOffers, fetchOffer } from '@/store/offer/thunks';
import { selectCity } from '@/store/offers-list/selectors';

import NotFound from '../not-found';
import InsideGoods from './components/inside-goods';
import NearPlaces from './components/near-places';
import OfferGallery from './components/offer-gallery';
import OfferHost from './components/offer-host';
import ReviewList from './components/review-list';

const NEARBY_OFFERS_COUNT = 3;

const Offer = () => {
  const dispatch = useAppDispatch();
  const { id: offerId } = useParams();

  const offer = useAppSelector(selectOffer);
  const selectedCity = useAppSelector(selectCity);
  const nearbyOffers = useAppSelector(selectNearbyOffers).slice(0, NEARBY_OFFERS_COUNT);

  const nearbyPoints = useMemo(() => getPointsFromOffers(nearbyOffers), [nearbyOffers]);

  useEffect(() => {
    if (!offerId) {
      return;
    }

    dispatch(fetchOffer(offerId));
    dispatch(fetchNearbyOffers(offerId));
  }, [dispatch, offerId]);

  useEffect(() => {
    if (!offer || !nearbyPoints.length || !offerId) {
      return;
    }

    nearbyPoints.push({
      id: offerId,
      latitude: offer.location.latitude,
      longitude: offer.location.longitude,
    });
  }, [offer, nearbyPoints, offerId]);

  if (!offer) {
    return <NotFound />;
  }

  const bedroomsString = `${offer.bedrooms} Bedroom${offer.bedrooms > 1 ? 's' : ''}`;
  const maxAdultsString = `Max ${offer.maxAdults} Adult${offer.maxAdults > 1 ? 's' : ''}`;

  return (
    <div className="page">
      <Header />

      <main className="page__main page__main--offer">
        <section className="offer">
          <OfferGallery images={offer.images} />
          <div className="offer__container container">
            <div className="offer__wrapper">
              {offer.isPremium && (
                <div className="offer__mark">
                  <span>Premium</span>
                </div>
              )}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">
                  {offer.title}
                </h1>
                <button className="offer__bookmark-button button" type="button">
                  <svg className="offer__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="offer__rating rating">
                <Rating className="offer__stars" rating={offer.rating} />
                <span className="offer__rating-value rating__value">{offer.rating}</span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {OfferType[offer.type]}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {bedroomsString}
                </li>
                <li className="offer__feature offer__feature--adults">
                  {maxAdultsString}
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;{offer.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <InsideGoods goods={offer.goods} />
              <OfferHost
                avatarUrl={offer.host.avatarUrl}
                name={offer.host.name}
                isPro={offer.host.isPro}
                description={offer.description}
              />
              {offerId && <ReviewList offerId={offerId} />}
            </div>
          </div>
          <Map
            className="offer__map"
            city={CITIES[selectedCity]}
            points={nearbyPoints}
            selectedPointId={offerId}
          />
        </section>
        <div className="container">
          <NearPlaces nearbyOffers={nearbyOffers} />
        </div>
      </main>
    </div>
  );
};

export default Offer;
