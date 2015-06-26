import React from 'react';


var SortableTh = React.createClass({
  getDefaultProps: function() {
    return {
      initialSortAscending: false
    };
  },

  setSortProperty: function (e) {
    var ascending = this.props.initialSortAscending;
    if (this.props.activeAttrName === this.props.attrName) {
      ascending = !this.props.ascending; // toggle if this th is already the active sort
    }
    this.props.onSort(this.props.attrName, ascending);
    e.preventDefault();
  },

  render: function () {

    var className = '';
    if (this.props.activeAttrName === this.props.attrName) {
      if (this.props.ascending) {
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
