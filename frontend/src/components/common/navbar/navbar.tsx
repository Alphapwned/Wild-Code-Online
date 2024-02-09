import React, { useState } from "react";
import "styles/components/navbar.scss";
import { Link } from "react-router-dom";
import img from "assets/img/mainLogo.svg";
import NavbarDropdown from "./DropdownMenu";

interface NavbarProps {
  isAuthenticated: string | null;
}

const Navbar: React.FC<NavbarProps> = ({ isAuthenticated }) => {
  // to change burger classes
  const [burger_class, setBurgerClass] = useState("burger-bar unclicked");
  const [menu_class, setMenuClass] = useState("menu hidden");
  const [isMenuClicked, setIsMenuClicked] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const HandleToggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // toggle burger menu change
  const updateMenu = () => {
    if (!isMenuClicked) {
      setBurgerClass("burger-bar clicked");
      setMenuClass("menu visible");
    } else {
      setBurgerClass("burger-bar unclicked");
      setMenuClass("menu hidden");
    }
    setIsMenuClicked(!isMenuClicked);
  };

  return (
    <>
      <nav className="main-nav">
        <ul>
          <li>
            <img
              src={img}
              alt="main logo site web composé de cercles de couleur violets"
            />
          </li>
          <li>
            <Link to="/">Accueil</Link>
          </li>
          <li>
            <Link to={"/#aboutUs"}>A propos de nous</Link>
          </li>
          <li>
            <Link to={"/#contact"}>Contact</Link>
          </li>
        </ul>
        {isAuthenticated ? (
          <div>
            <div className="account-container">
              <span>
                <button onClick={HandleToggleDropdown}>Mon compte </button>
              </span>
              {isDropdownOpen ? (
                <div className="overlay" onClick={HandleToggleDropdown}>
                  <NavbarDropdown />
                </div>
              ) : null}
            </div>
            <div className="button-red">
              <Link to="/" onClick={() => localStorage.removeItem("token")}>
                Déconnexion
              </Link>
            </div>
          </div>
        ) : (
          <div>
            <span>
              <Link to="/sign-up">S'inscrire</Link>
            </span>
            <div className="button">
              <Link to="/sign-in">Connexion</Link>
            </div>
          </div>
        )}
      </nav>

      <div className="nav-burger">
        <div className="nav-burger-img">
          <img
            src={img}
            alt="main logo site web composé de cercles de couleur violets"
          />
        </div>
        <nav>
          <div className="burger-menu" onClick={updateMenu}>
            <div className={burger_class}></div>
            <div className={burger_class}></div>
            <div className={burger_class}></div>
          </div>

          <div className={menu_class}>
            <ul className="menu-burger">
              <li>
                <Link to={"/#Accueil"}>Accueil</Link>
              </li>
              <li>
                <Link to={"/#aboutUs"}>A propos de nous</Link>
              </li>
              <li>
                <Link to={"/#contact"}>Contact</Link>
              </li>
              {isAuthenticated ? (
                <>
                  <li>
                    <Link to={"/profile"}>Mon profil</Link>
                  </li>
                  <li>
                    <Link to={"/file"}>Mes fichiers</Link>
                  </li>
                  <li>
                    <Link to={"/search-files"}>Tous les fichiers</Link>
                  </li>
                  <li className="button-mobile-red">
                    <Link
                      to="/"
                      onClick={() => localStorage.removeItem("token")}
                    >
                      Déconnexion
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/sign-up">S'inscrire</Link>
                  </li>
                  <li className="button">
                    <Link to="/sign-in">Connexion</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
