'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  
  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {
      const puzzleString = req.body.puzzle;
      const coord = req.body.coordinate;
      const val = req.body.value;
    });
    
  app.post('/api/solve', (req, res) => {

    const puzzleString = req.body.puzzle;
    const solvedString = solver.solve(puzzleString);

    console.log(solvedString);
    res.json({solution: solvedString});
  });
};
