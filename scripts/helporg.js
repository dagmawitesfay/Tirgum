const mongoose = require("mongoose")
const Help = require("../models/Help")
require("dotenv").config({ path: "config/.env" });

const helpOrginzationData = [

  // ───────────────────────── LEGAL ─────────────────────────
 
  {
    organizationName: "Agencia ALPHA",
    category: "Legal",
    languageOffered: ["English", "Spanish"],
    location: "62 Northampton St, Suite H101, Boston, MA 02118",
    whatToBring: [
      "A valid passport, consular ID, or state driver's license",
      "Original birth certificates, marriage certificates, or court/police records if you have ever had an arrest or citation",
      "Any previous USCIS approval or receipt notices, work permits (EAD), I-94 arrival records, or copies of past applications",
    ],
    serviceFee: "Free",
    organizationSummary:
      "A grassroots nonprofit that works to improve the lives of immigrant communities through its legal program, adult education classes, and community leadership.",
    website: "http://www.agenciaalpha.org",
    phone: "(617) 522-6382",
    email: "info@agenciaalpha.org",
    populationServed:
      "Domestic violence victims, individuals who are not in legal immigration status, individuals with criminal histories, individuals with physical/mental disabilities",
    workingHours: [{ workingDay: "Monday - Thursday", time: "9:30 AM - 5:30 PM" }],
    service: [
      "TPS (Temporary Protected Status)",
      "Immigration advice and consulting",
      "Family petitions and adjustment of status",
      "Work permit renewals",
      "Free citizenship application assistance",
      "Citizenship classes (Boston / East Boston)",
      "Interpretation and translation services",
      "Public notary services",
      "Leadership development and community trainings",
      "Referrals to other community resources",
    ],
  },

  // Source: gbls.org/get-legal-help/service-locations and the GBLS English brochure (Feb 2025).
  // Languages: NOT LISTED on those pages (the brochure only says GBLS serves people with limited English).
  // Email: none published.
  {
    organizationName: "Greater Boston Legal Services (GBLS)",
    category: "Legal",
    languageOffered: ["English", "Other languages: call to ask about interpreters"],
    location: 
      "197 Friend St, Boston, MA 02114",
    whatToBring: [
      "The letter or notice you need help with (general)",
      "A photo ID, if you have one (general)",
      "Proof of income, since services are for low-income residents (general)",
    ],
    serviceFee: "Free",
    organizationSummary:
      "Provides free legal assistance in civil (non-criminal) matters to eligible families and individuals living in poverty in the Greater Boston area.",
    website: "https://www.gbls.org",
    phone: "617-371-1234 (toll-free 800-323-3205)",
    populationServed:
      "Eligible low-income families and individuals in the Greater Boston area. Elder services are for people over 60.",
    workingHours: [
      { workingDay: "Monday - Friday (office)", time: "9:00 AM - 5:00 PM" },
      { workingDay: "Monday - Friday (phone intake)", time: "9:30 AM - 12:30 PM" },
    ],
    service: [
      "Housing",
      "Healthcare and disability benefits",
      "Government benefits",
      "Immigration",
      "Workers' rights",
      "Consumer debt",
      "Domestic violence",
      "Elder services",
      "Public school issues",
      "Low-income taxes",
      "Criminal records",
    ],
  },

  // Source: immigrationadvocates.org directory listing and finditcambridge.org "Legal Services at De Novo".
  // Email: no general email published. Walk-ins are not accepted.
  {
    organizationName: "De Novo Center for Justice and Healing",
    category: "Legal",
    languageOffered: ["English", "Spanish", "French", "Farsi", "Other languages by interpreter service"],
    location: "47 Thorndike St, Suite SB-LL-1, Cambridge, MA 02141",
    whatToBring: [
      "Call first: appointments only, no walk-ins",
      "The letter or notice you need help with (general)",
      "A photo ID, if you have one (general)",
    ],
    serviceFee: "Free",
    organizationSummary:
      "Provides free legal services and psychological counseling to low-income people in Greater Boston, including housing, family law, immigration, and disability benefits cases.",
    website: "https://www.denovo.org/",
    phone: "(617) 661-1010",
    populationServed:
      "Low-income adults in Greater Boston. Immigration cases: all of Massachusetts. Housing cases: Cambridge and Somerville residents only. Victims of crime are served regardless of income.",
    workingHours: [{ workingDay: "Monday - Friday (by appointment)", time: "9:00 AM - 5:00 PM" }],
    service: [
      "Housing and homelessness prevention",
      "Family law and domestic violence",
      "Immigrant and refugee rights (asylum, SIJS, U visas, VAWA)",
      "Disability benefits",
      "Psychological counseling",
    ],
  },

  // ─────────────────────── IMMIGRATION ───────────────────────

  // Source: immigrationadvocates.org directory listing and disabilityinfo.org record.
  // Hours: NOT LISTED in either source.
  {
    organizationName: "PAIR Project (Political Asylum/Immigration Representation Project)",
    category: "Immigration",
    languageOffered: ["English", "Spanish", "Portuguese", "French", "Hindi", "Punjabi", "Other languages by interpreter service"],
    location: "98 North Washington St, Suite 106, Boston, MA 02114",
    whatToBring: [
      "Any letters or notices from USCIS or immigration court (general)",
      "Your passport or other ID, if you have one (general)",
      "Copies of any past immigration applications (general)",
    ],
    serviceFee: "Free",
    organizationSummary:
      "Provides free immigration legal services to asylum-seekers with low income and to immigrants held in detention.",
    website: "http://www.pairproject.org",
    phone: "(617) 742-9296",
    email: "info@pairproject.org",
    populationServed:
      "Asylum-seekers with low income, detained immigrants, survivors of domestic violence, trafficking, and torture, juveniles, and LGBT individuals",
    workingHours: [{ workingDay: "Hours not listed", time: "Call to confirm" }],
    service: [
      "Asylum applications and interviews",
      "Representation in immigration court and appeals",
      "Help for detained immigrants",
      "DACA and TPS",
      "U visas and VAWA petitions",
      "Special Immigrant Juvenile Status",
      "Adjustment of status and work authorization",
    ],
  },

  // Source: miracoalition.org/citizenship, miracoalition.org/contact, and the immigrationadvocates.org listing.
  // Hours: NOT LISTED.
  {
    organizationName: "MIRA Coalition (Massachusetts Immigrant and Refugee Advocacy Coalition)",
    category: "Immigration",
    languageOffered: ["English", "Spanish", "Portuguese"],
    location: "69 Canal St, 3rd Floor, Boston, MA 02114",
    whatToBring: [
      "Your green card (permanent resident card) (general)",
      "Your passport and any travel records (general)",
      "Any letters you have received from USCIS (general)",
    ],
    serviceFee: "Free",
    organizationSummary:
      "Provides free citizenship application assistance for eligible lawful permanent residents and advocates for the rights and integration of immigrants and refugees.",
    website: "https://miracoalition.org",
    phone: "617-350-5480",
    email: "info@miracoalition.org",
    populationServed: "Eligible lawful permanent residents (green card holders) who want to become U.S. citizens",
    workingHours: [{ workingDay: "Hours not listed", time: "Call to confirm" }],
    service: [
      "Citizenship (naturalization) eligibility check",
      "Free help completing the citizenship application",
      "Filing with USCIS",
      "Citizenship clinics",
      "Referrals to citizenship classes and other services",
    ],
  },

  // Source: ccab.org/locations (address, phone) and the immigrationadvocates.org listing (languages, fees, services).
  {
    organizationName: "Catholic Charities Boston: Refugee and Immigrant Services",
    category: "Immigration",
    languageOffered: ["English", "Spanish", "Haitian Creole", "French", "Vietnamese", "Cantonese", "Russian", "Armenian", "Other languages by interpreter service"],
    location: "275 West Broadway, South Boston, MA 02127",
    whatToBring: [
      "Call first: consultations need an appointment",
      "Any letters or notices from USCIS or immigration court (general)",
      "Your passport or other ID, if you have one (general)",
    ],
    serviceFee: "Low cost (a nominal fee is charged)",
    organizationSummary:
      "Offers immigration legal consultations and representation, along with refugee and immigrant support services such as ESL and employment help.",
    website: "https://www.ccab.org",
    phone: "617-464-8100",
    populationServed:
      "Immigrants and refugees, including survivors of domestic violence, trafficking, and torture, juveniles, and people without legal immigration status",
    workingHours: [{ workingDay: "Monday (call to schedule an appointment)", time: "9:00 AM" }],
    service: [
      "Citizenship (naturalization)",
      "Family-based petitions",
      "Adjustment of status and consular processing",
      "Asylum applications",
      "DACA and TPS",
      "Work authorization",
      "Representation in immigration court",
      "ESL and employment services",
    ],
  },

  // ───────────────────────── HEALTH ─────────────────────────
  // Source: hcfama.org/hcfas-helpline and hcfama.org/contact-us.

  {
    organizationName: "Health Care For All: HelpLine",
    category: "Health",
    languageOffered: ["English", "Spanish", "Portuguese", "Haitian Creole", "French"],
    location:"70 Franklin St, Suite 500, Boston, MA 02110 (help is by phone)",
    whatToBring: [
      "Have your MassHealth or Health Connector letter with you when you call (general)",
      "Your household income information (general)",
    ],
    serviceFee: "Free",
    organizationSummary:
      "A free phone helpline that helps Massachusetts residents enroll in health insurance, answers questions about coverage, and solves problems with state health programs.",
    website: "https://hcfama.org/hcfas-helpline/",
    phone: "800-272-4232",
    populationServed: "Massachusetts residents with questions about health insurance",
    workingHours: [{ workingDay: "Monday - Friday (confirm by phone)", time: "9:00 AM - 5:00 PM" }],
    service: [
      "Enrolling in health insurance coverage",
      "Answering questions about insurance",
      "Fixing problems with MassHealth and other state programs",
      "Eligibility and enrollment help for state programs",
      "Medicare counseling",
    ],
  },

  // Source: boston.gov/mayors-health-line (Boston Public Health Commission).
  // The page says the service is multilingual but does not name the languages.
  {
    organizationName: "Mayor's Health Line (Boston Public Health Commission)",
    category: "Health",
    languageOffered: ["English", "Multilingual: ask for your language"],
    location: "1010 Massachusetts Ave, 2nd Floor, Boston, MA 02118",
    whatToBring: [
      "When you call or email, give your name, phone number, preferred language, and the best days and times to reach you",
      "Have your health insurance letter with you (general)",
    ],
    serviceFee: "Free",
    organizationSummary:
      "A free, confidential, multilingual health information and referral service that helps residents apply for health insurance and find care, regardless of immigration status.",
    website: "https://www.boston.gov/mayors-health-line",
    phone: "617-534-5050 (toll-free 1-800-847-0710)",
    email: "mayorshealthline@bphc.org",
    populationServed: "All residents, regardless of immigration status",
    workingHours: [{ workingDay: "Monday - Friday", time: "9:00 AM - 5:00 PM" }],
    service: [
      "Health insurance eligibility questions and enrollment",
      "Help with MassHealth, ConnectorCare, and Health Safety Net",
      "Finding primary care providers, free clinics, and community health centers",
      "Referrals for food assistance, SNAP, and social services",
      "Medicare counseling (SHINE)",
    ],
  },

  // ──────────────────────── BENEFITS ────────────────────────

  // Source: finditcambridge.org CEOC program pages (public benefits, health insurance, housing).
  // Hours: the pages say "Monday through Friday" with no times. Staff speak Amharic and Tigrinya.
  {
    organizationName: "Cambridge Economic Opportunity Committee (CEOC)",
    category: "Benefits",
    languageOffered: ["English", "Amharic", "Tigrinya", "Oromifa", "Spanish", "Portuguese", "Haitian Creole", "French", "Bangla", "Italian"],
    location: "11 Inman St, Cambridge, MA 02139",
    whatToBring: [
      "Call the receptionist to make an appointment and ask what to bring",
      "The letter or notice you need help with (general)",
      "A photo ID, if you have one (general)",
    ],
    serviceFee: "Free",
    organizationSummary:
      "Helps people apply for and fix problems with public benefits and health insurance, in person or online, with staff who speak ten languages.",
    website: "https://ceoccambridge.org",
    phone: "617-868-2900",
    email: "info@ceoccambridge.org",
    populationServed: "Adults for benefits help; people of all ages for health insurance help",
    workingHours: [{ workingDay: "Monday - Friday", time: "Call to confirm times" }],
    service: [
      "Social Security, SSI, and SSDI applications and problems",
      "TAFDC and EAEDC cash assistance",
      "Health insurance applications (MassHealth, Health Connector, Health Safety Net, Medicare)",
      "Choosing a health plan and a medical provider",
      "Medicare counseling (SHINE)",
    ],
  },

  // Source: projectbread.org/foodsource-hotline.
  {
    organizationName: "Project Bread: FoodSource Hotline",
    category: "Benefits",
    languageOffered: ["English", "180 languages available"],
    location: "145 Border St, East Boston, MA 02128 (help is by phone, text, or online chat)",
    whatToBring: [
      "Have your SNAP or DTA letter with you when you call (general)",
      "Your household size and income information (general)",
    ],
    serviceFee: "Free",
    organizationSummary:
      "A free, confidential hotline where counselors help you check whether you qualify for SNAP, apply, and find food resources near you.",
    website: "https://projectbread.org/foodsource-hotline",
    phone: "1-800-645-8333 (call or text)",
    email: "info@projectbread.org",
    populationServed: "Anyone in Massachusetts who needs help getting food",
    workingHours: [
      { workingDay: "Monday - Friday", time: "8:00 AM - 7:00 PM" },
      { workingDay: "Saturday", time: "10:00 AM - 2:00 PM" },
    ],
    service: [
      "Checking SNAP eligibility and applying",
      "Finding food pantries and hot meal programs",
      "Free kids' meals (School Meals and Summer Eats)",
      "Using HIP benefits for farm fresh produce",
    ],
  },

  // Source: bostonabcd.org contact page, "Meet ABCD" (July 2024), ABCD Connect flyer (2023),

  {
    organizationName: "ABCD (Action for Boston Community Development)",
    category: "Benefits",
    languageOffered: ["English", "Help is available in all languages"],
    location: "178 Tremont St, Boston, MA 02111",
    whatToBring: [
      "For fuel assistance: proof of income for the past 30 days for each household member 18 or older",
      "For fuel assistance: one form of ID (for example a MassHealth card, birth certificate, driver's license, or state ID)",
      "For fuel assistance: your most recent lease or rent receipt, or mortgage statement",
      "For fuel assistance: your most recent heating bill",
    ],
    serviceFee: "No cost to those who qualify (income limits apply)",
    organizationSummary:
      "Greater Boston's antipoverty agency. Its ABCD Connect line links residents to programs for heating bills, food, taxes, housing, immigration, and more.",
    website: "https://bostonabcd.org",
    phone: "617-348-6329 (ABCD Connect); main office 617-348-6000",
    email: "abcdconnect@bostonabcd.org",
    populationServed: "Income-eligible residents of Boston and nearby towns",
    workingHours: [{ workingDay: "Hours not listed", time: "Call to confirm" }],
    service: [
      "Fuel assistance (help paying winter heating bills)",
      "SNAP application help",
      "Free tax preparation",
      "Housing counseling and rental assistance",
      "Immigration services and citizenship classes",
      "Food access centers",
      "English classes (ESOL)",
    ],
  },

  // ───────────────────────── HOUSING ─────────────────────────

  // Source: metrohousingboston.org/contact. Languages and cost: NOT LISTED on that page.
  {
    organizationName: "Metro Housing|Boston",
    category: "Housing",
    languageOffered: ["English", "Other languages: call to ask"],
    location: "1411 Tremont St, Boston, MA 02120",
    whatToBring: [
      "Appointments are strongly encouraged for office visits",
      "Your lease and any notice from your landlord (general)",
      "A photo ID and proof of income (general)",
    ],
    serviceFee: "Not listed: call to confirm",
    organizationSummary:
      "Helps residents with rent, utility, and moving costs through RAFT, and offers housing search help, referrals, and rental voucher support.",
    website: "https://metrohousingboston.org",
    phone: "(617) 859-0400; Resource Line (617) 425-6700",
    email: "resourceline@MetroHousingBoston.org",
    populationServed: "Renters and families in Greater Boston who need help staying housed or finding housing",
    workingHours: [
      { workingDay: "Monday, Tuesday, Wednesday, Friday (phones)", time: "9:00 AM - 5:00 PM" },
      { workingDay: "Thursday (phones)", time: "9:00 AM - 4:00 PM" },
      { workingDay: "Monday - Thursday (lobby)", time: "9:00 AM - 3:00 PM" },
      { workingDay: "Monday - Thursday (Resource Line)", time: "9:00 AM - 1:00 PM" },
    ],
    service: [
      "RAFT: help with rent, utility bills, and moving costs",
      "Housing search and budgeting help",
      "Referrals to legal help and community resources",
      "Section 8 and MRVP rental voucher support",
      "Fair housing and civil rights help",
    ],
  },

  // Source: boston.gov/housing-stability (City of Boston). Languages and cost: NOT LISTED on that page.
  {
    organizationName: "City of Boston: Office of Housing Stability",
    category: "Housing",
    languageOffered: ["English", "Other languages: call to ask"],
    location: "26 Court St, Boston, MA 02108",
    whatToBring: [
      "Your lease agreement",
      "Rent receipts and security deposit receipts",
      "Any written communication with your landlord, including an eviction notice if you received one",
    ],
    serviceFee: "Not listed (city service): call to confirm",
    organizationSummary:
      "Helps Boston tenants in a housing crisis caused by eviction, fire, natural disaster, or condemnation, and connects them to legal and financial help.",
    website: "https://www.boston.gov/housing-stability",
    phone: "617-635-4200",
    email: "housingstability@boston.gov",
    populationServed: "Boston tenants facing eviction or a housing crisis, and small landlords",
    workingHours: [{ workingDay: "Monday - Friday", time: "9:00 AM - 5:00 PM" }],
    service: [
      "Help with the eviction process",
      "Housing crisis case coordination",
      "Staff attorneys and referrals to legal aid",
      "Access to Counsel for eligible households with K-12 students",
      "Connections to financial help",
    ],
  },
];

async function connectingSeedData(){
    try{
        await mongoose.connect(process.env. MONGODB_CONNECTIION) // database connection
        await Help.deleteMany({}) // clear old seed data
        await Help.insertMany(helpOrginzationData) // insert all see data
       console.log("Connected")
    } catch(err){
        console.log(err)
    }
       await  mongoose.disconnect() // node process exit cleanly
    
} 

connectingSeedData()


