import React from 'react';
import * as Redux from 'react-redux';
import * as actions from 'actions';
var {hashHistory} = require('react-router');

export class Login extends React.Component {
  constructor (props) {
    super(props);
    this.onLogin = this.onLogin.bind(this);
  }
  onLogin (e) {
    e.preventDefault();
    var {dispatch} = this.props;

    dispatch(actions.startLogin()).then(()=>{
      alert('logado com facebook!');
    });
  }
  handleSubmit (e) {
    var {dispatch} = this.props;
    var email = this.refs.email.value;
    var senha = this.refs.senha.value;

    e.preventDefault();
    dispatch(actions.startLoginEmail(email, senha)).then((e)=>{
      if(e!==undefined){
        console.log(e.uid);
        hashHistory.push('/');
      }else{
        console.log('Login invalido');
      }
    }, (error) => {
      alert(error);
    });
  }
  render () {
    return (
      <div>
        <div className="row">
          <div className="columns small-centered small-10 medium-6 large-4">
            <div className="callout callout-auth">
              <h3>Login</h3>
                <form id="frmLogin" onSubmit={this.handleSubmit.bind(this)}>
                  <input type="text" ref="email" placeholder="E-mail" required />
                  <input type="password" ref="senha" placeholder="Senha" required />
                  <div className="box-botoes">
                    <button className="button btn-login">Acessar</button>
                    <button className="button" onClick={this.onLogin}>Login With Facebook</button>
                  </div>
                </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Redux.connect()(Login);
