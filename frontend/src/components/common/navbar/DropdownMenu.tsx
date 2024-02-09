import "styles/components/navbarDropdown.scss";

const NavbarDropdown = () => {
  return (
    <>
      <div className="dropdown-main">
        <ul>
          <li>
            <a href="/profile">Mon profil</a>
          </li>
          <li>
            <a href="/file">Mes fichers</a>
          </li>
          <li>
            <a href="/search-files">Tous les fichiers</a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default NavbarDropdown;
