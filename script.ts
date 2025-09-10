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

// Unions: When a value coud be one of several types. One really cool thing about TS is that conditional checks actually change the type of a variable. This is called "Type Narrowing".

function safeSquare(id: string | number): number{
    if (typeof id === "string") {
        id = parseInt(id, 10);
    }
    // Now id is only a number
    return id * id
}

// If it's union than it's good to narrow it down.
function getTicketInfo(id: string| number) {
    if (typeof id === 'string') {
        id.toLowerCase() // You cannot do this for number, that's why we have narrow it down to the string

        const parsedID = id.split("-")[1]
        const numberId = parseInt(parsedID)
        return `processing ticket: ${numberId}`
    }
    return `Processing ticket: ${id}`
}

// Optional Parameters: You can specify function parameters as optional with a (?) after the name:

//Optional Paramters has to be at the end of the function
function calculateApiCost(numReqs:number, tier?: string) {
    // double == null checks if it's null or undefined
    
    if (tier === 'pro'){
        return numReqs * .05
    }

    if (tier === "enterprise") {
        return numReqs * .03;
    }

    return numReqs * .1
}

// Default Parameters
function estimateResponseTime(promptLength: number = 100, modelType: string = 'text') {
    
    let baseNumber = 0;
    let rateNumber = 0;
    
    if (modelType === "text") {
        baseNumber = 2;
        rateNumber = 0.1;
        // return 2 + 0.1 * promptLength;
    } else if (modelType === "image") {
        baseNumber = 5;
        rateNumber = 0.02
    } else if (modelType === "code") {
        baseNumber = 3;
        rateNumber = 0.05;
    }

    return Math.round(baseNumber + rateNumber * promptLength)

}

// Literal Types: Specific type with specific values
// A function that takes one of 3 specific string values as an argument.

// Value Unions

export type Priority = "low" | "medium" | "high" | "critical";

export function setPriority(level : Priority) {
    switch (level) {
        case "low":
            return 0
        case "medium":
            return 1
        case "high":
            return 2
        case "critical":
            return 3
        default:
            return 0
    }
}

// Super Set Unions
// Take some set of literal values and add them on more values, so that we can have a set-up values as well as any values that falls in a specific value range.

export type EmploymentStatus = "employed" | "unemployed" | "student" | string

updateEmploymentStatus("employed");

export function updateEmploymentStatus(status: EmploymentStatus) {
    return `Employment status updated: ${status}`;
}

type LogLevel = "info" | "warn" | "error";
type LogSourceType = "api" | "database" | "auth";
type LogMessage = `${LogLevel}: ${string | number }`
type Logsource = `${LogSourceType}_${number}`;

export function createLogEntry(message: LogMessage, source:LogSourceType) {
    return `[${source}] Log - ${message}`;
}

//Arrays
export function averageScore (ratings: number[]) {
    if (ratings.length === 0) return 0;
    return ratings.reduce((rating, sum) => {
        return rating + sum;
    }, 0) / ratings.length;
}

 // Another Options for mentioning Array
//  Array <string>

//Heterogenous Arrays
function interpolateComment(id: number, comment: string, comments: (string | number)[],
) {
    const index = comments.findIndex(c => c === id)
    if (index === -1) return
    comments[index] = comment
}

// Rest Parameters : Here for rest parameters in TS we need to make sure that rest parameter here that we always denote that it's going to be an array, because it's always takes in an array of values and it can be of any length between 0 and infinity essentially.

function formatLabels(...labels: string[]) {
    if (labels.length === 0) return "No labels"
    if (labels.length === 1) return `Label: ${labels[0]}`
    return `Labels: ${labels.join(", ")}`
}

// Any Type in Array: Arrays can have any values of we so not specifies anything there.

function collectSupportData(id: number, resolved: boolean): [string, number, boolean]{
    const supportData: [string, number, boolean]= [
        'Support session started',
        id,
        resolved
    ];
    return supportData;
}

//Object Literal Types

type a = {
    name: string
}

type Mail = {
    from: string;
    to: string[];
    cc?: string[];//Optional Property
    subject: string;
    body: string;
    urgent: boolean;
}

function processMail(mail: Mail) {
    return `FROM: ${mail.from}
    TO: ${mail.to.join(", ")};
    CC: ${mail.cc?.join(",")}
    SUBJECT: ${mail.urgent ? "[URGENT] " : ""}${mail.subject}
    BODY: ${mail.body}`
}

