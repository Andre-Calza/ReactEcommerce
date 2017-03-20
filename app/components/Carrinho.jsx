var React = require('react');
var {connect} = require('react-redux');
var moment = require('moment');
var actions = require('actions');
import ItemCarrinho from 'ItemCarrinho';

export class Carrinho extends React.Component {
  render () {
    getInitialState: () => {
      return{
        ProdutosCarrinho: [],
        TotalCarrinho: 0
      }
    };

    var renderCarrinhoProdutos = () => {
      var {dispatch} = this.props;
      var that = this;

      var listaCarrinho = dispatch(actions.consultarCarrinho('-KfMgUZbOEinc1J-DAj9'));


      listaCarrinho.then((e)=>{
        //console.log('e', e);
        var auxTotal = 0;
        e.map((Prod)=>{
          auxTotal = Number(Math.round((parseFloat(auxTotal) + parseFloat(Prod.preco) * parseInt(Prod.qtd))+'e2')+'e-2').toFixed(2)
        })
        that.setState({
            ProdutosCarrinho: e,
            TotalCarrinho: auxTotal
        });
      });

      if(this.state === null){
        //State vazio
        return(<p>Carrinho vazio</p>);
      }
      else{
        //State não esta vazio
        var listaProdutos = this.state.ProdutosCarrinho;

        return listaProdutos.map((produto) => {
          return (
            <span>
              <ItemCarrinho {...produto} />
            </span>
          );
        });
      }
    };
    var calculaTotalCarrinho = () =>{
        var auxTotalCarrinho = 0;

        if(this.state !== null){
          //State não esta vazio
          var Total = this.state.TotalCarrinho;
        }

        return (
          Total
        );
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
              Total: R$ {calculaTotalCarrinho()} <button className="button">Finalizar</button>
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
