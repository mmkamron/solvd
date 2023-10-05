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

    const stack = []
    let current = null

    // throw a syntax error if json is empty or contains invalid data and 
    if (!tokens || tokens.length < 1) {
        throw new SyntaxError('invalid JSON');
    }

    for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i]

        switch (token) {
            case "{":
                const obj = {};

                if (current !== null) {
                    stack[stack.length - 1][current] = obj;
                    current = null;
                } else if (Array.isArray(stack[stack.length - 1])) {
                    stack[stack.length - 1].push(obj);
                }
                stack.push(obj);
                continue;

            case "}":
                if (stack.length === 1) {
                    // return final object that represents entire JSON
                    return stack[0];
                } else {
                    stack.pop();
                }
                continue;

            case "[":
                const array = [];
                if (current !== null) {
                    stack[stack.length - 1][current] = array;
                    current = null;
                } else if (Array.isArray(stack[stack.length - 1])) {
                    stack[stack.length - 1].push(array);
                }
                stack.push(array);
                continue;

            case "]":
                if (stack.length === 1) {
                    return stack[0];
                } else {
                    stack.pop();
                }
                continue;

            case ",":
                continue;
        }
        if (token.charAt(0) === '"') {
            const string = token.slice(1, -1)
            if (current === null && tokens[i - 1].match(/^[\{\,]/) && !Array.isArray(stack[stack.length - 1])) {
                current = string
                i++
                continue
            }
        }
        if (stack.length > 0) {
            if (Array.isArray(stack[stack.length - 1])) {
                stack[stack.length - 1].push(parseToken(token))
                continue
            } else if (current) {
                stack[stack.length - 1][current] = parseToken(token)
                current = null
                continue
            }
        }
        if (tokens.length === 1) {
            return parseToken(token);
        }
        throw new Error('Nothing catch the token, token: ' + token);
    }
}


const parseToken = (token) => {
    // if token starts with digits (optionally negative and/or float) return an integer/float
    if (token.match(/^(-?\d+)$/)) {
        return parseInt(token);
    }
    else if (token.match(/-?\d+(\.\d+)$/)) {
        return parseFloat(token);
    } else if (token.charAt(0) === '"') {
        let str = token.slice(1, -1);
        return str;
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
