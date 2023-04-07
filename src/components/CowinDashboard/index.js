// Write your code here
import {Component} from 'react'
import VaccinationCoverage from '../VaccinationCoverage'
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
    const url = 'https://apis.ccbp.in/covid-vaccination-data'
    const options = {
      method: 'GET',
    }

    const response = await fetch(url, options)
    const fetchedData = await response.json()

    if (response.ok === true) {
      const convertedData = {
        last_7_days_vaccination: fetchedData.last_7_days_vaccination,
        vaccination_by_age: fetchedData.vaccination_by_age,
        vaccination_by_gender: fetchedData.vaccination_by_gender,
      }

      this.setState({
        dataDetails: convertedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  render() {
    const {dataDetails} = this.state
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
        <VaccinationCoverage />
      </div>
    )
  }
}

export default CowinDashboard
