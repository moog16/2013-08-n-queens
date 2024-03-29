// Write code here that will find the solution count for a board of any size.
// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)

window.findNRooksSolution = function(n){
  var solution = undefined;
  console.log('Single solution for ' + n + ' rooks:', solution);
  return solution;
};

window.countNRooksSolutions = function(n){
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

var countNQueensSolutions = function(n){

  var queenCount = 0;

  var traverse = function(threats, row) {
    if(n >= 4) {
      debugger;
    }
    if(row > n || n===1 || n===0) {
      queenCount++;
    } else {
      for(var col=0; col<n; col++) {
        if(!threats.noSpace[col]) {
          var nextRowThreats = Object.create(calculateThreats(threats, col, n));
          traverse(nextRowThreats, row+1);
        }
      }
    }
  };

  var threats = {};
  threats.major = {};
  threats.minor = {};
  threats.column = {};
  threats.noSpace = {};

  traverse(threats, 0);

  console.log('Number solution for ' + n + ' queens:', queenCount);
  return queenCount;
};

var calculateThreats = function(threats, col, n) {
  threats.column[col] = true;
  threats.minor = calculateMinorThreats(threats, col, n);
  threats.major = calculateMajorThreats(threats, col, n);
  threats.noSpace = {};
  for(var i=0; i<n; i++) {
    threats.noSpace[i] = threats.minor[i] || threats.major[i] || threats.column[i];
  }

  return threats;
};

var calculateMajorThreats = function(threats, col, n) {
  for(var key in threats.major) {
    if(key+1 <= n) {
      threats.major[key+1] = true;
    }
    threats.major[key] = false;
  }
  if(col < n) {
    threats.major[col+1] = true;
  }
  
  return threats.major;
};

var calculateMinorThreats = function(threats, col) {
  for(var key in threats.minor) {
    if(key > 0) {
      threats.minor[key-1] = true;
    }
    threats.minor[key] = false;
  }
  if(col > 0) {
    threats.minor[col-1] = true;
  }

  return threats.minor;
};

// This function uses a board visualizer lets you view an interactive version of any piece matrix.

window.displayBoard = function(matrix){
  $('body').html(
    new BoardView({
      model: new Board(matrix)
    }).render()
  );
};

