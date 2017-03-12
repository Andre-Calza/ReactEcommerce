var React = require('react');
var {connect} = require('react-redux');
var moment = require('moment');
var actions = require('actions');

export class Carrinho extends React.Component {
  render () {
    return (
      <div className="row">
        <div className="medium-10 columns carrinho">
            Componente Carrinho
        </div>
      </div>
    )
  }
};

export default connect()(Carrinho);
