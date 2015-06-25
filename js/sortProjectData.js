var sortProjectData = function (appState) {
  var ascending = appState.sort.ascending;
  var prop = appState.sort.property;
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

  appState.projects.sort(comparator);
  if (appState.filteredProjects) {
    appState.filteredProjects.sort(comparator);
  }

  return appState;
};

export default sortProjectData;
