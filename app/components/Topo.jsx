var React = require('react');
var {connect} = require('react-redux');
var moment = require('moment');
var actions = require('actions');
var {Link, IndexLink} = require('react-router');
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
          <ul>
            <li>
              <Link to="/Login" activeClassName="active" activeStyle={{fontWeight: 'bold'}}>Entrar</Link>
            </li>
            <li>
              <Link to="/Sair" activeClassName="active" activeStyle={{fontWeight: 'bold'}}>Sair</Link>
            </li>
          </ul>
        </div>
        <div className="small-6 large-4 columns colunas-main coluna-carrinho">
          <Carrinho />
        </div>
      </div>
    )
  }
};

export default connect()(Topo);
