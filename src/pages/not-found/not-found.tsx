import { Link } from 'react-router-dom';

import { AppRoute } from '@/common/const';

import style from './style.module.css';

const NotFound = () => (
  <div className={style['not-found']}>
    <h1>404 Not Found</h1>
    <p>¯\_(ツ)_/¯</p>
    <Link to={AppRoute.Main}>Вернуться на Главную</Link>
  </div>
);

export default NotFound;
