import React, { Component } from 'react';
import {Route, Link} from 'react-router-dom';
import './App.css';
import Landing from './components/Landing';
import Library from './components/Library';
import Album from './components/Album';
import {Navbar, Nav, NavItem} from 'react-bootstrap';
import logo from './assets/bloc_jams_logo.png'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
          <Navbar inverse collapseOnSelect>
            <Navbar.Header>
              <Navbar.Brand>
                <a href = '/'><img id='logo' src ={logo} alt = 'Bloc Jams Logo' /></a>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              <Nav pullRight>
                <NavItem eventKey = {1} componentClass = {Link} href='/' to='/'>
                  Home
                </NavItem>
                <NavItem eventKey = {2} componentClass = {Link} href='/library' to='/library'>
                  Library
                </NavItem>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </header>
        <main>
          <Route exact path = '/' component = {Landing}/>
          <Route path = '/library' component = {Library}/>
          <Route path = '/album/:slug' component = {Album}/>
        </main>
        <footer>Photo Courtesy: Vishnu R Nair/Unsplash</footer>
      </div>
    );
  }
}

export default App;
