function myJSONParse(jsonString) {
    // divided regex into seperate parts for clarity and combined using RegExp object and source property
    const symbols = /{|}|\[|\]|,|:/;
    const booleans = /\btrue\b|\bfalse\b/;
    const nulls = /\bnull\b/;
    const strings = /"[^"]*"/;
    const numbers = /-?\d+(\.\d+)?/;
    const regex = new RegExp(`(${symbols.source})|(${booleans.source})|(${nulls.source})|(${strings.source})|(${numbers.source})`, 'g')

    // collected all json tokens
    const tokens = jsonString.match(regex);
    console.log('array of tokens:\n', tokens);

    // parse all tokens to construct an object
    function parse() {
        // throw a syntax error if json is empty or contains invalid data and 
        if (!tokens || tokens.length < 1) {
            throw new SyntaxError('invalid JSON');
        }
        // get first token
        const token = tokens.shift();
        if (token === undefined) {
            throw new SyntaxError('invalid JSON');
        }

        // if token begins with open curly brackets, create and return an object
        if (token === "{") {
            const obj = {};
            while (tokens[0] && tokens[0] !== "}") {
                // skip comma
                if (tokens[0] === ",") {
                    tokens.shift();
                }
                let element = tokens.shift();
                if (element) {
                    const key = element.slice(1, -1)
                    tokens.shift()
                    // parse recursively for nested objects and arrays
                    obj[key] = parse()
                }
                else {
                    throw new SyntaxError('element is undefined: ' + element);
                }
            }
            // remove closing curly bracket
            tokens.shift()
            return obj;
        }
        // if token begins with open brackets, create and return an array
        else if (token === "[") {
            const array = [];
            while (tokens[0] !== "]") {
                // skip comma
                if (tokens[0] === ",") {
                    tokens.shift();
                }
                // parse recursively for nested objects and arrays
                let element = parse();
                array.push(element);
            }
            // remove closing bracket
            tokens.shift();
            return array;
        }
        // if token begins with quotes, remove them and return the string
        else if (token.charAt(0) === '"') {
            const string = token.slice(1, -1);
            return string;
        }
        // if token starts with digits (optionally negative and/or float) return an integer/float
        else if (token.match(/^(-?\d+)$/)) {
            return parseInt(token);
        }
        else if (token.match(/-?\d+(\.\d+)$/)) {
            return parseFloat(token);
        }
        // if token equals boolean return respective boolean values
        else if (token === "true") {
            return true;
        }
        else if (token === "false") {
            return false;
        }
        else if (token === "null") {
            return null;
        }
        throw new SyntaxError('invalid JSON');
    }
    return parse();
}

const jsonString = `
{
  "name": "John Doe",
  "age": 25,
  "isStudent": true,
  "grades": [85, 90, 78],
  "address": {
    "street": "123 Main St",
    "city": "Exampleville",
    "zipCode": "12345"
  },
  "courses": [
    {
      "title": "Math",
      "credits": 4
    },
    {
      "title": "History",
      "credits": 3
    }
  ],
  "examScores": {
    "math": 92,
    "history": 88
  },
  "isGraduating": null
}
`
const jsonObject = myJSONParse(jsonString)
console.log('\nResult:\n', jsonObject)
// console.log(jsonObject.examScores.math)

/* Reflection: I have been using basic regex before this class for changing elements inside a text editor (vim).
 * But this time I learnt more about them and how it can be used to collect tokens and parse them.
 * I am sure there are a lot more features of regex that I should learn about which can be quite useful for unusual validation of inputs.
 * Also when it comes to parsing, I think this might be how compilers break down the source code into tokens and translate it to a machine code. This skill will help when I'll begin reading books about compilers and interpreters.*/
