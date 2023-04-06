import logo from "../images/logo.svg";

function Header() {
    return (
        <header className="header">
            <img alt="Логотип место" className="header__logo" src={logo}/>
        </header>
    )
}

export default Header;