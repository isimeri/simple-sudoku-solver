const chai = require("chai");
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', () => {
    suite("Puzzle solving tests", () => {
        test("Solve a puzzle with valid puzzle string: POST request to /api/solve", done => {
            chai.request(server)
            .post('/api/solve')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({
                puzzle: '.7.89.....5....3.4.2..4..1.5689..472...6.....1.7.5.63873.1.2.8.6..47.1..2.9.387.6'
            })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.body.solution, '473891265851726394926345817568913472342687951197254638734162589685479123219538746');
                done();
            });
        });
        test('Solve a puzzle with missing puzzle string: POST request to /api/solve', done => {
            chai.request(server)
            .post('/api/solve')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({
                puzzle: ''
            })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.body.error, "Required field(s) missing");
                done();
            });
        });
        test("Solve a puzzle with invalid characters: POST request to /api/solve", done => {
            chai.request(server)
            .post('/api/solve')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({
                puzzle: '.7.89.....5....3.4.2..4..1.5689..472...6.....1.7.5.63873.1.2.8.6..47.1..2.ASDASDk'
            })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.body.error, "Invalid characters in puzzle");
                done();
            });
        });
        test("Solve a puzzle with invalid characters: POST request to /api/solve", done => {
            chai.request(server)
            .post('/api/solve')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({
                puzzle: '.7.89.....5....3.4.2..4..1.5689..472...6....'
            })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.body.error, "Expected puzzle to be 81 characters long");
                done();
            });
        });
        test("Solve a puzzle that cannot be solved: POST request to /api/solve", done => {
            chai.request(server)
            .post('/api/solve')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({
                puzzle: '1234.....1234.....1324.....1234.....1234.....1324.....1234.....1324.....1234.....'
            })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.body.error, 'Puzzle cannot be solved');
                done();
            });
        });
    })
    suite("Position checking tests", () => {
        test('Check a puzzle placement with all fields: POST request to /api/check', done => {
            chai.request(server)
            .post('/api/check')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({
                puzzle: '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
                coordinate: 'a1',
                value: 7
            })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.isTrue(res.body.valid);
                done();
            });
        });
        test('Check a puzzle placement with single placement conflict: POST request to /api/check', done => {
            chai.request(server)
            .post('/api/check')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({
                puzzle: '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
                coordinate: 'a2',
                value: 1
            })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.isFalse(res.body.valid);
                assert.isArray(res.body.conflict);
                assert.equal(res.body.conflict[0], 'row');
                done();
            });
        });
        test('Check a puzzle placement with single placement conflict: POST request to /api/check', done => {
            chai.request(server)
            .post('/api/check')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({
                puzzle: '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
                coordinate: 'a1',
                value: 1
            })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.isFalse(res.body.valid);
                assert.isArray(res.body.conflict);
                assert.nestedInclude(res.body.conflict, "row");
                assert.nestedInclude(res.body.conflict, "column");
                done();
            });
        });
        test('Check a puzzle placement with all placement conflicts: POST request to /api/check', done => {
            chai.request(server)
            .post('/api/check')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({
                puzzle: '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
                coordinate: 'a2',
                value: 5
            })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.isFalse(res.body.valid);
                assert.isArray(res.body.conflict);
                assert.nestedInclude(res.body.conflict, "row");
                assert.nestedInclude(res.body.conflict, "column");
                assert.nestedInclude(res.body.conflict, "region");
                done();
            });
        });
        test('Check a puzzle placement with missing required fields: POST request to /api/check', done => {
            chai.request(server)
            .post('/api/check')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({
                puzzle: '',
                coordinate: '',
                value: 7
            })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.body.error, "Required field(s) missing");
                done();
            });
        });
        test('Check a puzzle placement with invalid characters: POST request to /api/check', done => {
            chai.request(server)
            .post('/api/check')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({
                puzzle: '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3.ESKE',
                coordinate: 'a1',
                value: 7
            })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.body.error, "Invalid characters in puzzle");
                done();
            });
        });
        test('Check a puzzle placement with incorrect length: POST request to /api/check', done => {
            chai.request(server)
            .post('/api/check')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({
                puzzle: '..9..5.1.85.4....2432......1',
                coordinate: 'a1',
                value: 7
            })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.body.error, "Expected puzzle to be 81 characters long");
                done();
            });
        });
        test('Check a puzzle placement with invalid placement coordinate: POST request to /api/check', done => {
            chai.request(server)
            .post('/api/check')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({
                puzzle: '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
                coordinate: 'a1wer',
                value: 7
            })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.body.error, "Invalid coordinate");
                done();
            });
        });
        test('Check a puzzle placement with invalid placement value: POST request to /api/check', done => {
            chai.request(server)
            .post('/api/check')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({
                puzzle: '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
                coordinate: 'a1',
                value: 'e'
            })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.body.error, "Invalid value");
                done();
            });
        });
    })
});

// Solve a puzzle with valid puzzle string: POST request to /api/solve
// Solve a puzzle with missing puzzle string: POST request to /api/solve
// Solve a puzzle with invalid characters: POST request to /api/solve
// Solve a puzzle with incorrect length: POST request to /api/solve
// Solve a puzzle that cannot be solved: POST request to /api/solve
// Check a puzzle placement with all fields: POST request to /api/check
// Check a puzzle placement with single placement conflict: POST request to /api/check
// Check a puzzle placement with multiple placement conflicts: POST request to /api/check
// Check a puzzle placement with all placement conflicts: POST request to /api/check
// Check a puzzle placement with missing required fields: POST request to /api/check
// Check a puzzle placement with invalid characters: POST request to /api/check
// Check a puzzle placement with incorrect length: POST request to /api/check
// Check a puzzle placement with invalid placement coordinate: POST request to /api/check
// Check a puzzle placement with invalid placement value: POST request to /api/check