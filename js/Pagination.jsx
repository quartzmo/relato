import React from 'react';


var Pagination = React.createClass({

  pageCount: function () {
    return Math.ceil(this.props.projectsCount / this.props.pageLength);
  },

  firstPage: function (e) {
    this.props.setPage(0);
    e.preventDefault();
  },

  previousPage: function (e) {
    this.props.setPage(Math.max(0, this.props.page - 1));
    e.preventDefault();
  },

  nextPage: function (e) {
    this.props.setPage(Math.min(this.pageCount() - 1, this.props.page + 1));
    e.preventDefault();
  },

  lastPage: function (e) {
    this.props.setPage(this.pageCount() - 1);
    e.preventDefault();
  },

  render: function () {
    return (
      <ul className="pagination">
        <li>
          <a href="#" onClick={this.firstPage}>&laquo;&laquo;</a>
        </li>
        <li>
          <a href="#" onClick={this.previousPage}>&laquo;</a>
        </li>
        <li>
          <a href="#" onClick={this.nextPage}>&raquo;</a>
        </li>
        <li>
          <a href="#" onClick={this.lastPage}>&raquo;&raquo;</a>
        </li>
      </ul>
    );

  }
});


export default Pagination;
