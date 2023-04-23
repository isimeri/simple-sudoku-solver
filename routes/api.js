'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  
  let solver = new SudokuSolver();

  app.post('/api/check', (req, res) => {
      const puzzleString = req.body.puzzle;
      const coord = req.body.coordinate;
      const rawVal = req.body.value;
      const val = parseInt(rawVal);

      if(solver.validateCoord(coord) === 'missing coord' || solver.validateValue(rawVal) === 'missing value' || solver.validate(puzzleString) === 'missing puzzle'){
        return res.json({ "error": "Required field(s) missing" });
      }
      if(solver.validate(puzzleString) === 'not 81'){
        return res.json({"error": "Expected puzzle to be 81 characters long"});
      }
      if(solver.validate(puzzleString) === 'invalid characters'){
        return res.json({ "error": "Invalid characters in puzzle" });
      }
      if(solver.validateCoord(coord) === 'invalid coord'){
        return res.json({ "error": "Invalid coordinate" });
      }
      if(solver.validateValue(rawVal) === 'invalid value'){
        return res.json({ "error": "Invalid value" });
      }
      const checkRes = solver.checkPlacement(puzzleString, coord, val);
      const jsonRes = {"valid": true}

      if(checkRes === "taken"){
        return res.json({"error": "Cell is taken"});
      }
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
    const solverOutput = solver.solve(puzzleString);

    if(solverOutput === "missing puzzle"){
      return res.json({ "error": "Required field(s) missing" });
    }
    if(solverOutput === 'not 81'){
      return res.json({"error": "Expected puzzle to be 81 characters long"});
    }
     if(solverOutput === 'invalid characters'){
      return res.json({ "error": "Invalid characters in puzzle" });
    }
    if(solverOutput === 'impossible'){
      return res.json({'error': 'Puzzle cannot be solved'});
    }

    console.log(solverOutput);
    res.json({solution: solverOutput});
  });
};

// If value submitted to /api/check is already placed in puzzle on that coordinate, the returned value will be an object containing a valid property with true if value is not conflicting.