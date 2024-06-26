import { memo, MouseEvent } from 'react';
import { Link } from 'react-router-dom';

import { AppRoute, AuthorizationStatus } from '@/common/const';
import useAppDispatch from '@/hooks/use-app-dispatch';
import useAppSelector from '@/hooks/use-app-selector';
import { selectAuthorizationStatus, selectUser } from '@/store/auth/selectors';
import { logout } from '@/store/auth/thunks';
import { selectFavoritesCount } from '@/store/favorites/selectors';

import Logo from '../logo';

const Header = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const favoritesCount = useAppSelector(selectFavoritesCount);
  const authorizationStatus = useAppSelector(selectAuthorizationStatus);

  const handleSignOutClick = (evt: MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    dispatch(logout());
  };

  const renderNotAuthorizedUser = () => (
    <nav className="header__nav">
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Login} >
            <div className="header__avatar-wrapper user__avatar-wrapper">
            </div>
            <span className="header__login">Sign in</span>
          </Link>
        </li>
      </ul>
    </nav>
  );

  const renderAuthorizedUser = () => (
    <nav className="header__nav">
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites}>
            <div className="header__avatar-wrapper user__avatar-wrapper">
            </div>
            <span className="header__user-name user__name">{user?.email}</span>
            <span className="header__favorite-count">{favoritesCount}</span>
          </Link>
        </li>
        <li className="header__nav-item">
          <Link
            className="header__nav-link"
            to={AppRoute.Main}
            onClick={handleSignOutClick}
          >
            <span className="header__signout">Sign out</span>
          </Link>
        </li>
      </ul>
    </nav>
  );

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Logo />
          </div>
          {authorizationStatus === AuthorizationStatus.Auth
            ? renderAuthorizedUser()
            : renderNotAuthorizedUser()}
        </div>
      </div>
    </header>
  );
};

const MemoizedHeader = memo(Header);

export default MemoizedHeader;
