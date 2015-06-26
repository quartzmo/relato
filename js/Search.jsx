import React from 'react';

var Search = React.createClass({

  search: function (e) {
    var query = e.target.value.toLowerCase();
    this.props.onSearch(query);
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
