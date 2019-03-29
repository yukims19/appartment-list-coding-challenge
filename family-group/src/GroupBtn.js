import React, { Component } from "react";

class GroupBtn extends Component {
  render() {
    return (
      <button onClick={() => this.props.generateGroup()}>
        {this.props.btnText}
      </button>
    );
  }
}
export default GroupBtn;
