import React, { Component } from "react";
import LoginForm from "../../components/LoginForm/LoginForm";
import "./LoginRoute.css";

class LoginRoute extends Component {
  static defaultProps = {
    location: {},
    history: {
      push: () => {}
    }
  };

  handleLoginSuccess = () => {
    const { location, history } = this.props;
    const destination = (location.state || {}).from || "/";
    history.push(destination);
  };

  render() {
    return (
      <section className="loginContainer">
        <div className="login-form">
          <h2 className="loginTitle">Login</h2>
          <LoginForm onLoginSuccess={this.handleLoginSuccess} />
        </div>
      </section>
    );
  }
}

export default LoginRoute;
