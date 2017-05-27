
/*##### GAME OBJECTS ##### GAME OBJECTS ##### GAME OBJECTS ##### GAME OBJECTS ##### GAME OBJECTS ##### GAME OBJECTS #####*/

var ObjectConstructor = function(name, position, architecture) {                //Create a 'class' for objects within the game

  this.name = name;
  this.position = position;
  this.architecture = architecture;

  this.printObject = function() {
    console.log(this.name, JSON.stringify(this.position), this.architecture);
  }
}


var RoverConstructor = function(name, position, architecture, direction) {      //Create a 'class' that inherits from Object called Rover. Objects have no direction. Rovers do.

  ObjectConstructor.call(this);
  this.name = name;
  this.position = position;
  this.architecture = architecture;
  this.direction = direction;

  switch (this.direction) {
    case 'N':
      var stringDirection = 'North';
      break;
    case 'S':
      var stringDirection = 'South';
      break;
    case 'E':
      var stringDirection = 'East ';
      break;
    case 'W':
      var stringDirection = 'West ';
      break;
  }

  this.printRover = function() {
    console.log(" ############ ROVER INFO #############",
                "\n ## Name:", this.name, "                  ## ",
                "\n ## Rover Position:", JSON.stringify(this.position), "          ## ",
                "\n ## Rover Facing:", stringDirection, "            ## ",
                "\n ## Rover looks like:", this.architecture, "       ## ",
                "\n #####################################");
  }
}

RoverConstructor.prototype = Object.create(ObjectConstructor.prototype);        //Make Rover inherit properties from Object.
RoverConstructor.prototype.constructor = RoverConstructor;

var boulderArchitecture = '{_@@__';                                              //Shapes for various objects in the game.
var mountainArchitecture = ' //A\\ ';
var treeArchitecture = '_vYvY_';
var treasureArchitecture = '[_GG_]';

                                                                                //Create instances of objects in the game.
                                                                                //objectsList is a global list that will contain all the objects in the game.
var objectsList = [
rovers1 = new RoverConstructor("Rover 1", [4, 4], "[:M: ]", 'N'),
rovers2 = new RoverConstructor("Rover 2", [0, 0], "[:W: ]", 'S'),
boulder1 = new ObjectConstructor("Boulder 1", [3, 3], boulderArchitecture),
boulder2 = new ObjectConstructor("Boulder 2", [2, 1], boulderArchitecture),
boulder3 = new ObjectConstructor("Boulder 3", [2, 6], boulderArchitecture),
boulder4 = new ObjectConstructor("Boulder 4", [4, 6], boulderArchitecture),
mountain1 = new ObjectConstructor("Mountain 1", [7, 8], mountainArchitecture),
mountain2 = new ObjectConstructor("Mountain 2", [8, 8], mountainArchitecture),
mountain3 = new ObjectConstructor("Mountain 3", [9, 8], mountainArchitecture),
mountain4 = new ObjectConstructor("Mountain 4", [8, 9], mountainArchitecture),
mountain5 = new ObjectConstructor("Mountain 5", [4, 0], mountainArchitecture),
mountain6 = new ObjectConstructor("Mountain 6", [5, 0], mountainArchitecture),
mountain7 = new ObjectConstructor("Mountain 7", [6, 0], mountainArchitecture),
mountain8 = new ObjectConstructor("Mountain 8", [9, 0], mountainArchitecture),
mountain9 = new ObjectConstructor("Mountain 9", [5, 1], mountainArchitecture),
mountain10 = new ObjectConstructor("Mountain 10", [6, 1], mountainArchitecture),
mountain11 = new ObjectConstructor("Mountain 11", [7, 1], mountainArchitecture),
mountain12 = new ObjectConstructor("Mountain 12", [6, 2], mountainArchitecture),
mountain13 = new ObjectConstructor("Mountain 13", [7, 2], mountainArchitecture),
mountain14 = new ObjectConstructor("Mountain 14", [7, 3], mountainArchitecture),
mountain15 = new ObjectConstructor("Mountain 15", [9, 1], mountainArchitecture),
mountain16 = new ObjectConstructor("Mountain 16", [9, 2], mountainArchitecture),
mountain17 = new ObjectConstructor("Mountain 17", [9, 3], mountainArchitecture),
mountain18 = new ObjectConstructor("Mountain 18", [8, 4], mountainArchitecture),
mountain19 = new ObjectConstructor("Mountain 19", [9, 9], mountainArchitecture),
tree1 = new ObjectConstructor("Tree 1", [1, 6], treeArchitecture),
tree2 = new ObjectConstructor("Tree 2", [5, 6], treeArchitecture),
tree3 = new ObjectConstructor("Tree 3", [0, 7], treeArchitecture),
tree4 = new ObjectConstructor("Tree 4", [1, 7], treeArchitecture),
tree5 = new ObjectConstructor("Tree 5", [2, 7], treeArchitecture),
tree6 = new ObjectConstructor("Tree 6", [4, 7], treeArchitecture),
tree7 = new ObjectConstructor("Tree 7", [5, 7], treeArchitecture),
tree8 = new ObjectConstructor("Tree 8", [6, 7], treeArchitecture),
tree9 = new ObjectConstructor("Tree 9", [0, 8], treeArchitecture),
tree10 = new ObjectConstructor("Tree 10", [6, 8], treeArchitecture),
tree11 = new ObjectConstructor("Tree 11", [0, 9], treeArchitecture),
tree12 = new ObjectConstructor("Tree 12", [1, 9], treeArchitecture),
tree13 = new ObjectConstructor("Tree 13", [3, 9], treeArchitecture),
tree14 = new ObjectConstructor("Tree 14", [4, 9], treeArchitecture),
treasure1 = new ObjectConstructor("Treasure Chest", [8, 3], treasureArchitecture)
]


