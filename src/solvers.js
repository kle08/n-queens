/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/


// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.makeseries = function (p) {
  if (p === 1) {
    return [[0]];
  } else if (p === 0) {
    return [];
  } else {
    return this.nextrow(this.makeseries(p - 1));
  }
}
window.nextrow = function (arr, n) {
  var newArr = [];
  for (let i = 0; i < arr.length; i++) {
    var baseArr = arr[i];
    var n = baseArr.length;
    for (let j = 0; j <= baseArr.length; j++) {
      var expandArr = baseArr.slice(0, j).concat([n]).concat(baseArr.slice(j, baseArr.length))
      newArr.push(expandArr);
    }
  }
  return newArr;
}


window.makeBoard = function (arr) {
  var l = arr.length;
  var boardie = new Board({ n: l });
  for (let j = 0; j < l; j++) {
    boardie.togglePiece(j, arr[j]);
  }
  return boardie;
}

window.findNRooksSolution = function (n) {
  var solution = this.makeBoard(this.makeseries(n)[0]);
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution.rows();
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function (n) {
  var solutionCount = this.makeseries(n).length;
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function (n) {
  var solution = undefined;
  var solutionSpace = this.makeseries(n);
  for (let i = 0; i < solutionSpace.length; i++) {
    var temp = this.makeBoard(solutionSpace[i]);
    if (!temp.hasAnyQueensConflicts()) {
      solution = temp.rows();
      break;
    }
  }

  if (solution === undefined) {
    var fakeSlnArr = [];
    for (let i = 0; i < n; i++) {
      fakeSlnArr.push([]);
    }
    solution = fakeSlnArr;
  }
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function (n) {
  if (n === 0) {
    return 1;
  }
  var solutionCount = 0;
  var solutionSpace = this.makeseries(n);
  for (let i = 0; i < solutionSpace.length; i++) {
    var temp = this.makeBoard(solutionSpace[i]);
    if (!temp.hasAnyQueensConflicts()) {
      solutionCount++;
    }
  }
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};