// Empty Object Type: Everything in TS and JS is an Obect behind the scene except the null and undefined

// ! Example
// let a: Mail = {
//     //So here a is a mail type
// }

type Address = {
    name: string
    domain: string
}

//Discriminated Unions: It is based on the larger types like Objects. These Objects are going to have a single property that is difference between each of different types

type MultipeChouseLesson = {
    kind: "multiple-choice"; //Discriminant property
    question: string;
    studentAnswer: string;
    correctAnswer: string;
};

type CodingLesson = {
    kind: "coding"; // Discriminant property
    studentCode: string;
    solutionCode: string;
};

type Lesson = MultipeChouseLesson | CodingLesson;

function isCorrect(lesson: Lesson): boolean {
    switch (lesson.kind) {
        case "multiple-choice":
            return lesson.studentAnswer === lesson.correctAnswer;
        case "coding":
            return lesson.studentCode === lesson.solutionCode;
    }
}

// 2
// type Loading = { status: "loading"}
// type Error = { status: "error", error: number}
// type Sucess = { status: "status", data: string }

type InternalAddress = {
    kind: "internal",
    firstName: string
    lastName: string
}

type ExternalAddress = {
    kind: 'external',
    username: string
    domain: string
}

type Addresss = InternalAddress | ExternalAddress;

function formatAddresses(addresses: Addresss[]) {
    let formatted = "";
    for (const address of addresses) {
        if (address.kind === "internal"){
            formatted += `${address.firstName}.${address.lastName}@successed,`
        }
        if (address.kind === "external") {
            formatted += `${address.username}@${address.domain}, `;
        }
    }
    return formatted.slice(0, -2);
}

//! Sets

function findNumUniqueLabels(formattedAddresses: string[]) {
    const set = new Set(formattedAddresses)
    return set.size;
}
const set = new Set<string>();
set.add('a');

// Maps
function getfileLength(files: Map<string, string>, filename) {
    const file = files.get(filename)
    if (file == null) return 0
    return new TextEncoder().encode(file).length;

}

const map = new Map<string, number>()

// Dynamic Keys: It allows me to use dymnamic keys which can have a specific type and values

const TWO_FACTOR = Symbol("twoFactor");
const BIOMETRIC_LOCK = Symbol("biometricLock");

type MailPreferences = {
    [key: string]: string | boolean;
    doNotDisturb: boolean;
    outOfOffice: boolean;
    [TWO_FACTOR]: boolean;
    [BIOMETRIC_LOCK]: boolean;
};

function isSecure(preferences: MailPreferences) {
    return preferences[TWO_FACTOR] || preferences[BIOMETRIC_LOCK];
}

// A Record inside of a TS is essentially just an object that's what it is defined, and we can specify two properties inside of it. One is key and the other is value.
type MailPreferences2 = Record<string, boolean>;

type MailPreferences3 = {
    [key: PropertyKey]: boolean | string;
    readonly doNotdisturb: boolean;
    readonly outOfOffice: boolean;
};

// const a: MailPreferences = {
//     sjsjsj: true,
// }

function setPreference(
    preferences: MailPreferences,
    key: string,
    value: boolean,
) {
    const exists = key in preferences;
    preferences[key] = value;
    return exists;
}

// Dynamic Default properties: Values that arq 100% required and then everything is dynamic

function canContact(preferences: MailPreferences): boolean{
    return !(preferences.doNotDisturb || preferences.outOfOffice)
}

// REadOnly Modifier: Check MailPreferences3

// AsConst adn Object.freeze property: it allows you to take something that would normally be a generic type and say that it is a very specific type that have a specific values in it.

const defaultPreferences =  {
    name: "Sahil",
    doNotdisturb: false,
    outOfOffice: false,
} as const;

//Object.freeze: It is kind of Similar to |"as const"| in simple term Object.freeze say that Object is immutable at least at the top-level, but not on the nesting.

// Satisfies: It deals a lot with Object types as well as const type:
// ! Example

type A = {name: string}
const a = {name: "Sahil"} as const satisfies A;
// Here in the above example we are using satisfies keyword, so that we can make the const a constant or read-only property.

const aa: A = {name: "Sahil"} as const
// Here in the above example if I write like this it affects the type of aa from read-only to string

//fuunction overloads: Multiple different definitions for the same function with different parameters that you can pass along.

