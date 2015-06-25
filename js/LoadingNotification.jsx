import React from 'react';
var dom = React.DOM;

var LoadingNotification = React.createClass({
  render: function () {
    return (
      <div className="loading">
        <img src="img/loading-animation.gif"></img>
        <p>Downloading statistics, please wait...</p>
      </div>
    );
  }
});

export default LoadingNotification;
