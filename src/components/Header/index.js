import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {AiOutlineMenu} from 'react-icons/ai'
import {GrFormClose} from 'react-icons/gr'

import './index.css'

class Header extends Component {
  state = {menuView: false}

  clickMenu = () => {
    this.setState(prevState => ({menuView: !prevState.menuView}))
  }

  render() {
    const {menuView} = this.state
    return (
      <>
        <nav className="navbar-container">
          <div className="nav-container">
            <Link to="/" className="nav-link">
              <h1 className="header-logo-covid-19">
                COVID19<span className="header-india">INDIA</span>
              </h1>
            </Link>
            <ul className="menu-container">
              <li className="menu">
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>
              <li className="menu">
                <Link to="/about" className="nav-link">
                  About
                </Link>
              </li>
            </ul>
            <button type="button" className="menu-btn" onClick={this.clickMenu}>
              <AiOutlineMenu className="menu-icon" />
            </button>
          </div>
        </nav>
        {menuView && (
          <ul className="menu-mobile-container">
            <li className="mobile-menu">
              <Link to="/" className="nav-link" onClick={this.clickMenu}>
                Home
              </Link>
            </li>
            <li className="mobile-menu">
              <Link to="/about" className="nav-link" onClick={this.clickMenu}>
                About
              </Link>
            </li>
            <div className="close-menu-container">
              <button
                type="button"
                className="close-menu-btn"
                onClick={this.clickMenu}
              >
                <GrFormClose className="close-menu-icon" />
              </button>
            </div>
          </ul>
        )}
      </>
    )
  }
}

export default withRouter(Header)
