var React = require('react');
var {connect} = require('react-redux');
var moment = require('moment');
var actions = require('actions');

export class CadastroProduto extends React.Component {
  handleSubmit (e) {
    e.preventDefault();
    var {dispatch} = this.props;
    var nome = this.refs.nome.value;
    var preco = this.refs.preco.value;
    var fotoUrl = this.refs.fotoUrl.value;

    dispatch(actions.startAddProduto(nome, preco, fotoUrl));

  }
  render () {
    return (
      <div className="row">
        <div className="medium-10 columns cadastro-usuario">
          <h1>Cadastro de Produtos</h1>
            <div className="small-12 large-12 columns centered">
              <form onSubmit={this.handleSubmit.bind(this)}>
                <h4>Informações do produto</h4>
                <input type="text" ref="nome" placeholder="Nome" /><br />
                <input type="text" ref="preco" placeholder="Preço" /><br />
                <input type="text" ref="fotoUrl" placeholder="Url da foto" /><br />
                <div>
                  <button className="button botao">Cadastrar</button>
                  <button className="button botao">Cancelar</button>
                </div>
              </form>
            </div>
        </div>
      </div>
    )
  }
};

export default connect()(CadastroProduto);
