// Write your code here
import {Component} from 'react'
import VaccinationCoverage from '../VaccinationCoverage'
import './index.css'

class CowinDashboard extends Component {
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
        <VaccinationCoverage />
      </div>
    )
  }
}

export default CowinDashboard
