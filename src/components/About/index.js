import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {Redirect} from 'react-router-dom'
import Header from '../Header'
import Footer from '../Footer'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN PROGRESS',
}

class About extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    faqList: [],
    lastUpdated: '',
  }

  componentDidMount() {
    this.getFaqData()
    this.getLastUpdatedDate()
  }

  getFaqData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const response = await fetch('https://apis.ccbp.in/covid19-faqs')
    if (response.ok) {
      const data = await response.json()
      const faqData = data.faq.map(eachItem => ({
        qno: eachItem.qno,
        question: eachItem.question,
        answer: eachItem.answer,
      }))
      this.setState({apiStatus: apiStatusConstants.success, faqList: faqData})
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  getLastUpdatedDate = async () => {
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
      const data = await response.json()
      const getDate = data.DL.meta.last_updated
      const date = new Date(getDate)
      const getDateValue = () => {
        switch (date.getDate()) {
          case 1:
            return '1st'
          case 2:
            return '2nd'
          case 3:
            return '3rd'
          default:
            return `${date.getDate()}th`
        }
      }
      this.setState({
        lastUpdated: `Last update on ${
          monthFormat[date.getMonth()]
        } ${getDateValue()} ${date.getFullYear()}.`,
      })
    }
  }

  renderFaq = faq => {
    const {question, answer} = faq
    return (
      <>
        <p className="faq-question">{question}</p>
        <p className="faq-answer">{answer}</p>
      </>
    )
  }

  renderAboutSuccessView = () => {
    const {faqList, lastUpdated} = this.state
    return (
      <>
        <div className="about-container">
          <h1 className="about">About</h1>
          {lastUpdated !== '' && (
            <p className="about-last-update">{lastUpdated}</p>
          )}
          <p className="about-covid19">
            COVID-19 vaccines be ready for distribution
          </p>
          <ul className="faq-container" testid="faqsUnorderedList">
            {faqList.map(eachItem => (
              <li className="faq" key={eachItem.qno}>
                {this.renderFaq(eachItem)}
              </li>
            ))}
          </ul>
        </div>
        <Footer />
      </>
    )
  }

  renderAboutInProgressView = () => (
    <div testid="aboutRouteLoader" className="loader">
      <Loader type="TailSpin" color="#007BFF" height={80} width={80} />
    </div>
  )

  renderAboutFailureView = () => <Redirect to="/not-found" />

  renderAbout = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case 'SUCCESS':
        return this.renderAboutSuccessView()
      case 'IN PROGRESS':
        return this.renderAboutInProgressView()
      case 'FAILURE':
        return this.renderAboutFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="about-bg-container">
        <Header />
        {this.renderAbout()}
      </div>
    )
  }
}

export default About
