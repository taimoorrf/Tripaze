import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { signUpUser } from '../../store/actions/authActions';
import { Link } from 'react-router-dom';
import { succesfulSignUp } from '../modals/AuthModals';

export class SignUpUser extends Component {
  state = {
    email: '',
    password: '',
    userName: '',
  };

  handleChange = (e) => {
    this.setState({
      // set state depending on the input id
      [e.target.id]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault(); // prevent the default action of a page reload on from submission
    this.props.signUp(this.state); // call the sign up as user action on form submission
  };

  render() {
    const { auth, authError } = this.props;

    if (auth.uid) {
      succesfulSignUp(); // display a sign up successful page after sign up complete (so auth uid is not null
      this.props.history.push('/'); // Route Guarding: If a user or company is logged in, this page should be inaccessible
    }

    return (
      <div className="row m-0 full-height-width">
        <div className="col-lg-3 col-md-4 col-sm-6 center-align">
          <form onSubmit={this.handleSubmit} className="change-font-opensans ">
            <h3 class="mt-20 mb-4 text-center">Sign Up as User</h3>

            {/* Enter username */}
            <div>
              <input
                onChange={this.handleChange}
                type="text"
                id="userName"
                class="form-control mb-4"
                placeholder="Full Name"
                required
              />
            </div>

            {/* Enter email id */}
            <div>
              <input
                onChange={this.handleChange}
                type="email"
                id="email"
                class="form-control mb-4"
                placeholder="Email address"
                required
              />
            </div>

            {/* Enter password */}
            <div class="form-label-group">
              <input
                onChange={this.handleChange}
                type="password"
                id="password"
                class="form-control mb-4"
                placeholder="Password"
                required
              />
            </div>

            <div>
              {/* Sign up button */}
              <button
                class="btn btn-lg light-button form-rounded btn-block text-uppercase"
                type="submit"
              >
                Sign Up
              </button>
              {/* To display sign up error */}
              {authError && (
                <div className="border border-danger rounded text-danger p-1">
                  <p>{authError}</p>
                </div>
              )}
            </div>
            <hr></hr>

            {/* Link to sign up as company */}
            <div className="text-center">
              <h5 class="m-0 ">Are you a Company?</h5>
              <Link to="/signupcompany">Sign Up here</Link>
            </div>
          </form>
        </div>
        <div className="col-lg-9 col-md-8 col-sm-6 d-sm-block d-none signup-background"></div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    authError: state.auth.authError,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signUp: (newUser) => dispatch(signUpUser(newUser)),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter // to access route-router props for url redirections
)(SignUpUser);
