import logo from '../images/header-logo.svg';

function Header() {
    return (
        <header className="header">
          <img className="header__logo" src={logo} alt="логотип сервиса Место"></img>
        </header>
    )
}

export default Header