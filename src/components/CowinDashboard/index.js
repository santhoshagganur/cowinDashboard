// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByAge from '../VaccinationByAge'
import VaccinationByGender from '../VaccinationByGender'
import './index.css'

const apiStatusConstants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
  initial: 'INITIAL',
}

class CowinDashboard extends Component {
  state = {
    dataDetails: {},
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getDashboardData()
  }

  getDashboardData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const url = 'https://apis.ccbp.in/covid-vaccination-data'
    const options = {
      method: 'GET',
    }

    const response = await fetch(url, options)
    const fetchedData = await response.json()

    if (response.ok === true) {
      const convertedData = {
        lastDaysVaccination: fetchedData.last_7_days_vaccination,
        vaccinationByAge: fetchedData.vaccination_by_age,
        vaccinationByGender: fetchedData.vaccination_by_gender,
      }

      this.setState({
        dataDetails: convertedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderSuccessView = () => {
    const {dataDetails} = this.state
    const {
      lastDaysVaccination,
      vaccinationByAge,
      vaccinationByGender,
    } = dataDetails
    return (
      <>
        <VaccinationCoverage vaccinationData={lastDaysVaccination} />
        <VaccinationByAge vaccinationByAge={vaccinationByAge} />
        <VaccinationByGender vaccinationByGender={vaccinationByGender} />
      </>
    )
  }

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-image"
      />
      <p className="failure-text"> Something went wrong </p>
    </div>
  )

  renderLoaderView = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  renderCowinDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoaderView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="bg-container">
        <div className="nav-bar">
          <img
            src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
            alt="website logo"
            className="app-logo"
          />
          <h1 className="app-name"> Co-WIN </h1>
        </div>
        <h1 className="about-app"> CoWIN Vaccination in India </h1>
        <div>{this.renderCowinDetails()}</div>
      </div>
    )
  }
}

export default CowinDashboard
