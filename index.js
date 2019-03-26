let familyGroup = array => {
  let newArray = array.slice();
  let groups = [];
  let group = [];

  while (newArray.length > 0) {
    if (group.length < 3) {
      let randomIdx = Math.floor(Math.random() * Math.floor(newArray.length));
      group.push(newArray[randomIdx]);
      /*newArray[randomIdx] = null;
      newArray = newArray.filter(ele => ele !== null);*/
      newArray.splice(randomIdx, 1);
    } else {
      groups.push(group);
      group = [];
    }
  }

  if (group.length > 0 && group.length < 3) {
    groups[groups.length - 1] = groups[groups.length - 1].concat(group);
  } else if (group.length > 0) {
    groups.push(group);
  }

  return groups;
};

/*Here is a refactory for the familyGroup*/
let takeRandom = array => {
  let randomIdx = Math.floor(Math.random() * Math.floor(array.length));
  return array.splice(randomIdx, 1);
};

let addToGroup = (group, person) => {
  return group.concat(person);
};

let groupConcatWithLastGroup = (groupsArray, group) => {
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
  let isGroupTooSmall = group.length > 0 && group.length < groupSizeLowerBound;
  if (isGroupTooSmall) {
    groups = groupConcatWithLastGroup(groups, group);
  } else if (group.length > 0) {
    groups.push(group);
  }
  return groups;
};

/*Alternative solution of shuffling the array first*/
let shuffleArray = array => {
  return array.sort(() => Math.random() - 0.5);
};
let familyGroup2 = people => {
  let shuffledPeople = shuffleArray(people.slice());
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

let people = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log(familyGroup2(people));
