import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import {FcGenericSortingAsc, FcGenericSortingDesc} from 'react-icons/fc'
import {BiChevronRightSquare} from 'react-icons/bi'
import Loader from 'react-loader-spinner'
import {Redirect, Link} from 'react-router-dom'
import Header from '../Header'
import Footer from '../Footer'
import './index.css'

const statesList = [
  {
    state_code: 'AN',
    state_name: 'Andaman and Nicobar Islands',
  },
  {
    state_code: 'AP',
    state_name: 'Andhra Pradesh',
  },
  {
    state_code: 'AR',
    state_name: 'Arunachal Pradesh',
  },
  {
    state_code: 'AS',
    state_name: 'Assam',
  },
  {
    state_code: 'BR',
    state_name: 'Bihar',
  },
  {
    state_code: 'CH',
    state_name: 'Chandigarh',
  },
  {
    state_code: 'CT',
    state_name: 'Chhattisgarh',
  },
  {
    state_code: 'DN',
    state_name: 'Dadra and Nagar Haveli and Daman and Diu',
  },
  {
    state_code: 'DL',
    state_name: 'Delhi',
  },
  {
    state_code: 'GA',
    state_name: 'Goa',
  },
  {
    state_code: 'GJ',
    state_name: 'Gujarat',
  },
  {
    state_code: 'HR',
    state_name: 'Haryana',
  },
  {
    state_code: 'HP',
    state_name: 'Himachal Pradesh',
  },
  {
    state_code: 'JK',
    state_name: 'Jammu and Kashmir',
  },
  {
    state_code: 'JH',
    state_name: 'Jharkhand',
  },
  {
    state_code: 'KA',
    state_name: 'Karnataka',
  },
  {
    state_code: 'KL',
    state_name: 'Kerala',
  },
  {
    state_code: 'LA',
    state_name: 'Ladakh',
  },
  {
    state_code: 'LD',
    state_name: 'Lakshadweep',
  },
  {
    state_code: 'MH',
    state_name: 'Maharashtra',
  },
  {
    state_code: 'MP',
    state_name: 'Madhya Pradesh',
  },
  {
    state_code: 'MN',
    state_name: 'Manipur',
  },
  {
    state_code: 'ML',
    state_name: 'Meghalaya',
  },
  {
    state_code: 'MZ',
    state_name: 'Mizoram',
  },
  {
    state_code: 'NL',
    state_name: 'Nagaland',
  },
  {
    state_code: 'OR',
    state_name: 'Odisha',
  },
  {
    state_code: 'PY',
    state_name: 'Puducherry',
  },
  {
    state_code: 'PB',
    state_name: 'Punjab',
  },
  {
    state_code: 'RJ',
    state_name: 'Rajasthan',
  },
  {
    state_code: 'SK',
    state_name: 'Sikkim',
  },
  {
    state_code: 'TN',
    state_name: 'Tamil Nadu',
  },
  {
    state_code: 'TG',
    state_name: 'Telangana',
  },
  {
    state_code: 'TR',
    state_name: 'Tripura',
  },
  {
    state_code: 'UP',
    state_name: 'Uttar Pradesh',
  },
  {
    state_code: 'UT',
    state_name: 'Uttarakhand',
  },
  {
    state_code: 'WB',
    state_name: 'West Bengal',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN PROGRESS',
}

class Home extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    totalCovid19: {},
    statesUTsCovid19: [],
    searchingInput: '',
    isAscOrder: true,
  }

  componentDidMount() {
    this.getStateUTData()
  }

  getStateUTData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const response = await fetch('https://apis.ccbp.in/covid19-state-wise-data')
    if (response.ok) {
      const data = await response.json()
      const getTotalCovid19Data = {
        confirmed: statesList.reduce(
          (acc, crr) => acc + data[crr.state_code].total.confirmed,
          0,
        ),
        active: statesList.reduce(
          (acc, crr) =>
            acc +
            (data[crr.state_code].total.confirmed -
              (data[crr.state_code].total.deceased +
                data[crr.state_code].total.recovered)),
          0,
        ),
        recovered: statesList.reduce(
          (acc, crr) => acc + data[crr.state_code].total.recovered,
          0,
        ),
        deceased: statesList.reduce(
          (acc, crr) => acc + data[crr.state_code].total.deceased,
          0,
        ),
      }
      const getStatesUTsCovid19Data = statesList.map(eachState => ({
        stateName: eachState.state_name,
        confirmed: data[eachState.state_code].total.confirmed,
        active:
          data[eachState.state_code].total.confirmed -
          (data[eachState.state_code].total.recovered +
            data[eachState.state_code].total.deceased),
        recovered: data[eachState.state_code].total.recovered,
        deceased: data[eachState.state_code].total.deceased,
        population: data[eachState.state_code].meta.population,
      }))
      this.setState({
        apiStatus: apiStatusConstants.success,
        totalCovid19: getTotalCovid19Data,
        statesUTsCovid19: getStatesUTsCovid19Data,
      })
    } else this.setState({apiStatus: apiStatusConstants.failure})
  }

  searchingStateName = event => {
    this.setState({searchingInput: event.target.value})
  }

  renderSearch = () => {
    const {searchingInput} = this.state
    const filteredStatesList = statesList.filter(eachItem =>
      eachItem.state_name
        .toLowerCase()
        .startsWith(searchingInput.toLowerCase()),
    )
    return (
      <>
        <div className="home-search-container">
          <BsSearch className="home-search-icon" />
          <input
            type="search"
            placeholder="Enter the State"
            className="home-search-input"
            onChange={this.searchingStateName}
            value={searchingInput}
          />
        </div>
        {searchingInput !== '' && (
          <ul
            className="searching-state-name"
            testid="searchResultsUnorderedList"
          >
            {filteredStatesList.map(eachState => (
              <Link
                key={eachState.state_code}
                to={`/state/${eachState.state_code}`}
                className="nav-link"
              >
                <li className="searching-state-container">
                  <p className="searching-state">{eachState.state_name}</p>
                  <div className="searching-state-code-container">
                    <p className="searching-state-code">
                      {eachState.state_code}
                    </p>
                    <BiChevronRightSquare className="searching-right-arrow-icon" />
                  </div>
                </li>
              </Link>
            ))}
          </ul>
        )}
      </>
    )
  }

  renderCovid19Research = () => {
    const {totalCovid19} = this.state
    return (
      <div className="covid-19-total-count-container">
        <div
          className="covid19-research-container confirmed"
          testid="countryWideConfirmedCases"
        >
          <h1 className="covid19-headline">Confirmed</h1>
          <img
            src="https://res.cloudinary.com/dpmyvq5te/image/upload/v1675476017/Covid19/check-mark_1_foa8ww.png"
            alt="country wide confirmed cases pic"
            className="covid19-cases-img"
          />
          <p className="count">{totalCovid19.confirmed}</p>
        </div>
        <div
          className="covid19-research-container active"
          testid="countryWideActiveCases"
        >
          <h1 className="covid19-headline">Active</h1>
          <img
            src="https://res.cloudinary.com/dpmyvq5te/image/upload/v1675476017/Covid19/protection_1_wnebxj.png"
            alt="country wide active cases pic"
            className="covid19-cases-img"
          />
          <p className="count">{totalCovid19.active}</p>
        </div>
        <div
          className="covid19-research-container recovered"
          testid="countryWideRecoveredCases"
        >
          <h1 className="covid19-headline">Recovered</h1>
          <img
            src="https://res.cloudinary.com/dpmyvq5te/image/upload/v1675476017/Covid19/recovered_1_wxrlag.png"
            alt="country wide recovered cases pic"
            className="covid19-cases-img"
          />
          <p className="count">{totalCovid19.recovered}</p>
        </div>
        <div
          className="covid19-research-container deceased"
          testid="countryWideDeceasedCases"
        >
          <h1 className="covid19-headline">Deceased</h1>
          <img
            src="https://res.cloudinary.com/dpmyvq5te/image/upload/v1675476017/Covid19/breathing_1_jao8aq.png"
            alt="country wide deceased cases pic"
            className="covid19-cases-img"
          />
          <p className="count">{totalCovid19.deceased}</p>
        </div>
      </div>
    )
  }

  clickAscendingOrder = () => {
    this.setState({isAscOrder: true}, this.getStateUTData)
  }

  clickDescendingOrder = () => {
    this.setState({isAscOrder: false}, this.getStateUTData)
  }

  renderCovid19Dashboard = () => (
    <div className="covid19-dashboard">
      <div className="covid19-sort-container">
        <h1 className="state-sort">States/UT</h1>
        <button
          type="button"
          className="sort-btn sort"
          testid="ascendingSort"
          onClick={this.clickAscendingOrder}
        >
          <FcGenericSortingAsc className="sort-icon" />
        </button>
        <button
          type="button"
          className="sort-btn"
          testid="descendingSort"
          onClick={this.clickDescendingOrder}
        >
          <FcGenericSortingDesc className="sort-icon" />
        </button>
      </div>
      <div className="covid19-sort">
        <h1 className="state-sort">Confirmed</h1>
      </div>
      <div className="covid19-sort">
        <h1 className="state-sort">Active</h1>
      </div>
      <div className="covid19-sort">
        <h1 className="state-sort">Recovered</h1>
      </div>
      <div className="covid19-sort">
        <h1 className="state-sort">Deceased</h1>
      </div>
      <div className="covid19-sort">
        <h1 className="state-sort">Population</h1>
      </div>
    </div>
  )

  renderCovid19StateDashboard = state => {
    const {
      stateName,
      confirmed,
      active,
      recovered,
      deceased,
      population,
    } = state
    return (
      <div className="covid19-state-dashboard">
        <p className="state-container covid19-state">{stateName}</p>
        <p className="state-container covid19-count confirmed">{confirmed}</p>
        <p className="state-container covid19-count active">{active}</p>
        <p className="state-container covid19-count recovered">{recovered}</p>
        <p className="state-container covid19-count deceased">{deceased}</p>
        <p className="state-container covid19-count population">{population}</p>
      </div>
    )
  }

  renderHomeSuccessView = () => {
    const {statesUTsCovid19, searchingInput, isAscOrder} = this.state
    const filteredStatesCovid19 = isAscOrder
      ? statesUTsCovid19
      : statesUTsCovid19.sort((a, b) => (a.stateName < b.stateName ? 1 : -1))
    return (
      <div className="home-container">
        {this.renderSearch()}
        {searchingInput === '' && (
          <>
            <div className="covid19-container">
              {this.renderCovid19Research()}
            </div>
            <div className="covid19-result-data-container">
              <div
                className="covid19-states-dashboard"
                testid="stateWiseCovidDataTable"
              >
                {this.renderCovid19Dashboard()}
                <ul className="data-table-unorder">
                  {filteredStatesCovid19.map(eachItem => (
                    <li key={eachItem.stateName}>
                      {this.renderCovid19StateDashboard(eachItem)}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <Footer />
          </>
        )}
      </div>
    )
  }

  renderHomeInProgressView = () => (
    <div testid="homeRouteLoader" className="loader">
      <Loader type="TailSpin" color="#007BFF" height={80} width={80} />
    </div>
  )

  renderHomeFailureView = () => <Redirect to="/not-found" />

  renderHome = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case 'SUCCESS':
        return this.renderHomeSuccessView()
      case 'IN PROGRESS':
        return this.renderHomeInProgressView()
      case 'FAILURE':
        return this.renderHomeFailureView()
      default:
        return null
    }
  }

  clickMenu = () => {
    this.setState(prevState => ({menuView: !prevState.menuView}))
  }

  render() {
    return (
      <div className="home-bg-container">
        <Header />
        {this.renderHome()}
      </div>
    )
  }
}

export default Home
