const cvHeadings: any = [
  {
    text: "contact",
    section: "phone",
    styles:
      "font-semibold uppercase text-gray-100 px-3 py-1 bg-gray-950/80 flex items-center text-sm w-full my-2",
    attributes: [{ "icon-color": "white" }],
  },
  {
    text: "executive summary",
    section: "summary",
    styles:
      "font-semibold uppercase text-gray-100 px-3 py-1 bg-gray-950/80 flex items-center text-sm w-full",
    attributes: [{ "icon-color": "white" }],
  },
  {
    text: "work experience",
    section: "workExperienceArray",
    styles:
      "font-semibold uppercase text-gray-100 px-3 py-1 bg-gray-950/80 flex items-center  text-sm w-full",
    attributes: [{ "icon-color": "white" }],
  },
  {
    text: "education",
    section: "education",
    attributes: [{ "icon-color": "white" }],
    styles:
      "font-semibold uppercase text-gray-100 px-3 py-1 bg-gray-950/80 flex items-center text-sm border-t-2 border-b-2 w-full",
  },
  {
    text: "skills",
    section: "primarySkills",
    attributes: [{ "icon-color": "white" }],
    styles:
      "font-semibold uppercase text-gray-100 px-3 py-1 bg-gray-950/80 flex items-center  text-sm border-t-2 border-b-2  w-full my-2",
  },
];
const components: any = {
  shortName: {
    styles:
      "h-8 w-8 my-8 border text-xl p-10 ml-4 translate-x-2/4 font-semibold flex justify-center items-center rounded-full bg-gray-950/80 text-white text-center",
    tag: "span",
  },
  name: {
    styles:
      "text-2xl text-gray-950/80 font-bold flex justify-center items-center w-full mb-2",
    tag: "span",
  },
  jobTitle: {
    tag: "span",
    styles:
      "text-base flex text-gray-950/80 justify-center items-center w-full mb-2",
  },
  contact: {
    styles: "",
    elements: [
      {
        id: "phone",
        styles:
          "text-xs flex break-all before:break-normal mt-2 text-gray-950/80",
        tag: "span",
      },
      {
        id: "email",
        styles:
          "text-xs flex break-all before:break-normal mt-2 text-gray-950/80",
        tag: "span",
      },
      {
        id: "linkedIn",
        styles:
          "text-xs flex break-all before:break-normal mt-2 text-gray-950/80",
        tag: "span",
      },
    ],
  },
  primarySkills: {
    styles:
      "text-xs mt-2 before:content-['\\2022'] flex before:text-gray-950/80 text-gray-950/80 before:mr-2",
    tag: "span",
  },
  summary: {
    styles: "text-justify text-gray-950/80 my-2 text-xs",
    tag: "span",
  },
  workExperienceArray: {
    styles: "",
    elements: [
      {
        id: "title",
        styles: "text-base font-bold w-full mt-2 text-gray-950/80",
        tag: "span",
      },
      {
        styles:
          "flex gap-1 font-semibold pb-2 text-xs flex-wrap text-gray-950/80",
        tag: "div",
        container: [
          { id: "fromMonth", styles: "text-gray-950/80", tag: "span" },
          { id: "fromYear", styles: "text-gray-950/80", tag: "span" },
          {
            id: "toMonth",
            styles: "before:content-['\\268A'] before:mr-1 text-gray-950/80",
            tag: "span",
          },
          { id: "toYear", styles: "text-gray-950/80", tag: "span" },
          {
            id: "company",
            styles:
              "before:content-['\\2758'] before:mr-2 after:content-['\\2758'] after:ml-2 text-gray-950/80",
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
          "text-xs flex text-justify pb-1 before:content-['\\2022'] before:mr-2 text-gray-950/80",
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
          "bg-gray-200 flex flex-col w-[30%] p-4 rounded-md text-gray-950/80",
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
            styles: "flex flex-row gap-2 italic text-gray-950/80",
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
                  "text-xs before:content-['\\268A'] before:mr-2 text-gray-950/80",
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
  attributes: [{ "template-no": "1" }],
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
          id: "linkedIn",
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
