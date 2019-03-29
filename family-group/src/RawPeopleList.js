import React, { Component } from "react";

class RawPeopleList extends Component {
  render() {
    return (
      <div className="raw-people-list">
        <ul>
          {this.props.people.map(person => {
            return (
              <li>
                {person}{" "}
                <button onClick={e => this.props.deletePerson(person)}>
                  X
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
export default RawPeopleList;
