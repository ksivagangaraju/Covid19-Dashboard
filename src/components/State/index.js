import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {Redirect} from 'react-router-dom'
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  ResponsiveContainer,
  LineChart,
  Legend,
  Line,
} from 'recharts'
import Select from 'react-select'
import Header from '../Header'
import Footer from '../Footer'
import './index.css'

const reports = ['confirmed', 'active', 'recovered', 'deceased', 'tested']
const reportsColor = {
  confirmed: '#FF073A',
  active: '#007BFF',
  recovered: '#27A243',
  deceased: '#6C757D',
  tested: '#9673B9',
}

const barColor = {
  confirmed: '#9A0E31',
  active: '#0A4FA0',
  recovered: '#216837',
  deceased: '#474C57',
}

const statesList = [
  {
    state_code: 'AN',
    state_name: 'Andaman and Nicobar Islands',
    imageUrl:
      'https://res.cloudinary.com/dpmyvq5te/image/upload/v1675779729/Covid19/Group_7362AN_qogz5m.png',
  },
  {
    state_code: 'AP',
    state_name: 'Andhra Pradesh',
    imageUrl:
      'https://res.cloudinary.com/dpmyvq5te/image/upload/v1675779999/Covid19/Group_7354AP_cy3axl.png',
  },
  {
    state_code: 'AR',
    state_name: 'Arunachal Pradesh',
    imageUrl:
      'https://res.cloudinary.com/dpmyvq5te/image/upload/v1675780226/Covid19/Group_7340AR_yhxkfs.png',
  },
  {
    state_code: 'AS',
    state_name: 'Assam',
    imageUrl:
      'https://res.cloudinary.com/dpmyvq5te/image/upload/v1675780346/Covid19/Group_7341AS_hqbpix.png',
  },
  {
    state_code: 'BR',
    state_name: 'Bihar',
    imageUrl:
      'https://res.cloudinary.com/dpmyvq5te/image/upload/v1675780486/Covid19/Group_7335BR_raca9s.png',
  },
  {
    state_code: 'CH',
    state_name: 'Chandigarh',
    imageUrl:
      'https://res.cloudinary.com/dpmyvq5te/image/upload/v1675780594/Covid19/Group_7361CH_vehy76.png',
  },
  {
    state_code: 'CT',
    state_name: 'Chhattisgarh',
    imageUrl:
      'https://res.cloudinary.com/dpmyvq5te/image/upload/v1675780680/Covid19/Group_7353CT_f6zyh4.png',
  },
  {
    state_code: 'DN',
    state_name: 'Dadra and Nagar Haveli and Daman and Diu',
    imageUrl:
      'https://res.cloudinary.com/dpmyvq5te/image/upload/v1675780792/Covid19/Group_7357DN_gcmgpw.png',
  },
  {
    state_code: 'DL',
    state_name: 'Delhi',
    imageUrl:
      'https://res.cloudinary.com/dpmyvq5te/image/upload/v1675780892/Covid19/Group_7358DL_h72err.png',
  },
  {
    state_code: 'GA',
    state_name: 'Goa',
    imageUrl:
      'https://res.cloudinary.com/dpmyvq5te/image/upload/v1675781032/Covid19/Group_7349GA_ljrwyi.png',
  },
  {
    state_code: 'GJ',
    state_name: 'Gujarat',
    imageUrl:
      'https://res.cloudinary.com/dpmyvq5te/image/upload/v1675781342/Covid19/GJ_syblmx.png',
  },
  {
    state_code: 'HR',
    state_name: 'Haryana',
    imageUrl:
      'https://res.cloudinary.com/dpmyvq5te/image/upload/v1675781450/Covid19/HR_oobpvo.png',
  },
  {
    state_code: 'HP',
    state_name: 'Himachal Pradesh',
    imageUrl:
      'https://res.cloudinary.com/dpmyvq5te/image/upload/v1675781582/Covid19/HP_knvnhd.png',
  },
  {
    state_code: 'JK',
    state_name: 'Jammu and Kashmir',
    imageUrl:
      'https://res.cloudinary.com/dpmyvq5te/image/upload/v1675781679/Covid19/JK_dey1bh.png',
  },
  {
    state_code: 'JH',
    state_name: 'Jharkhand',
    imageUrl:
      'https://res.cloudinary.com/dpmyvq5te/image/upload/v1675781861/Covid19/JH_qiw6mp.png',
  },
  {
    state_code: 'KA',
    state_name: 'Karnataka',
    imageUrl:
      'https://res.cloudinary.com/dpmyvq5te/image/upload/v1675782041/Covid19/KA_ayzirg.png',
  },
  {
    state_code: 'KL',
    state_name: 'Kerala',
    imageUrl:
      'https://res.cloudinary.com/dpmyvq5te/image/upload/v1675782209/Covid19/KL_plujco.png',
  },
  {
    state_code: 'LA',
    state_name: 'Ladakh',
    imageUrl:
      'https://res.cloudinary.com/dpmyvq5te/image/upload/v1675782362/Covid19/LA_ea7abt.png',
  },
  {
    state_code: 'LD',
    state_name: 'Lakshadweep',
    imageUrl:
      'https://res.cloudinary.com/dpmyvq5te/image/upload/v1675782764/Covid19/LD_jcteww.png',
  },
  {
    state_code: 'MH',
    state_name: 'Maharashtra',
    imageUrl:
      'https://res.cloudinary.com/dpmyvq5te/image/upload/v1675782926/Covid19/MH_xwo3jh.png',
  },
  {
    state_code: 'MP',
    state_name: 'Madhya Pradesh',
    imageUrl:
      'https://res.cloudinary.com/dpmyvq5te/image/upload/v1675783047/Covid19/MP_hh2ovo.png',
  },
  {
    state_code: 'MN',
    state_name: 'Manipur',
    imageUrl:
      'https://res.cloudinary.com/dpmyvq5te/image/upload/v1675783183/Covid19/MN_w68877.png',
  },
  {
    state_code: 'ML',
    state_name: 'Meghalaya',
    imageUrl: '',
  },
  {
    state_code: 'MZ',
    state_name: 'Mizoram',
    imageUrl:
      'https://res.cloudinary.com/dpmyvq5te/image/upload/v1675783306/Covid19/MZ_ac2w4u.png',
  },
  {
    state_code: 'NL',
    state_name: 'Nagaland',
    imageUrl:
      'https://res.cloudinary.com/dpmyvq5te/image/upload/v1675783457/Covid19/NL_ffzdvx.png',
  },
  {
    state_code: 'OR',
    state_name: 'Odisha',
    imageUrl:
      'https://res.cloudinary.com/dpmyvq5te/image/upload/v1675783599/Covid19/OR_xhfgk0.png',
  },
  {
    state_code: 'PY',
    state_name: 'Puducherry',
    imageUrl:
      'https://res.cloudinary.com/dpmyvq5te/image/upload/v1675783737/Covid19/PY_ia3nd1.png',
  },
  {
    state_code: 'PB',
    state_name: 'Punjab',
    imageUrl:
      'https://res.cloudinary.com/dpmyvq5te/image/upload/v1675783861/Covid19/PB_codbxy.png',
  },
  {
    state_code: 'RJ',
    state_name: 'Rajasthan',
    imageUrl:
      'https://res.cloudinary.com/dpmyvq5te/image/upload/v1675783991/Covid19/RJ_mnlwj5.png',
  },
  {
    state_code: 'SK',
    state_name: 'Sikkim',
    imageUrl:
      'https://res.cloudinary.com/dpmyvq5te/image/upload/v1675784094/Covid19/SK_cdnrj0.png',
  },
  {
    state_code: 'TN',
    state_name: 'Tamil Nadu',
    imageUrl:
      'https://res.cloudinary.com/dpmyvq5te/image/upload/v1675784190/Covid19/TN_ng4rww.png',
  },
  {
    state_code: 'TG',
    state_name: 'Telangana',
    imageUrl:
      'https://res.cloudinary.com/dpmyvq5te/image/upload/v1675784306/Covid19/TG_td7ifh.png',
  },
  {
    state_code: 'TR',
    state_name: 'Tripura',
    imageUrl:
      'https://res.cloudinary.com/dpmyvq5te/image/upload/v1675784428/Covid19/TR_rp73qd.png',
  },
  {
    state_code: 'UP',
    state_name: 'Uttar Pradesh',
    imageUrl:
      'https://res.cloudinary.com/dpmyvq5te/image/upload/v1675784535/Covid19/UP_rmesep.png',
  },
  {
    state_code: 'UT',
    state_name: 'Uttarakhand',
    imageUrl:
      'https://res.cloudinary.com/dpmyvq5te/image/upload/v1675784651/Covid19/UT_wt9u2w.png',
  },
  {
    state_code: 'WB',
    state_name: 'West Bengal',
    imageUrl:
      'https://res.cloudinary.com/dpmyvq5te/image/upload/v1675784762/Covid19/WB_jqovln.png',
  },
]

const apiStateStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN PROGRESS',
}

export default class State extends Component {
  state = {
    apiStateStatus: apiStateStatusConstants.initial,
    apiStateDistrictStatus: apiStateStatusConstants.initial,
    lastUpdated: '',
    nextUpdate: '',
    stateTotalCovid19: {},
    districtsData: [],
    stateDatesReport: [],
    stateDistrictsDatesReport: [],
    selected: null,
    selectReport: reports[0],
  }

  componentDidMount() {
    this.getStateCovid19Data()
    this.getStateUTData()
  }

  getStateCovid19Data = async () => {
    this.setState({
      apiStateDistrictStatus: apiStateStatusConstants.inProgress,
    })
    const {match} = this.props
    const {params} = match
    const {stateCode} = params
    const response = await fetch(
      `https://apis.ccbp.in/covid19-timelines-data/${stateCode}`,
    )
    if (response.ok) {
      const data = await response.json()
      const stateDatesData = Object.keys(data[stateCode].dates).map(
        eachDate => ({
          date: eachDate,
          confirmed: data[stateCode].dates[eachDate].total.confirmed,
          active:
            data[stateCode].dates[eachDate].total.confirmed -
            (data[stateCode].dates[eachDate].total.recovered +
              data[stateCode].dates[eachDate].total.deceased),
          recovered: data[stateCode].dates[eachDate].total.recovered,
          deceased: data[stateCode].dates[eachDate].total.deceased,
          tested: data[stateCode].dates[eachDate].total.tested,
        }),
      )
      const stateDistrictsDatesData = Object.keys(
        data[stateCode].districts,
      ).map(eachState => ({
        districtName: eachState,
        dates: Object.keys(data[stateCode].districts[eachState].dates).map(
          eachDate => ({
            date: eachDate,
            confirmed:
              data[stateCode].districts[eachState].dates[eachDate].total
                .confirmed,
            active:
              data[stateCode].districts[eachState].dates[eachDate].total
                .confirmed -
              (data[stateCode].districts[eachState].dates[eachDate].total
                .recovered +
                data[stateCode].districts[eachState].dates[eachDate].total
                  .deceased),
            recovered:
              data[stateCode].districts[eachState].dates[eachDate].total
                .recovered,
            deceased:
              data[stateCode].districts[eachState].dates[eachDate].total
                .deceased,
            tested:
              data[stateCode].districts[eachState].dates[eachDate].total.tested,
          }),
        ),
      }))
      this.setState({
        apiStateDistrictStatus: apiStateStatusConstants.success,
        stateDatesReport: stateDatesData,
        stateDistrictsDatesReport: stateDistrictsDatesData,
      })
    } else {
      this.setState({
        apiStateDistrictStatus: apiStateStatusConstants.failure,
      })
    }
  }

