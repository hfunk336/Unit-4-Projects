"use strict";

/*
   New Perspectives on HTML5, CSS3, and JavaScript 6th Edition
   Tutorial 11
   Case Problem 4

   Wordsearch Game Script
   
   Filename: kg_search.js
   Author: Pete Burnham
   Date:   2018-03-01
   
   
   Global Variables
   
   allCells
      References all of the cells in the word search table
      
   found
      Stores a Boolean value indicating whether the currently
      selected letters represents a word in the word search list.
   
   Function List
   
   function drawWordSearch(letters, words)
      Returns the HTML code for a word search table based on the entries
      in the letters array and the location of the words
      in the words array
      
   showList(list)
      Returns the HTML for code for an unordered list of words based
      on the items in the list array

*/

var allCells;
var found = false;

window.onload = init;

function init() {
   document.querySelectorAll("aside h1")[0].innerHTML = wordSearchTitle;
   // selects all the aside h1 tags in the html
   document.getElementById("wordTable").innerHTML = drawWordSearch(letterGrid, wordGrid);
   // creates the wordsearch inside the tag with the id wordTable 
   document.getElementById("wordList").innerHTML = showList(wordArray);
   // creates the word list inside the tag with the id wordList
   
   allCells = document.querySelectorAll("table#wordSearchTable td");
   // var allCells is equal to all the td's in the table with the id wordSearchTable
   
   for (var i = 0; i < allCells.length; i++) {
      allCells[i].style.cursor = "pointer";
      // changes the cursor to pointer when over one of the cells
      allCells[i].addEventListener("mousedown", startRecording);
      // adds an event listener for when you press the mouse down
   }
   
   document.getElementById("wordSearchTable").onmouseup = function() {
      stopRecording();
      var wordList = document.querySelectorAll("ul#wordSearchList li");
      // var wordList becomes all the list items in the word search list
      var solved = true;
      for (var i = 0; i < wordList.length; i++) {
         if (wordList[i].style.textDecoration !== "line-through") {
            solved = false;
            break;
            // checks to see if the word is correct
         }
      }
      if (solved) {
         alert("You solved the puzzle!");
      }
   };
   
   document.getElementById("showSolution").onclick = function() {
      for (var i = 0; i < allCells.length; i++) {
         if (allCells[i].className === "wordCell") {
            allCells[i].style.backgroundColor = "rgb(191, 191, 255)";
            // changes the color of the cell when you click
         }
      }
   };

}

function startRecording(e) {
   // starts when the user tries to highlight words in the puzzle
   document.getElementById("pickedLetters").value += e.target.textContent;
   if (e.target.style.backgroundColor !== "rgb(28, 255, 132)") {
      // only works if its not the color above
      e.target.style.backgroundColor = "rgb(255, 197, 153)";
   }
   for (var i = 0; i < allCells.length; i++) {
      allCells[i].addEventListener("mouseenter", continueRecording);
   }
   e.preventDefault();
   // stops the window from highlighting the letters normally
}

function continueRecording(e) {
   if (e.target.style.backgroundColor !== "rgb(28, 255, 132)") {
      // only works when it isn't the color above
      e.target.style.backgroundColor = "rgb(255, 197, 153)";
   }
   document.getElementById("pickedLetters").value += e.target.textContent;
}

function stopRecording() {
   for (var i = 0; i < allCells.length; i++) {
      allCells[i].removeEventListener("mouseenter", continueRecording);
   }
   checkLetters();
   // stops highlighting and check for a word
}
  

function checkLetters() {
   var currentLetters = document.getElementById("pickedLetters").value;
   var wordList = document.querySelectorAll("ul#wordSearchList li");
   for (var i = 0; i < wordList.length; i++) {
      if (currentLetters === wordList[i].textContent) {
         wordList[i].style.textDecoration = "line-through";
         wordList[i].style.color = "rgb(191, 191, 191)";
         found = true;
      }
   }
   // changes the background color and strikes through it if true
   for (var i = 0; i < allCells.length; i++) {
      if (allCells[i].style.backgroundColor !== "rgb(28, 255, 132)") {
         if (allCells[i].style.backgroundColor === "rgb(255, 197, 153)" && found) {
            allCells[i].style.backgroundColor = "rgb(28, 255, 132)";
         } else {
            allCells[i].style.backgroundColor = "";
         }
      }
   }
   document.getElementById("pickedLetters").value = "";
   found = false;
   // returns false if it is not true
}



/*============================================================*/

function drawWordSearch(letters, words) {
   var rowSize = letters.length;
   var colSize = letters[0].length;

   var htmlCode = "<table id='wordSearchTable'>";
   htmlCode += "<caption>Word Search</caption>";

   for (var i = 0; i < rowSize; i++) {
      htmlCode += "<tr>";

      for (var j = 0; j < colSize; j++) {
         if (words[i][j] == " ") {
            htmlCode += "<td>";
         } else {
            htmlCode += "<td class='wordCell'>";
         }
         htmlCode += letters[i][j];
         htmlCode += "</td>";
      }

      htmlCode += "</tr>";
   }
   htmlCode += "</table>";

   return htmlCode;
}

function showList(list) {
   var htmlCode = "<ul id='wordSearchList'>";

   for (var i = 0; i < list.length; i++) {
      htmlCode += "<li>" + list[i] + "</li>";
   }

   htmlCode += "</ul>";

   return htmlCode;
}
