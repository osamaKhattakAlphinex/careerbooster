const cvHeadings: any = [
  {
    text: "",
    section: "phone",
    headingKey: "contact",
    styles: "",
    attributes: [],
  },
  {
    text: "executive summary",
    section: "summary",
    headingKey: "summary",
    styles:
      "font-semibold border-t-2 border-b-2 border-gray-950/80 mt-2 flex flex-row items-center uppercase text-base text-gray-950/80 py-0.5",
    attributes: [{ "icon-color": "black" }],
  },
  {
    text: "work experience",
    section: "workExperienceArray",
    headingKey: "workExperienceArray",
    attributes: [{ "icon-color": "black" }],
    styles:
      "font-semibold uppercase border-t-2 border-b-2 border-gray-950/80 mt-2 text-base flex flex-row items-center text-gray-950/80 py-0.5",
  },
  {
    text: "skills",
    section: "primarySkills",
    headingKey: "primarySkills",
    styles:
      "font-semibold uppercase border-t-2 border-b-2 border-gray-950/80 mt-2 text-base flex flex-row items-center py-0.5 w-full text-gray-950/80 before:block",
    attributes: [{ "icon-color": "black" }],
  },
  {
    text: "education",
    section: "education",
    headingKey: "education",
    attributes: [{ "icon-color": "black" }],
    styles:
      "font-semibold border-t-2 border-b-2 border-gray-950/80 mt-2 w-full uppercase text-base flex flex-row items-center text-gray-950/80 py-0.5",
  },
  {
    text: "certificates",
    section: "certifications",
    headingKey: "certifications",
    styles:
      "font-semibold uppercase border-t-2 border-b-2 border-gray-950/80 mt-2 text-base flex flex-row items-center py-0.5 w-full text-gray-950/80 before:block",
    attributes: [{ "icon-color": "black" }],
  },
  {
    text: "awards",
    section: "awards",
    headingKey: "awards",
    styles:
      "font-semibold uppercase border-t-2 border-b-2 border-gray-950/80 mt-2 text-base flex flex-row items-center py-0.5 w-full text-gray-950/80 before:block",
    attributes: [{ "icon-color": "black" }],
  },
  {
    text: "publications",
    section: "publications",
    headingKey: "publications",
    styles:
      "font-semibold uppercase border-t-2 border-b-2 border-gray-950/80 mt-2 text-base flex flex-row items-center py-0.5 w-full text-gray-950/80 before:block",
    attributes: [{ "icon-color": "black" }],
  },
  {
    text: "languages",
    section: "languages",
    headingKey: "languages",
    styles:
      "font-semibold uppercase border-t-2 border-b-2 border-gray-950/80 mt-2 text-base flex flex-row items-center py-0.5 w-full text-gray-950/80 before:block",
    attributes: [{ "icon-color": "black" }],
  },
  {
    text: "references",
    section: "references",
    headingKey: "references",
    styles:
      "font-semibold uppercase border-t-2 border-b-2 border-gray-950/80 mt-2 text-base flex flex-row items-center py-0.5 w-full text-gray-950/80 before:block",
    attributes: [{ "icon-color": "black" }],
  },
  {
    text: "interests",
    section: "interests",
    headingKey: "interests",
    styles:
      "font-semibold uppercase border-t-2 border-b-2 border-gray-950/80 mt-2 text-base flex flex-row items-center py-0.5 w-full text-gray-950/80 before:block",
    attributes: [{ "icon-color": "black" }],
  },
  {
    text: "Trainings",
    section: "trainings",
    headingKey: "trainings",
    styles:
      "font-semibold uppercase border-t-2 border-b-2 border-gray-950/80 mt-2 text-base flex flex-row items-center py-0.5 w-full text-gray-950/80 before:block",
    attributes: [{ "icon-color": "black" }],
  },
  {
    text: "Projects",
    section: "projects",
    headingKey: "projects",
    styles:
      "font-semibold uppercase border-t-2 border-b-2 border-gray-950/80 mt-2 text-base flex flex-row items-center py-0.5 w-full text-gray-950/80 before:block",
    attributes: [{ "icon-color": "black" }],
  },
];

