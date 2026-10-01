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

export const demoCompanyScores = [["Trust", 92], ["Brand", 84], ["Quality", 95], ["Innovation", 89], ["Responsibility", 86]] as const;
export const demoAiScores = [["Research", 88], ["Adoption", 81], ["Policy", 76]] as const;
export const demoDirectoryScores = [["Innovation", 89], ["Traction", 82], ["Readiness", 78]] as const;
