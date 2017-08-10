## Overview

# MVC, Most Valuable Coder

Achieve your coding mastery with MVC, join and compete with other developers to hone your programming skills and be ready for job interviews.

##  Features:

1. Header -MVC - Most Valuable Coder

1. Challenge
	1. Problem Selector - a graphical control element that allow users to choose 1 problem at a time among the array of problems
	1. Problem Title - displays the title of the problem
	1. Description - short description of the problem
	1. Example - meaningful guide to assist user on their coding.

1. Start Button - triggers the timer to measure the elapse time.

1. Your Code
	1. Technology - utilizes Ace Code Editor, an embeddable code editor written in JavaScript.  Features used: Automatic indent and outdent, text highlighting, Multiple cursors and selections, Cut, copy, and paste functionality, etc.
	1. Behavior - matches the features and performance of native editor such as Sublime.

1. Username field - place holder for username as required to be able to submit an answer.
1. Verify Code button - triggers ____ to validate if the answer is correct, returns the expected value and satisfies all test cases.
1. Refresh button - triggers the app to reload the browser and display the default problem
1. Timer - counts upwards from zero to measure how long the user took to get the answer correctly.
1. Instruction, Comments, Results
	1. Instruction box - displays when the start button is click to let user know how to submit when finish
	1. Comments - color coded display for compilation error.
	1. Results - color coded display for successfully answering the problem and number of minutes the user had taken
1. Top MVC - displays the user rank per problem.



##  User Flow:
1. Header
	1. Upon page load, header will show after 1 sec.
	2. MVC icon and page name are displayed
	3. MVC icon and page name center top
1. Challenge
	1. Upon page load, Icon (arrow-icon.png) is displayed 
	2. Challenge is displayed
	3. Default problem is displayed
	4. Default description is displayed
	5. Default example is displayed
	6. "Choose a Problem button" is displayed and clickable
	7. When user clicked the button, dropdown menu will display and user will be able to choose the problem they wish to solve.
	8. Select a problem, selected problem title will be displayed.
	9. Corresponding description will be displayed
	10. Corresponding esample will be displayed
1. Start botton
	1. Start botton will be displayed below the example 
	2. Start botton is clickable
	3. Start botton when click will display the ff:
		1. Your code 
		1. Code Editor
		1. Username field
		1. Verify Code botton
		1. Refresh botton
		1. Timer
		1. Instuction box
1. Top 5 MVc 
	1. Will be displayed on the right panel
	2. Will dosplay the first top 5 players by rank
	3. Rank will be displayed in a descendong order
	








##  Technologies and Framework:
1. Database - utilizes Sequelize - a promise-based ORM for Node.js.

