var React = require('react');
var {connect} = require('react-redux');
var moment = require('moment');
var actions = require('actions');

export class ItemCarrinho extends React.Component {
  render () {
    var {nome, preco, qtd} = this.props;
    return (
      <div className="itens-carrinho">
        <div>
          <div>
              <label className="nome-item-carrinho">{nome} </label>
              <div className="preco-item-carrinho">
                <label>{qtd} x R$ {preco}</label>
              </div>
          </div>
        </div>
      </div>
    )
  }
};

export default connect()(ItemCarrinho);
