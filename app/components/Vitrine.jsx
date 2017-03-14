var React = require('react');
var {connect} = require('react-redux');
var moment = require('moment');
var actions = require('actions');


import Produto from 'Produto';

export class Vitrine extends React.Component {
  render () {
    getInitialState: () => {
      return{
        Produtos: []
      }
    };

    var {todos, showCompleted, searchText} = this.props;
    var renderProdutos = () => {

      var {dispatch} = this.props;
      var listaProdutos =  dispatch(actions.consultarProdutos());

      // if(listaProdutos.length === 0){
      //   <p className="container__message">Nenhum produto cadastrado!</p>
      // }

      var that = this;

      listaProdutos.then((e) => {
        //console.log('e', e);
        that.setState({
          Produtos: e
        });
        //console.log('state', that.state.Produtos);
      });
      if(this.state === null){
        return(
          <div className="loader-vitrine">
              <img src='img/loader.gif'/>
          </div>

        );
      }else{
           var listaProdutos = this.state.Produtos;

           return listaProdutos.map((produto) => {
             return (
               <Produto {...produto} />
             );
           });
      }
    };

    return (

      <div className="small-12 large-12 columns vitrine-main">
         {renderProdutos()}
      </div>
    )
  }
};

export default connect(
    (state) => {
      return state;
    }
)(Vitrine);
