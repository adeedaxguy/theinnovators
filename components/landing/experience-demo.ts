import type { VideoItem } from "./types";

// Reuse an available client-site embed without attributing it to missing content.
const sampleVideo = {
  youtubeId: "uJOA5IDaL5g",
  sourceUrl: "https://www.youtube.com/watch?v=uJOA5IDaL5g",
  sampleAttribution: "Sample footage: Apptronik. Not the selected company's or topic's video.",
};

export function isSampleMedia(video: VideoItem) {
  return !video.youtubeId && !video.videoUrl;
}

export function previewMedia(video: VideoItem): VideoItem & { sampleAttribution?: string } {
  return isSampleMedia(video) ? { ...video, ...sampleVideo } : video;
}

const demoTopics = [
  { label: "Highlights", topics: ["Product spotlight", "Team & leadership"], image: "robotics-lab" },
  { label: "Tutorial videos", topics: ["Getting started", "Workflow walkthrough", "Platform integration"], image: "circuit-state" },
  { label: "Historical videos", topics: ["Company milestones", "Innovation timeline", "Research journey"], image: "innovation-campus" },
  { label: "Product demos", topics: ["Product in action", "Technology showcase", "Customer use case"], image: "robotics-lab" },
  { label: "Founder stories", topics: ["Founder perspective", "Team culture", "Future vision"], image: "broadcast-stage" },
];

export function companyDemoGroups(companyName: string, primary: VideoItem) {
  return demoTopics.map((group, index) => ({
    label: group.label,
    videos: [
      ...(index === 0 ? [primary] : []),
      ...group.topics.map((topic): VideoItem => ({
        title: companyName + " | " + topic,
        category: "Sample " + group.label.toLowerCase(),
        image: "/assets/billboards/" + group.image + ".jpg",
      })),
    ],
  }));
}

export const demoToolContent: Record<string, string[]> = {
  "AI Research": ["Brief: industrial automation", "Review: safety, integration and deployment evidence", "Next step: compare primary-source case studies"],
  "Market Research": ["Example segment: mid-market manufacturers", "Buyer priorities: reliability and integration cost", "Validate: market size and customer interviews"],
  "Competitive Analysis": ["Compare: capability, price and implementation", "Evidence: product documentation and customer references", "Open question: differentiation in the target segment"],
  "Product Launch": ["Pilot: a limited customer cohort", "Measure: activation, adoption and support requests", "Release gate: pilot feedback and readiness review"],
  "PMF Testing": ["Hypothesis: the workflow solves a recurring pain point", "Interview: prospective users and current alternatives", "Measure: repeat usage and willingness to pay"],
  "Sales Insights": ["Example buyer: operations director", "Discovery: current workflow and deployment constraints", "Next step: qualify the use case before a demo"],
  "Data Room": ["Company documents: overview and incorporation", "Commercial documents: contracts and pipeline", "Technical documents: architecture and security review"],
  "Investor Match": ["Example mandate: early-stage industrial technology", "Screen: geography, stage and sector fit", "Next step: validate the mandate before outreach"],
  "Valuation": ["Methods: comparable companies and scenario analysis", "Inputs: verified financials and capital structure", "Output: a reviewed range, not a single estimate"],
  "Due Diligence": ["Commercial: customer references and contracts", "Technical: IP ownership and product validation", "Financial: verified accounts and funding history"],
  "Recruitment": ["Example role: product engineer", "Scorecard: technical depth and cross-team delivery", "Process: structured interviews and reference checks"],
  "Events": ["Example format: founder roundtable", "Agenda: product briefing and audience questions", "Follow-up: opt-in attendee resources"],
};

export const companyToolGroups = [
  { title: "Research & Discovery", tools: ["AI Research", "Innovation Summarize", "AI Market Research & Analysis", "Competitive Landscape", "Innovation Portfolio", "Product Research"] },
  { title: "Marketing & Sales", tools: ["AI Marketing", "Product Launch / Demo", "Product Market Fit", "A/B Testing", "Marketing & Sales Data Insights", "Private Data Room"] },
  { title: "Creator & Community", tools: ["AI Creation Toolkit", "AI Mentorship", "AI Discovery", "AI Recruitment", "AI Customer Service"] },
  { title: "Deals", tools: ["Deals Matchmaking", "Deals Screening", "Deals Valuation Estimator", "Due Diligence", "Benchmark With Competition"] },
  { title: "Data Insights", tools: ["Viewing History", "Discovery History", "Market Analysis", "Viewership Analysis"] },
];

export const companyToolContent: Record<string, string[]> = {
  "AI Research": demoToolContent["AI Research"],
  "Innovation Summarize": ["Input: a primary-source video or document", "Review: claims, evidence and limitations", "Output: a source-linked summary for human review"],
  "AI Market Research & Analysis": demoToolContent["Market Research"],
  "Competitive Landscape": demoToolContent["Competitive Analysis"],
  "Innovation Portfolio": ["Inventory: products and research projects", "Compare: maturity, evidence and strategic fit", "Review: verified ownership and project status"],
  "Product Research": ["Input: product documentation and demonstrations", "Review: capabilities, constraints and user needs", "Validate: primary sources and customer evidence"],
  "AI Marketing": ["Input: a verified product brief and audience", "Draft: messaging options for human review", "Validate: claims before publishing"],
  "Product Launch / Demo": demoToolContent["Product Launch"],
  "Product Market Fit": demoToolContent["PMF Testing"],
  "A/B Testing": ["Define: one measurable hypothesis", "Plan: variants, sample size and success criteria", "Review: actual experiment data before conclusions"],
  "Marketing & Sales Data Insights": demoToolContent["Sales Insights"],
  "Private Data Room": demoToolContent["Data Room"],
  "AI Creation Toolkit": ["Input: an approved creative brief", "Prepare: scripts, storyboards and asset requirements", "Review: licensing and factual accuracy before publication"],
  "AI Mentorship": ["Define: the innovator's question and context", "Explore: options, tradeoffs and next steps", "Validate: advice with appropriate domain expertise"],
  "AI Discovery": ["Start: a topic, industry or company", "Search: the available source library", "Review: source relevance and provenance"],
  "AI Recruitment": demoToolContent["Recruitment"],
  "AI Customer Service": ["Input: approved support documentation", "Draft: a response grounded in that documentation", "Escalate: unresolved requests to a human"],
  "Deals Matchmaking": demoToolContent["Investor Match"],
  "Deals Screening": ["Check: stage, sector and investment mandate", "Review: verified company and financial information", "Escalate: eligibility and investment decisions for human review"],
  "Deals Valuation Estimator": demoToolContent["Valuation"],
  "Due Diligence": demoToolContent["Due Diligence"],
  "Benchmark With Competition": demoToolContent["Competitive Analysis"],
  "Market Analysis": demoToolContent["Market Research"],
};

export const demoCompanyScores = [["Trust", 92], ["Brand", 84], ["Quality", 95], ["Innovation", 89], ["Responsibility", 86]] as const;
export const demoAiScores = [["Research", 88], ["Adoption", 81], ["Policy", 76]] as const;
export const demoDirectoryScores = [["Innovation", 89], ["Traction", 82], ["Readiness", 78]] as const;
