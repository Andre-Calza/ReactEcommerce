var React = require('react');
var {connect} = require('react-redux');
var moment = require('moment');
var actions = require('actions');

import Carrinho from 'Carrinho';

export class Produto extends React.Component {
  handleSubmit (e) {
    var {dispatch} = this.props;
    e.preventDefault();
    //console.log('Clicado no botao add carrinho:', this.props.id);
    //  <Carrinho idProduto={this.props.id} />

    var {id ,nome, preco, fotoUrl} = this.props;

    var obj =  dispatch(actions.startAddProdutoCarrinho(id ,nome, preco, fotoUrl));
    console.log('obj', obj);

    return (
      <Carrinho id={id} nome={nome} />
    )

  }
  render () {
    var {id, nome, preco, fotoUrl} = this.props;
    //console.log('Nome do produto', nome);

    return (
        <div className="small-12 medium-3 columns produto">
          <div className="interno-produto">
            <div className="box-titulo">
              <p className="titulo">{nome}</p>
            </div>

            <div className="img">
              <img src={fotoUrl} />
            </div>
            <form onSubmit={this.handleSubmit.bind(this)}>
              <div>
                <p className="preco">
                  R$ {preco.replace('.', ',')}
                    <button className="img-add-carrinho">
                      <img className="img-add-carrinho" src="img/add_carrinho.png"/>
                    </button>
                </p>
              </div>
            </form>
          </div>
        </div>
    )
  }
};

export default connect()(Produto);
