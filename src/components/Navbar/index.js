import { useState } from "react";
import "tailwindcss/tailwind.css";
import './Navbar.css'; // Import the CSS file for styling

const Navbar = () => {
  const [active, setActive] = useState("Home");
  const [hovered, setHovered] = useState(false);

  return (
    <div className="navbarStyle">
      <div className="principalContent">
        <nav
          className={`nav ${hovered ? 'hovered' : ''}`}
          onMouseOver={() => setHovered(true)}
          onMouseOut={() => setHovered(false)}
        >
          <ul className="nav-links">
            <div className="logo">
              <img src="https://github.com/ProgramingspaceT-800/3CDisc/blob/main/public/logo%20(1).png?raw=true" alt="PH Negócios Plataforma" style={{ width: '100px', height: 'auto', marginTop: '5%', marginBottom: '3%' }} />
              <div className='link'>
                <li><a href="/">Bases</a></li>
                <li className="center"><a href="#">Graficos</a></li>
                <li className="upward"><a href="#">Adicionar</a></li>
                <li className="forward"><a href="#">Update</a></li>
              </div>
            </div>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
