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

//Function: Type script is so fine while using the function, because of type safety.

function calculateTotal(price: number,
    quantity: number,
    discount: number,): number {
        return price * quantity * (1-discount);
}

//Inferred Retrun Types
function combinePrompts(systemPrompt: string, userPrompt: string) {
    return `${systemPrompt}\n${userPrompt}`
}

//Void: Specifically return absolutely nothing. not even undefined(which creates confusion sometimes)

function logSystemEvent(event: string, severity: "info" | "warning" | "error") {
    return `SYSTEM ${severity.toUpperCase()}: ${event}`;    
} 

// Function Types
//(a: number, b: boolean): => number

//Type Allias: Variable that stores TYPE INFORMATION, specifiaclly to use only in typeScript, these don;t exist in JS

// type LoggerCAllback = (s1:string, s2: string) = string;

type SupportResponse = (name: string) => string;
// JS doesn't know what's this SupportResponse variable is.

function greetCustomer(name: string){
    return `Hello ${name}, welcome to support.ai! How can I assist you?`;
}

function farewellCustomer(name: string){
    return `Goodbye ${name}, have a great day!`;
}

// /Importing Types: Imprting types with the import type syntax reduces bundle size.

//? import type { User, Post } from "./models";

// Unions

