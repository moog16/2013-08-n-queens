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

window.findNQueensSolution = function(n){
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', solution);
  return solution;
};

window.countNQueensSolutions = function(n){
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};

var findNQueens = function(n) {
  var queenCount = 0;

  var traverse = function(placements) {
    if(placements.length === n) {
      queenCount++;
    } else {
      for(var col=0; col<n; col++) {
        if(!hasAnyConflicts(placements, col)) {
          traverse(placements.concat([col]));
        } 
      }
    }
  };

  traverse([]);

  return queenCount;
};

var hasAnyColConflicts = function(placements, col) {
  for(var i=0; i<placements.length; i++) {
    if(placements[i] === col) {
      return true;
    }
  }
  return false;
};

var hasAnyMajorDiagConflicts = function(placements, col) {
  for(var i=0; i<placements.length; i++) {
    if(placements.length - i + placements[i] === col) {
      return true;
    }
  }
  return false;  
};

var hasAnyMinorDiagConflicts = function(placements, col) {
  for(var i=0; i<placements.length; i++) {
    if(i - placements.length + placements[i] === col) {
      return true;
    }
  }
  return false;  
};

var hasAnyConflicts = function(placements, col) {
  if(hasAnyColConflicts(placements, col) ||
    hasAnyMinorDiagConflicts(placements, col) ||
    hasAnyMajorDiagConflicts(placements, col) ) {
    return true;
  } else {
    return false;
  }
};



// This function uses a board visualizer lets you view an interactive version of any piece matrix.

window.displayBoard = function(matrix){
  $('body').html(
    new BoardView({
      model: new Board(matrix)
    }).render()
  );
};

