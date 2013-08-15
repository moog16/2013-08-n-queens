var nQueens = {};
nQueens.findNQueens = function(n) {
  var initialPossPlaces = [];
  for(var i=0; i<n; i++) {
    initialPossPlaces.push(0);
  }

  var row = initialPossPlaces.slice(0),
  minor = initialPossPlaces.slice(0),
  major = initialPossPlaces.slice(0),
  column = initialPossPlaces.slice(0),
  countOfQueens = 0,
  results = [];

  initialPossPlaces = nQueens.collisions(n, minor, major, column);
  results.push(this.queenPlacer(n, minor, major, column, initialPossPlaces, countOfQueens));
  return results.length;
};

nQueens.collisions = function(n, minor, major, column) {
  var notPossiblePlaces = [];

  var possibleIndexes = [];
  minor.pop();
  minor.unshift(0);

  major.shift();
  major.push(0);

  for(var i=0; i<n; i++) {
    notPossiblePlaces[i] = column[i] || minor[i] || major[i];
  }
  _.each(notPossiblePlaces, function(notPossiblePlace, index) {
    !(notPossiblePlace) && possibleIndexes.push(index);
  });
  return possibleIndexes;
};

nQueens.queenPlacer = function(n, minor, major, column, possibleIndexes, countOfQueens) {
  for(var i=0 ; i < possibleIndexes.length ; i++) {
    var endOfBoard = _.reduce(column, function(sum, num) {
      return sum + num;
    }, 0);
    if(endOfBoard === n) {
      countOfQueens++;
      return countOfQueens;
    } else if (possibleIndexes.length > 0) {
      var queenPlace = possibleIndexes[i];
      column[queenPlace] = 1;
      minor[queenPlace + 1] = 1;
      major[queenPlace - 1] = 1;

      var possibleIndex = this.collisions(n, minor, major, column);

      return nQueens.queenPlacer(n, minor, major, column, possibleIndex, countOfQueens);
    } else {
      return false;
    }
  }


  // placeQueen at index;
  // column at index = 1;
  // minor at index + 1 = 1;
  // major at index - 1 = 1;

  //terminating condition: are we at the last row? return true
  //terminating condition: are there any places we can't place? return false
};
