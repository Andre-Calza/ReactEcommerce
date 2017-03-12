var React = require('react');
var {connect} = require('react-redux');
var moment = require('moment');
var actions = require('actions');

export class CadastroUsuario extends React.Component {
  handleSubmit (e) {
    e.preventDefault();
    var {dispatch} = this.props;
    var nome = this.refs.nome.value;
    var email = this.refs.email.value;
    var senha = this.refs.senha.value;
    var cpf = this.refs.cpf.value;
    var facebookId = null;

    dispatch(actions.startAddUsuario(nome, email, senha, facebookId, cpf));
    
  }
  render () {
    return (
      <div className="row">
        <div className="medium-10 columns cadastro-usuario">
          <h1>Cadastro de Usuário</h1>
            <div className="small-12 large-6 columns painel-esquerdo">
              <form onSubmit={this.handleSubmit.bind(this)}>
                <h4>Informações de pessoais</h4>
                <input type="text" ref="nome" placeholder="Nome" /><br />
                <input type="text" ref="cpf" placeholder="Cpf" /><br />
                <input type="text" ref="email" placeholder="Email" /><br />
                <input type="text" ref="senha" placeholder="Senha" /><br />
                <div>
                  <button className="button botao">Cadastrar</button>
                  <button className="button botao">Cancelar</button>
                </div>
              </form>
            </div>
            <div className="small-12 large-6 columns painel-direito">
              <h4>Cadastro com rede social</h4>
              <button className="button botao">Facebook</button>
              <button className="button botao">Twitter</button>
              <button className="button botao">Github</button>
              <button className="button botao">Google+</button>
            </div>
        </div>
      </div>
    )
  }
};

export default connect()(CadastroUsuario);
