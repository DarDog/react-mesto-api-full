import React from 'react';
import {Link, NavLink, useHistory} from 'react-router-dom';

function Header(props) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const history = useHistory();

  const handleMenuButtonClick = (e) => {
    setIsMenuOpen(!isMenuOpen);
    e.target.classList.toggle('header__button_active');
  }

  const handleExit = () => {
    props.onLogout();
    history.push('/sign-in')
  }

  return (
      <>
        <article className={'menu'}>
          <ul className="menu__nav">
            <li className="menu__item">
              <p className="menu__paragraph">{props.userData.email}</p>
            </li>
            <li className="menu__item">
              <button className="menu__button" onClick={handleExit}>Выйти</button>
            </li>
          </ul>
        </article>
        <header className="header page__header">
          <Link to="/" target="_self" className="logo header__logo"/>
          <ul className='nav'>
            <li className={`nav__item ${props.loggedIn && 'nav__item_hidden'}`}><NavLink to='/sign-in'
                                                                                         className={'nav__link'}
                                                                                         activeClassName='nav__link_hidden'>Войти</NavLink>
            </li>
            <li className={`nav__item ${props.loggedIn && 'nav__item_hidden'}`}><NavLink to='/sign-up'
                                                                                         className={'nav__link'}
                                                                                         activeClassName='nav__link_hidden'>Регистрация</NavLink>
            </li>
            <li className={`nav__item ${!props.loggedIn && 'nav__item_hidden'}`}><p
                className='nav__paragraph'>{props.userData.email}</p></li>
            <li className={`nav__item ${!props.loggedIn && 'nav__item_hidden'}`}>
              <button className='nav__link nav__button' type='button' onClick={handleExit}>Выход</button>
            </li>
          </ul>
          <button className={`header__button ${props.loggedIn && 'header__button_hidden'}`} onClick={handleMenuButtonClick}/>
        </header>
      </>
  );
}

export default Header
