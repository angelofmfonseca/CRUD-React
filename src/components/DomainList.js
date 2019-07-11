import React, { Component } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";

export default class TodosList extends Component {
  constructor(props){
    super(props)

    this.state = {
      domains: []
    }
  }

  getDomains(){
    axios.get("http://172.23.0.191:3000/domains")
      .then((response) => {
        console.log(response.data);
        this.setState({
          domains: response.data
        })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  getBoolean(detected){
    return detected ? "detectado" : "nao detectado";
  }

  removeTodo(id){
    console.log(id);
    var confirmacao = window.confirm(`Deseja deletar o item?`);
        if(confirmacao){
          axios.delete(`http://172.23.0.191:3000/domains/${ id }`)
            .then((response) => {
              console.log(response);
              this.getDomains()
            })
            .catch((error) => {
              console.log(error);
            })
        } 
  }
 
  componentDidMount(){
    this.getDomains();
  }

  render(){
    if(this.state.domains.length === 0) {
      return (
      <h1>Loading ...</h1>
      )
    }
    return(
      <React.Fragment>
        <h1>Domain List</h1>

        <table width="50%">
          <thead>
            <tr>
              <th>id</th>
              <th>name</th>
              <th>url</th>
              <th>ocorrencias</th>
              <th>detected</th>
              <th>beacom</th>
            </tr>
          </thead>
          <tbody>
            { this.state.domains.map((domain, key) => {
              return (
              <tr key={ key }>
                <td align="center">{ domain.id }</td>
                <td align="center"><Link to={ `/info/${ domain.id }` }>{ domain.name }</Link></td>
                <td align="center">{ domain.url }</td>
                <td align="center">{ domain.ocorrencias }</td>
                <td align="center">{ this.getBoolean(domain.detected) }</td>
                <td  align="center" onClick={ () => this.removeTodo(domain.id) }><button>X</button></td>
              </tr>
              )
            })}
          </tbody>
        </table>
      </React.Fragment>
    )
  }
}