  getStateUTData = async () => {
    this.setState({apiStateStatus: apiStateStatusConstants.inProgress})
    const monthFormat = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ]
    const response = await fetch('https://apis.ccbp.in/covid19-state-wise-data')
    if (response.ok) {
      const {match} = this.props
      const {params} = match
      const {stateCode} = params
      const data = await response.json()
      const getDate = data.DL.meta.last_updated
      const date = new Date(getDate)
      const getDateValue = dayFormat => {
        switch (dayFormat) {
          case 1:
            return '1st'
          case 2:
            return '2nd'
          case 3:
            return '3rd'
          default:
            return `${dayFormat}th`
        }
      }
      const getTotalStateCovid19Data = {
        tested: data[stateCode].total.tested,
        confirmed: data[stateCode].total.confirmed,
        active:
          data[stateCode].total.confirmed -
          (data[stateCode].total.deceased + data[stateCode].total.recovered),
        deceased: data[stateCode].total.deceased,
        recovered: data[stateCode].total.recovered,
        population: data[stateCode].meta.population,
      }
      const getAllDistrictsArray = Object.keys(data[stateCode].districts)
      const getAllDistrictsData = data[stateCode].districts
      const filteredAllDistricts = getAllDistrictsArray.map(eachDistrict => ({
        districtName: eachDistrict,
        confirmed: getAllDistrictsData[eachDistrict].total.confirmed,
        active:
          getAllDistrictsData[eachDistrict].total.confirmed -
          (getAllDistrictsData[eachDistrict].total.recovered +
            (getAllDistrictsData[eachDistrict].total.deceased !== undefined || 0
              ? getAllDistrictsData[eachDistrict].total.deceased
              : 0)),
        recovered: getAllDistrictsData[eachDistrict].total.recovered,
        deceased:
          getAllDistrictsData[eachDistrict].total.deceased !== undefined || 0
            ? getAllDistrictsData[eachDistrict].total.deceased
            : 0,
      }))
      this.setState({
        apiStateStatus: apiStateStatusConstants.success,
        stateTotalCovid19: getTotalStateCovid19Data,
        districtsData: filteredAllDistricts,
        lastUpdated: `Last update on ${
          monthFormat[date.getMonth()]
        } ${getDateValue(date.getDate())} ${date.getFullYear()}.`,
        nextUpdate: `(As of ${getDateValue(date.getDate() + 1)} ${
          monthFormat[date.getMonth()]
        } per source)`,
      })
    } else {
      this.setState({apiStateStatus: apiStateStatusConstants.failure})
    }
  }

  renderStateHeader = () => {
    const {lastUpdated, stateTotalCovid19} = this.state
    const {tested} = stateTotalCovid19
    const {match} = this.props
    const {params} = match
    const {stateCode} = params
    return (
      <div className="state-specific-name-test-container">
        <div>
          <h1 className="state-specific-name-heading">
            {
              statesList.find(
                eachStateCode => eachStateCode.state_code === stateCode,
              ).state_name
            }
          </h1>
          {lastUpdated !== '' && (
            <p className="state-specific-last-update">{lastUpdated}</p>
          )}
        </div>
        <div>
          <p className="state-specific-tested">Tested</p>
          <p className="state-specific-tested-count">{tested}</p>
        </div>
      </div>
    )
  }

  changeReportConfirmed = () => {
    this.setState({selectReport: reports[0]})
  }

  changeReportActive = () => {
    this.setState({selectReport: reports[1]})
  }

  changeReportRecovered = () => {
    this.setState({selectReport: reports[2]})
  }

  changeReportDeceased = () => {
    this.setState({selectReport: reports[3]})
  }

  renderStateTotalReport = () => {
    const {stateTotalCovid19, selectReport} = this.state
    const {confirmed, active, recovered, deceased} = stateTotalCovid19
    const isLiveConfirmed =
      selectReport === reports[0] ? `live-${reports[0]}` : ''
    const isLiveActive = selectReport === reports[1] ? `live-${reports[1]}` : ''
    const isLiveRecovered =
      selectReport === reports[2] ? `live-${reports[2]}` : ''
    const isLiveDeceased =
      selectReport === reports[3] ? `live-${reports[3]}` : ''

    return (
      <div className="covid-19-total-count-container state-specific-top-margin">
        <button
          type="button"
          className={`covid19-research-container confirmed bg-confirmed btn-default btn ${isLiveConfirmed}`}
          onClick={this.changeReportConfirmed}
        >
          <div testid="stateSpecificConfirmedCasesContainer">
            <p className="covid19-headline">Confirmed</p>
            <img
              src="https://res.cloudinary.com/dpmyvq5te/image/upload/v1675476017/Covid19/check-mark_1_foa8ww.png"
              alt="state specific confirmed cases pic"
              className="covid19-cases-img"
            />
            <p className="count">{confirmed}</p>
          </div>
        </button>
        <button
          type="button"
          className={`covid19-research-container active bg-active btn-default btn ${isLiveActive}`}
          onClick={this.changeReportActive}
        >
          <div testid="stateSpecificActiveCasesContainer">
            <p className="covid19-headline">Active</p>
            <img
              src="https://res.cloudinary.com/dpmyvq5te/image/upload/v1675476017/Covid19/protection_1_wnebxj.png"
              alt="state specific active cases pic"
              className="covid19-cases-img"
            />
            <p className="count">{active}</p>
          </div>
        </button>
        <button
          type="button"
          className={`covid19-research-container recovered bg-recovered btn-default btn ${isLiveRecovered}`}
          onClick={this.changeReportRecovered}
        >
          <div testid="stateSpecificRecoveredCasesContainer">
            <p className="covid19-headline">Recovered</p>
            <img
              src="https://res.cloudinary.com/dpmyvq5te/image/upload/v1675476017/Covid19/recovered_1_wxrlag.png"
              alt="state specific recovered cases pic"
              className="covid19-cases-img"
            />
            <p className="count">{recovered}</p>
          </div>
        </button>
        <button
          type="button"
          className={`covid19-research-container deceased bg-deceased btn-default btn ${isLiveDeceased}`}
          onClick={this.changeReportDeceased}
        >
          <div testid="stateSpecificDeceasedCasesContainer">
            <p className="covid19-headline">Deceased</p>
            <img
              src="https://res.cloudinary.com/dpmyvq5te/image/upload/v1675476017/Covid19/breathing_1_jao8aq.png"
              alt="state specific deceased cases pic"
              className="covid19-cases-img"
            />
            <p className="count">{deceased}</p>
          </div>
        </button>
      </div>
    )
  }

  renderStateNCPReport = () => {
    const {stateTotalCovid19, nextUpdate} = this.state
    const {population, tested} = stateTotalCovid19
    const {match} = this.props
    const {params} = match
    const {stateCode} = params
    return (
      <div className="state-specific-state-map-research-container">
        <div className="india-map-container">
          <img
            src={
              statesList.find(eachState => eachState.state_code === stateCode)
                .imageUrl
            }
            alt={
              statesList.find(eachState => eachState.state_code === stateCode)
                .state_name
            }
            className="india-map-img"
          />
        </div>
        <div className="state-specific-research-container">
          <h1 className="state-specific-ncp-report">NCP report </h1>
          <div className="state-specific-population-tested-container">
            <div className="state-specific-population-report-container">
              <p className="state-specific-population">Population</p>
              <p className="state-specific-count-report">{population}</p>
            </div>
            <div className="state-specific-population-report-container">
              <p className="state-specific-population">Tested</p>
              <p className="state-specific-count-report">{tested}</p>
              <p className="state-specific-report-as-date">{nextUpdate}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  renderTopDistrictReport = () => {
    const {districtsData, selectReport} = this.state
    const filteredTopDistricts = districtsData.sort(
      (a, b) => b[selectReport] - a[selectReport],
    )
    return (
      <>
        <h1
          className={`state-specific-top-districts top-${selectReport}-color`}
        >
          Top Districts
        </h1>
        <ul
          className="state-specific-top-districts-report-container"
          testid="topDistrictsUnorderedList"
        >
          {filteredTopDistricts.map(eachItem => (
            <li
              key={eachItem.districtName}
              className="state-specific-top-district-container"
            >
              <p className="top-district-total">
                {eachItem[selectReport] === undefined
                  ? 0
                  : eachItem[selectReport]}
              </p>
              <p className="top-district-name">{eachItem.districtName}</p>
            </li>
          ))}
        </ul>
      </>
    )
  }

  renderBarChart = () => {
    const {stateDatesReport, selectReport} = this.state
    const filteredReport = reports.filter(
      eachReport => eachReport === selectReport,
    )
    const lastTenDaysReport = stateDatesReport.slice(
      stateDatesReport.length - 10,
      stateDatesReport.length,
    )
    const changeDate = date => {
      const monthFormat = [
        'JAN',
        'FEB',
        'MAR',
        'APR',
        'MAY',
        'JUN',
        'JUL',
        'AUG',
        'SEP',
        'OCT',
        'NOV',
        'DEC',
      ]
      const orginalDate = new Date(date)
      return `${orginalDate.getDate()} ${monthFormat[orginalDate.getMonth()]}`
    }
    const DataFormater = number => {
      if (number > 1000) {
        if (number > 100000) {
          return `${(number / 100000).toFixed(2).toString()}L`
        }
        return `${(number / 1000).toFixed(2).toString()}K`
      }
      return number.toString()
    }
    return (
      <>
        <ul className="responsive-w-1200-bar-chart-container">
          {filteredReport.map(eachItem => (
            <li key={eachItem}>
              <ResponsiveContainer width="100%" height={450}>
                <BarChart
                  margin={{top: 25, left: 0, right: 0, bottom: 25}}
                  data={lastTenDaysReport}
                >
                  <CartesianGrid opacity={0} />
                  <XAxis
                    dataKey="date"
                    axisLine={false}
                    tickLine={false}
                    tick={{fill: `${barColor[eachItem]}`}}
                    tickFormatter={changeDate}
                  />
                  <YAxis hide />
                  <Tooltip />
                  <Bar
                    dataKey={eachItem}
                    fill={barColor[eachItem]}
                    className="bar"
                    radius={[8, 8, 0, 0]}
                    label={{
                      position: 'top',
                      fill: `${barColor[eachItem]}`,
                      formatter: DataFormater,
                    }}
                    barSize={65}
                  />
                </BarChart>
              </ResponsiveContainer>
            </li>
          ))}
        </ul>
        <ul className="responsive-w-992-bar-chart-container">
          {filteredReport.map(eachItem => (
            <li key={eachItem}>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart
                  margin={{top: 25, left: 0, right: 0, bottom: 25}}
                  data={lastTenDaysReport}
                >
                  <CartesianGrid opacity={0} />
                  <XAxis
                    dataKey="date"
                    axisLine={false}
                    tickLine={false}
                    tick={{fill: `${barColor[eachItem]}`}}
                    style={{fontSize: '15px'}}
                    tickFormatter={changeDate}
                  />
                  <YAxis hide />
                  <Tooltip />
                  <Bar
                    dataKey={eachItem}
                    fill={barColor[eachItem]}
                    className="bar"
                    radius={[6, 6, 0, 0]}
                    label={{
                      position: 'top',
                      fill: `${barColor[eachItem]}`,
                      formatter: DataFormater,
                      fontSize: '15',
                    }}
                    barSize={45}
                  />
                </BarChart>
              </ResponsiveContainer>
            </li>
          ))}
        </ul>
        <ul className="responsive-w-768-bar-chart-container">
          {filteredReport.map(eachItem => (
            <li key={eachItem}>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart
                  margin={{top: 25, left: 0, right: 0, bottom: 25}}
                  data={lastTenDaysReport}
                >
                  <CartesianGrid opacity={0} />
                  <XAxis
                    dataKey="date"
                    axisLine={false}
                    tickLine={false}
                    tick={{fill: `${barColor[eachItem]}`}}
                    style={{fontSize: '12px'}}
                    tickFormatter={changeDate}
                  />
                  <YAxis hide />
                  <Tooltip />
                  <Bar
                    dataKey={eachItem}
                    fill={barColor[eachItem]}
                    className="bar"
                    radius={[6, 6, 0, 0]}
                    label={{
                      position: 'top',
                      fill: `${barColor[eachItem]}`,
                      formatter: DataFormater,
                      fontSize: '12',
                    }}
                    barSize={45}
                  />
                </BarChart>
              </ResponsiveContainer>
            </li>
          ))}
        </ul>
        <ul className="responsive-w-576-bar-chart-container">
          {filteredReport.map(eachItem => (
            <li key={eachItem}>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart
                  margin={{top: 25, left: 0, right: 0, bottom: 25}}
                  data={lastTenDaysReport}
                >
                  <CartesianGrid opacity={0} />
                  <XAxis
                    dataKey="date"
                    axisLine={false}
                    tickLine={false}
                    tick={{fill: `${barColor[eachItem]}`}}
                    style={{fontSize: '8px'}}
                    tickFormatter={changeDate}
                  />
                  <YAxis hide />
                  <Tooltip />
                  <Bar
                    dataKey={eachItem}
                    fill={barColor[eachItem]}
                    className="bar"
                    radius={[5, 5, 0, 0]}
                    label={{
                      position: 'top',
                      fill: `${barColor[eachItem]}`,
                      formatter: DataFormater,
                      fontSize: '8',
                    }}
                    barSize={30}
                  />
                </BarChart>
              </ResponsiveContainer>
            </li>
          ))}
        </ul>
        <ul className="responsive-w-360-bar-chart-container">
          {filteredReport.map(eachItem => (
            <li key={eachItem}>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart
                  margin={{top: 25, left: 0, right: 0, bottom: 25}}
                  data={lastTenDaysReport}
                >
                  <CartesianGrid opacity={0} />
                  <XAxis
                    dataKey="date"
                    axisLine={false}
                    tickLine={false}
                    tick={{fill: `${barColor[eachItem]}`, size: 4}}
                    tickFormatter={changeDate}
                    style={{fontSize: '4px'}}
                  />
                  <YAxis hide />
                  <Tooltip />
                  <Bar
                    dataKey={eachItem}
                    fill={barColor[eachItem]}
                    className="bar"
                    radius={[4, 4, 0, 0]}
                    label={{
                      position: 'top',
                      fill: `${barColor[eachItem]}`,
                      formatter: DataFormater,
                      fontSize: '4',
                    }}
                    barSize={20}
                  />
                </BarChart>
              </ResponsiveContainer>
            </li>
          ))}
        </ul>
      </>
    )
  }

  changeOption = value => {
    this.setState({selected: value})
  }

  renderSpreadTrends = () => {
    const {stateDistrictsDatesReport, selected} = this.state
    const options = stateDistrictsDatesReport.map(eachState => ({
      value: eachState.districtName,
      label: eachState.districtName,
    }))
    const selectStyles = {
      control: styles => ({
        ...styles,
        backgroundColor: '#2F2F43',
        borderWidth: 0,
      }),
      dropdownIndicator: styles => ({...styles, color: '#94A3B8'}),
      indicatorSeparator: styles => ({...styles, width: 0}),
      placeholder: styles => ({...styles, color: '#94A3B8'}),
      input: styles => ({...styles, color: '#94A3B8'}),
      singleValue: styles => ({
        ...styles,
        color: '#94A3B8',
      }),
      option: styles => ({
        ...styles,
        color: '#94A3B8',
        backgroundColor: '#222234',
      }),
    }
    return (
      <>
        <h1 className="state-specific-spread-trends">Spread Trends</h1>
        <div className="state-specific-select-districts-container">
          <Select
            options={options}
            selected={selected}
            onChange={this.changeOption}
            placeholder="Select District"
            styles={selectStyles}
          />
        </div>
      </>
    )
  }

  stateLineChart = () => {
    const {stateDatesReport} = this.state
    const changeNumberFormat = number => {
      if (number > 1000) {
        if (number > 100000) {
          if (number > 10000000) {
            return `${parseFloat((number / 10000000).toFixed(2))}Cr`
          }
          return `${parseFloat((number / 100000).toFixed(2))}L`
        }
        return `${parseFloat((number / 1000).toFixed(2))}K`
      }
      return `${number}`
    }
    return (
      <>
        <ul
          className="state-specific-line-chart-container responsive-w-1200-bar-chart-container"
          testid="lineChartsContainer"
        >
          {reports.map(eachReport => (
            <li
              key={eachReport}
              className={`line-chart-${eachReport}-bg-color`}
            >
              <ResponsiveContainer width="100%" height={375}>
                <LineChart
                  data={stateDatesReport}
                  margin={{top: 15, bottom: 60, left: 30, right: 30}}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity="0" />
                  <XAxis
                    dataKey="date"
                    style={{
                      fontSize: '16px',
                      fill: `${reportsColor[eachReport]}`,
                    }}
                    stroke={reportsColor[eachReport]}
                    minTickGap={25}
                    angle={-45}
                    textAnchor="end"
                  />
                  <YAxis
                    type="number"
                    domain={['dataMin - 100', 'dataMax + 100']}
                    style={{
                      fontSize: '16px',
                      fill: `${reportsColor[eachReport]}`,
                    }}
                    tickFormatter={changeNumberFormat}
                    stroke={reportsColor[eachReport]}
                  />
                  <Tooltip
                    separator=" "
                    cursor={{
                      stroke: `${reportsColor[eachReport]}`,
                      strokeWidth: 0.25,
                    }}
                  />
                  <Legend
                    verticalAlign="top"
                    align="right"
                    iconSize={0}
                    height={50}
                  />
                  <Line
                    type="monotone"
                    dataKey={eachReport}
                    stroke={reportsColor[eachReport]}
                    fill={reportsColor[eachReport]}
                  />
                </LineChart>
              </ResponsiveContainer>
            </li>
          ))}
        </ul>
        <ul className="state-specific-line-chart-container responsive-w-992-bar-chart-container">
          {reports.map(eachReport => (
            <li
              key={eachReport}
              className={`line-chart-${eachReport}-bg-color`}
            >
              <ResponsiveContainer width="100%" height={365}>
                <LineChart
                  data={stateDatesReport}
                  margin={{top: 15, bottom: 50, left: 15, right: 15}}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity="0" />
                  <XAxis
                    dataKey="date"
                    style={{
                      fontSize: '15px',
                      fill: `${reportsColor[eachReport]}`,
                    }}
                    stroke={reportsColor[eachReport]}
                    minTickGap={25}
                    angle={-45}
                    textAnchor="end"
                  />
                  <YAxis
                    type="number"
                    domain={['dataMin - 100', 'dataMax + 100']}
                    style={{
                      fontSize: '15px',
                      fill: `${reportsColor[eachReport]}`,
                    }}
                    tickFormatter={changeNumberFormat}
                    stroke={reportsColor[eachReport]}
                  />
                  <Tooltip
                    separator=" "
                    cursor={{
                      stroke: `${reportsColor[eachReport]}`,
                      strokeWidth: 0.25,
                    }}
                  />
                  <Legend
                    verticalAlign="top"
                    align="right"
                    iconSize={0}
                    height={45}
                  />
                  <Line
                    type="monotone"
                    dataKey={eachReport}
                    stroke={reportsColor[eachReport]}
                    fill={reportsColor[eachReport]}
                  />
                </LineChart>
              </ResponsiveContainer>
            </li>
          ))}
        </ul>
        <ul className="state-specific-line-chart-container responsive-w-768-bar-chart-container">
          {reports.map(eachReport => (
            <li
              key={eachReport}
              className={`line-chart-${eachReport}-bg-color`}
            >
              <ResponsiveContainer width="100%" height={355}>
                <LineChart
                  data={stateDatesReport}
                  margin={{top: 15, bottom: 40, left: 10, right: 10}}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity="0" />
                  <XAxis
                    dataKey="date"
                    style={{
                      fontSize: '12px',
                      fill: `${reportsColor[eachReport]}`,
                    }}
                    stroke={reportsColor[eachReport]}
                    minTickGap={25}
                    angle={-45}
                    textAnchor="end"
                  />
                  <YAxis
                    type="number"
                    domain={['dataMin - 100', 'dataMax + 100']}
                    style={{
                      fontSize: '12px',
                      fill: `${reportsColor[eachReport]}`,
                    }}
                    tickFormatter={changeNumberFormat}
                    stroke={reportsColor[eachReport]}
                  />
                  <Tooltip
                    separator=" "
                    cursor={{
                      stroke: `${reportsColor[eachReport]}`,
                      strokeWidth: 0.25,
                    }}
                  />
                  <Legend
                    verticalAlign="top"
                    align="right"
                    iconSize={0}
                    height={30}
                  />
                  <Line
                    type="monotone"
                    dataKey={eachReport}
                    stroke={reportsColor[eachReport]}
                    fill={reportsColor[eachReport]}
                  />
                </LineChart>
              </ResponsiveContainer>
            </li>
          ))}
        </ul>
        <ul className="state-specific-line-chart-container responsive-w-576-bar-chart-container">
          {reports.map(eachReport => (
            <li
              key={eachReport}
              className={`line-chart-${eachReport}-bg-color`}
            >
              <ResponsiveContainer width="100%" height={345}>
                <LineChart
                  data={stateDatesReport}
                  margin={{top: 15, bottom: 30, left: 5, right: 5}}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity="0" />
                  <XAxis
                    dataKey="date"
                    style={{
                      fontSize: '10px',
                      fill: `${reportsColor[eachReport]}`,
                    }}
                    stroke={reportsColor[eachReport]}
                    minTickGap={25}
                    angle={-45}
                    textAnchor="end"
                  />
                  <YAxis
                    width={50}
                    type="number"
                    domain={['dataMin - 100', 'dataMax + 100']}
                    style={{
                      fontSize: '10px',
                      fill: `${reportsColor[eachReport]}`,
                    }}
                    tickFormatter={changeNumberFormat}
                    stroke={reportsColor[eachReport]}
                  />
                  <Tooltip
                    separator=" "
                    cursor={{
                      stroke: `${reportsColor[eachReport]}`,
                      strokeWidth: 0.25,
                    }}
                  />
                  <Legend
                    verticalAlign="top"
                    align="right"
                    iconSize={0}
                    height={20}
                  />
                  <Line
                    type="monotone"
                    dataKey={eachReport}
                    stroke={reportsColor[eachReport]}
                    fill={reportsColor[eachReport]}
                  />
                </LineChart>
              </ResponsiveContainer>
            </li>
          ))}
        </ul>
        <ul className="state-specific-line-chart-container responsive-w-360-bar-chart-container">
          {reports.map(eachReport => (
            <li
              key={eachReport}
              className={`line-chart-${eachReport}-bg-color`}
            >
              <ResponsiveContainer width="100%" height={330}>
                <LineChart
                  data={stateDatesReport}
                  margin={{top: 15, bottom: 15, left: 2, right: 2}}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity="0" />
                  <XAxis
                    dataKey="date"
                    style={{
                      fontSize: '8px',
                      fill: `${reportsColor[eachReport]}`,
                    }}
                    stroke={reportsColor[eachReport]}
                    minTickGap={25}
                    angle={-45}
                    textAnchor="end"
                  />
                  <YAxis
                    width={40}
                    type="number"
                    domain={['dataMin - 100', 'dataMax + 100']}
                    style={{
                      fontSize: '8px',
                      fill: `${reportsColor[eachReport]}`,
                    }}
                    tickFormatter={changeNumberFormat}
                    stroke={reportsColor[eachReport]}
                  />
                  <Tooltip
                    separator=" "
                    cursor={{
                      stroke: `${reportsColor[eachReport]}`,
                      strokeWidth: 0.25,
                    }}
                  />
                  <Legend
                    verticalAlign="top"
                    align="right"
                    iconSize={0}
                    height={25}
                  />
                  <Line
                    type="monotone"
                    dataKey={eachReport}
                    stroke={reportsColor[eachReport]}
                    fill={reportsColor[eachReport]}
                  />
                </LineChart>
              </ResponsiveContainer>
            </li>
          ))}
        </ul>
      </>
    )
  }

  stateDistrictsLineChart = () => {
    const {selected, stateDistrictsDatesReport} = this.state
    const stateDistrictReport = stateDistrictsDatesReport
      .find(eachDistrict => eachDistrict.districtName === selected.label)
      .dates.map(eachItem => ({
        date: eachItem.date,
        confirmed: eachItem.confirmed,
        active: eachItem.active,
        recovered: eachItem.recovered,
        deceased: eachItem.deceased,
        tested: eachItem.tested,
      }))
    const changeNumberFormat = number => {
      if (number > 1000) {
        if (number > 100000) {
          if (number > 10000000) {
            return `${parseFloat((number / 10000000).toFixed(2))}Cr`
          }
          return `${parseFloat((number / 100000).toFixed(2))}L`
        }
        return `${parseFloat((number / 1000).toFixed(2))}K`
      }
      return `${number}`
    }
    return (
      <>
        <ul className="state-specific-line-chart-container responsive-w-1200-bar-chart-container">
          {reports.map(eachReport => (
            <li
              key={eachReport}
              className={`line-chart-${eachReport}-bg-color`}
            >
              <ResponsiveContainer width="100%" height={375}>
                <LineChart
                  data={stateDistrictReport}
                  margin={{top: 15, bottom: 60, left: 30, right: 30}}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity="0" />
                  <XAxis
                    dataKey="date"
                    style={{
                      fontSize: '16px',
                      fill: `${reportsColor[eachReport]}`,
                    }}
                    stroke={reportsColor[eachReport]}
                    minTickGap={25}
                    angle={-45}
                    textAnchor="end"
                  />
                  <YAxis
                    type="number"
                    domain={['dataMin', 'dataMax']}
                    style={{
                      fontSize: '16px',
                      fill: `${reportsColor[eachReport]}`,
                    }}
                    tickFormatter={changeNumberFormat}
                    stroke={reportsColor[eachReport]}
                  />
                  <Tooltip
                    separator=" "
                    cursor={{
                      stroke: `${reportsColor[eachReport]}`,
                      strokeWidth: 0.25,
                    }}
                  />
                  <Legend
                    verticalAlign="top"
                    align="right"
                    iconSize={0}
                    height={50}
                  />
                  <Line
                    type="monotone"
                    dataKey={eachReport}
                    stroke={reportsColor[eachReport]}
                    fill={reportsColor[eachReport]}
                  />
                </LineChart>
              </ResponsiveContainer>
            </li>
          ))}
        </ul>
        <ul className="state-specific-line-chart-container responsive-w-992-bar-chart-container">
          {reports.map(eachReport => (
            <li
              key={eachReport}
              className={`line-chart-${eachReport}-bg-color`}
            >
              <ResponsiveContainer width="100%" height={365}>
                <LineChart
                  data={stateDistrictReport}
                  margin={{top: 15, bottom: 50, left: 15, right: 15}}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity="0" />
                  <XAxis
                    dataKey="date"
                    style={{
                      fontSize: '15px',
                      fill: `${reportsColor[eachReport]}`,
                    }}
                    stroke={reportsColor[eachReport]}
                    minTickGap={25}
                    angle={-45}
                    textAnchor="end"
                  />
                  <YAxis
                    type="number"
                    domain={['dataMin', 'dataMax']}
                    style={{
                      fontSize: '15px',
                      fill: `${reportsColor[eachReport]}`,
                    }}
                    tickFormatter={changeNumberFormat}
                    stroke={reportsColor[eachReport]}
                  />
                  <Tooltip
                    separator=" "
                    cursor={{
                      stroke: `${reportsColor[eachReport]}`,
                      strokeWidth: 0.25,
                    }}
                  />
                  <Legend
                    verticalAlign="top"
                    align="right"
                    iconSize={0}
                    height={45}
                  />
                  <Line
                    type="monotone"
                    dataKey={eachReport}
                    stroke={reportsColor[eachReport]}
                    fill={reportsColor[eachReport]}
                  />
                </LineChart>
              </ResponsiveContainer>
            </li>
          ))}
        </ul>
        <ul className="state-specific-line-chart-container responsive-w-768-bar-chart-container">
          {reports.map(eachReport => (
            <li
              key={eachReport}
              className={`line-chart-${eachReport}-bg-color`}
            >
              <ResponsiveContainer width="100%" height={355}>
                <LineChart
                  data={stateDistrictReport}
                  margin={{top: 15, bottom: 40, left: 10, right: 10}}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity="0" />
                  <XAxis
                    dataKey="date"
                    style={{
                      fontSize: '12px',
                      fill: `${reportsColor[eachReport]}`,
                    }}
                    stroke={reportsColor[eachReport]}
                    minTickGap={25}
                    angle={-45}
                    textAnchor="end"
                  />
                  <YAxis
                    type="number"
                    domain={['dataMin', 'dataMax']}
                    style={{
                      fontSize: '12px',
                      fill: `${reportsColor[eachReport]}`,
                    }}
                    tickFormatter={changeNumberFormat}
                    stroke={reportsColor[eachReport]}
                  />
                  <Tooltip
                    separator=" "
                    cursor={{
                      stroke: `${reportsColor[eachReport]}`,
                      strokeWidth: 0.25,
                    }}
                  />
                  <Legend
                    verticalAlign="top"
                    align="right"
                    iconSize={0}
                    height={30}
                  />
                  <Line
                    type="monotone"
                    dataKey={eachReport}
                    stroke={reportsColor[eachReport]}
                    fill={reportsColor[eachReport]}
                  />
                </LineChart>
              </ResponsiveContainer>
            </li>
          ))}
        </ul>
        <ul className="state-specific-line-chart-container responsive-w-576-bar-chart-container">
          {reports.map(eachReport => (
            <li
              key={eachReport}
              className={`line-chart-${eachReport}-bg-color`}
            >
              <ResponsiveContainer width="100%" height={345}>
                <LineChart
                  data={stateDistrictReport}
                  margin={{top: 15, bottom: 30, left: 5, right: 5}}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity="0" />
                  <XAxis
                    dataKey="date"
                    style={{
                      fontSize: '10px',
                      fill: `${reportsColor[eachReport]}`,
                    }}
                    stroke={reportsColor[eachReport]}
                    minTickGap={25}
                    angle={-45}
                    textAnchor="end"
                  />
                  <YAxis
                    width={50}
                    type="number"
                    domain={['dataMin', 'dataMax']}
                    style={{
                      fontSize: '10px',
                      fill: `${reportsColor[eachReport]}`,
                    }}
                    tickFormatter={changeNumberFormat}
                    stroke={reportsColor[eachReport]}
                  />
                  <Tooltip
                    separator=" "
                    cursor={{
                      stroke: `${reportsColor[eachReport]}`,
                      strokeWidth: 0.25,
                    }}
                  />
                  <Legend
                    verticalAlign="top"
                    align="right"
                    iconSize={0}
                    height={20}
                  />
                  <Line
                    type="monotone"
                    dataKey={eachReport}
                    stroke={reportsColor[eachReport]}
                    fill={reportsColor[eachReport]}
                  />
                </LineChart>
              </ResponsiveContainer>
            </li>
          ))}
        </ul>
        <ul className="state-specific-line-chart-container responsive-w-360-bar-chart-container">
          {reports.map(eachReport => (
            <li
              key={eachReport}
              className={`line-chart-${eachReport}-bg-color`}
            >
              <ResponsiveContainer width="100%" height={330}>
                <LineChart
                  data={stateDistrictReport}
                  margin={{top: 15, bottom: 15, left: 2, right: 2}}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity="0" />
                  <XAxis
                    dataKey="date"
                    style={{
                      fontSize: '8px',
                      fill: `${reportsColor[eachReport]}`,
                    }}
                    stroke={reportsColor[eachReport]}
                    minTickGap={25}
                    angle={-45}
                    textAnchor="end"
                  />
                  <YAxis
                    width={40}
                    type="number"
                    domain={['dataMin', 'dataMax']}
                    style={{
                      fontSize: '8px',
                      fill: `${reportsColor[eachReport]}`,
                    }}
                    tickFormatter={changeNumberFormat}
                    stroke={reportsColor[eachReport]}
                  />
                  <Tooltip
                    separator=" "
                    cursor={{
                      stroke: `${reportsColor[eachReport]}`,
                      strokeWidth: 0.25,
                    }}
                  />
                  <Legend
                    verticalAlign="top"
                    align="right"
                    iconSize={0}
                    height={25}
                  />
                  <Line
                    type="monotone"
                    dataKey={eachReport}
                    stroke={reportsColor[eachReport]}
                    fill={reportsColor[eachReport]}
                  />
                </LineChart>
              </ResponsiveContainer>
            </li>
          ))}
        </ul>
      </>
    )
  }

  renderLineChart = () => {
    const {selected} = this.state
    return (
      <>
        {selected === null
          ? this.stateLineChart()
          : this.stateDistrictsLineChart()}
      </>
    )
  }

  renderStateDistrictSuccessView = () => (
    <>
      {this.renderTopDistrictReport()}
      {this.renderBarChart()}
      {this.renderSpreadTrends()}
      {this.renderLineChart()}
    </>
  )

  renderStateDistrictInProgressView = () => (
    <div testid="timelinesDataLoader" className="retry-container">
      <Loader type="TailSpin" color="#007BFF" height={80} width={80} />
    </div>
  )

  clickRetry = () => {
    this.getStateCovid19Data()
  }

  renderStateDistrictFailureView = () => (
    <div className="retry-container">
      <button type="button" className="retry-btn" onClick={this.clickRetry}>
        Retry
      </button>
    </div>
  )

  renderStateDistrict = () => {
    const {apiStateDistrictStatus} = this.state
    switch (apiStateDistrictStatus) {
      case 'SUCCESS':
        return this.renderStateDistrictSuccessView()
      case 'IN PROGRESS':
        return this.renderStateDistrictInProgressView()
      case 'FAILURE':
        return this.renderStateDistrictFailureView()
      default:
        return null
    }
  }

  renderState = () => (
    <div className="state-specific-container">
      {this.renderStateHeader()}
      {this.renderStateTotalReport()}
      {this.renderStateNCPReport()}
      {this.renderStateDistrict()}
      <Footer />
    </div>
  )

  render() {
    return (
      <div className="state-specific-bg-container">
        <Header />
        {this.renderState()}
      </div>
    )
  }
}
