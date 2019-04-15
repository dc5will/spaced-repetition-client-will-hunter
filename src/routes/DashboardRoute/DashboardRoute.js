import React, { Component } from 'react'
import UserContext from '../../contexts/UserContext';
import DashboardApiService from '../../services/dashboard-service';

class DashboardRoute extends Component {
  state = {
    error: null,
    language: null,
  }

  static contextType = UserContext;

  componentDidMount() {
    DashboardApiService.getLanguage().then(data => {
      console.log(data.language.name);
      this.setState({ language: data.language.name })
    }).catch(res => this.setState({ error: res.error }))
  }

  render() {
    console.log(this.state.language);
    return (
      <section>
        <h2>{this.state.language}</h2>
      </section>
    );
  }
}

export default DashboardRoute
