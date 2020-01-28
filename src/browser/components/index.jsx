var React = require('react');
var DeobfuscateExample = require('./examples/deobfuscate/index');

var Index = React.createClass({
  render: function () {
    return (
      <div>
        <div>
          <DeobfuscateExample />
          <p className="mailTo"><a href="mailto:mail@ooze.ninja?subject=poisonjs">mail@ooze.ninja</a></p>
        </div>
      </div>
    );
  }
});

React.render(
  <Index />,
  document.getElementsByTagName('body')[0]
);
