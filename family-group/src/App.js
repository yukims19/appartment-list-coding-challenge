import React, { Component } from "react";
import "./App.css";
import RawPeopleList from "./RawPeopleList.js";
import GroupList from "./GroupList.js";
import GroupBtn from "./GroupBtn.js";
import AddBtnAndInput from "./AddBtnAndInput.js";

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
    let takeRandom = array => {
      //Return a random element from array, and remove that element form the array
      //TODO: Better seperate the function logic of GET and REMOVE
      let randomIdx = Math.floor(Math.random() * Math.floor(array.length));
      return array.splice(randomIdx, 1);
    };

    let addToGroup = (group, person) => {
      //Add a person to a group
      return group.concat(person);
    };

    let groupConcatWithLastGroup = (groupsArray, group) => {
      //Add the concat the last groups
      groupsArray[groupsArray.length - 1] = groupsArray[
        groupsArray.length - 1
      ].concat(group);
      return groupsArray;
    };

    let familyGroupRefactor = people => {
      let newPeople = people.slice();
      let groups = [];
      let group = [];
      let defaultGroupSize = 3;
      let groupSizeLowerBound = 3;
      let groupSizeUpperBound = 5;

      while (newPeople.length > 0) {
        if (group.length < defaultGroupSize) {
          group = addToGroup(group, takeRandom(newPeople));
        } else {
          groups.push(group);
          group = [];
        }
      }

      //Handle last generated group
      let isGroupTooSmall =
        group.length > 0 && group.length < groupSizeLowerBound;
      if (isGroupTooSmall) {
        groups = groupConcatWithLastGroup(groups, group);
      } else if (group.length > 0) {
        groups.push(group);
      }
      return groups;
    };

    /*Alternative solution of shuffling the array first*/
    let shuffleArray = array => {
      //O(n log(n))
      return array.sort(() => {
        return Math.random() - 0.5;
      });
    };

    let shuffleArray2 = array => {
      //O(n)
      for (let i = array.length - 1; i >= 0; i--) {
        let randomIdx = Math.floor(Math.random() * i);
        let temporaryValue = array[i];
        array[i] = array[randomIdx];
        array[randomIdx] = temporaryValue;
      }
      return array;
    };

    let familyGroup2 = people => {
      let shuffledPeople = shuffleArray2(people.slice());
      let groups = [];
      let defaultGroupSize = 3;
      let groupSizeLowerBound = 3;
      let groupSizeUpperBound = 5;

      while (shuffledPeople.length > 0) {
        if (shuffledPeople.length < groupSizeLowerBound) {
          groupConcatWithLastGroup(
            groups,
            shuffledPeople.splice(0, defaultGroupSize)
          );
        } else {
          groups.push(shuffledPeople.splice(0, defaultGroupSize));
        }
      }
      return groups;
    };
    let sortedGroup = familyGroup2(this.state.people); //[[],[]]
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
