'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DigitsToWord = function () {
    function DigitsToWord(n) {
        _classCallCheck(this, DigitsToWord);

        this._digit = n;
    }

    _createClass(DigitsToWord, [{
        key: 'underTwenty',
        value: function underTwenty(number) {
            this._oneToNineteen = [' ', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
            return this._oneToNineteen[number];
        }
    }, {
        key: 'underHundred',
        value: function underHundred(number) {
            this._tens = [' ', 'ten', 'twenty-', 'thirty-', 'forty-', 'fifty-', 'sixty-', 'seventy-', 'eighty-', 'ninety-'];
            return this._tens[number];
        }
    }, {
        key: 'singleDigit',
        value: function singleDigit(number) {
            this._ones = [' ', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
            return this._ones[number];
        }
    }, {
        key: 'digitsToWord',
        value: function digitsToWord(number) {
            return {
                myNumber: this.number,
                onlyDigits: function onlyDigits(myNumber) {
                    if (typeof myNumber === 'string') {
                        var exp = /[^\d]/ig;
                        myNumber = myNumber.replace(exp, "");
                    }
                    if (myNumber !== "") {
                        return myNumber;
                    } else {
                        return new Error("Sorry, please enter at least one digit.");
                    }
                },
                noDecimals: function noDecimals(myNumber) {
                    if (Math.floor(myNumber) === 0) {
                        return new Error("Sorry, number too small.");
                    } else {
                        myNumber = Math.floor(myNumber);
                        return myNumber;
                    }
                },
                //HEY DELIMITERS HERE
                noDecimalsString: function noDecimalsString(myNumber) {
                    myNumber = myNumber.split(".", 1);
                    if (myNumber[0] !== "") {
                        return myNumber[0];
                    } else {
                        return new Error("Sorry, number too small.");
                    }
                }
            };
        }

        // this function does the checking for non-digits and too-big numbers
        // this totally needs some refactoring, probably a case statement or split it out into separate functions

    }, {
        key: 'checkTypeAndLength',
        value: function checkTypeAndLength(input) {
            if (typeof input == 'number' && input >= 9007199254740992) {
                return new Error("Sorry, number too big. Blame Javascript!");
            } else if (typeof input == 'number') {
                return this.digitsToWord().noDecimals(input).toString;
            } else if (typeof input == 'string') {
                var tempNum = this.digitsToWord().noDecimalsString(input);
                if (tempNum instanceof Error) {
                    return tempNum;
                } else if (this.digitsToWord().onlyDigits(tempNum).length > 16) {
                    return new Error("Sorry, I can't count that high!");
                } else {
                    return this.digitsToWord().onlyDigits(tempNum);
                }
            }
        }

        //turn number into an array

    }, {
        key: 'arrayify',
        value: function arrayify(input) {
            var stringNum;
            if (typeof input == 'string') {
                stringNum = input;
            } else {
                stringNum = input.toString();
            }
            var arrayOfNums = stringNum.split("");
            var length = arrayOfNums.length;
            for (var i = 0; i < length; i++) {
                arrayOfNums[i] = +arrayOfNums[i];
            }
            return arrayOfNums;
        }

        // the main function that creates the array of words from number input

    }, {
        key: 'spellItOut',
        value: function spellItOut(number) {
            // is if numeric
            if (!(number - 0 == number && ('' + number).trim().length > 0)) return false;

            this._powers = ['', 'hundred', ' thousand,', ' million,', ' billion,', ' trillion,', ' quadrillion,', ' quintillion,', ' sextillion,'];

            var spelledNums = [];
            var spelledArray = [];
            var tempNums = [];

            var arrayOfNums = this.arrayify(number);
            console.log(arrayOfNums);
            var myLength = arrayOfNums.length;

            while (myLength > 0) {
                tempNums.push(arrayOfNums.splice(-3, 3));
                myLength = myLength - 3;
            }

            var tempNumlength = tempNums.length;

            for (var i = 0; i < tempNumlength; i++) {

                var miniArray = tempNums[i].reverse();

                if (miniArray[1] === 1) {
                    var teenNum = miniArray[1].toString() + miniArray[0].toString();
                    if (i === 0) {
                        spelledNums.push(this.underTwenty(+teenNum));
                    } else {
                        spelledNums.push(this.underTwenty(+teenNum) + this._powers[i + 1]);
                    }

                    spelledNums.push(' ');

                    if (miniArray[2]) {
                        spelledNums.push(this.singleDigit(miniArray[2]) + ' hundred and');
                    } else {
                        spelledNums.push(' ');
                    }
                } else {
                    if (miniArray[0] >= 0) {
                        if (i === 0) {
                            spelledNums.push(this.underTwenty(miniArray[0]));
                        } else {
                            spelledNums.push(this.underTwenty(miniArray[0]) + this._powers[i + 1]);
                        }
                    }
                    if (miniArray[1] !== undefined) {
                        spelledNums.push(this.underHundred(miniArray[1]));
                    } else {
                        spelledNums.push(' ');
                    }
                    if (miniArray[2]) {
                        spelledNums.push(this.singleDigit(miniArray[2]) + ' hundred and');
                    } else {
                        spelledNums.push(' ');
                    }
                }
            }

            spelledArray = spelledNums.reverse();
            return spelledArray;
        }

        //take the spellItOut array, and clean up extraneous elements

    }, {
        key: 'phrasify',
        value: function phrasify(myNumber) {
            function isNotEmpty(element) {
                return element !== " ";
            }

            var arrayNum = [];
            arrayNum = myNumber;
            var phrasifiedNums = arrayNum.filter(isNotEmpty);
            var numPhrase = phrasifiedNums.join(" ");
            var noSpaces = numPhrase.replace(/  /, " ");
            var fixHyphens = noSpaces.replace(/- /gi, "-");
            var fixTerminalHyphens = fixHyphens.replace(/- /gi, " ");
            var extraneousAnds = fixTerminalHyphens.replace(/and$/, "");
            var finalPhrase = extraneousAnds;
            return finalPhrase;
        }

        // let's treat zero as a special case

    }, {
        key: 'checkZero',
        value: function checkZero(number) {
            var newNumber = parseInt(number, 10);
            if (newNumber === 0) {
                return ['zero'];
            } else {
                return number;
            }
        }

        // let's check for negative numbers

    }, {
        key: 'checkNegative',
        value: function checkNegative(number) {
            var negExpr = /^-/;
            if (negExpr.test(number)) {
                return 'negative ';
            } else {
                return '';
            }
        }
    }, {
        key: 'finalFunction',
        value: function finalFunction(number) {

            var cleanNumber = this.checkTypeAndLength(number);
            if (cleanNumber instanceof Error) {
                return cleanNumber;
            }

            var negative = this.checkNegative(number);

            if (this.checkZero(cleanNumber) == 'zero') {
                return 'zero';
            } else {

                var noZeros = this.checkZero(cleanNumber);
                console.log(noZeros);
                var wordArray = this.spellItOut(noZeros);
                console.log(wordArray);
                var phrasedResult = this.phrasify(wordArray);
                var finalOutput = negative + phrasedResult;
                return finalOutput;
            }
        }
    }]);

    return DigitsToWord;
}();

exports.default = DigitsToWord;