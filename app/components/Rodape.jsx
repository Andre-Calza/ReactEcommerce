var React = require('react');
var {connect} = require('react-redux');
var moment = require('moment');
var actions = require('actions');

export class Rodape extends React.Component {
  render () {
    return (
      <div className="small-12 large-12 columns rodape-main">
        TEXTO DO RODAPE
      </div>
    )
  }
};

export default connect()(Rodape);
