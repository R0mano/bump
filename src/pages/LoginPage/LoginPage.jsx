import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import './LoginPage.css';
import userService from '../../utils/userService';
import SignupPage from '../SignupPage/SignupPage';
import './LoginPage.css';

class LoginPage extends Component {
  
  state = {
    email: '',
    pw: ''
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await userService.login(this.state);
      this.props.handleSignupOrLogin();
      // Successfully signed up, redirect to home page
      this.props.history.push('/');
    } catch (err) {
      // Do not 'Alert' in project
      // Show a modal or some UI instead
      console.log(err)
      alert('Invalid login');
    }
  }

  render() {
    return (
      <div className="LoginPage">
        <div className='wrapper' >
        <header className="header-footer"><h3>Log In</h3></header>
        <form className="form-horizontal" onSubmit={this.handleSubmit} >
          <div className="form-group">
            <div className="col-sm-12">
              <input type="email" className="form-control" placeholder="Email" value={this.state.email} name="email" onChange={this.handleChange} />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-12">
              <input type="password" className="form-control" placeholder="Password" value={this.state.pw} name="pw" onChange={this.handleChange} />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-12 text-center">
              <button className="btn btn-default button">Log In</button>&nbsp;&nbsp;&nbsp;
              <Link to='/signup'>Signup</Link>

            </div>
          </div>
        </form>
        <Switch>
        <Route exact path='/signup' render={() =>
          <SignupPage
          handleSignupOrLogin={this.props.handleSignupOrLogin}
          />
      }
        />
        </Switch>
        </div>
      </div>
    );
  }
}

export default LoginPage;
