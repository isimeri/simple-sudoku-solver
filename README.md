# Sudoku Solver -- [[live]](https://simple-sudoku-solver.onrender.com/)

An app that is able to solve simple Sudoku puzzles. It isn't able to solve puzzles that require applying special techniques, like X wing, Y wing, Swordfish and others.
All it does is look at the row, column and the 3x3 group of each cell and if there's only one potential candidate for that specific cell, then it fills it out.

Backend powered by Node.js and Express.js.  
Frontend made with classic HTML, CSS, JS and Fetch API.
___
Click [here](https://simple-sudoku-solver.onrender.com/) to check out the live app.
___
![sudoku solver screenshot](https://i.imgur.com/CGpb4qZ.png)

## How to use
### Solver

Fill in the textarea input with the unsolved puzzle. Use a period character to mark an empty cell. Type the whole unsolved puzzle without explicitly moving to a new line (no pressing Enter). The whole input string should look like a single huge word instead of 9 words on 9 lines.  
### Solver feedback
- If the puzzle is not solvable by this app's definition of "solvable" (see the first section of this README), an appropriate message will be displayed.  
- If the input string is not exactly 81 characters long or contains forbidden characters, an appropriate message will be displayed.

### Checker
Fill in the coordinates of the cell you want to check. The format of the coordinates input is letter first, digit second (e.g. B5). Use the letters on the left edge and the numbers on the top edge of the Sudoku grid to determine the coordinates of the cell you want to check.  
Fill in the number value you want to check against the cell you picked above. The valid values go from 1 up to 9.
### Checker feedback
- If the selected value does fit into the cell, meaning there is no conflict on the row, column and the 3x3 group, the checker will return an "ok" message (there may be other candidates for that cell, though).
- If the selected value has a conflict and therefore doesn't fit into that specific cell, the checker will return an appropriate message and details regarding the conflicts.
- If the format of the coordinate input is wrong or missing and/or the value input is not a single digit number or missing, the checker will return an appropriate error message.

___
This project is built as part of the [FreeCodeCamp's](https://www.freecodecamp.org) Quality Assurance certification.  
Inspiration for building this project can be found [here](https://www.freecodecamp.org/learn/quality-assurance/quality-assurance-projects/sudoku-solver).