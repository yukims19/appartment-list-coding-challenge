import React, { Component } from "react";

class AddBtnAndInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputVal: ""
    };
  }
  updateInput(input) {
    console.log(input);
    this.setState({ inputVal: input });
  }
  render() {
    return (
      <div>
        <input
          value={this.state.inputVal}
          onChange={e => this.updateInput(e.target.value)}
        />
        <button onClick={e => this.props.addToPeopleList(this.state.inputVal)}>
          Add
        </button>
      </div>
    );
  }
}

export default AddBtnAndInput;
