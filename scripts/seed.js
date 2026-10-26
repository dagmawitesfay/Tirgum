
const Letter = require("../models/Letter")
const mongoose = require("mongoose")
require("dotenv").config({ path: "config/.env" });

const letterData = [
    {
    title : "MassHealth Renewal" , 
    sender : "MassHealth" ,
    category :  "health",
    urgency : "urgent",
    deadline : "2026-10-08"  ,
    summary : "This letter is from MassHealth, your health insurance. They need you to renew your coverage. To keep your insurance, you must fill out the renewal form and send proof of income. If you don't respond by the deadline, your coverage may end." ,
    consequence : "If you miss it, your health coverage may stop" ,
   steps: [
      { text: "Find the renewal form included with this letter", done: true },
      { text: "Gather proof of income: recent pay stubs or an employer letter", done: false },
      { text: "Fill out and sign the form", done: false },
      { text: "Return it online, by mail, or in person before the deadline", done: false },
    ],
    keyTerms: [
      { term: "Renewal", meaning: "Confirming you still qualify for coverage" },
      { term: "Proof of income", meaning: "Documents showing how much you earn" },
      { term: "Coverage", meaning: "The health care your insurance pays for" },
    ] ,
     language : "en",

    } ,

    {
    title: "Work Permit Receipt Notice",
    sender: "USCIS",
    category: "immigration",
    urgency: "soon",
    deadline: "2026-11-13",
    summary:
      "This letter is from USCIS. It confirms they received your work permit application and your fee. It is not an approval. Keep this letter safe, because it has your receipt number. USCIS may ask you to come in to give your fingerprints and photo.",
    consequence: "If you miss your fingerprint appointment, your application may be delayed or denied.",
    steps: [
      { text: "Keep this letter in a safe place with your other documents", done: false },
      { text: "Watch your mail for a fingerprint appointment notice", done: false },
      { text: "Check your case status online using the receipt number", done: false },
    ],
    keyTerms: [
      { term: "Receipt notice", meaning: "A letter showing USCIS received your application" },
      { term: "Receipt number", meaning: "The code you use to check your case online" },
      { term: "Biometrics", meaning: "Your fingerprints and photo, taken at an appointment" },
    ],
    language: "en",
  },

   {
    title: "Lease Renewal Offer",
    sender: "Riverside Properties",
    category: "housing",
    urgency: "soon",
    deadline: "2026-11-26",
    summary:
      "This letter is from your landlord. They are offering to renew your lease for another year. The new rent will be a little higher. You need to tell them if you want to stay or move out before the deadline.",
    consequence: "If you don't reply, your landlord may not renew your lease.",
    steps: [
      { text: "Read the new rent amount and lease dates", done: true },
      { text: "Decide if you want to stay or move out", done: true },
      { text: "Sign and return the renewal form, or tell your landlord in writing", done: false },
    ],
    keyTerms: [
      { term: "Lease", meaning: "The agreement that lets you rent your home" },
      { term: "Renewal", meaning: "Continuing the lease for another period" },
    ],
    language: "en",
  },
    {
    title: "School Conference Reminder",
    sender: "Cambridge Public Schools",
    category: "school",
    urgency: "no-rush",
    deadline: null,
    deadlineNote: "Optional: reply by Oct 30 to pick a time.",
    summary:
      "This letter is from your child's school. It invites you to a parent-teacher conference to talk about your child's progress. You can choose a time that works for you. Interpreters are available if you ask.",
    consequence: "You may miss the chance to choose a conference time if you don't reply.",
    steps: [
      { text: "Reply to the school by Oct 30 to pick a time", done: true },
      { text: "Ask for an interpreter if you would like one", done: false },
    ],
    keyTerms: [
      {
        term: "Parent-teacher conference",
        meaning: "A short meeting with your child's teacher about how your child is doing",
      },
      {
        term: "Interpreter",
        meaning: "A person who repeats what is said in your language during the meeting",
      },
    ],
    language: "en",
  },

  {
    title: "Benefits Approval",
    sender: "Mass DTA",
    category: "benefits",
    urgency: "no-rush",
    deadline: null,
    summary:
      "This letter is from the Department of Transitional Assistance. Your food benefits (SNAP) were approved. Money will be added to your EBT card each month. You don't need to do anything right now.",
    consequence: "No action is needed right now; keep the letter for your records.",
    steps: [
      { text: "Check that your EBT card arrived", done: true },
      { text: "Set a PIN for your EBT card", done: true },
      { text: "Save this letter for your records", done: true },
    ],
    keyTerms: [
      { term: "SNAP", meaning: "A program that helps pay for food" },
      { term: "EBT card", meaning: "A card like a debit card that holds your benefits" },
    ],
    language: "en",
  },

] ;

async function connectingSeedData(){
    try{
        await mongoose.connect(process.env. MONGODB_CONNECTIION) // database connection
        await Letter.insertMany(letterData) // insert all see data
       console.log("Connected")
    } catch(err){
        console.log(err)
    }
       await  mongoose.disconnect() // node process exit cleanly
    
} 

connectingSeedData()