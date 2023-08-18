// #1
const localize = (string, ...values) => {
    const word = values[0]
    return translations[language][word]
}

const translations = {
    en: {
        greet: "Hello",
        intro: "Welcome to our website"
    },
    fr: {
        greet: "Bonjour",
        intro: "Bienvenue sur notre site web"
    }
};

const language = "fr"; // Change to "en" for English  
const greeting = "greet";
const introduction = "intro";

const localizedGreeting = localize`${greeting}`;
const localizedIntroduction = localize`${introduction}`;

// console.log(localizedGreeting); // Expected: "Bonjour" (for language "fr")  
// console.log(localizedIntroduction); // Expected: "Bienvenue sur notre site web" (for language "fr")


// #2
const highlightKeywords = (string, ...values) => {
    let myValues = values[0]
    for (let i = 0; i < myValues.length; i++) {
        let itemToSearch = `\${${i}}`;
        let itemToReplace = `<span class='highlight'>${myValues[i]}</span>`
        string = string.replace(itemToSearch, itemToReplace)
    }
    return string
}

const keywords = ["JavaScript", "template", "tagged"];
const template = "Learn \${0} tagged templates to create custom \${1} literals for \${2} manipulation.";

const highlighted = highlightKeywords(template, keywords);

// console.log(highlighted);
// Expected: "Learn <span class='highlight'>JavaScript</span> tagged templates to create custom <span class='highlight'>template</span> literals for <span class='highlight'>tagged</span> manipulation."


// #3
const multiline = (string, ...values) => {
    let myString = string.toString().split("\n")
    let res = ``;
    for (let i = 1; i < myString.length - 1; i++) {
        res += `${i} ${myString[i]}\n`
    }
    return res.trim()
}

const code = multiline`  
function add(a, b) {  
return a + b;  
}  
`;

console.log(code);
// Expected:  
// "1 function add(a, b) {  
// 2 return a + b;  
// 3 }"


// #4
const debounce = (func, delay) => {
    let timeout;

    return function(...args) {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
            func(...args)
        }, delay);
    }
}

function debouncedSearch(query) {
    // Perform search operation with the query  
    console.log("Searching for:", query);
}

const debouncedSearchHandler = debounce(debouncedSearch, 1000);

const inputElement = document.getElementById("search-input");
inputElement.addEventListener("input", event => {
    debouncedSearchHandler(event.target.value);
});


// #5
const throttle = (func, interval) => {

}
