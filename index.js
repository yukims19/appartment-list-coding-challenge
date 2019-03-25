let familyGroup = array => {
  let newArray = array.slice();
  let groups = [];
  let group = [];

  while (newArray.length > 0) {
    if (group.length < 3) {
      let randomIdx = Math.floor(Math.random() * Math.floor(newArray.length));
      console.log("randomIdx:", randomIdx);
      group.push(newArray[randomIdx]);
      newArray[randomIdx] = null;
      newArray = newArray.filter(ele => ele !== null);
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

//input -> ["",]
//outout =>[["","",""]]
//default size => 3

let people = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log(familyGroup(people));
