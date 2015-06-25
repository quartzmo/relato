import React from 'react';
import sortProjectData from './sortProjectData.js';
import numeral from 'numeral';


var DataTable = React.createClass({
  render: function () {
    var refresher = this.props.refresher;
    var appState = this.props.appState;
    var pageLength = appState.pageLength;
    var page = appState.page;
    var projects = appState.query ? appState.filteredProjects
        : appState.projects;

    var visibleProjects = [];
    if (projects.length > 0) {
      visibleProjects = projects.slice(page * pageLength,
          Math.min(projects.length, page * pageLength + pageLength));
    }

    var setSortProperty = function (prop, defaultOrder, e) {
      if (appState.sort.property === prop) {
        appState.sort.ascending = !appState.sort.ascending;
      } else {
        appState.sort.ascending = defaultOrder;
        appState.sort.property = prop;
      }
      appState.page = 0;
      sortProjectData(appState);
      refresher();
      e.preventDefault();
    };

    var sortClassName = function(prop) {
      var className = '';
      if (appState.sort.property === prop) {
        if (appState.sort.ascending) {
          className = 'ascending';
        } else {
          className = 'descending';
        }
      }
      return className;
    }

    return (
        <table>
          <thead>
            <tr>
              <th href="#" className={sortClassName('name')} onClick={setSortProperty.bind(null, 'name', true)}>Name</th>
              <th href="#" className={sortClassName('users')} onClick={setSortProperty.bind(null, 'users', false)}>Num Users</th>
              <th href="#" className={sortClassName('runtimeUsers')} onClick={setSortProperty.bind(null, 'runtimeUsers', false)}>Num Runtime Users</th>
              <th href="#" className={sortClassName('developmentUsers')} onClick={setSortProperty.bind(null, 'developmentUsers', false)}>Num Development Users</th>
              <th href="#" className={sortClassName('pageRank')} onClick={setSortProperty.bind(null, 'pageRank', false)}>PageRank</th>
            </tr>
          </thead>
          <tbody>
            {visibleProjects.map(function (project) {
              return (
                  <tr key={project.name}>
                    <td><a href={"https://npmjs.org/package/" + project.name}>{project.name}</a></td>
                    <td>{numeral(project.runtimeUsers + project.developmentUsers).format('0,0')}</td>
                    <td>{numeral(project.runtimeUsers).format('0,0')}</td>
                    <td>{numeral(project.developmentUsers).format('0,0')}</td>
                    <td>{numeral(project.pageRank).format('0,0.00')}</td>
                  </tr>
              )
            })}
          </tbody>
        </table>
    );
  }
});


export default DataTable;
