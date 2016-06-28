# Spell out numbers

[![Build Status](https://travis-ci.org/pedrobarrostech/spell-out-numbers.png?branch=master)](https://travis-ci.org/pedrobarrostech/spell-out-numbers)
[![Coverage Status](https://img.shields.io/coveralls/pedrobarrostech/spell-out-numbers.svg)](https://coveralls.io/r/pedrobarrostech/spell-out-numbers?branch=master)


Introduction
===================

spell-out-numbers is a little npm module written in ES6 to help you spell out numbers in words.


* 97 = ninety-seven
* 95.99 = ninety-five (spell-out-numbers discards anything after the decimal point)
* 106 = one hundred and six
* 89,828,374,986 = eighty-nine billion, eight hundred and twenty-eight million, three hundred and seventy-four thousand, nine hundred and eighty-six
* 9,999,999,999,999,995 = nine quadrillion, nine hundred and ninety-nine trillion, nine hundred and ninety-nine billion, nine hundred and ninety-nine million, nine hundred and ninety-nine thousand, nine hundred and ninety-five

Assumptions
------------

spell-out-numbers expects string input but will try to deal with number input as well, up to but not including 9007199254740992, which is the biggest number Javascript will nicely turn into a string. 

spell-out-numbers currently handles numbers up to 16 digits long.


Installing
-------
```
npm install
```

Running
-------
```
gulp start
```


Testing
-------
Run tests with mocha. Tests are in the /test directory. 
```
gulp test
```

Dependencies?
---------------------------
Umpteen has no runtime dependencies. To run the tests, you'll need:

* mocha
* chai
* babel
* gulp
* express
* ejs
* materialize

For checking test coverage and getting that nice little badge at the top, I used:

* istabul
* coveralls
