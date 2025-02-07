
import SignOut from "../sign-out";
import './Nav.css'; // Asegúrate de importar el archivo CSS

export default function Nav() {
  return (
    <nav className="navbar bg-gray-300">
      <ul className="navbar-list">
        <li><a href="/explore">Explore</a></li>
        <li><a href="/newArticle">New article</a></li>
        <li><a href="/misArticulos">My articles</a></li>
        <li><a href="/profile">Profile</a></li>
        
        <li><SignOut></SignOut></li>
      </ul>
    </nav>
  );
}