const cvHeadings: any = [
  {
    text: "contact",
    section: "phone",
    headingKey: "contact",
    styles:
      "font-semibold uppercase text-gray-100 flex items-center text-base py-0.5 w-full border-b-2 border-white my-2",
    attributes: [{ "icon-color": "white" }],
  },
  {
    text: "executive summary",
    section: "summary",
    headingKey: "summary",

    styles:
      "font-semibold uppercase text-gray-950/80 flex items-center text-base py-0.5 w-full",
    attributes: [{ "icon-color": "black" }],
  },
  {
    text: "work experience",
    section: "workExperienceArray",
    headingKey: "workExperienceArray",

    styles:
      "font-semibold uppercase text-gray-950/80 flex items-center text-base py-0.5 w-full",
    attributes: [{ "icon-color": "black" }],
  },
  {
    text: "education",
    section: "education",
    headingKey: "education",

    attributes: [{ "icon-color": "black" }],
    styles:
      "font-semibold uppercase text-gray-950/80 flex items-center text-base py-0.5 w-full",
  },
  {
    text: "skills",
    section: "primarySkills",
    headingKey: "primarySkills",

    attributes: [{ "icon-color": "white" }],
    styles:
      "font-semibold uppercase text-gray-100 flex items-center text-md border-b-2 border-white py-0.5 w-full my-2",
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
      "text-2xl font-bold flex justify-left text-gray-950/80 items-center w-full mb-2",
    tag: "span",
  },
  jobTitle: {
    tag: "span",
    styles:
      "text-base flex justify-left items-center text-gray-950/80 w-full mb-2",
  },
  contact: {
    styles: "",
    elements: [
      {
        id: "phone",
        styles: "text-xs mt-2 flex break-all before:break-normal text-gray-100",
        tag: "span",
      },
      {
        id: "email",
        styles: "text-xs mt-2 flex break-all before:break-normal text-gray-100",
        tag: "span",
      },
      {
        id: "linkedIn",
        styles: "text-xs mt-2 flex break-all before:break-normal text-gray-100",
        tag: "span",
      },
    ],
  },
  primarySkills: {
    styles:
      "text-xs flex mt-2 text-gray-100 before:content-['\\2022'] before:mr-2",
    tag: "span",
  },
  summary: {
    styles: "text-justify mb-4 text-xs text-gray-950/80",
    tag: "span",
  },
  workExperienceArray: {
    styles: "",
    elements: [
      {
        id: "title",
        styles: "text-base mt-2 text-gray-950/80 font-bold w-full",
        tag: "span",
      },
      {
        styles: "flex gap-1 font-semibold pb-2 text-xs flex-wrap",
        tag: "div",
        container: [
          { id: "fromMonth", styles: "text-gray-950/80", tag: "span" },
          { id: "fromYear", styles: "text-gray-950/80", tag: "span" },
          {
            id: "toMonth",
            styles: "before:content-['\\268A'] text-gray-950/80 before:mr-1",
            tag: "span",
          },
          { id: "toYear", styles: "text-gray-950/80", tag: "span" },
          {
            id: "company",
            styles:
              "before:content-['\\2758'] before:mr-2 text-gray-950/80 after:content-['\\2758'] after:ml-2",
            tag: "span",
          },
          { id: "cityState", styles: "text-gray-950/80", tag: "span" },
          { id: "country", styles: "text-gray-950/80", tag: "span" },
          // { id: "isContinue", styles: "", tag: "span" },
        ],
      },
      {
        id: "achievements",
        styles:
          "text-xs flex text-justify pb-1 text-gray-950/80 before:content-['\\2022'] before:mr-2",
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
        styles: "bg-gray-200 flex flex-col w-[30%] p-4 rounded-md",
        container: [
          {
            id: "educationLevel",
            styles: "font-semibold text-base text-gray-950/80",
            tag: "span",
          },
          {
            id: "fieldOfStudy",
            styles: "text-xs font-semibold text-gray-950/80",
            tag: "span",
          },
          {
            id: "schoolName",
            styles: "italic text-xs font-normal text-gray-950/80",
            tag: "span",
          },
          {
            id: "schoolLocation",
            styles: "text-xs italic font-normal text-gray-950/80",
            tag: "span",
          },
          {
            styles: "flex flex-row gap-2 italic",
            tag: "div",
            container: [
              {
                id: "fromMonth",
                styles: "text-xs text-gray-950/80",
                tag: "span",
              },
              {
                id: "fromYear",
                styles: "text-xs text-gray-950/80",
                tag: "span",
              },
              {
                id: "toMonth",
                styles:
                  "text-xs before:content-['\\268A'] text-gray-950/80 before:mr-2",
                tag: "span",
              },
              { id: "toYear", styles: "text-xs text-gray-950/80", tag: "span" },
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
  attributes: [{ "template-no": "4" }],
  fragment: {
    styles: "flex flex-row bg-white fragment",
    sideBar: {
      styles: "bg-[#323B4C] w-3/12 flex flex-col justify-start px-4",
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
          id: "linkedIn",
        },
        {
          id: "primarySkills",
        },
      ],
    },

    body: {
      styles:
        "text-black w-9/12 flex-1 flex flex-col justify-start items-start px-6 my-6",
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

export const template = { templateLayout, components, cvHeadings };
