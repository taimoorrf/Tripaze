// Since this component has no state, this will be a functional component rather than a class component

import React from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut } from '../../store/actions/authActions';
import { compose } from 'redux';
import { verifyEmail } from '../modals/EditProfileModals';

// this is a functional component, not a class, so we need to pass the props as argument
const SignedInCompanyLinks = (props) => {
  const handleOnClick = () => {
    if (props.verified) props.history.push('/createtrip');
    else verifyEmail();
  };

  const initial = props.profile ? props.profile.companyName : null;
  return (
    <div class="collapse navbar-collapse " id="navbarSupportedContent">
      <ul class="navbar-nav navbar-fonts ml-auto justify-content-end">
        <li class="nav-item">
          <div onClick={handleOnClick} className="nav-link hasOnClick">
            Create Trip
          </div>
        </li>
        <li class="nav-item">
          <NavLink to="/" class="nav-link">
            {initial}
          </NavLink>
        </li>
        <li class="nav-item nav-link">
          <li class="nav-item ">
            <NavLink
              to="/"
              class="nav-link"
              onClick={() => {
                props.signOut(props.history);
              }}
            >
              Sign Out
            </NavLink>
          </li>
        </li>
      </ul>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: (history) => dispatch(signOut(history)),
  };
};

// Exporting to be used in app.js
export default compose(
  connect(null, mapDispatchToProps),
  withRouter
)(SignedInCompanyLinks);
