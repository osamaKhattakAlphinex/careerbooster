import ResumeTemplate1 from "@/components/new-dashboard/dashboard/resume-templates/templates/template_1";
import ResumeTemplate2 from "@/components/new-dashboard/dashboard/resume-templates/templates/template_2";
import ResumeTemplate3 from "@/components/new-dashboard/dashboard/resume-templates/templates/template_3";
import ResumeTemplate4 from "@/components/new-dashboard/dashboard/resume-templates/templates/template_4";
import ResumeTemplate5 from "@/components/new-dashboard/dashboard/resume-templates/templates/template_5";
import ResumeTemplate6 from "@/components/new-dashboard/dashboard/resume-templates/templates/template_6";
import ResumeTemplate7 from "@/components/new-dashboard/dashboard/resume-templates/templates/template_7";
import ResumeTemplate8 from "@/components/new-dashboard/dashboard/resume-templates/templates/template_8";
import ResumeTemplate9 from "@/components/new-dashboard/dashboard/resume-templates/templates/template_9";
import ResumeTemplate14 from "@/components/new-dashboard/dashboard/resume-templates/templates/template_14";
import ResumeTemplate15 from "@/components/new-dashboard/dashboard/resume-templates/templates/template_15";
import { Template } from "@/components/new-dashboard/dashboard/resume-templates";

export const ALL_TEMPLATES: Template[] = [
  {
    id: 1,
    title: "classic-executive",
    tags: [
      "all-templates",
      "classic-executive",
      "one-page",
      "creative-colorful",
    ],
    category: "freemium",
    preview: "/assets/images/templates/resume-1.png",
    template: (props) => <ResumeTemplate1 {...props} />,
  },
  {
    id: 2,
    title: "",
    tags: ["creative-colorful"],
    category: "premium",
    preview: "/assets/images/templates/resume-2.png",
    template: (props) => <ResumeTemplate2 {...props} />,
  },
  {
    id: 3,
    title: "classic-executive",
    tags: ["classic-executive", "creative-colorful"],
    category: "premium",
    preview: "/assets/images/templates/resume-3.png",
    template: (props) => <ResumeTemplate3 {...props} />,
  },
  {
    id: 4,
    title: "",
    tags: ["classic-executive", "one-page"],
    category: "premium",
    preview: "/assets/images/templates/resume-4.png",
    template: (props) => <ResumeTemplate4 {...props} />,
  },
  {
    id: 5,
    title: "",
    tags: ["creative-colorful"],
    category: "premium",
    preview: "/assets/images/templates/resume-5.png",
    template: (props) => <ResumeTemplate5 {...props} />,
  },
  {
    id: 6,
    title: "",
    tags: ["creative-colorful"],
    category: "premium",
    preview: "/assets/images/templates/resume-6.png",
    template: (props) => <ResumeTemplate6 {...props} />,
  },
  {
    id: 7,
    title: "",
    tags: ["creative-colorful", "one-page"],
    category: "premium",
    preview: "/assets/images/templates/resume-7.png",
    template: (props) => <ResumeTemplate7 {...props} />,
  },
  {
    id: 8,
    title: "",
    tags: ["creative-colorful"],
    category: "premium",
    preview: "/assets/images/templates/resume-8.png",
    template: (props) => <ResumeTemplate8 {...props} />,
  },
  {
    id: 9,
    title: "",
    tags: ["one-page"],
    category: "premium",
    preview: "/assets/images/templates/resume-9.png",
    template: (props) => <ResumeTemplate9 {...props} />,
  },
  {
    id: 10,
    title: "",
    tags: ["creative-colorful"],
    category: "freemium",
    preview: "/assets/images/templates/resume-2.png",
    template: (props) => <ResumeTemplate9 {...props} />,
  },
  {
    id: 11,
    title: "",
    tags: ["creative-colorful"],
    category: "freemium",
    preview: "/assets/images/templates/resume-2.png",
    template: (props) => <ResumeTemplate9 {...props} />,
  },
  {
    id: 12,
    title: "",
    tags: ["creative-colorful"],
    category: "freemium",
    preview: "/assets/images/templates/resume-2.png",
    template: (props) => <ResumeTemplate9 {...props} />,
  },
  {
    id: 13,
    title: "",
    tags: ["creative-colorful"],
    category: "freemium",
    preview: "/assets/images/templates/resume-2.png",
    template: (props) => <ResumeTemplate9 {...props} />,
  },
  {
    id: 14,
    title: "",
    tags: ["creative-colorful"],
    category: "premium",
    preview: "/assets/images/templates/resume-14.png",
    template: (props) => <ResumeTemplate14 {...props} />,
  },
  {
    id: 15,
    title: "",
    tags: ["creative-colorful"],
    category: "premium",
    preview: "/assets/images/templates/resume-15.png",
    template: (props) => <ResumeTemplate15 {...props} />,
  },
];
