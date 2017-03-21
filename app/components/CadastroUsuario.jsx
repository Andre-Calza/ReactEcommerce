var React = require('react');
var {connect} = require('react-redux');
var moment = require('moment');
var actions = require('actions');
var MaskedInput = require('react-maskedinput')

export class CadastroUsuario extends React.Component {
  handleSubmit (e) {
    e.preventDefault();
    var {dispatch} = this.props;
    var nome = $('#txtNome').val();//this.refs.nome.value;
    var email = $('#txtEmail').val();//this.refs.email.value;
    var senha = $('#txtSenha').val();//this.refs.senha.value;
    var cpf = $('#txtCpf').val();//this.refs.cpf.value;
    var facebookId = null;
    var msgFeedback = '';
    var blnValido = true;

    //console.log(nome, email, cpf, senha);

    var obj = dispatch(actions.startAddUsuario(nome, email, senha, facebookId, cpf)).then(()=>{
      $('#lblResultado').html('Seu cadastro foi efetuado!');
      $('#txtNome').val('');
      $('#txtEmail').val('');
      $('#txtSenha').val('');
      $('#txtCpf').val('');
    });

    // if(obj !== undefined){
    //   obj.then(()=>{
    //
    //   });
    // }
  }
  _onChange(e) {
  }
  _onBlur(e) {
    if(e.target.value !== ''){
      var usuario = e.target.value.substring(0, e.target.value.indexOf("@"));
      var dominio = e.target.value.substring(e.target.value.indexOf("@")+ 1, e.target.value.length);

      if ((usuario.length >=1) && (dominio.length >=3) &&
          (usuario.search("@")==-1) && (dominio.search("@")==-1) &&
          (usuario.search(" ")==-1) && (dominio.search(" ")==-1) &&
          (dominio.search(".")!=-1) && (dominio.indexOf(".") >=1)&&
          (dominio.lastIndexOf(".") < dominio.length - 1)) {
            //Email valido
            $('#lblResultado').html('');
            $('#txtEmail').removeClass('campo-invalido');
          }
          else{
            //Email invalido
            $('#lblResultado').html('<span style="color: red">Endereço de e-mail invalido!</span>');
            $('#txtEmail').addClass('campo-invalido');
      }
    }else{
        //Campo vazio
        $('#lblResultado').html('');
        $('#txtEmail').removeClass('campo-invalido');
    }
  }
  render () {
    getInitialState: () => {
      return{
        CPF: ''
      }
    };
    return (
      <div className="row">
        <div className="medium-10 columns cadastro-usuario">
          <h1>Cadastro de Usuário</h1>
            <div className="small-12 large-6 columns painel-esquerdo">
              <form onSubmit={this.handleSubmit.bind(this)}>
                <h4>Informações de pessoais</h4>
                <input id="txtNome" type="text" ref="nome" placeholder="Nome Completo" required />
                <MaskedInput id="txtCpf" type="text" mask="111.111.111-11" ref="cpf" size="11" onChange={this._onChange} required/>
                <input id="txtEmail" type="text" ref="email" placeholder="E-mail" required onBlur={this._onBlur}/>
                <input id="txtSenha" type="password" ref="senha" placeholder="Senha" required/>
                <label id="lblResultado"></label>
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