const templateLayout: any = {
  styles: "w-full",
  attributes: [{ "template-no": "8" }],

  fragment: {
    styles: "flex flex-col bg-white fragment py-5",
    header: {
      styles:
        "text-black relative m-2 flex flex-col w-[98%] justify-start items-start",
      elements: [
        {
          id: "name",
        },
        {
          id: "jobTitle",
        },
        {
          id: "shortName",
        },
      ],
    },
    contact: {
      styles:
        "flex flex-row flex-wrap text-base w-[98%] justify-between px-6 items-center m-2 p-3 gap-4",
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
      ],
    },
    summary: {
      styles: "bg-red text-black text-justify px-6",
      elements: [
        {
          id: "summary",
        },
      ],
    },
    skills: {
      styles:
        "bg-red text-black w-full flex-1 gap-2 flex flex-row flex-wrap justify-start items-start px-6 my-6",
      elements: [
        {
          id: "primarySkills",
        },
      ],
    },
    workExperienceArray: {
      styles: "flex flex-col px-6 w-full",

      elements: [
        {
          id: "workExperienceArray",
        },
      ],
    },
    publications: {
      styles: "flex flex-col px-6 w-full text-gray-950/80",
      elements: [
        {
          id: "publications",
        },
      ],
    },
    certifications: {
      styles: "flex flex-col px-6 w-full text-gray-950/80",
      elements: [
        {
          id: "certifications",
        },
      ],
    },
    awards: {
      styles: "flex flex-col px-6 w-full text-gray-950/80",
      elements: [
        {
          id: "awards",
        },
      ],
    },
    trainings: {
      styles: "flex flex-col px-6 w-full text-gray-950/80",
      elements: [
        {
          id: "trainings",
        },
      ],
    },
    languages: {
      styles:
        "text-black flex flex-wrap justify-start items-start gap-3 px-6 text-gray-950/80",
      elements: [
        {
          id: "languages",
        },
      ],
    },
    interests: {
      styles:
        "text-black flex flex-col justify-start items-start gap-3 px-6 text-gray-950/80",
      elements: [
        {
          id: "interests",
        },
      ],
    },
    projects: {
      styles: "flex flex-col px-6 w-full text-gray-950/80",
      elements: [
        {
          id: "projects",
        },
      ],
    },
    references: {
      styles:
        "text-black flex flex-wrap justify-start items-start gap-3 px-6 text-gray-950/80",
      elements: [
        {
          id: "references",
        },
      ],
    },
    education: {
      styles:
        "text-gray-950/80 flex flex-row flex-wrap justify-start items-start px-6 w-full",
      elements: [
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
      "h-8 w-8 absolute right-16 border text-xl p-10 -ml-2 translate-x-2/4 font-semibold flex justify-center items-center rounded-full bg-gray-900 text-white text-center",
    tag: "span",
  },
  name: {
    styles: "text-2xl font-bold flex text-gray-950/80 items-center w-full mx-6",
    tag: "span",
  },
  jobTitle: {
    tag: "span",
    styles: "text-base flex text-gray-950/80 w-full mb-2 px-6",
  },
  contact: {
    styles: "w-full",
    elements: [
      {
        id: "phone",
        styles:
          "text-xs text-gray-950/80 mt-2 before:aspect-square break-all before:break-normal before:content-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCAyNCAyNCIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZT0iY3VycmVudENvbG9yIiBjbGFzcz0idy02IGgtNiI+CiAgPHBhdGggc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBkPSJNMi4yNSA2Ljc1YzAgOC4yODQgNi43MTYgMTUgMTUgMTVoMi4yNWEyLjI1IDIuMjUgMCAwIDAgMi4yNS0yLjI1di0xLjM3MmMwLS41MTYtLjM1MS0uOTY2LS44NTItMS4wOTFsLTQuNDIzLTEuMTA2Yy0uNDQtLjExLS45MDIuMDU1LTEuMTczLjQxN2wtLjk3IDEuMjkzYy0uMjgyLjM3Ni0uNzY5LjU0Mi0xLjIxLjM4YTEyLjAzNSAxMi4wMzUgMCAwIDEtNy4xNDMtNy4xNDNjLS4xNjItLjQ0MS4wMDQtLjkyOC4zOC0xLjIxbDEuMjkzLS45N2MuMzYzLS4yNzEuNTI3LS43MzQuNDE3LTEuMTczTDYuOTYzIDMuMTAyYTEuMTI1IDEuMTI1IDAgMCAwLTEuMDkxLS44NTJINC41QTIuMjUgMi4yNSAwIDAgMCAyLjI1IDQuNXYyLjI1WiIgLz4KPC9zdmc+Cg==')] before:w-4 before:h-4 flex before:mr-2",
        tag: "span",
      },
      {
        id: "email",
        styles:
          "text-xs break-all before:break-normal before:aspect-square text-gray-950/80 mt-2 before:w-4 before:h-4 before:content-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCAyNCAyNCIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZT0iY3VycmVudENvbG9yIiBjbGFzcz0idy02IGgtNiI+CiAgPHBhdGggc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBkPSJNMjEuNzUgNi43NXYxMC41YTIuMjUgMi4yNSAwIDAgMS0yLjI1IDIuMjVoLTE1YTIuMjUgMi4yNSAwIDAgMS0yLjI1LTIuMjVWNi43NW0xOS41IDBBMi4yNSAyLjI1IDAgMCAwIDE5LjUgNC41aC0xNWEyLjI1IDIuMjUgMCAwIDAtMi4yNSAyLjI1bTE5LjUgMHYuMjQzYTIuMjUgMi4yNSAwIDAgMS0xLjA3IDEuOTE2bC03LjUgNC42MTVhMi4yNSAyLjI1IDAgMCAxLTIuMzYgMEwzLjMyIDguOTFhMi4yNSAyLjI1IDAgMCAxLTEuMDctMS45MTZWNi43NSIgLz4KPC9zdmc+Cg==')] flex before:mr-2",
        tag: "span",
      },
      {
        id: "linkedIn",
        styles:
          "text-xs break-all before:break-normal before:aspect-square before:p-1 text-gray-950/80 mt-2 before:w-4 before:h-4 before:font-semibold flex before:text-[10px] before:content-['in'] before:border-[1.5px] before:border-[#333333] before:flex before:justify-center before:rounded-full before:items-center flex before:mr-2",
        tag: "span",
      },
      {
        id: "address",
        styles:
          "text-xs break-all before:break-normal before:aspect-square text-gray-950/80 mt-2 before:w-4 before:h-4 before:content-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCAyNCAyNCIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZT0iY3VycmVudENvbG9yIiBjbGFzcz0idy02IGgtNiI+CiAgPHBhdGggc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBkPSJtMi4yNSAxMiA4Ljk1NC04Ljk1NWMuNDQtLjQzOSAxLjE1Mi0uNDM5IDEuNTkxIDBMMjEuNzUgMTJNNC41IDkuNzV2MTAuMTI1YzAgLjYyMS41MDQgMS4xMjUgMS4xMjUgMS4xMjVIOS43NXYtNC44NzVjMC0uNjIxLjUwNC0xLjEyNSAxLjEyNS0xLjEyNWgyLjI1Yy42MjEgMCAxLjEyNS41MDQgMS4xMjUgMS4xMjVWMjFoNC4xMjVjLjYyMSAwIDEuMTI1LS41MDQgMS4xMjUtMS4xMjVWOS43NU04LjI1IDIxaDguMjUiIC8+Cjwvc3ZnPgo=')] flex before:mr-2",
        tag: "span",
      },
    ],
  },
  primarySkills: {
    styles: "text-xs text-gray-950/80 inline-block w-[32%]",
    tag: "span",
  },
  summary: {
    styles: "text-justify my-4 text-xs text-gray-950/80",
    tag: "span",
  },
  workExperienceArray: {
    styles: "my-2",
    elements: [
      {
        id: "title",
        styles: "text-base text-gray-950/80 mt-2 font-bold",
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
            styles:
              "before:content-['-'] before:w-4 before:h-4 before:text-gray-950/80 text-gray-950/80 before:mr-1",
            tag: "span",
          },
          { id: "toYear", styles: "text-gray-950/80", tag: "span" },
          {
            id: "company",
            styles:
              "before:content-['|'] before:w-4 before:h-4 before:text-gray-950/80 before:mr-2 before:mr-2 text-gray-950/80",
            tag: "span",
          },
          {
            id: "cityState",
            styles:
              "before:content-['|'] before:w-4 before:h-4 before:text-gray-950/80 before:mr-2 text-gray-950/80",
            tag: "span",
          },
          {
            id: "country",
            styles:
              "text-gray-950/80 before:content-['|'] before:w-4 before:h-4 before:text-gray-950/80 before:mr-2",
            tag: "span",
          },
          // { id: "isContinue", styles: "", tag: "span" },
        ],
      },
      {
        id: "achievements",
        styles:
          "text-xs flex text-justify text-gray-950/80 pb-1 before:content-['\\2022'] before:mr-2",
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
            styles: "font-semibold text-base",
            tag: "span",
          },
          { id: "fieldOfStudy", styles: "text-xs font-semibold", tag: "span" },
          {
            id: "schoolName",
            styles: "italic text-xs font-normal",
            tag: "span",
          },
          {
            id: "schoolLocation",
            styles: "text-xs italic font-normal",
            tag: "span",
          },
          {
            styles: "flex flex-row gap-2 italic",
            tag: "div",
            container: [
              { id: "fromMonth", styles: "text-xs", tag: "span" },
              {
                id: "fromYear",
                styles:
                  "text-xs after:content-['-'] after:w-4 after:h-4 after:text-gray-950/80 after:ml-2",
                tag: "span",
              },
              {
                id: "toMonth",
                styles: "text-xs",
                tag: "span",
              },
              { id: "toYear", styles: "text-xs", tag: "span" },
              // { id: "isContinue", styles: "", tag: "span" },
            ],
          },
        ],
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
  projects: {
    styles: "my-1",
    elements: [
      {
        id: "title",
        styles: "text-sm mt-1 font-semibold text-gray-950/80",
        tag: "span",
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
          "text-xs flex text-justify pb-1 before:content-['\\2022'] before:w-4 before:h-4 before:text-gray-950/80 before:mr-2 before:mr-2 text-gray-950/80",
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
  languages: {
    tag: "div",
    styles: "space-y-2",
    elements: [
      {
        tag: "div",
        styles:
          "bg-gray-200 flex flex-col w-[31%] space-y-2 p-4 rounded-md text-gray-950/80",
        container: [
          {
            id: "language",
            styles: "font-semibold text-sm text-gray-950/80",
            tag: "span",
          },
          {
            id: "proficiency",
            styles:
              "text-xs font-normal text-gray-950/80 before:w-max before:content-['Proficiency:'] before:mr-1 before:font-semibold",
            tag: "span",
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
  "summary",
  "workExperienceArray",
  "publications",
  "certifications",
  "awards",
  "trainings",
  "languages",
  "interests",
  "projects",
  "references",
  "education",
];
export const template = {
  components,
  templateLayout,
  cvHeadings,
  GenerationOrder,
};
