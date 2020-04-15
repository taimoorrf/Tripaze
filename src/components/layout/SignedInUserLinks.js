// Since this component has no state, this will be a functional component rather than a class component

import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOut } from '../../store/actions/authActions'

// this is a functional component, not a class, so we need to pass the props as argument
 const SignedInUserLinks = (props) => {
     const initial = props.profile? props.profile.userName : null
     console.log(props)
     return (
        <ul className="right">
            <li><NavLink to='/' className='btn btn-floating pink lighten-1'>
                {initial}
            </NavLink></li>
            <li><a onClick={props.signOut}>Sign Out</a></li>
        </ul>              
     )
 }


 const mapDispatchToProps =  (dispatch) => {
    return {
        signOut: () => dispatch(signOut())
    }
 }

 // Exporting to be used in app.js
 export default connect(null, mapDispatchToProps)(SignedInUserLinks) 