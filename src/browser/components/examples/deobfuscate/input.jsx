var React = require('react');
var Poison = require('../../../../../lib/poison');

var _eval = window.eval.bind(window);
var count = 0;

function appendElementTo(elem, fnName, fnValue) {
  var childElem = document.createElement('div');
  childElem.setAttribute('class', fnName);
  childElem.innerHTML = (count++) + ". " + fnValue;
  elem.appendChild(childElem);
  popFirstElementsOf(elem, 20);
}

function popFirstElementsOf(elem, untilSize) {
  while (elem.children.length > untilSize) {
    elem.removeChild(elem.firstChild);
  }
}

function poisonFn(fnData) {
  var argsStr = Array.prototype.join.call(fnData.arguments, ', ');
  var outputElem = document.getElementsByClassName('deobfuscateOutput')[0];
  appendElementTo(outputElem, fnData.name, argsStr);
}

function cleanAll() {
  var outputElem = document.getElementsByClassName('deobfuscateOutput')[0];
  popFirstElementsOf(outputElem, 0);
  count = 0;
}

var DeobfuscateInput = React.createClass({
  getInitialState: function () {
    return {
      example: this.props.example
    };
  },
  componentDidMount: function () {
    Poison.eval(poisonFn);
    Poison.Function(poisonFn);
    Poison.setTimeout(poisonFn);
    Poison.setInterval(poisonFn);
  },
  // Updates example state when parent component sends new props
  componentWillReceiveProps: function(nextProps) {
    this.setState({example: nextProps.example});
  },
  // Updates example state when textarea is changed
  handleChange: function (event) {
    this.setState({
      example: {
        description: 'Your example',
        data: event.target.value
      }
    });
  },
  handleSubmit: function (event) {
    event.preventDefault();
    var javascript = React.findDOMNode(this.refs.javascript).value;
    cleanAll();
    try {
      _eval(javascript);
    } catch (err) {
      var outputElem = document.getElementsByClassName('deobfuscateOutput')[0];
      appendElementTo(outputElem, 'Failed', err);
    }
  },
  render: function () {
    var description = this.state.example.description;
    var data = this.state.example.data;
    return (
      <div className="deobfuscateInput">
        <p>
          <span>{description}</span></p>
        <form onSubmit={this.handleSubmit}>
          <textarea name="textarea" onChange={this.handleChange} ref="javascript"
            value={data}/><br/>
          <input type="submit" value="De-obfuscate"/>
        </form>
      </div>
    );
  }
});

module.exports = DeobfuscateInput;
