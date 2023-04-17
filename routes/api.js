'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  
  let solver = new SudokuSolver();

  app.post('/api/check', (req, res) => {
      const puzzleString = req.body.puzzle;
      const coord = req.body.coordinate;
      const val = parseInt(req.body.value);

      const checkRes = solver.checkPlacement(puzzleString, coord, val);
      const jsonRes = {"valid": true}

      if(checkRes[0] === 0 && checkRes[1] === 0 && checkRes[2] === 0){
         return res.json(jsonRes);
      } else {
        jsonRes['valid'] = false;
        jsonRes["conflict"] = [];
        if(checkRes[0] === 1){
          jsonRes["conflict"].push("row");
        }
        if(checkRes[1] === 1){
          jsonRes['conflict'].push('column');
        }
        if(checkRes[2] === 1){
          jsonRes['conflict'].push('region');
        }
      }
      console.log(checkRes, jsonRes);
      res.json(jsonRes);
    });
    
  app.post('/api/solve', (req, res) => {

    const puzzleString = req.body.puzzle;

    if(solver.validate(puzzleString) === 'not 81'){
      return res.json({"error": "Expected puzzle to be 81 characters long"});

    } else if(solver.validate(puzzleString) === 'invalid characters'){
      return res.json({ "error": "Invalid characters in puzzle" });
    }

    const solvedString = solver.solve(puzzleString);

    if(solvedString === 'impossible'){
      return res.json({'error': 'Puzzle cannot be solved'});
    }

    console.log(solvedString);
    res.json({solution: solvedString});
  });
};

//take care of the case when there is no input + invalid coordinate + invalid value
