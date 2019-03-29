import React, { Component } from "react";

class GroupList extends Component {
  render() {
    return (
      <div className="sorted-people-list">
        <h1>Sorted people</h1>
        {this.props.sortedGroup.map((group, idx) => {
          return (
            <li>
              {idx} - {group.join(", ")}
            </li>
          );
        })}
      </div>
    );
  }
}
export default GroupList;
