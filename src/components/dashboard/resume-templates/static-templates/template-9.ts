const cvHeadings: any = [
  {
    text: "contact",
    section: "phone",
    headingKey: "contact",

    attributes: [{ "icon-color": "white" }],
    styles:
      "font-semibold uppercase text-sm py-1 px-4 w-full text-center border-2 rounded-full flex items-center justify-center border-[#043382] mt-[166px] mb-2",
  },
  {
    text: "executive summary",
    section: "summary",
    headingKey: "summary",

    attributes: [{ "icon-color": "white" }],
    styles:
      "font-semibold uppercase text-sm py-1 text-white bg-[#043382] px-4 border-2 flex items-center justify-center rounded-full mt-[150px] py-0.5 mb-1",
  },
  {
    text: "work experience",
    section: "workExperienceArray",
    headingKey: "workExperienceArray",

    attributes: [{ "icon-color": "white" }],
    styles:
      "font-semibold uppercase text-sm py-1 text-white bg-[#043382] px-4 border-2 flex items-center justify-center rounded-full py-0.5 mb-1",
  },
  {
    text: "education",
    section: "education",
    headingKey: "education",

    attributes: [{ "icon-color": "white" }],
    styles:
      "font-semibold uppercase text-sm py-1 text-white bg-[#043382] border-2 px-4 flex items-center justify-center rounded-full",
  },
  {
    text: "skills",
    section: "primarySkills",
    headingKey: "primarySkills",

    attributes: [{ "icon-color": "white" }],
    styles:
      "font-semibold uppercase text-sm py-1 text-white text-center border-2 flex flex-row justify-center items-center rounded-full border-[#043382] mt-6 mb-2",
  },
];

const templateLayout: any = {
  styles: "w-full",
  attributes: [{ "template-no": "3" }],
  fragment: {
    styles: "flex flex-row relative bg-white fragment",
    header: {
      styles:
        "text-gray-100 absolute h-28 top-5 z-10 bg-[#043382] flex flex-col w-full justify-center items-start my-6",
      elements: [
        {
          id: "name",
        },
        {
          id: "jobTitle",
        },
      ],
    },
    sideBar: {
      styles: "bg-gray-950 text-white w-3/12 flex flex-col justify-start px-4",
      elements: [
        {
          id: "phone",
        },
        {
          id: "email",
        },
        {
          id: "linkedIn",
        },
        {
          id: "address",
        },
        {
          id: "primarySkills",
        },
      ],
    },

    body: {
      styles:
        "text-black w-9/12 flex-1 flex flex-col justify-start items-start px-6 my-4",
      elements: [
        {
          heading: true,
          headingText: "Exective Summary",
          id: "summary",
        },
        {
          heading: true,
          headingText: "Work Experience",
          id: "workExperienceArray",
        },
        {
          heading: true,
          headingText: "Education",
          id: "education",
        },
      ],
    },
  },
};
const components: any = {
  shortName: {
    styles:
      "h-8 w-8 my-8 border text-xl p-10 -ml-2 translate-x-2/4 font-semibold flex justify-center items-center rounded-full bg-gray-900 text-white text-center",
    tag: "span",
  },
  name: {
    styles:
      "text-2xl text-gray-100 font-bold flex justify-center items-center w-full mb-2",
    tag: "span",
  },
  jobTitle: {
    tag: "span",
    styles:
      "text-base flex text-gray-100 justify-center items-center w-full mb-2",
  },
  contact: {
    styles: "flex-row text-gray-100 justify-center items-center w-full",
    elements: [
      {
        id: "phone",
        styles: "text-xs flex break-all before:break-normal mt-2 text-gray-100",
        tag: "span",
      },
      {
        id: "email",
        styles: "text-xs flex break-all before:break-normal mt-2 text-gray-100",
        tag: "span",
      },
      {
        id: "linkedIn",
        styles: "text-xs flex break-all before:break-normal mt-2 text-gray-100",
        tag: "span",
      },
      {
        id: "address",
        styles: "text-xs flex break-all before:break-normal mt-2 text-gray-100",
        tag: "span",
      },
    ],
  },
  primarySkills: {
    styles: "text-xs py-2 text-gray-100 flex",
    tag: "span",
  },
  summary: { styles: "text-justify mb-4 text-gray-950 text-xs", tag: "span" },
  workExperienceArray: {
    styles: "my-2",
    elements: [
      {
        id: "title",
        styles: "text-base font-bold text-gray-950",
        tag: "span",
      },
      {
        styles: "flex gap-1 font-semibold pb-2 text-gray-100 text-sm flex-wrap",
        tag: "div",
        container: [
          { id: "fromMonth", styles: "text-gray-950", tag: "span" },
          { id: "fromYear", styles: "text-gray-950", tag: "span" },
          {
            id: "toMonth",
            styles: "before:content-['\\268A'] before:mr-1 text-gray-950",
            tag: "span",
          },
          { id: "toYear", styles: "text-gray-950", tag: "span" },
          {
            id: "company",
            styles:
              "before:content-['\\2758'] before:mr-2 text-gray-950 after:content-['\\2758'] after:ml-2",
            tag: "span",
          },
          { id: "cityState", styles: "text-gray-950", tag: "span" },
          { id: "country", styles: "text-gray-950", tag: "span" },
          // { id: "isContinue", styles: "", tag: "span" },
        ],
      },
      {
        id: "achievements",
        styles:
          "text-sm flex text-justify pb-1 text-xs text-gray-950 before:content-['\\2022'] before:mr-2",
        tag: "span",
      },
    ],
  },
  education: {
    tag: "div",
    styles: "",
    elements: [
      {
        tag: "div",
        styles:
          "bg-gray-200 flex flex-col w-[30%] text-gray-950 p-4 rounded-md",
        container: [
          {
            id: "educationLevel",
            styles: "font-semibold text-base text-gray-950",
            tag: "span",
          },
          {
            id: "fieldOfStudy",
            styles: "text-xs font-semibold text-gray-950",
            tag: "span",
          },
          {
            id: "schoolName",
            styles: "italic text-xs font-normal text-gray-950",
            tag: "span",
          },
          {
            id: "schoolLocation",
            styles: "text-xs italic font-normal text-gray-950",
            tag: "span",
          },
          {
            styles: "flex flex-row gap-2 italic text-gray-950",
            tag: "div",
            container: [
              { id: "fromMonth", styles: "text-xs text-gray-950", tag: "span" },
              { id: "fromYear", styles: "text-xs text-gray-950", tag: "span" },
              {
                id: "toMonth",
                styles:
                  "text-xs before:content-['\\268A'] text-gray-950 before:mr-2",
                tag: "span",
              },
              { id: "toYear", styles: "text-xs text-gray-950", tag: "span" },
              // { id: "isContinue", styles: "", tag: "span" },
            ],
          },
        ],
      },
    ],
  },
};

export const template = {
  components,
  templateLayout,
  cvHeadings,
};
