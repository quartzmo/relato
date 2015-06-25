import React from 'react';

var Search = React.createClass({

  search: function (e) {
    var self = this;
    var query = e.target.value.toLowerCase();
    var projects = self.props.appState.projects;
    var filtered = projects.filter(function (project) {
      return project.name.toLowerCase().indexOf(query) !== -1;
    });
    self.props.appState.query = query;
    self.props.appState.filteredProjects = filtered;
    self.props.appState.page = 0;
    self.props.refresher();
  },

  render: function () {
    return (
        <div className="search">
          <label htmlFor="search">Search</label>
          <input type="search" id="search" onChange={this.search} />
        </div>
    );
  }
});


export default Search;
