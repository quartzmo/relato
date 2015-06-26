import React from 'react';
import numeral from 'numeral';
import LoadingNotification from './LoadingNotification.jsx';
import sortProjectData from './sortProjectData.js';

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
  console.log("transformToJs");

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
  getDefaultProps: function() {
    return {
      pageLength: 15
    };
  },
  getInitialState: function() {
    return {
      projects: [],
      page: 0,
      sort: {
        property: 'pageRank',
        ascending: false
      }
    };
  },

  componentDidMount: function () {
    var self = this;
    loadCsv()
        .then(transformToJs)
        .then(function (projects) {
          updateStats(projects);
          self.state.projects = projects;
          sortProjectData(self.state);
          self.setState(self.state);
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
    var self = this;
    var refresher = function () {
      self.forceUpdate();
    };

    return (
        <div>
          <Search appState={this.state} refresher={refresher} />
          <Pagination appState={this.state} refresher={refresher} pageLength={this.props.pageLength} />
          <DataTable appState={this.state} refresher={refresher} pageLength={this.props.pageLength} />
        </div>
    )
  }
});


React.render(<Relato />, document.getElementById('npm-data'));