/*##### GAME LOGIC ##### GAME LOGIC ##### GAME LOGIC ##### GAME LOGIC ##### GAME LOGIC ##### GAME LOGIC #####*/

function gridWrap(position) {                                                   //gridWrap takes any position that has an integer larger than gridSize (10) or a negative number
  if (position[0] < 0) {                                                        //and turns it into a valid position on the grid. (on the opposite side).
    position[0] = 10 - (position[0] * -1);
  }
  if (position[1] < 0) {
    position[1] = 10 - (position[1] * -1);
  }
  if (position[0] > 9) {
    position[0] = 10 - position[0];
  }
  if (position[1] > 9) {
    position[1] = 10 - position[1];
  }
  return [position[0], position[1]];
}


function collisionDetection(rover, roverOldPosition, roverNewPosition) {
                                                                                //Cycle through objects in objectsList until an object's position matches rover newPosition or fails.
  var filtered = objectsList.filter(function(val) {
    return (val.position[0]===roverNewPosition[0]) && (val.position[1]===roverNewPosition[1]);
  });

  if (filtered.length === 0) {                                                  //If filtered returns an empty array then there will be no object collision.
    return false;
  }
  else {
    if (filtered[0].position[0] === treasure1.position[0] && filtered[0].position[1] === treasure1.position[1]) {
      alert("YOU WON! YOU HAVE FOUND THE TREASURE ON MARS!");
      return false;
    }
    else {
      alert("COLLISION! Try to go around the object, not through it!");
      return true;
    }
  }
}

function goForward(rover) {
  var oldPosition = rover.position;                                             //Saves rover's old position for collision detection.
  var collision;                                                                //Is a boolean value returned from function collisionDetection. Determines whether rover uses old or new position.
  switch(rover.direction) {
    case 'N':
      var move = [rover.position[0], rover.position[1]-1];                      //Updates rover to new position. Requires grid wrapping.
      var newPosition = gridWrap(move);                                         //Takes the new position and checks whether it should adjust for grid wrapping.
      collision = collisionDetection(rover, oldPosition, newPosition);          //Decides whether there is a collision betwee the rover and another object. Returns a boolean.
      decide(rover, collision, oldPosition, newPosition);                       //Checks whether collision is true or false. Updates rover position accordingly.
      break;
    case 'E':
      var move = [rover.position[0]+1, rover.position[1]];
      var newPosition = gridWrap(move);
      collision = collisionDetection(rover, oldPosition, newPosition);
      decide(rover, collision, oldPosition, newPosition);
      break;
    case 'S':
      var move = [rover.position[0], rover.position[1]+1];
      var newPosition = gridWrap(move);
      collision = collisionDetection(rover, oldPosition, newPosition);
      decide(rover, collision, oldPosition, newPosition);
      break;
    case 'W':
      var move = [rover.position[0]-1, rover.position[1]];
      var newPosition = gridWrap(move);
      collision = collisionDetection(rover, oldPosition, newPosition);
      decide(rover, collision, oldPosition, newPosition);
      break;
  };
  gridWrap(rover.position);
}


