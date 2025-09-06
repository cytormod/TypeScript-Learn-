// It is a static typing to JS. It doesn't do anything at runtime.
// It is purely there when you develop your code.

const bootupMessage: string = "Sahil";
console.log(bootupMessage);

//Type Inference

const supportAiPort: number = 3000;
console.log(`Starting server on port ${supportAiPort}...`);
console.log(`The type of supportAiPort is ${typeof supportAiPort}`);

// Type: ANY
// ANY: it can be anything, it is kind of useless type because it doesn't narrow anything down at all.
