import React, { Component } from "react";
import "./App.css";
import RawPeopleList from "./RawPeopleList.js";
import GroupList from "./GroupList.js";
import GroupBtn from "./GroupBtn.js";
import AddBtnAndInput from "./AddBtnAndInput.js";
import { familyGroup2 } from "./generateRandomGroup.js";

let people = [
  "Bob",
  "Keny",
  "Ann",
  "Nancy",
  "Dona",
  "Mick",
  "Linda",
  "Oscar",
  "Kelly",
  "Dave"
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      people: people,
      sortedGroup: [],
      newPersonInput: ""
    };
  }

  generateGroup() {
    let sortedGroup = familyGroup2(this.state.people);
    this.setState({ sortedGroup: sortedGroup });
  }

  addToPeopleList(person) {
    console.log(person);
    let newPeople = this.state.people.slice();
    newPeople.push(person);
    console.log("list", newPeople);
    this.setState({ people: newPeople, newPersonInput: "" });
  }

  deletePerson(person) {
    console.log("deleting", person);
    let newPeople = this.state.people.slice();
    let personIdx = newPeople.indexOf(person);
    if (personIdx >= 0) {
      newPeople.splice(personIdx, 1);
    }
    this.setState({ people: newPeople });
  }

  render() {
    return (
      <div className="App">
        <RawPeopleList
          people={this.state.people}
          deletePerson={person => this.deletePerson(person)}
        />

        <div className="action-wapper">
          <GroupBtn
            btnText="Group"
            generateGroup={() => this.generateGroup()}
          />
          <AddBtnAndInput
            addToPeopleList={person => this.addToPeopleList(person)}
          />
        </div>
        <GroupList sortedGroup={this.state.sortedGroup} />
      </div>
    );
  }
}

export default App;
