import React from 'react';
import SortableTh from './SortableTh.jsx';
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

    return (
        <table>
          <thead>
            <tr>
              <SortableTh appState={appState} refresher={refresher} attrName="name" ascending={true}>Name</SortableTh>
              <SortableTh appState={appState} refresher={refresher} attrName="users">&#35; Users</SortableTh>
              <SortableTh appState={appState} refresher={refresher} attrName="runtimeUsers">Num Runtime Users</SortableTh>
              <SortableTh appState={appState} refresher={refresher} attrName="developmentUsers">Num Development Users</SortableTh>
              <SortableTh appState={appState} refresher={refresher} attrName="pageRank">PageRank</SortableTh>
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
