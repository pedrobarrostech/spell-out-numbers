class DigitsToWord {

    constructor(n){ 
        this._digit = n;
    }

    underTwenty(number) {
        this._oneToNineteen = [' ', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
        return this._oneToNineteen[number];
    }
    underHundred(number) {
       this._tens = [' ', 'ten', 'twenty-', 'thirty-', 'forty-', 'fifty-', 'sixty-', 'seventy-', 'eighty-', 'ninety-'];
       return this._tens[number];
    }
    singleDigit(number) {
        this._ones = [' ', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
        return this._ones[number];
    } 
    
  
    digitsToWord(number) {
        return {
           myNumber : this.number,
            onlyDigits :  function(myNumber){  
                if (typeof myNumber === 'string') {
                    const exp = /[^\d]/ig;
                    myNumber = myNumber.replace(exp,"");
                }
                if (myNumber !== "") {
                    return myNumber;
                } else {
                    return new Error("Sorry, please enter at least one digit.");
                }

            },
            noDecimals : function (myNumber){
                if (Math.floor(myNumber) === 0) { 
                    return new Error("Sorry, number too small.");
                } else {
                    myNumber = Math.floor(myNumber);
                    return myNumber;
                }
            },
            //HEY DELIMITERS HERE
            noDecimalsString : function (myNumber){
                myNumber = myNumber.split(".", 1);
                if (myNumber[0] !== "") {
                    return myNumber[0];
                } else {
                    return new Error("Sorry, number too small.");
                }
                
            }
        }
    }

    // this function does the checking for non-digits and too-big numbers
    // this totally needs some refactoring, probably a case statement or split it out into separate functions
    checkTypeAndLength(input) {
        if ((typeof (input) == 'number') && input >= 9007199254740992) { 
            return new Error("Sorry, number too big. Blame Javascript!");   
        } else if (typeof (input) == 'number'){
            return (this.digitsToWord().noDecimals(input).toString);
        } else if (typeof (input) == 'string') {
            const tempNum = this.digitsToWord().noDecimalsString(input);
            if (tempNum instanceof Error) {
                return (tempNum);
            } else if ((this.digitsToWord().onlyDigits(tempNum).length > 16)) {
                return new Error("Sorry, I can't count that high!")
            } else {
                return(this.digitsToWord().onlyDigits(tempNum));
            } 
            }
        }


        
    //turn number into an array
    arrayify(input) {
        let stringNum;
        if (typeof (input) == 'string'){
            stringNum = input;
        }
        else {
            stringNum = input.toString();
        }
        const arrayOfNums = stringNum.split("");
        const length = arrayOfNums.length;
        for(let i=0; i<length; i++) { arrayOfNums[i] = +arrayOfNums[i]; }
        return arrayOfNums;
    }


    // the main function that creates the array of words from number input
    spellItOut(number) {
        // is if numeric
        if(!((number - 0) == number && (''+number).trim().length > 0)) return false;

        this._powers = ['', 'hundred', ' thousand,', ' million,', ' billion,', ' trillion,', ' quadrillion,', ' quintillion,', ' sextillion,'];
        
      
        const spelledNums = [];
        let spelledArray = [];
        const tempNums = [];
      
        const arrayOfNums = this.arrayify(number);
        console.log(arrayOfNums);
        let myLength = arrayOfNums.length;
    
        while (myLength > 0) {
            tempNums.push(arrayOfNums.splice(-3, 3));
            myLength = (myLength - 3);
        }

        const tempNumlength = tempNums.length;  
        
        for(let i=0; i<tempNumlength; i++) {
            
            const miniArray = tempNums[i].reverse();
           
            if ((miniArray[1] === 1)) {
                    const teenNum = (miniArray[1]).toString() + (miniArray[0]).toString();
                    if (i === 0) {
                        spelledNums.push(this.underTwenty(+teenNum));
                    } else {
                        spelledNums.push(this.underTwenty(+teenNum) + this._powers[i+1]);
                    }    
                   
                     spelledNums.push(' ');
                    
                     if (miniArray[2]) {
                         spelledNums.push(this.singleDigit(miniArray[2]) + ' hundred and');
                     }
                     else {
                     spelledNums.push(' ');
                 }
            }
           
            else { 
                if (miniArray[0] >= 0){
                    if (i === 0) {
                        spelledNums.push(this.underTwenty(miniArray[0]));
                    } else {
                        spelledNums.push(this.underTwenty(miniArray[0]) + this._powers[i+1]);
                    }
                }
                if ((miniArray[1]) !== undefined){
                    spelledNums.push(this.underHundred(miniArray[1]));
                } 
                else {
                    spelledNums.push(' ');
                } 
                if (miniArray[2]){
                    spelledNums.push(this.singleDigit(miniArray[2]) + ' hundred and');       
                }
                else {
                    spelledNums.push(' ');
                }
            }
        }
        
        spelledArray = spelledNums.reverse();
        return(spelledArray);

    }

    //take the spellItOut array, and clean up extraneous elements
    phrasify(myNumber) {    
        function isNotEmpty(element) {
          return element !== " ";
        }

        let arrayNum = [];
        arrayNum = myNumber;
        const phrasifiedNums = arrayNum.filter(isNotEmpty);
        const numPhrase = phrasifiedNums.join(" ");
        const noSpaces = numPhrase.replace(/  /, " ");
        const fixHyphens = noSpaces.replace(/- /gi, "-");
        const fixTerminalHyphens = fixHyphens.replace(/- /gi, " ");
        const extraneousAnds = fixTerminalHyphens.replace(/and$/, "");
        const finalPhrase = extraneousAnds;
        return finalPhrase;
    }

    // let's treat zero as a special case
    checkZero(number) {
        const newNumber = parseInt(number, 10);
        if (newNumber === 0) {
            return ['zero']; 
        }
        else {
            return number;
        }
    }

    // let's check for negative numbers
    checkNegative(number) {
        const negExpr = /^-/;
        if (negExpr.test(number)) {
            return('negative '); 
        }
        else {
            return('');
        }
    }

    finalFunction(number) {
        
        const cleanNumber = this.checkTypeAndLength(number);
        if (cleanNumber instanceof Error) {
            return (cleanNumber);
        }
    
        const negative = this.checkNegative(number);
        
        if (this.checkZero(cleanNumber) == 'zero') {
            return ('zero');
        } else {
            
            let noZeros = this.checkZero(cleanNumber);
            console.log(noZeros);
            const wordArray = this.spellItOut(noZeros);
            console.log(wordArray);
            const phrasedResult = this.phrasify(wordArray);
            const finalOutput = negative + phrasedResult;
            return (finalOutput);
        }
        
    }

}

export default DigitsToWord;