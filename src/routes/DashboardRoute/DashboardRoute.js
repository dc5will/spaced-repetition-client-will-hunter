import React, { Component } from "react";
import Config from "../../config";
import TokenService from "../../services/token-service";
import LanguageContext from "../../contexts/LanguageContext";
import { Link } from "react-router-dom";
import WordsList from "../../components/WordsList/WordsList";
import LoadingPage from "../../components/LoadingPage/LoadingPage";
import "./DashboardRoute.css";

class DashboardRoute extends Component {
  static contextType = LanguageContext;

  state = {
    error: null,
    loading: true
  };

  componentDidMount() {
    fetch(`${Config.API_ENDPOINT}/language`, {
      headers: {
        Authorization: `bearer ${TokenService.getAuthToken()}`
      }
    })
      .then(res => {
        return !res.ok ? res.json().then(e => Promise.reject(e)) : res.json();
      })
      .then(resJson => {
        this.context.setLanguage(resJson);
        this.setState({
          loading: null
        });
      })
      .catch(err => {
        if (err.error && err.error === "Unauthorized request") {
          this.props.logOut();
          this.props.history.push("/login");
        } else {
          this.setState({
            error: err.error
          });
        }
      });
  }

  render() {
    if (this.state.loading) {
      return <LoadingPage />;
    }
    const total_score = this.context.language.total_score;

    return (
      <section className="dashboard-container container fade-in">
        <header className="dashboard-header">
          <img
            className="dashboard-flag"
            src="https://cdn3.iconfinder.com/data/icons/spain-2/92/icon50-23-512.png"
            alt="spanish icon for dashboard"
          />
          <h2 className="dashboard-language-title">
            {this.context.language.name}
          </h2>
        </header>
        <div className="dashboard-flex">
          <div className="dashboard-stats">
            <p>
              Total correct answers:{" "}
              <span>{total_score ? total_score.toLocaleString() : 0}</span>
            </p>
            <Link to="/learn" className="green-button dashboard-practice-button">
              Start practicing
            </Link>
          </div>
          <WordsList />
        </div>
      </section>
    );
  }
}

export default DashboardRoute;
