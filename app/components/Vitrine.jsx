var React = require('react');
var {connect} = require('react-redux');
var moment = require('moment');
var actions = require('actions');

import Produto from 'Produto';

export class Vitrine extends React.Component {
  render () {
    var {todos, showCompleted, searchText} = this.props;

    var renderProdutos = () => {

      var {dispatch} = this.props;
      var listaProdutos =  dispatch(actions.consultarProdutos());

      // if(listaProdutos.length === 0){
      //   <p className="container__message">Nenhum produto cadastrado!</p>
      // }
      listaProdutos.then((e) => {
        console.log('e', e);

        return  e.map((produto) => {
          console.log('produto', produto);
          return(
              <Produto key={produto.nome} {...produto} />
          );
        });
      });

      //console.log('listaProdutos', listaProdutos);
      // return(
      //   <p>Carregando..</p>
      // )
    //  return listaProdutos.map((produto) => {
    //     return (
    //       <Produto key={Produto.id} {...produto}/>
    //     );
    //   });
    };
    return (

      <div className="small-12 large-12 columns vitrine-main">
         {renderProdutos()}
      </div>
    )
  }
};

export default connect()(Vitrine);
