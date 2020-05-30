import React, { Component } from "react";
import { connect } from "react-redux";
import { setNumber, setUsername } from "../redux/actions/userActions";
import { withRouter } from "react-router-dom";
import { login } from "../redux/actions/authActions";
import axios from "axios";
import { Form, FormGroup, Label, Input, Button, Alert } from "reactstrap";

class LoginComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      profile: null,
      errors: [],
    };
  }

  componentDidMount() {
    this.__checkAuth();
  }

  componentWillReceiveProps() {
    this.__checkAuth();
  }

  __inputHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  __onSubmit = (e) => {
    const { login, auth } = this.props;
    const { email, password } = this.state;
    let errors = [];
    e.preventDefault();
    if (auth.email !== email && auth.password !== password) {
      errors.push(
        "Sorry. We couldn't find account with your email. Try again."
      );
    }
    if (errors.length === 0) login(this.state, this.props);
    this.setState({
      errors,
    });
  };

  __checkAuth = () => {
    if (this.props.auth.isLogin) {
      this.props.history.push("/user");
    }
  };

  goToRegisterPage = () => {
    const { history } = this.props;
    history.push("/register");
  };

  render() {
    const { email, password, errors, errorTimeOut } = this.state;
    return (
      <div className="card-authentication">
        <img
          src={require("../static/images/e-commerce.png")}
          alt="e-commerce icon"
          className="e-commerce-logo"
        />
        {errors.map((error, index) => (
          <Alert key={index} color="danger">
            {error}
          </Alert>
        ))}
        <h3 className="mt-2 text-center">Welcome back</h3>
        <small className="mb-2 text-center d-block">
          Enter your Email and Password to login
        </small>
        <hr />
        <Form onSubmit={(e) => this.__onSubmit(e)}>
          <FormGroup>
            <Input
              type="email"
              name="email"
              placeholder="Email"
              className="text-center"
              value={email}
              onChange={(e) => this.__inputHandler(e)}
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="password"
              name="password"
              placeholder="Password"
              className="text-center"
              value={password}
              onChange={(e) => this.__inputHandler(e)}
            />
          </FormGroup>
          <hr />
          <Button block color="primary" type="submit">
            Sign In
          </Button>
          <small
            className="sub-text-authentication"
            onClick={() => this.goToRegisterPage()}
          >
            Have no account? Create new.
          </small>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = ({ user, product, auth }) => {
  return {
    user,
    product,
    auth,
  };
};

const mapDispatchToProps = {
  setNumber,
  setUsername,
  login,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(LoginComponent)
);
