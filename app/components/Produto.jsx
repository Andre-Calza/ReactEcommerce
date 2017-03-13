var React = require('react');
var {connect} = require('react-redux');
var moment = require('moment');
var actions = require('actions');

export class Produto extends React.Component {
  render () {
    var {nome, preco, fotoUrl} = this.props;
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
            <div>
                <p className="preco">
                  R$ {preco.replace('.', ',')}
                  <button className="img-add-carrinho">
                    <img className="img-add-carrinho" src="img/add_carrinho.png"/>
                  </button>
                </p>
            </div>

          </div>
        </div>
    )
  }
};

export default connect()(Produto);
