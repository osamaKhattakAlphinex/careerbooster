const cvHeadings: any = [
  {
    text: "contact",
    section: "phone",
  },
  {
    text: "executive summary",
    section: "summary",
  },
  {
    text: "work experience",
    section: "workExperienceArray",
  },
  {
    text: "education",
    section: "education",
  },
  {
    text: "skills",
    section: "primarySkills",
  },
];
const components: any = {
  shortName: {
    styles:
      "h-8 w-8 my-8 border text-xl p-10 -ml-2 translate-x-2/4 font-semibold flex justify-center items-center rounded-full bg-gray-900 text-white text-center",
    tag: "span",
  },
  name: {
    styles:
      "text-4xl text-gray-950 font-bold flex justify-center items-center w-full mb-2",
    tag: "span",
  },
  jobTitle: {
    tag: "span",
    styles:
      "text-base flex text-gray-950 justify-center items-center w-full mb-2",
  },
  contact: {
    styles: "",
    elements: [
      {
        id: "phone",
        styles: "text-xs whitespace-nowrap mt-2 text-gray-950",
        tag: "span",
      },
      {
        id: "email",
        styles: "text-xs whitespace-nowrap mt-2 text-gray-950",
        tag: "span",
      },
      {
        id: "linkedIn",
        styles: "text-xs whitespace-nowrap mt-2 text-gray-950",
        tag: "span",
      },
    ],
  },
  primarySkills: {
    styles:
      "text-xs mt-2 before:content-['\\2022'] before:text-gray-950 text-gray-950 before:mr-2",
    tag: "span",
  },
  summary: { styles: "text-justify text-gray-950 mb-4 text-xs", tag: "span" },
  workExperienceArray: {
    styles: "",
    elements: [
      {
        id: "title",
        styles: "text-base font-bold w-full text-gray-950",
        tag: "span",
      },
      {
        styles: "flex gap-1 font-semibold pb-2 text-xs flex-wrap text-gray-950",
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
              "before:content-['\\2758'] before:mr-2 after:content-['\\2758'] after:ml-2 text-gray-950",
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
          "text-xs text-justify pb-1 before:content-['\\2022'] before:mr-2 text-gray-950",
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
          "bg-gray-200 flex flex-col w-[30%] p-4 rounded-md text-gray-950",
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
                  "text-xs before:content-['\\268A'] before:mr-2 text-gray-950",
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

const templateLayout: any = {
  styles: "w-full",
  fragment: {
    styles: "flex flex-row bg-white fragment",
    sideBar: {
      styles: "bg-[#e2e2e2] w-[30%] flex flex-col justify-start px-6",
      elements: [
        {
          id: "shortName",
        },
        {
          id: "phone",
        },
        {
          id: "email",
        },
        {
          id: "linkedin",
        },
        {
          id: "primarySkills",
        },
      ],
    },

    body: {
      styles:
        "text-black w-[70%] flex-1 flex flex-col justify-start items-start px-6 my-6",
      elements: [
        {
          id: "name",
        },
        {
          id: "jobTitle",
        },
        {
          id: "summary",
        },
        {
          id: "workExperienceArray",
        },
        {
          id: "education",
        },
      ],
    },
  },
};

export const template = {
  components,
  templateLayout,
  cvHeadings,
};
