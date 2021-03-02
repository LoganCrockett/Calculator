/*
Created by: Logan Crockett
On: 8/11/20

Version: 1.0

I borrowed the algorithm for solving expressions from another project of mine: 
From evalInfix() Method of evaulator.java of guitar_hw3:
https://github.com/LoganCrockett/Java-Projects/blob/CPSC-3200-Algorithm-Analysis-and-Advanced-Data-Structures/guitar_hw3/Evaluator.java

Purpose: To provide the functions neccesary to use the calculator on calculator.html
*/

var expression;//The expression we are currently evaluating

/**
This function will initialize our expression variable when the document loads
*/
function init() {
  expression = "";//Set it to a blank string to begin with
  return;
}

/**
This Function will display the expression we have stored so far on the screen
*/
function displayExpression() {
  document.getElementById('result').innerHTML = expression;
  return;
}

//Number Input Buttons

function nine() {
  expression += "9";
  //console.log(expression);//For Debugging Purposes
  //Display the expression now that we updated it
  displayExpression();
  return;
}

function eight() {
  expression += "8";
  //console.log(expression);//For Debugging Purposes
  //Display the expression now that we updated it
  displayExpression();
  return;
}

function seven() {
  expression += "7";
  //console.log(expression);//For Debugging Purposes
  //Display the expression now that we updated it
  displayExpression();
  return;
}

function six() {
  expression += "6";
  //console.log(expression);//For Debugging Purposes
  //Display the expression now that we updated it
  displayExpression();
  return;
}

function five() {
  expression += "5";
  //console.log(expression);//For Debugging Purposes
  //Display the expression now that we updated it
  displayExpression();
  return;
}

function four() {
  expression += "4";
  //console.log(expression);//For Debugging Purposes
  //Display the expression now that we updated it
  displayExpression();
  return;
}

function three() {
  expression += "3";
  //console.log(expression);//For Debugging Purposes
  //Display the expression now that we updated it
  displayExpression();
  return;
}

function two() {
  expression += "2";
  //console.log(expression);//For Debugging Purposes
  //Display the expression now that we updated it
  displayExpression();
  return;
}

function one() {
  expression += "1";
  //console.log(expression);//For Debugging Purposes
  //Display the expression now that we updated it
  displayExpression();
  return;
}

function zero() {
  expression += "0";
  //console.log(expression);//For Debugging Purposes
  //Display the expression now that we updated it
  displayExpression();
  return;
}

//Operator Input Buttons

/**
 * This function will update our expression back to a blank string, and update the output
 * in the calculator
 */
function clearExpression() {
  expression = "";//Re-initialize the expression
  
  //console.log(expression);//For Debugging Purposes
  
  //Now we must update the HTML to display a value
  document.getElementById('result').innerHTML = 0;
  return;
}
/**
This function checks if the is a value in the expression before
allowing the user to add an operator
@returns True if expression has a value; False If not
*/
function isValueBeforeOperator() {
  //If the expression hasn't been set, then we shouldn't add an operator yet
  if (expression === "") {
    return false;
  }
  //Otherwise, we can add an operator
  else {
    return true;
  }
}

function addPlus() {
  //If there is a value in the expression, we can safely add the '+' operator
  if (isValueBeforeOperator()) {
    expression += " + ";//We will add a white space on each side of the operator
    //Update the expression
    displayExpression();
  }
  //Otherwise, log that we could not add the operator
  else {
    console.log("Couldn't Add '+' Operator; No value in expression");
  }
  
  //consloe.log(expression);//For debugging purposes
  return;
}

function addMinus() {
  //If there is a value in the expression, we can safely add the '-' operator
  if (isValueBeforeOperator()) {
    expression += " - ";//We will add a white space on each side of the operator
    //Update the expression
    displayExpression();
  }
  //Otherwise, log that we could not add the operator
  else {
    console.log("Couldn't Add '-' Operator; No value in expression");
  }
  
  //consloe.log(expression);//For debugging purposes
  return;
}

function addMultiply() {
  //If there is a value in the expression, we can safely add the '*' operator
  if (isValueBeforeOperator()) {
    expression += " * ";//We will add a white space on each side of the operator
    //Update the expression
    displayExpression();
  }
  //Otherwise, log that we could not add the operator
  else {
    console.log("Couldn't Add '*' Operator; No value in expression");
  }
  
  //consloe.log(expression);//For debugging purposes
  return;
}

