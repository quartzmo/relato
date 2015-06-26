import React from 'react';


var Pagination = React.createClass({

  firstPage: function (e) {
    this.props.appState.page = 0;
    this.props.refresher();
    e.preventDefault();
  },

  previousPage: function (e) {
    var appState = this.props.appState;
    appState.page = Math.max(0, appState.page - 1);
    this.props.refresher();
    e.preventDefault();
  },

  nextPage: function (e) {
    var appState = this.props.appState;
    var projects = appState.query ? appState.filteredProjects
        : appState.projects;
    var pageCount = Math.ceil(projects.length / this.props.pageLength);
    appState.page = Math.min(pageCount - 1, appState.page + 1);
    this.props.refresher();
    e.preventDefault();
  },

  lastPage: function (e) {
    var appState = this.props.appState;
    var projects = appState.query ? appState.filteredProjects
        : appState.projects;
    var pageCount = Math.ceil(projects.length / this.props.pageLength);
    appState.page = pageCount - 1;
    this.props.refresher();
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
