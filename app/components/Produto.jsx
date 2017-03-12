var React = require('react');
var {connect} = require('react-redux');
var moment = require('moment');
var actions = require('actions');

export class Produto extends React.Component {
  render () {
    return (
        <div className="small-12 medium-3 columns produto">
            Componente Produto
        </div>
    )
  }
};

export default connect()(Produto);
