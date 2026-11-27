
const { GoogleGenAI } = require("@google/genai")
const ai = new GoogleGenAI({
  httpOptions:{timeout:60000} // server doesnt have to wait for long time
});


// Define the Same Schema Letter Model expects
const letterSchema = {

      type: "OBJECT",
      properties: {
        readable: { type: "BOOLEAN" }, // for blury or if it isnt correct letter type
        title: { type: "STRING" },
        sender: { type: "STRING" },
        urgency: { 
            type: "STRING",
            enum : ["urgent", "soon","no-rush"],
        },
        category: { 
        type: "STRING",
         enum : ["benefits","health","immigration","housing","school","other"] , 

        },
        deadline: { type: "STRING" , nullable:true},
        deadlineNote: { type: "STRING", nullable: true },
        summary: { type: "STRING" },
        consequence: { type: "STRING" },
        steps: { 
        type: "ARRAY", // [{},{},{}]
        items:{ // each items in the list
        type:"OBJECT" ,
        properties: { // fields of the object
        text: { type: "STRING"},
  
        },
        required:["text"]
    }
        },
      keyTerms: {
      type: "ARRAY",
      items:{
      type:"OBJECT" , 
      properties: {
      term: { type: "STRING" },
      meaning: { type: "STRING"}
        },
        required:["term","meaning"]
      }
     
      }
      },
      required: ["title","readable", "sender" , "deadline", "deadlineNote",  "urgency", "category","summary","consequence","steps","keyTerms"],
    }



// detailed prompt matching schema 
function buildPrompt(lang,todaysDate){
 const languages = { en: "English", am: "Amharic", es: "Spanish" };
 return `
Today's date is ${todaysDate}
You are an assistant that helps immigrants and people with limited English
understand official letters (government, healthcare, housing, school, benefits).
Write the explanation in ${languages[lang] || "English"}.
Read the attached document and extract the information below as JSON that
matches the provided schema exactly. Do not add fields or any text outside the JSON.

Fields:
- title: Short plain-language title of the letter (max 8 words), e.g. "Food stamp renewal notice".
- sender: The organization or agency that sent the letter, e.g. "Department of Housing".
- urgency: One of:
    "urgent"  - deadline within 7 days, past due, or serious penalty (loss of benefits, eviction, legal action).
    "soon"    - action needed within about 2-4 weeks.
    "no-rush" - informational, or no action or deadline required.
- category: One of "benefits", "health", "immigration", "housing", "school", "other".
- deadline: The date the reader must act by, in ISO 8601 format (YYYY-MM-DD).
    Use null if the letter has no deadline. Never guess or invent a date.
- deadlineNote: Short explanation of the deadline in plain words
    (e.g. "Reply within 30 days of the notice date"). Use null if there is none.
- summary: 2-3 sentences in simple language (about a 6th-grade reading level)
    explaining what the letter is and what it means for the reader.
- consequence: What happens if the reader does nothing or misses the deadline.
    If the letter does not say, state "The letter does not mention a consequence."
- steps: Ordered list of concrete actions the reader should take. Each item is an
    object { "text": "<one short action starting with a verb>"}.
  If no action is needed, return one step
    such as "No action needed. Keep this letter for your records."
- keyTerms: Up to 6 difficult words, legal terms or acronyms found in the letter.
    Each item is { "term": "<term as written>", "meaning": "<plain-language definition>" }.
- readable: true or false, as described in the rules

Rules:
- Use only information that is in the document. If something is missing, use null
  (for optional fields) rather than guessing.
- if writing in Amharic, keep the names of organization,programs
- Write summary, consequence, steps and keyTerms meanings in simple, clear,
  non-technical language.
- Never include case numbers, receipt numbers, Social Security numbers, A-numbers, account or member ID numbers, dates of birth, home addresses, or the recipient's name.
- Set "readable" to false if the image is blurry or cut off, the text cannot be
  read, or the document is not a letter (for example a photo of a person, a
  menu, a receipt or a blank page).
- When "readable" is false, still fill every required field with a placeholder
  ("" for text, [] for lists, "other" for category, "no-rush" for urgency).
  Do not invent content.
`
}

// turn a file and langugae to structured Schema that resembles our Letter Model
async function analyzeLetter(file,lang){

   // call gemini with model and contents  
   const generateOutput = await ai.models.generateContent({
    model: "gemini-3.8-flash",
     contents: [
      {inlineData: {
      data :  file.buffer.toString("base64") , // convert it to base 64 format
      mimeType: file.mimetype} 
    } , 
    { text : buildPrompt(lang,new Date().toISOString().slice(0,10))} ,  // date format as 2026-11-27 , 
      ] ,
      config : {
        responseMimeType : "application/json", // confirms to json schema
        responseSchema: letterSchema // gemini structures the output in Letter Schema
      }
   })

   return JSON.parse(generateOutput.text) // string to js object 

  
   
}
module.exports = {analyzeLetter}