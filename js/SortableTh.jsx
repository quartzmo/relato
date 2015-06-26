import React from 'react';
import sortProjectData from './sortProjectData.js';


var SortableTh = React.createClass({
  getDefaultProps: function() {
    return {
      ascending: false
    };
  },

  setSortProperty: function (e) {
    var appState = this.props.appState;
    var attrName = this.props.attrName;
    var refresher = this.props.refresher;
    if (appState.sort.property === attrName) {
      appState.sort.ascending = !appState.sort.ascending;
    } else {
      appState.sort.ascending = this.props.ascending;
      appState.sort.property = attrName;
    }
    appState.page = 0;
    sortProjectData(appState);
    refresher();
    e.preventDefault();
  },

  render: function () {
    var appState = this.props.appState;
    var className = '';
    if (appState.sort.property === this.props.attrName) {
      if (appState.sort.ascending) {
        className = 'ascending';
      } else {
        className = 'descending';
      }
    }

    return (
      <th href="#" className={className} onClick={this.setSortProperty}>{this.props.children}</th>
    );
  }
});


export default SortableTh;
