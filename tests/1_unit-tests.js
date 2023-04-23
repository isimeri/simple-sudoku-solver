const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
let solver = new Solver();
const puzzles = require('../controllers/puzzle-strings.js');
const puzzleString = "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";
let matrix = solver.strToMatrix(puzzleString)


suite('Unit Tests', () => {
    test("should handle a valid puzzle string of 81 characters", (done) => {
        let result = solver.validate('1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.');
        assert.equal(result,'ok');
        done();
    });
    test("should handle a puzzle string with invalid characters", (done) => {
        let result = solver.validate('1.5..2.84..63.12.7.2..5.....9..1.QW.8.2.3674.3.7.2..9.47...8..1..16asdf926914.37.');
        assert.equal(result, 'invalid characters');
        done();
    });
    test('should handle a puzzle string that is not 81 characters in length', (done) => {
        let result = solver.validate('1.5..2.84..63.12.7.2..5.....9..1....8.2.3674');
        assert.equal(result, "not 81", "the puzzle string must be 81 chars long");
        done();
    });
    test("should handle a valid row placement", (done) => {
        let result = solver.checkRowPlacement(matrix, 0, 0, 7);
        assert.isFalse(result);
        done();
    });
    test("should handle an invalid row placement", (done) => {
        let result = solver.checkRowPlacement(matrix, 0, 0, 5);
        assert.isTrue(result);
        done();
    });
    test("should handle a valid column placement", (done) => {
        let result = solver.checkColPlacement(matrix, 0, 0, 7);
        assert.isFalse(result);
        done();
    });
    test("should handle an invalid column placement", (done) => {
        let result = solver.checkColPlacement(matrix, 0, 0, 6);
        assert.isTrue(result);
        done();
    });
    test("should handle a valid region (3x3 grid) placement", (done) => {
        let result = solver.checkRegionPlacement(matrix, 0, 0, 7);
        assert.isFalse(result);
        done();
    })
    test("should handle an invalid region (3x3 grid) placement", (done) => {
        let result = solver.checkRegionPlacement(matrix, 0, 0, 2);
        assert.isTrue(result);
        done();
    });
    test("should pass the solver if valid", done => {
        puzzles.puzzlesAndSolutions.forEach( puzzle => {
            let result = solver.solve(puzzle[0]);
            assert.equal(result, puzzle[1]);
        });
        done();
    });
    test("should fail the solver if invalid", done => {
        assert.equal(solver.solve('123..123..123..123...43'), 'not 81');
        assert.equal(solver.solve('..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6.M'), 'invalid characters');
        assert.equal(solver.solve('1234.....1234.....1234.....1234.....1234.....1234.....1234.....2134.....1234.....'), 'impossible');
        done();
    });
    test('should return the expected solution for an incomplete puzzle', done => {
        let puzzle = '82..4..6...16..89...98315.749.157.............53..4...96.415..81..7632..3...28.51';
        let result = solver.solve(puzzle);
        let solution = '827549163531672894649831527496157382218396475753284916962415738185763249374928651'
        assert.isString(result);
        assert.equal(result, solution);
        done();
    });
});

// Logic handles a valid puzzle string of 81 characters
// Logic handles a puzzle string with invalid characters (not 1-9 or .)
// Logic handles a puzzle string that is not 81 characters in length
// Logic handles a valid row placement
// Logic handles an invalid row placement
// Logic handles a valid column placement
// Logic handles an invalid column placement
// Logic handles a valid region (3x3 grid) placement
// Logic handles an invalid region (3x3 grid) placement
// Valid puzzle strings pass the solver
// Invalid puzzle strings fail the solver
// Solver returns the expected solution for an incomplete puzzle