function addDivide() {
  //If there is a value in the expression, we can safely add the '/' operator
  if (isValueBeforeOperator()) {
    expression += " / ";//We will add a white space on each side of the operator
    //Update the expression
    displayExpression();
  }
  //Otherwise, log that we could not add the operator
  else {
    console.log("Couldn't Add '/' Operator; No value in expression");
  }
  
  //consloe.log(expression);//For debugging purposes
  return;
}

/**
This function will solve the expression inputted from the user and output it
*/
function solveExpression() {
  /*
  Break the expression into 'tokens'
  Now we can go through the array returned by it and solve the expression
  */
  var tokenizedExpression = expression.split(" ");
  
  //Split the values into two arrays: one for values, and one for operators
  var valueArray = [];
  var opArray = [];
  
  /*
  a, b: Two values from the valueArray
  currentOp: current operator of the opArray
  result: result of b op a
  */
  var a, b, currentOp, result;
  
  //Now go through our expression and put the values into the appropriate array
  for (var i = 0; i < tokenizedExpression.length; i++) {
    
    //If the index is even, then it is a number; Parse it as an int
    if (i % 2 === 0) {
      valueArray.push(parseInt(tokenizedExpression[i]));
    }
    //Otherwise, parse it as an operator
    else {
      /*
      We should ensure that the value on the opArray does not
      have a higher precendence than the current one.
      */
      if (getPrecedence(tokenizedExpression[i]) < getPrecedence(opArray[opArray.length-1])) {
        //If it is, then reduce the two arrays until the precedence is equal or lower
        while (opArray.length > 0 && getPrecedence(tokenizedExpression[i]) < getPrecedence(opArray[opArray.length-1])) {
          currentOp = opArray.pop();//Get an operator
          //Get two values: a and b
          a = valueArray.pop();
          b = valueArray.pop();

          //Check if we will be dividng by zero
          if (a === 0 && currentOp === '/') {
            //If so, then output a division by zero error
            
            //Start by reseting the expression with clearExpression()
            clearExpression();
            
            //Now Output the message
            document.getElementById('result').innerHTML = "Error: Cannot Divide By Zero";
            
            return;
          }
    
          //Result should be b op a
          result = doOperation(a,b,currentOp);
    
          //Put the result on the value array
          valueArray.push(result);
        }
        //When finished, put it on the opArray
        opArray.push(tokenizedExpression[i]);
      }
      //Otherwise, just put it onto the opArray
      else {
        opArray.push(tokenizedExpression[i]);
      }
    }
  }
  
  //Now we can go through and solve our expression
  while (opArray.length > 0) {
    console.log(valueArray);//For Debugging Purposes
    console.log(opArray);//For Debugging Purposes
     currentOp = opArray.pop();//Get an operator
    //Get two values: a and b
    a = valueArray.pop();
    b = valueArray.pop();
    
    //Check if we will be dividng by zero
    if (a === 0 && currentOp === '/') {
      //If so, then output a division by zero error
      
      //Start by reseting the expression with clearExpression()
      clearExpression();
      
      //Now Output the message
      document.getElementById('result').innerHTML = "Error: Cannot Divide By Zero";
      
      return;
    }
    
    //Result should be b op a
    result = doOperation(a,b,currentOp);
    
    //Put the result on the value array
    valueArray.push(result);
  }
  
  //Now there should only be one value on our valueArray
  //We will write it to our expression
  expression = valueArray.pop();
  
  //Now we will output it to the result
  document.getElementById('result').innerHTML = expression;
  
  //console.log(valueArray);//For Debugging Purposes
  //console.log(opArray);//For Debugging Purposes
  //console.log(tokenizedExpression);//For Debugging Purposes
  return;
}

/**
This function will perform an operation on two numbers, a and b
Format is: b op a
@returns The result of the operation on a and b
*/
function doOperation(a, b, op) {
  //Return the result of the operation based on which operator it is
  switch(op) {
    case '+': return b+a;
    case '-': return b-a;
    case '*': return b*a;
    case '/': return b/a;
  }
}

/**
This Function will take an operator and assign and integer as its precendence
over operators.

Usage:
*,/: 1
=,-: 0
*/
function getPrecedence(op) {
  //Return the precendence of the appropriate operator
  switch(op) {
    case '*': return 1;
    case '/': return 1;
    case '+': return 0;
    case '-': return 0;
  }
}