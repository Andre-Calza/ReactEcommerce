var React = require('react');
var {connect} = require('react-redux');
var moment = require('moment');
var actions = require('actions');
import ItemCarrinho from 'ItemCarrinho';

export class Carrinho extends React.Component {
  render () {
    getInitialState: () => {
      return{
        ProdutosCarrinho: []
      }
    };

    var renderCarrinhoProdutos = () => {
      if(this.state === null){
        //State vazio
        return(<p>Carrinho vazio</p>);
      }
      else{
        var {id, nome, preco, fotoUrl} = this.props;

        //State não esta vazio
        return(<p>{id}, {nome}</p>);
      }
    };
    return (
      <div className="row">
        <div className="medium-10 columns carrinho">
            <div className="titulo-carrinho">
              Itens adicionados
            </div>

            <div className="medium-12 columns lista-itens-carrinho">
              {renderCarrinhoProdutos()}
            </div>


            <div className="total-carrinho">
              Total: R$ 100,00 <button className="button">Finalizar</button>
            </div>
        </div>
      </div>
    )
  }
};

export default connect(
    (state) => {
      return state;
    }
)(Carrinho);
