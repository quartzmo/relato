import React from 'react';
import numeral from 'numeral';
import LoadingNotification from './LoadingNotification.jsx';

import Pagination from './Pagination.jsx';
import Search from './Search.jsx';
import DataTable from './DataTable.jsx';

function loadCsv() {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState !== 4) return;

      if (199 < xhr.status && xhr.status < 300) {
        resolve(xhr.responseText);
      } else {
        reject(new Error('Response code is ' + xhr.status));
      }
    };
    xhr.ontimeout = function () {
      reject(new Error('Request timed out.'));
    };
    xhr.timeout = 60000;
    xhr.open('GET', 'http://blog.bripkens.de/relato/stats.csv', true);
    xhr.send();
  });
}


function transformToJs(s) {
  return s.split('\n')
    .slice(1)
    .filter(function (line) {
      return line !== '';
    })
    .map(function (line) {
      var parts = line.split(',');
      return {
        name: parts[0],
        runtimeUsers: parseInt(parts[1], 10),
        developmentUsers: parseInt(parts[2], 10),
        pageRank: parseFloat(parts[3])
      };
    });
}


var updateStats = function (projects) {
  var nodes = projects.length;
  var edges = projects.reduce(function (n, project) {
    return n + project.runtimeUsers + project.developmentUsers;
  }, 0);
  document.getElementById('projectCount').innerHTML =
    numeral(nodes).format('0,0');
  document.getElementById('referenceCount').innerHTML =
    numeral(edges).format('0,0');
};


var Relato = React.createClass({
  getDefaultProps: function () {
    return {
      pageLength: 15
    };
  },
  getInitialState: function () {
    return {
      projects: [],
      page: 0,
      sortProperty: 'pageRank',
      sortAscending: false
    };
  },

  // zero-based index, not 1-based page number
  setPage: function (pageIndex) {
    this.setState({page: pageIndex});
  },

  filterProjectData: function (query) {
    var filtered = this.state.projects.filter(function (project) {
      return project.name.toLowerCase().indexOf(query) !== -1;
    });
    this.setState({
      query: query,
      filteredProjects: filtered,
      page: 0
    });
  },

  sortProjectData: function (prop, ascending) {

    var getter = null;
    if (prop === 'users') {
      getter = function (project) {
        return project.runtimeUsers + project.developmentUsers;
      };
    } else {
      getter = function (project) {
        return project[prop];
      };
    }

    function comparator(p1, p2) {
      var v1 = getter(p1);
      var v2 = getter(p2);

      if (v1 < v2) {
        return ascending ? -1 : 1;
      } else if (v1 > v2) {
        return ascending ? 1 : -1;
      } else {
        return 0;
      }
    }

    this.state.projects.sort(comparator);
    if (this.state.filteredProjects) {
      this.state.filteredProjects.sort(comparator);
    }

    this.setState({
      page: 0,
      sortProperty: prop,
      sortAscending: ascending
    });
  },

  componentDidMount: function () {
    var self = this;
    loadCsv()
      .then(transformToJs)
      .then(function (projects) {
        updateStats(projects);
        self.state.projects = projects;
        self.sortProjectData(self.state.sortProperty, self.state.sortAscending);
        return self.state;
      })
      .catch(function (err) {
        console.error(err);
      });
  },

  render: function () {
    if (this.state.projects.length === 0) {
      return (
        <LoadingNotification />
      );
    }

    var projects = this.state.query ? this.state.filteredProjects : this.state.projects;

    return (
      <div>
        <Search onSearch={this.filterProjectData}/>
        <Pagination pageLength={this.props.pageLength} page={this.state.page} projectsCount={projects.length} setPage={this.setPage} />
        <DataTable projects={projects} activeAttrName={this.state.sortProperty} sortAscending={this.state.sortAscending} pageLength={this.props.pageLength} page={this.state.page} onSort={this.sortProjectData} />
      </div>
    )
  }
});


React.render(<Relato />, document.getElementById('npm-data'));

