(function(){

  window.Board = Backbone.Model.extend({

    initialize: function(params){
      if (params.n) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function(){
      return _(_.range(this.get('n'))).map(function(rowIndex){
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex){
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex){
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex){
      return colIndex + rowIndex;
    },


    hasAnyRooksConflicts: function(){
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex){
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function(){
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex){
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


    // todo: fill in all these functions - they'll help you!

    hasRowConflictAt: function(rowIndex){
      return 1 < _.reduce(this.get(rowIndex), function(memo, item) {
        return memo + item;
      }, 0);
    },

    hasAnyRowConflicts: function(){
      for (var i = 0 ; i < this.get('n') ; i++) {
        if(this.hasRowConflictAt(i)) {
          return true;
        }
      }
      return false; // fixme
    },

    hasColConflictAt: function(colIndex){
      var checkarr = [];
      for (var i = 0 ; i < this.get('n') ; i++) {
        checkarr.push(this.get(i)[colIndex]);
      }
      return 1 < _.reduce(checkarr, function(memo, item){
        return memo + item;
      }, 0);
    },

    hasAnyColConflicts: function(){
      for (var i = 0 ; i < this.get('n') ; i++) {
        if(this.hasColConflictAt(i)) {
          return true;
        }
      }
      return false;
    },

    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow){
      var checkarr = [];
      for (var i = 0 ; i < this.get('n') ; i++ ) {
        if (this.get(i)[majorDiagonalColumnIndexAtFirstRow+i]) {
          checkarr.push(this.get(i)[majorDiagonalColumnIndexAtFirstRow+i]);
        }
      }
      return 1 < _.reduce(checkarr, function(memo, item){
        return memo + item;
      }, 0);
    },

    hasAnyMajorDiagonalConflicts: function(){
      for (var i = 0 ; i < this.get('n') ; i++) {
        if(this.hasMajorDiagonalConflictAt(i)) {
          return true;
        }
      }
      return false;
    },

    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow){
      var checkarr = [];
      for (var i = 0 ; i < this.get('n') ; i++ ) {
        if (this.get(i)[minorDiagonalColumnIndexAtFirstRow-i]) {
          checkarr.push(this.get(i)[minorDiagonalColumnIndexAtFirstRow-i]);
        }
      }
      return 1 < _.reduce(checkarr, function(memo, item){
        return memo + item;
      }, 0);
    },

    hasAnyMinorDiagonalConflicts: function(){
      for (var i = 0 ; i < this.get('n') ; i++) {
        if(this.hasMinorDiagonalConflictAt(i)) {
          return true;
        }
      }
      return false;
    }

  });

  var makeEmptyMatrix = function(n){
    return _(_.range(n)).map(function(){
      return _(_.range(n)).map(function(){
        return 0;
      });
    });
  };

}());
