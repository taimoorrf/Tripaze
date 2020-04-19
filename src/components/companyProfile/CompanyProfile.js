import React, { Component } from 'react';
import TripsList from '../trips/TripsList';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase'; // higher order
import ReviewSection from './ReviewSection';
import { profileType } from '../../Helpers';

// 6 columns on medium and 12 column on small screens
class CompanyProfile extends Component {
  render() {
    const { trips, company, profile, isLoading, reviews, auth } = this.props;
    const isInitialized = !isLoading && trips && company && auth;
    if (isInitialized) {
      const currProfileType = profileType(auth, profile);
      return (
        <div className="dashboard container">
          <h5 className="gre-text text-darken-3">
            Company Profile: {company.companyName}
          </h5>
          <div className="container cardslist-margin">
            <TripsList trips={trips} />
          </div>
          <ReviewSection
            companyID={this.props.match.params.id}
            reviews={reviews}
            profileType={currProfileType}
            id={auth.uid}
          />
        </div>
      );
    } else {
      return <div>Loading...</div>;
    }
  }
}

// Map state from store to props in component
const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  const companies = state.firestore.data.Companies; // using data instead of ordered here since we are interested in referencing specific trips (hash table)
  const company = companies ? companies[id] : null;
  const requests = state.firestore.status.requesting;
  const isLoading = requests
    ? Object.values(requests).some((value) => value === true)
    : null;
  return {
    trips: state.firestore.ordered.Trips,
    company: company,
    auth: state.firebase.auth,
    profile: state.auth.currProfile,
    isLoading: isLoading, // all must be loaded
    reviews: state.firestore.ordered.Reviews,
  };
};

export default compose(
  connect(mapStateToProps),
  // tells us which collections to connect to in our firebase project whenever this component, namely dashboard, is active
  // Whenever collection trip is changed, it would call the firestore reducer which would update the state of this firestore
  firestoreConnect((props) => [
    {
      collection: 'Trips',
      where: [['companyId', '==', props.match.params.id]],
    },
    { collection: 'Companies', doc: props.match.params.id },
    {
      collection: 'Reviews',
      where: [['companyID', '==', props.match.params.id]],
    },
  ])
)(CompanyProfile);
