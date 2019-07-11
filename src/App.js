import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from "react-router-dom";

import DomainList from "./components/DomainList";
import CreateDomain from "./components/CreateDomain";
import DomainInfo from "./components/DomainInfo";

export default class App extends Component{
  render(){
    return (
        <BrowserRouter>
          <React.Fragment>
            <h1>CRUD app</h1>

            <nav>
              <ul>
                <li>
                  <Link to="/">Domain List</Link>
                </li>
                <li>
                  <Link to="/create">Create Domain</Link>
                </li>
              </ul>
            </nav>

            <Route path="/" exact component={ DomainList } />
            <Route path="/create" component={ CreateDomain } />
            <Route path="/info/:id" component={ DomainInfo } />
          </React.Fragment>
        </BrowserRouter> 
    );
  }
}
