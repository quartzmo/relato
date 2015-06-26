import React from 'react';
import SortableTh from './SortableTh.jsx';
import numeral from 'numeral';


var DataTable = React.createClass({
  render: function () {
    var projects = this.props.projects;
    var visibleProjects = [];
    if (projects.length > 0) {
      var offset = this.props.page * this.props.pageLength;
      visibleProjects = projects.slice(offset, Math.min(projects.length, offset + this.props.pageLength));
    }

    return (
        <table>
          <thead>
            <tr>
              <SortableTh activeAttrName={this.props.activeAttrName} ascending={this.props.sortAscending} onSort={this.props.onSort} attrName="name" initialSortAscending={true}>Name</SortableTh>
              <SortableTh activeAttrName={this.props.activeAttrName} ascending={this.props.sortAscending} onSort={this.props.onSort} attrName="users">&#35; Users</SortableTh>
              <SortableTh activeAttrName={this.props.activeAttrName} ascending={this.props.sortAscending} onSort={this.props.onSort} attrName="runtimeUsers">Num Runtime Users</SortableTh>
              <SortableTh activeAttrName={this.props.activeAttrName} ascending={this.props.sortAscending} onSort={this.props.onSort} attrName="developmentUsers">Num Development Users</SortableTh>
              <SortableTh activeAttrName={this.props.activeAttrName} ascending={this.props.sortAscending} onSort={this.props.onSort} attrName="pageRank">PageRank</SortableTh>
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
