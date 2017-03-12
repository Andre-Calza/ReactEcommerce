var React = require('react');
var {connect} = require('react-redux');
var moment = require('moment');
var actions = require('actions');
import Topo from 'Topo';
import Vitrine from 'Vitrine';
import Rodape from 'Rodape';

export class Master extends React.Component {
  render () {
    return (
      <div>
        <Topo />
        <Vitrine />
        <Rodape />
      </div>
    )
  }
};

export default connect()(Master);
