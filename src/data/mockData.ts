export const mockFAQs = [
  {
    question: "Can I vote without a voter ID?",
    answer: "Yes, if your name is on the electoral roll. You can use alternative photo ID documents like an Aadhaar Card, Passport, Driving License, or PAN Card."
  },
  {
    question: "How do I register to vote?",
    answer: "You can register online through the Voter Helpline App or the National Voters' Service Portal (NVSP). Choose Form 6 for new voter registration."
  },
  {
    question: "I have moved to a new city. What should I do?",
    answer: "You need to update your address. Fill Form 8 on the NVSP portal to shift your constituency."
  }
];

export const mockQuizQuestions = [
  {
    id: 1,
    question: "What is the minimum age to be eligible to vote?",
    options: ["16", "18", "21", "25"],
    correctAnswer: 1,
    explanation: "You must be at least 18 years old on the qualifying date (usually January 1st of the year) to be eligible."
  },
  {
    id: 2,
    question: "Which form is used for new voter registration?",
    options: ["Form 6", "Form 7", "Form 8", "Form 9"],
    correctAnswer: 0,
    explanation: "Form 6 is specifically for inclusion of names for first-time voters."
  }
];

export const mockMythsFacts = [
  {
    myth: "If I don't vote, I lose my citizenship.",
    fact: "Voting is a right, not a condition for citizenship. However, it is a crucial civic duty."
  },
  {
    myth: "EVMs can be easily hacked via bluetooth or internet.",
    fact: "EVMs are standalone machines. They have no wireless communication capabilities and are strictly isolated."
  }
];

export const mockPollingBooths = [
  { id: 1, name: "City High School", distance: "0.5km", status: "Open", lat: 28.6139, lng: 77.2090 },
  { id: 2, name: "Community Hall Centre", distance: "1.2km", status: "Crowded", lat: 28.6200, lng: 77.2150 },
  { id: 3, name: "Town Library Building", distance: "2.5km", status: "Open", lat: 28.6100, lng: 77.2200 },
];
