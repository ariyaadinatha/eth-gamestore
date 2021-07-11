import React, { Component } from 'react';

class Navbar extends Component {
    render() {
      return (
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow p-4">
          <a
            className="navbar-brand col-sm-3 col-md-2 mr-0"
            href="./"
          >
            <img src="https://store.cloudflare.steamstatic.com/public/shared/images/header/logo_steam.svg?t=962016" height="35x" className="d-inline-block align-top" alt="Steam Logo" />
          </a>
          <ul className="nav justify-content-end">
            <li className="nav-item">
              <a className="nav-link active" href="./"> HOME </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/store"> STORE </a>
            </li>
            <li className="nav-item">
              <button className="nav-link user-nav" disabled> { this.props.account } </button>
            </li>
          </ul>
        </nav>
      );
    }
  }
  
  export default Navbar;