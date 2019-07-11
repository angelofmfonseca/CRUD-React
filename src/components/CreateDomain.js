import React, { Component } from 'react'
import axios from 'axios';

export default class CreateTodo extends Component {
  constructor(props){
    super(props)

    this.state = {
      name: "",
      url: "",
      ocorrencias: "",
      detected: "",
      beacom: "",
      msg: ""
    }
  }

  isValid(domainsPost){
    let valid = false;
    for(var postItem in domainsPost){
      if(domainsPost[postItem] === "") {
          valid = false;
          return;
      } else {
        valid = true;
      }      
    }
    return valid;
  }

  onSubmit(event){
    event.preventDefault()

    var domainsPost = {
      name: this.state.name,
      url: this.state.url,
      ocorrencias: this.state.ocorrencias,
      detected: this.state.detected,
      beacom: this.state.beacom
    }

    if(this.isValid(domainsPost)){ 
      axios.post("http://172.23.0.191:3000/domains", domainsPost)
        .then((response) => {
          console.log(response.data);
          this.setState({
            name: "",
            url: "",
            ocorrencias: "",
            detected: "",
            beacom: "",
            msg: "Formulário enviado com sucesso"
          })
        })
        .catch((error) => {
          console.log(error);
        })
      } else {
        this.setState({
          msg: "Preencha todos os campos"
        })
      }
  }

  handleChange(event) {
      let newState = {};
      newState[event.target.name] = event.target.value;
      this.setState(newState);
      console.log(event.target.value)
  }

  render(){
    return(
      <React.Fragment>
        <h1>Create Domain</h1>
        
        <form onSubmit={ (event) => this.onSubmit(event) }>
          <div style={{ margin: 20 }}>
            <label>Name: </label>
            <input type="text" name="name" value={ this.state.name } onChange={ (event) => this.handleChange(event) } />
          </div>          
          <div style={{ margin: 20 }}>
            <label>URL: </label>
            <input type="text" name="url" value={ this.state.url } onChange={ (event) => this.handleChange(event) } />
          </div>          
          <div style={{ margin: 20 }}>
            <label>Ocorrências: </label>
            <input type="text" name="ocorrencias" value={ this.state.ocorrencias } onChange={ (event) => this.handleChange(event) } />
          </div>          
          <div style={{ margin: 20 }}>
            <label>Detected: </label>
            <select name="detected" onChange={ (event) => this.handleChange(event) }>
              <option value="">None</option>
              <option value="true">Detectado</option>
              <option value="false">Não Detectado</option>
            </select>
            {/* <input type="text" name="detected" value={ this.state.detected } onChange={ (event) => this.handleChange(event) } /> */}
          </div>          
          <div style={{ margin: 20 }}>
            <label>Beacom: </label>
            <input type="text" name="beacom" value={ this.state.beacom } onChange={ (event) => this.handleChange(event) } />
          </div>
          <div>
            <input type="submit" value="Submit" style={{ margin: 20 }} />
          </div>
          <div>
            <span>{ this.state.msg }</span>
          </div>
        </form>
      </React.Fragment>
    ) 
  }
}
