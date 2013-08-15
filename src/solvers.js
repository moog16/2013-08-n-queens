// Write code here that will find the solution count for a board of any size.
// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)

window.findNRooksSolution = function(n){
  var board = [];
  for (var i = 0 ; i < n ; i++) {
    board[i] = [];
    for(var j=0; j < n ; j++) {
      board[i][j] = 0;
    }
  }
  var boardarr = [];
  var planter = function(boardd, index) {
    var newboard = [];
    for (var i = 0 ; i < n ; i++) {
      newboard[i] = [];
      for (var j = 0 ; j < n ; j++) {
        newboard[i][j] = boardd[i][j];
      }
    }
    if (index+1 > n) {
      boardarr.push(newboard);
      return newboard;
    } else {
      for (var i = 0 ; i < n ; i++) {
        newboard[index][i] = 1;
        planter(newboard, index+1);
        newboard[index][i] = 0;
      }
    }
  };

  planter(board, 0);
  console.log(boardarr);

  var checker = function(boards) {
    for(var i=0; i<boards.length; i++) {
      var currentBoard = boards[i];
      var result = false;


      _.reduce(currentBoard, function(memo, item) {
        return memo + item;
      }, 0);
      if(result) {
        result.splice(i, 1);
      }
    }
  };

  var checkColumns = function(arr) {
    
  };


  for (var j = 0 ; j < n ; j++) {
    var possibilities = _.reduce(board, function(memo, item) {
      for (var i = 0 ; i < memo.length ; i++) {
        memo[i] = memo[i] || item[i];
      }
      return memo;
    });
    var next = possibilities.indexOf(0);
    board[j][next] = 1;
  }



  var solution = board;

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


// This function uses a board visualizer lets you view an interactive version of any piece matrix.

window.displayBoard = function(matrix){
  $('body').html(
    new BoardView({
      model: new Board(matrix)
    }).render()
  );
};
