var React = require('react');
var {connect} = require('react-redux');
var moment = require('moment');
var actions = require('actions');

import Produto from 'Produto';

export class Vitrine extends React.Component {
  render () {
    return (
      <div className="small-12 large-12 columns vitrine-main">
        <Produto />
        <Produto />
        <Produto />
        <Produto />

        <Produto />
        <Produto />
        <Produto />
        <Produto />

        <Produto />
        <Produto />
        <Produto />
        <Produto />

        <Produto />
        <Produto />
        <Produto />
        <Produto />

        <Produto />
        <Produto />
        <Produto />
        <Produto />

        <Produto />
        <Produto />
        <Produto />
        <Produto />
      </div>
    )
  }
};

export default connect()(Vitrine);
