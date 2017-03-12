var React = require('react');
var {connect} = require('react-redux');
var moment = require('moment');
var actions = require('actions');

import Carrinho from 'Carrinho';

export class Topo extends React.Component {
  render () {
    return (
      <div>
        <div className="small-12 large-4 columns colunas-main">
          <div>
            <img src="img/logo.jpg" />
          </div>
        </div>
        <div className="small-6 large-4 columns colunas-main">
          Olá visitante <br />
          Entrar | Sair
        </div>
        <div className="small-6 large-4 columns colunas-main coluna-carrinho">
          <Carrinho />
        </div>
      </div>
    )
  }
};

export default connect()(Topo);