function goBackward(rover) {                                                    //Same as goForward.
  var oldPosition = rover.position;
  var collision;
  switch(rover.direction) {
    case 'N':
      var move = [rover.position[0], rover.position[1]+1];
      var newPosition = gridWrap(move);
      collision = collisionDetection(rover, oldPosition, newPosition);
      decide(rover, collision, oldPosition, newPosition);
      break;
    case 'E':
      var move = [rover.position[0]-1, rover.position[1]];
      var newPosition = gridWrap(move);
      collision = collisionDetection(rover, oldPosition, newPosition);
      decide(rover, collision, oldPosition, newPosition);
      break;
    case 'S':
      var move = [rover.position[0], rover.position[1]-1];
      var newPosition = gridWrap(move);
      collision = collisionDetection(rover, oldPosition, newPosition);
      decide(rover, collision, oldPosition, newPosition);
      break;
    case 'W':
      var move = [rover.position[0]+1, rover.position[1]];
      var newPosition = gridWrap(move);
      collision = collisionDetection(rover, oldPosition, newPosition);
      decide(rover, collision, oldPosition, newPosition);
      break;
  };
  gridWrap(rover.position);
}

function decide(rover, collision, oldPosition, newPosition) {                   //decide takes the boolean from collisionDetection and determines whether the rover has
  switch(collision) {                                                           //collided and must go back to last calculated position or there has been no collision and calculated position is valid.
    case true:
      rover.position = oldPosition;
      break;
    case false:
      rover.position = newPosition;
      break;
    }
}


function newDirection(rover, userInput) {

  switch (userInput) {
    case 'l':
      if (rover.direction == 'N') {
        rover.direction = 'W';
        console.log("Your rover is now facing West.");
      }
      else if (rover.direction == 'W') {
        rover.direction = 'S';
        console.log("Your rover is now facing South.");
      }
      else if (rover.direction == 'S') {
        rover.direction = 'E';
        console.log("Your rover is now facing East.");
      }
      else if (rover.direction == 'E') {
        rover.direction = 'N';
        console.log("Your rover is now facing North.");
      }
      break;

    case 'r':
        if (rover.direction == 'N') {
          rover.direction = 'E';
          console.log("Your rover is now facing East.");
        }
        else if (rover.direction == 'E') {
          rover.direction = 'S';
          console.log("Your rover is now facing South.");
        }
        else if (rover.direction == 'S') {
          rover.direction = 'W';
          console.log("Your rover is now facing West.");
        }
        else if (rover.direction == 'W') {
          rover.direction = 'N';
          console.log("Your rover is now facing North.");
        }
        break;

  }
}

function help() {
  console.log("");
  console.log(" ########################## List of Actions #########################");
  console.log(" ## quit          (exit) --> Quits game.                           ## \n ## help                 --> Displays list of actions.             ## \n ## info   (information) --> Displays Rover details                ## \n ## l             (left) --> Changes Rover direction to the left.  ## \n ## r            (right) --> Changes Rover direction to the right. ## \n ## f         (forwards) --> Moves Rover forwards.                 ## \n ## b        (backwards) --> Moves Rover backwards.                ## \n ## p             (pass) --> Rover will stay where it is.          ## ");
  console.log(" ####################################################################");
}

function info(rover) {
  rover.printRover();
}

function quit() {
  console.log("Quit through function 'quit'.");
  run = false;
}


/*##### GRAPHICS ##### GRAPHICS ##### GRAPHICS ##### GRAPHICS ##### GRAPHICS ##### GRAPHICS ##### GRAPHICS ##### GRAPHICS #####*/

