var React = require('react');
var DeobfuscateInput = require('./input');
var DeobfuscateOutput = require('./output');
var jsfuckExample = require('../../../../examples/jsfuck');
var js2imgExample = require('../../../../examples/javascript2img');
var whakExample = require('../../../../examples/whak');

var DeobfuscateIndex = React.createClass({
  getInitialState: function () {
    return {example: jsfuckExample};
  },
  selectJsFuck: function () {
    this.setState({example: jsfuckExample});
  },
  selectJs2Img: function () {
    this.setState({example: js2imgExample});
  },
  selectWhak: function () {
    this.setState({example: whakExample});
  },
  render: function () {
    return (
      <div className="deobfuscateWrapper">
        <h1>PoisonJS</h1>
        <p>De-obfuscate eval-based JavaScript obfuscation with monkey-patched eval(-like) functions.</p>
        <div>Examples:&nbsp;
          <button onClick={this.selectJsFuck}>{jsfuckExample.name}</button>&nbsp;
          <button onClick={this.selectJs2Img}>{js2imgExample.name}</button>&nbsp;
          <button onClick={this.selectWhak}>{whakExample.name}</button>
        </div>
        <DeobfuscateInput example={this.state.example}/>
        <DeobfuscateOutput />
      </div>
    );
  }
});

module.exports = DeobfuscateIndex;
