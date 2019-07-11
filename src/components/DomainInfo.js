import React, { Component } from 'react';
import axios from 'axios';

export default class DomainInfo extends Component {
  constructor(props){
    super(props);
    console.log(props);

    this.state = {
      info: [],
      loading: true
    }
  }

  getInfo(id){
    axios.get(`http://172.23.0.191:3000/domains/${ this.props.match.params.id }`)
      .then((response) => {
        console.log(response.data);
        this.setState({
          info: response.data,
          loading: false
        })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  componentDidMount(){
    this.getInfo();
  }

  render() {
    if(this.state.loading) {
      return (<h1>Loading ...</h1>)
    }
    return(
      <React.Fragment>
        <h1>Domain Info</h1>

        <ul>
          <li>{ this.state.info.id }</li>
          <li>{ this.state.info.name }</li>
          <li>{ this.state.info.url }</li>
          <li>{ this.state.info.ocorrencias }</li>
          <li>{ this.state.info.detected }</li>
          <li>{ this.state.info.beacom }</li>
        </ul>

      </React.Fragment>
    )
  }
}