function gridV3(gridSize) {

  var gridArchitecture = "{_____";                                               //What each grid element will look like

  for (var i = 0; i < gridSize; i++) {                                          //Start main loop that will build the grid. Loops as many times as there are rows to display

    var elementsList = objectsList.filter(function(item) {                      //Find all elements that must be displayed in a specific row. (Row "i")
      return item["position"][1] == i;                                          //item = {name, position[], architecture}, direction*} *direction property only for rovers.
    });

    var row = [];                                                               //This array "row" will hold our empty grid box and objects.
    for (var j = 0; j<gridSize;j++) {                                           //Add gridSize nº (i.e, 10) of empty grid spaces into row array. Grid nº can be changed in main()
      row.push(gridArchitecture);
    }

    for (element in elementsList) {                                             //Take each validated object in elementsList and insert into "row" array. Deletes the empty grid space aswell.
      var object_X_Coordinate = elementsList[element]["position"][0];
      var object_Architecture = elementsList[element]["architecture"];
      row.splice(object_X_Coordinate, 1, object_Architecture);
    }

    console.log("  ## ", row.join(), " ## ");                                       //Display grid row by row.
  }
}


function changeRoverArch(rover) {

  if (rover.direction == 'W') {
    rover.architecture = '[:<=:]';
  }
  else if (rover.direction == 'E') {
    rover.architecture = '[:=>:]';
  }
  else if (rover.direction == 'S') {
    rover.architecture = '[:W:]';
  }
  else {
    rover.architecture = '[:M:]';
  }
}

/*##### USER INPUT FUNCTIONS ##### USER INPUT FUNCTIONS ##### USER INPUT FUNCTIONS ##### USER INPUT FUNCTIONS ##### USER INPUT FUNCTIONS*/

function evalUserInput(userInput, rover) {
  for (var i = 0; i < userInput.length; i++) {
    switch(userInput[i]) {
      case 'f':                                                                 //rover goes forwards
        goForward(rover);
        break;
      case 'b':
        goBackward(rover);                                                      //rover goes backwards
        break;
      case 'l':                                                                 //rover changes its direction/orientation to the left
        newDirection(rover, "l");
        changeRoverArch(rover);
        break;
      case 'r':                                                                 //rover changes its direction/orientation to the right
        newDirection(rover, "r");
        changeRoverArch(rover);
        break;
      case 'p':                                                                 //Rover doesn't move. Passes the turn.
        break;
    }
  }
  if (rover.name === rovers1.name) {
    console.log("Rover 1 is now in position: [" + rovers1.position[0] + ", " + rovers1.position[1] + "]");
  }
  else if (rover.name === rovers2.name) {
    console.log("Rover 2 is now in position: [" + rovers2.position[0] + ", " + rovers2.position[1] + "]")
  }
  console.log("//##################################### MAP ###################################\\\\");
  gridV3(10);
  console.log("\\\\#############################################################################//");
}

function roverSwitch(rover) {
  action = prompt("Please enter the action(s) you wish to execute for " + rover.name + ": (Type 'help' for list of available actions)");

  switch(action) {
    case 'help':
      help();
      break;
    case 'quit':
      return false;
      break;
    case 'info':
      info(rover);
      break;
    default:
      var userInput = action.split("");
      evalUserInput(userInput, rover);
  }
}


/*##### MAIN GAME LOOP ##### MAIN GAME LOOP ##### MAIN GAME LOOP ##### MAIN GAME LOOP ##### MAIN GAME LOOP ##### MAIN GAME LOOP #####*/

var run = true;

function main() {
  console.log("####################################");
  console.log("Welcome to the Mars Rover program!");
  console.log("####################################");
  console.log("A collaboration between Alex Buchan and Ironhack. 27-05-2017");
  console.log("");
  var roverNum = prompt("How many rovers would you like to control? (1 or 2)")
  if (roverNum==2) {
    objectsList.push(rovers2);
    rovers1.printRover();
    rovers2.printRover();
  }
  else {
    rovers1.printRover();
  }
  console.log("//#################################### MAP ####################################\\\\");
  gridV3(10);
  console.log("\\\\#############################################################################//");

  while (run) {

    if (roverNum == 'quit') {             //Quits Program at user's behest.
      break;
    }
    if (roverNum == 1) {
      var output = roverSwitch(rovers1);
      if (output == false) {
        console.log("Quit program.");
        return;
      }
    }
    else if (roverNum == 2) {
      var output = roverSwitch(rovers1);
      if (output == false) {
        console.log("Quit program.");
        return;
      }
      var output2 = roverSwitch(rovers2);
      if (output2 == false) {
        console.log("Quit program.");
        return;
      }
    }
    else {
      var roverNum = prompt("Invalid input. Please enter a number 1 or 2 or type 'quit' to exit the program. How many rovers would you like to control? (1 or 2)")
    }
  }
}

main();
