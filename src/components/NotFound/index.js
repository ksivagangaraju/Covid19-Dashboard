import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div className="not-found-bg-container">
    <img
      src="https://res.cloudinary.com/dpmyvq5te/image/upload/v1675474878/Covid19/Group_7484_shalpp.png"
      alt="not-found-pic"
      className="not-found-img"
    />
    <h1 className="not-found-heading">PAGE NOT FOUND</h1>
    <p className="not-found-para">
      we are sorry, the page you requested could not be found
      <br />
      Please go back to the homepage
    </p>
    <Link to="/" className="not-page-nav-link">
      <button type="button" className="home-btn">
        Home
      </button>
    </Link>
  </div>
)

export default NotFound
