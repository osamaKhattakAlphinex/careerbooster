const cvHeadings: any = [
  {
    text: "contact",
    section: "phone",
    headingKey: "contact",

    attributes: [{ "icon-color": "white" }],
    styles:
      "font-semibold uppercase text-sm py-2 px-4 w-full text-center border-2 rounded-full flex items-center justify-center border-[#043382] mt-[166px] mb-2",
  },
  {
    text: "executive summary",
    section: "summary",
    headingKey: "summary",

    attributes: [{ "icon-color": "white" }],
    styles:
      "font-semibold uppercase text-sm py-2 text-white bg-[#043382] px-6 border-2 flex items-center justify-center rounded-full mt-[150px] mb-2",
  },
  {
    text: "work experience",
    section: "workExperienceArray",
    headingKey: "workExperienceArray",

    attributes: [{ "icon-color": "white" }],
    styles:
      "font-semibold uppercase text-sm py-2 text-white bg-[#043382] px-6 border-2 flex items-center justify-center rounded-full mb-2",
  },
  {
    text: "education",
    section: "education",
    headingKey: "education",

    attributes: [{ "icon-color": "white" }],
    styles:
      "font-semibold uppercase text-sm py-2 text-white bg-[#043382] border-2 px-6 flex items-center justify-center rounded-full my-4",
  },
  {
    text: "skills",
    section: "primarySkills",
    headingKey: "primarySkills",

    attributes: [{ "icon-color": "white" }],
    styles:
      "font-semibold uppercase text-sm py-2 text-white text-center border-2 flex flex-row justify-center items-center rounded-full border-[#043382] my-3",
  },
  {
    text: "certificates",
    section: "certifications",
    headingKey: "certifications",
    styles:
      "font-semibold uppercase text-sm py-2 text-white bg-[#043382] border-2 px-6 flex items-center justify-center rounded-full my-4",
    attributes: [{ "icon-color": "white" }],
  },
  {
    text: "awards",
    section: "awards",
    headingKey: "awards",
    styles:
      "font-semibold uppercase text-sm py-2 text-white bg-[#043382] border-2 px-6 flex items-center justify-center rounded-full my-4",
    attributes: [{ "icon-color": "white" }],
  },
  {
    text: "publications",
    section: "publications",
    headingKey: "publications",
    styles:
      "font-semibold uppercase text-sm py-2 text-white bg-[#043382] border-2 px-6 flex items-center justify-center rounded-full my-4",
    attributes: [{ "icon-color": "white" }],
  },
  {
    text: "languages",
    section: "languages",
    headingKey: "languages",
    styles:
      "font-semibold uppercase text-sm py-2 text-white text-center border-2 flex flex-row justify-center items-center rounded-full border-[#043382] my-3",
    attributes: [{ "icon-color": "white" }],
  },
  {
    text: "references",
    section: "references",
    headingKey: "references",
    styles:
      "font-semibold uppercase text-sm py-2 text-white bg-[#043382] border-2 px-6 flex items-center justify-center rounded-full my-4",
    attributes: [{ "icon-color": "white" }],
  },
  {
    text: "interests",
    section: "interests",
    headingKey: "interests",
    styles:
      "font-semibold uppercase text-sm py-2 text-white text-center border-2 flex flex-row justify-center items-center rounded-full border-[#043382] my-3",
    attributes: [{ "icon-color": "white" }],
  },
  {
    text: "Trainings",
    section: "trainings",
    headingKey: "trainings",
    styles:
      "font-semibold uppercase text-sm py-2 text-white bg-[#043382] border-2 px-6 flex items-center justify-center rounded-full my-4",
    attributes: [{ "icon-color": "white" }],
  },
];

