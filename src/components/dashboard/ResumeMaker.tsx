import ToolsCard from "@/components/dashboard/ToolsCard";
import chatbot from "@/../public/icon/chatbot.png";
import book from "@/../public/icon/book.png";
import profile from "@/../public/icon/profile.png";
import email from "@/../public/icon/email.png";
import review from "@/../public/icon/review.png";
import bigs from "@/../public/icon/bigs.png";
import letter from "@/../public/icon/letter.png";
import bagsIcon from "@/../public/icon/bagsIcon.svg";
import scanIcon from "@/../public/icon/scanIcon.svg";

const cardDetail = [
  {
    title: "Resume Builder",
    description:
      "Create multiple AI-Powered resumes tailored for your targeted job positions.",
    link: "/resume-builder",
    icon: book,
    bgColor1: "from-violet-800",
    bgColor2: "to-violet-400",
    action: "launch",
  },
  {
    title: "Cover Letters Generator",
    description:
      "Tailor cover letters for each application, skyrocketing your interview chances.",
    link: "/cover-letter-generator",
    icon: letter,
    bgColor1: "from-yellow-600",
    bgColor2: "to-yellow-400",
    action: "launch",
  },
  {
    title: "LinkedIn Optimizer",
    description:
      "Boost LinkedIn visibility by optimizing your linkedin for recruiters.",
    link: "/linkedin-optimizer",
    icon: profile,
    bgColor1: "from-cyan-400",
    bgColor2: "to-blue-600",
    action: "launch",
  },
  {
    title: "Email Assistant",
    description:
      "Secure more interviews with AI-powered follow-up emails to recruiters.",
    link: "/email-assistant",
    icon: email,
    bgColor1: "from-pink-600",
    bgColor2: "to-orange-700",
    action: "launch",
  },
  {
    title: "AI Job Finder",
    description: `Our AI finds fitting job matches across the web, saving you from multiple board searches.`,
    link: "/ai-job-board",
    icon: bagsIcon,
    bgColor1: "from-[#ff0070]",
    bgColor2: "to-[#fd73ff]",
    action: "launch",
  },
  {
    title: "Consulting Bids Generator",
    description: "Generate bids in seconds to secure your next consulting gig.",
    link: "#",
    // link: "/consulting-bids-bot",
    icon: bigs,
    bgColor1: "from-red-600",
    bgColor2: "to-orange-400",
    action: "coming soon",
  },
  {
    title: "Career Coach",
    description:
      "Empower your career with AI-driven insights by our career coach.",
    link: "#",
    // link: "/career-coach",
    icon: chatbot,
    bgColor1: "from-teal-600",
    bgColor2: "to-green-400",
    action: "coming soon",
  },
  {
    title: "Resume Review by AI",
    description:
      "AI analyzes your resume, offering valuable suggestions for impactful improvements.",
    link: "#",
    // link: "/review-resume",
    icon: review,
    bgColor1: "from-cyan-600",
    bgColor2: "to-sky-300",
    action: "coming soon",
  },
  {
    title: "ATS Scan Your Resume",
    description:
      "Maximize your resume's ATS compatibility to reach recruiters hassle-free.",
    link: "/",
    icon: scanIcon,
    bgColor1: "from-[#008a04]",
    bgColor2: "to-[#57c84c]",
    action: "coming soon",
  },
];

const ResumeMaker = () => {
  return (
    <div className="md:pt-2 xs:pt-0 lg:mt-2">
      <div className="grid grid-cols-1 gap-2 md:grid-cols-3 sm:grid-cols-2">
        {cardDetail.map((item, index) => (
          <ToolsCard
            key={index}
            {...item}
          />
        ))}
      </div>
    </div>
  );
};

export default ResumeMaker;
