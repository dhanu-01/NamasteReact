import { LOGO_URL } from "../utils/constants";
import { Link } from "react-router-dom";

const Header = () => {
    return (
      <div className="header">
        <div className="logo-container">
          <img
            className="logo"
            src={LOGO_URL}
            alt="foodLogo"
          />
        </div>
        <div className="nav-items">
          <ul>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/about'>About Us</Link></li>
            <li><Link to='/contact'>contact Us</Link></li>
            <li>Cart</li>
          </ul>
        </div>
      </div>
    );
  };

  export default Header;