const templateLayout: any = {
  styles: "w-full",
  attributes: [{ "template-no": "9" }],
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
      styles: "bg-gray-950 text-white w-[30%] flex flex-col justify-start px-4",
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
        {
          id: "languages",
        },
        {
          id: "interests",
        },
      ],
    },
    body: {
      styles:
        "text-black w-[70%] flex-1 flex flex-col justify-start items-start px-6 my-4",
      elements: [
        {
          id: "summary",
        },
        {
          id: "workExperienceArray",
        },
        {
          id: "publications",
        },
        {
          id: "certifications",
        },
        {
          id: "awards",
        },
        {
          id: "trainings",
        },

        {
          id: "references",
        },

        {
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
        styles:
          "text-xs mt-2 flex break-all before:break-normal before:aspect-square text-gray-100 before:bg-[#043382] before:content-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCAyNCAyNCIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZT0id2hpdGUiIGNsYXNzPSJ3LTYgaC02Ij4KICA8cGF0aCBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGQ9Ik0yLjI1IDYuNzVjMCA4LjI4NCA2LjcxNiAxNSAxNSAxNWgyLjI1YTIuMjUgMi4yNSAwIDAgMCAyLjI1LTIuMjV2LTEuMzcyYzAtLjUxNi0uMzUxLS45NjYtLjg1Mi0xLjA5MWwtNC40MjMtMS4xMDZjLS40NC0uMTEtLjkwMi4wNTUtMS4xNzMuNDE3bC0uOTcgMS4yOTNjLS4yODIuMzc2LS43NjkuNTQyLTEuMjEuMzhhMTIuMDM1IDEyLjAzNSAwIDAgMS03LjE0My03LjE0M2MtLjE2Mi0uNDQxLjAwNC0uOTI4LjM4LTEuMjFsMS4yOTMtLjk3Yy4zNjMtLjI3MS41MjctLjczNC40MTctMS4xNzNMNi45NjMgMy4xMDJhMS4xMjUgMS4xMjUgMCAwIDAtMS4wOTEtLjg1Mkg0LjVBMi4yNSAyLjI1IDAgMCAwIDIuMjUgNC41djIuMjVaIiAvPgo8L3N2Zz4K')]  before:rounded-full before:w-6 before:h-6 items-center before:p-1 before:mr-2",
        tag: "span",
      },
      {
        id: "email",
        styles:
          "text-xs mt-2 flex break-all before:break-normal before:aspect-square text-gray-100 before:bg-[#043382] before:content-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCAyNCAyNCIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZT0id2hpdGUiIGNsYXNzPSJ3LTYgaC02Ij4KICA8cGF0aCBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGQ9Ik0yMS43NSA2Ljc1djEwLjVhMi4yNSAyLjI1IDAgMCAxLTIuMjUgMi4yNWgtMTVhMi4yNSAyLjI1IDAgMCAxLTIuMjUtMi4yNVY2Ljc1bTE5LjUgMEEyLjI1IDIuMjUgMCAwIDAgMTkuNSA0LjVoLTE1YTIuMjUgMi4yNSAwIDAgMC0yLjI1IDIuMjVtMTkuNSAwdi4yNDNhMi4yNSAyLjI1IDAgMCAxLTEuMDcgMS45MTZsLTcuNSA0LjYxNWEyLjI1IDIuMjUgMCAwIDEtMi4zNiAwTDMuMzIgOC45MWEyLjI1IDIuMjUgMCAwIDEtMS4wNy0xLjkxNlY2Ljc1IiAvPgo8L3N2Zz4=')] before:rounded-full before:w-6 before:h-6 flex items-center before:p-1 before:mr-2",
        tag: "span",
      },
      {
        id: "linkedIn",
        styles:
          "text-xs mt-2 flex break-all before:break-normal text-gray-100 before:aspect-square before:bg-[#043382] before:w-6 before:h-6 flex before:text-xs before:content-['in'] before:flex before:justify-center before:rounded-full before:items-center flex before:mr-2",
        tag: "span",
      },
      {
        id: "address",
        styles:
          "text-xs mt-2 flex break-all before:break-normal text-gray-100 before:bg-[#043382] before:aspect-square before:rounded-full before:w-6 before:h-6 flex items-center before:p-1 before:mr-2 before:content-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCAyNCAyNCIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZT0id2hpdGUiIGNsYXNzPSJ3LTYgaC02Ij4KICA8cGF0aCBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGQ9Im0yLjI1IDEyIDguOTU0LTguOTU1Yy40NC0uNDM5IDEuMTUyLS40MzkgMS41OTEgMEwyMS43NSAxMk00LjUgOS43NXYxMC4xMjVjMCAuNjIxLjUwNCAxLjEyNSAxLjEyNSAxLjEyNUg5Ljc1di00Ljg3NWMwLS42MjEuNTA0LTEuMTI1IDEuMTI1LTEuMTI1aDIuMjVjLjYyMSAwIDEuMTI1LjUwNCAxLjEyNSAxLjEyNVYyMWg0LjEyNWMuNjIxIDAgMS4xMjUtLjUwNCAxLjEyNS0xLjEyNVY5Ljc1TTguMjUgMjFoOC4yNSIgLz4KPC9zdmc+')]",
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
        styles: "text-base font-semibold text-gray-950 mt-2",
        tag: "span",
      },
      {
        styles: "flex gap-1 font-semibold pb-2 text-gray-100 text-xs flex-wrap",
        tag: "div",
        container: [
          { id: "fromMonth", styles: "text-gray-950", tag: "span" },
          { id: "fromYear", styles: "text-gray-950", tag: "span" },
          {
            id: "toMonth",
            styles:
              "before:content-['-'] before:w-4 before:h-4 before:text-gray-950/80 before:mr-1 text-gray-950",
            tag: "span",
          },
          { id: "toYear", styles: "text-gray-950", tag: "span" },
          {
            id: "company",
            styles:
              "before:content-['|'] before:w-4 before:h-4 before:text-gray-950/80 before:mr-2 before:mr-2 text-gray-950",
            tag: "span",
          },
          {
            id: "cityState",
            styles:
              "text-gray-950 before:content-['|'] before:w-4 before:h-4 before:text-gray-950/80 before:mr-2",
            tag: "span",
          },
          {
            id: "country",
            styles:
              "text-gray-950 before:content-['|'] before:w-4 before:h-4 before:text-gray-950/80 before:mr-2",
            tag: "span",
          },
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

  publications: {
    styles: "my-1",
    elements: [
      {
        id: "title",
        styles: "text-sm mt-1 font-semibold text-gray-950/80",
        tag: "span",
      },
      {
        styles:
          "flex gap-1 font-semibold pb-2 text-xs flex-wrap text-gray-950/80",
        tag: "div",
        container: [
          { id: "date", styles: "text-gray-950/80", tag: "span" },
          {
            id: "publisher",
            styles:
              "text-gray-950/80 before:content-['|'] before:w-4 before:h-4 before:text-gray-950/80 before:mr-2",
            tag: "span",
          },
        ],
      },
      {
        id: "description",
        styles:
          "text-xs flex text-justify pb-1 before:content-['\\2022'] before:w-4 before:h-4 before:text-gray-950/80 before:mr-2 before:mr-2 text-gray-950/80",
        tag: "span",
      },
    ],
  },
  certifications: {
    styles: "my-1",
    elements: [
      {
        id: "title",
        styles: "text-sm mt-1 font-semibold text-gray-950/80",
        tag: "span",
      },
      {
        styles:
          "flex gap-1 font-semibold pb-2 text-xs flex-wrap text-gray-950/80",
        tag: "div",
        container: [
          { id: "date", styles: "text-gray-950/80", tag: "span" },
          {
            id: "issuingOrganization",
            styles:
              "text-gray-950/80 before:content-['|'] before:w-4 before:h-4 before:text-gray-950/80 before:mr-2",
            tag: "span",
          },
        ],
      },
      {
        id: "description",
        styles:
          "text-xs flex text-justify pb-1 before:content-['\\2022'] before:w-4 before:h-4 before:text-gray-950/80 before:mr-2 before:mr-2 text-gray-950/80",
        tag: "span",
      },
    ],
  },
  interests: {
    styles: "my-2",
    elements: [
      {
        id: "description",
        styles:
          "text-xs flex text-justify pb-1 before:content-['\\2022'] before:w-4 before:h-4 before:text-gray-100 before:mr-2 before:mr-2 text-gray-100",
        tag: "span",
      },
    ],
  },
  awards: {
    styles: "my-1",
    elements: [
      {
        id: "title",
        styles: "text-sm mt-1 font-semibold text-gray-950/80",
        tag: "span",
      },
      {
        styles:
          "flex gap-1 font-semibold pb-2 text-xs flex-wrap text-gray-950/80",
        tag: "div",
        container: [
          { id: "date", styles: "text-gray-950/80", tag: "span" },
          {
            id: "awardingOrganization",
            styles:
              "text-gray-950/80 before:content-['|'] before:w-4 before:h-4 before:text-gray-950/80 before:mr-2",
            tag: "span",
          },
        ],
      },
      {
        id: "description",
        styles:
          "text-xs flex text-justify pb-1 before:content-['\\2022'] before:w-4 before:h-4 before:text-gray-950/80 before:mr-2 before:mr-2 text-gray-950/80",
        tag: "span",
      },
    ],
  },
  trainings: {
    styles: "my-1",
    elements: [
      {
        id: "position",
        styles: "text-sm mt-1 font-semibold text-gray-950/80",
        tag: "span",
      },

      {
        styles:
          "flex gap-1 font-semibold pb-2 text-xs flex-wrap text-gray-950/80",
        tag: "div",
        container: [
          { id: "startDate", styles: "text-gray-950/80", tag: "span" },
          {
            id: "endDate",
            styles:
              "before:content-['-'] before:w-4 before:h-4 before:text-gray-950/80 before:mr-1 text-gray-950/80",
            tag: "span",
          },
          {
            id: "company",
            styles:
              "text-gray-950/80 before:content-['|'] before:w-4 before:h-4 before:text-gray-950/80 before:mr-2",
            tag: "span",
          },
        ],
      },
      {
        id: "description",
        styles:
          "text-xs flex text-justify pb-1 before:content-['\\2022'] before:w-4 before:h-4 before:text-gray-950/80 before:mr-2 before:mr-2 text-gray-950/80",
        tag: "span",
      },
    ],
  },

  languages: {
    tag: "div",
    styles: "",
    elements: [
      {
        tag: "div",
        styles: "flex flex-col border-b pb-2 text-gray-100",
        container: [
          {
            id: "language",
            styles: "font-semibold text-sm text-gray-100",
            tag: "span",
          },
          {
            id: "proficiency",
            styles:
              "text-xs font-normal text-gray-100 before:w-max before:content-['Proficiency:'] before:mr-1 before:font-semibold",
            tag: "span",
          },
        ],
      },
    ],
  },
  references: {
    tag: "div",
    styles: "",
    elements: [
      {
        tag: "div",
        styles:
          "bg-gray-200 flex flex-col w-[31%] p-4 rounded-md text-gray-950/80",
        container: [
          {
            id: "name",
            styles: "font-semibold text-base text-gray-950/80",
            tag: "span",
          },
          {
            id: "position",
            styles: "text-xs font-semibold text-gray-950/80",
            tag: "span",
          },
          {
            id: "company",
            styles: "italic text-xs font-normal text-gray-950/80",
            tag: "span",
          },
          {
            id: "contactInformation",
            styles: "text-xs italic font-normal text-gray-950/80",
            tag: "span",
          },
        ],
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
              {
                id: "fromYear",
                styles:
                  "text-xs text-gray-950 after:content-['-'] after:w-4 after:h-4 after:text-gray-950/80 after:ml-2",
                tag: "span",
              },
              {
                id: "toMonth",
                styles: "text-xs text-gray-950",
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
const GenerationOrder = [
  "shortName",
  "name",
  "jobTitle",
  "contact",
  "primarySkills",
  "languages",
  "interests",
  "summary",
  "workExperienceArray",
  "publications",
  "certifications",
  "awards",
  "trainings",
  "references",
  "education",
];
export const template = {
  components,
  templateLayout,
  cvHeadings,
  GenerationOrder,
};
