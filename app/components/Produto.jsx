var React = require('react');
var {connect} = require('react-redux');
var moment = require('moment');
var actions = require('actions');

export class Produto extends React.Component {
  render () {
    var {nome} = this.props;
    console.log('Nome do produto', nome);
    
    return (
        <div className="small-12 medium-3 columns produto">
            <p>Nome do produto: {nome}</p>
        </div>
    )
  }
};

export default connect()(Produto);
