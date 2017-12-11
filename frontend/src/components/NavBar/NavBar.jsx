'use strict'
import React, { Component } from 'react';
import { Item, Button, Input, Card, Icon, Sidebar, Segment, Menu, Image, Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import axios from 'axios';

import styles from './NavBar.scss';

class NavBar extends Component {
  constructor(props){
    super(props);
    this.state = {
      isLoggedIn: false
    };

		this.logOut = this.logOut.bind(this);
  }

	componentDidMount() {
    axios.get('/api/profile')
			.then( (res) => {
	      // console.log(res);
	      this.setState({ isLoggedIn: true });
				console.log("isLoggedIn true");
	    })
			.catch( (err) => {
	      this.setState({ isLoggedIn: false });
				console.log("isLoggedIn false");
	    })
  }

	logOut(e) {
    axios.get('/api/logout')
			.then( (res) => {
      	console.log("Logged out");
				this.setState({ isLoggedIn: false });
				if (window.location.pathname == '/profile') {
					window.location.pathname = '/';
				}
    	})
  }

	displayLinks() {
		if (this.state.isLoggedIn) {
			return (
				<div id="link-container">
					<Link to={"/profile"}>
						<Item className="item">My Profile</Item>
					</Link>
					<div id="logOutButton" onClick={this.logOut}>
						<Item className="item">Logout</Item>
					</div>
				</div>
			);
		} else {
			return (
				<div id="link-container">
					<Link to={"/login"}>
						<Item className="item">Login</Item>
					</Link>
					<Link to={"/signup"}>
						<Item className="item">Sign Up</Item>
					</Link>
				</div>
			);
		}
	}

  render() {
    return (
      <div className="top-bar">
        <div className="ui top fixed menu">
          <Link to={"/"}>
            <div className="item">
              <img src="../../assets/whale.png"/>
            </div>
          </Link>
          <div className="right menu">
            <div className="item">
              <div className="ui icon input">
                <input type="text" placeholder="Search..." open={false} />
              </div>
            </div>
            {this.displayLinks()}
          </div>
        </div>
      </div>
    );
  }
}

export default NavBar
