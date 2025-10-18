const fs = require("fs");
const path = require("path");
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Load API key from environment variable
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

// Tags and Categories
const TAGS = [
  "Education", "Healthcare", "Gun control", "Immigration", "Criminal justice reform",
  "Economic recovery", "Environmental protection", "National security", "Labor rights",
  "Social security", "Infrastructure", "Tax reform", "Veterans' issues", "Consumer protection",
  "Housing", "Civil rights", "Technology regulation", "Cybersecurity", "Trade policy",
  "Foreign relations", "Bipartisanship", "Public safety", "Economic stimulus", "National defense",
  "Privacy", "Free speech", "Equality", "Transparency", "Constitutional rights", "COVID-19 response",
  "Climate change", "Voting rights", "Police reform", "Immigration reform", "Opioid crisis",
  "Terrorism prevention", "Healthcare access", "LGBTQ+ rights", "Gun violence prevention",
  "Rural development", "Urban renewal", "Minority rights", "Women's rights", "Indigenous communities",
  "LGBTQ+ community", "Youth programs", "Elderly care", "Executive orders", "Supreme Court rulings",
  "Constitutional amendments", "International treaties", "Federal agency action", "Judicial reform",
  "Infrastructure projects", "Public works", "Worker rights", "Minimum wage", "Unions",
  "Job creation", "Workplace safety", "Farming", "Agriculture subsidies", "Food security",
  "Natural disaster recovery", "Emergency response", "Government aid", "Family services", "Welfare programs"
];

const CATEGORIES = [
  "Legislation & Policy", "Criminal Justice & Law Enforcement", "Economic & Fiscal Policy",
  "Healthcare & Public Health", "Social & Civil Rights", "Environmental & Energy Policy",
  "National Security & Defense", "Education & Workforce Development", "Immigration & Border Security",
  "Foreign Relations & Diplomacy", "Technology & Innovation", "Veterans Affairs", "Taxation & Budget",
  "Housing & Urban Development", "Transportation & Infrastructure", "Labor & Employment",
  "Agriculture & Rural Development", "Disaster Relief & Recovery", "Consumer Protection & Safety",
  "Family & Social Services"
];

async function callGeminiAPI(billText, tags, categories) {
  const prompt = `
You are tasked with processing a congressional bill. Here is the bill text:

"${billText}"

Please perform the following tasks:
1. Generate a concise 100-word summary of the bill.
2. Create a list of relevant tags based on the bill's content. Use the tags from the list below:
    ${tags.join(', ')}
3. Assign a single category to the bill from the list below:
    ${categories.join(', ')}

Please output the response text in a JSON format similar to below:
{
  "summary": "This bill aims to prevent gun trafficking by introducing new criminal penalties for trafficking firearms. Violators could face up to 20 years in prison, and the U.S. Sentencing Commission is directed to review sentencing guidelines. It also allows exceptions for certain firearm gifts and ensures stricter penalties for those involved in large-scale trafficking operations.",
  "tags": ["Gun trafficking", "Firearm regulation", "Criminal justice", "National security"],
  "category": "Legislation & Policy"
}
`;

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();

  return text;
}

function saveLLMResponseToJson(responseText) {
  try {
    const data = JSON.parse(responseText);

    const category = data.category || "Uncategorized";
    const outputDir = path.join(__dirname, "..", "bill-data", category);

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const filename = path.join(outputDir, "bill_summary.json");

    fs.writeFileSync(filename, JSON.stringify(data, null, 4));
    console.log(`aved response to ${filename}`);
  } catch (err) {
    console.error("Failed to save response:", err);
  }
}

async function processBill(billText) {
  try {
    const responseText = await callGeminiAPI(billText, TAGS, CATEGORIES);
    if (responseText) {
      saveLLMResponseToJson(responseText);
    } else {
      console.error("No response from Gemini API.");
    }
  } catch (err) {
    console.error("Error processing bill:", err);
  }
}

// Example usage
const billText = "Some bill text..."; // Replace with real bill content
processBill(billText);
