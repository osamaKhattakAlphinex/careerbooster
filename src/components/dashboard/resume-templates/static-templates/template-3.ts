const cvHeadings: any = [
  {
    text: "contact",
    section: "phone",
    headingKey: "contact",
    styles:
      "font-semibold uppercase text-gray-100 flex items-center text-base py-1 w-full border-b-2 border-white my-2",
    attributes: [{ "icon-color": "white" }],
  },
  {
    text: "executive summary",
    section: "summary",
    headingKey: "summary",

    styles:
      "font-semibold uppercase text-gray-950/80 flex items-center text-base py-1 w-full border-b-2 border-gray-950/80",
    attributes: [{ "icon-color": "black" }],
  },
  {
    text: "work experience",
    section: "workExperienceArray",
    headingKey: "workExperienceArray",

    styles:
      "font-semibold uppercase text-gray-950/80 flex items-center text-base py-1 w-full border-b-2 border-gray-950/80",
    attributes: [{ "icon-color": "black" }],
  },
  {
    text: "education",
    section: "education",
    headingKey: "education",

    attributes: [{ "icon-color": "black" }],
    styles:
      "font-semibold uppercase text-gray-950/80 flex items-center text-base py-1 w-full border-b-2 border-gray-950/80",
  },
  {
    text: "skills",
    section: "primarySkills",
    headingKey: "primarySkills",

    attributes: [{ "icon-color": "white" }],
    styles:
      "font-semibold uppercase text-gray-100 flex items-center text-md border-b-2 border-white py-1 w-full my-2",
  },
  {
    text: "certificates",
    section: "certifications",
    headingKey: "certifications",
    styles:
      "font-semibold uppercase text-gray-950/80 flex items-center text-base py-1 w-full border-b-2 border-gray-950/80",

    attributes: [{ "icon-color": "black" }],
  },
  {
    text: "awards",
    section: "awards",
    headingKey: "awards",
    styles:
      "font-semibold uppercase text-gray-950/80 flex items-center text-base py-1 w-full border-b-2 border-gray-950/80",

    attributes: [{ "icon-color": "black" }],
  },
  {
    text: "publications",
    section: "publications",
    headingKey: "publications",
    styles:
      "font-semibold uppercase text-gray-950/80 flex items-center text-base py-1 w-full border-b-2 border-gray-950/80",

    attributes: [{ "icon-color": "black" }],
  },
  {
    text: "languages",
    section: "languages",
    headingKey: "languages",
    styles:
      "font-semibold uppercase text-gray-100 flex items-center text-base py-1 w-full border-b-2 border-white my-2",
    attributes: [{ "icon-color": "white" }],
  },
  {
    text: "references",
    section: "references",
    headingKey: "references",
    styles:
      "font-semibold uppercase text-gray-950/80 flex items-center text-base py-1 w-full border-b-2 border-gray-950/80",
    attributes: [{ "icon-color": "black" }],
  },
  {
    text: "interests",
    section: "interests",
    headingKey: "interests",
    styles:
      "font-semibold uppercase text-gray-100 flex items-center text-base py-1 w-full border-b-2 border-white my-2",
    attributes: [{ "icon-color": "white" }],
  },
  {
    text: "Trainings",
    section: "trainings",
    headingKey: "trainings",
    styles:
      "font-semibold uppercase text-gray-950/80 flex items-center text-base py-1 w-full border-b-2 border-gray-950/80",
    attributes: [{ "icon-color": "black" }],
  },
  {
    text: "Projects",
    section: "projects",
    headingKey: "projects",
    styles:
      "font-semibold uppercase text-gray-950/80 flex items-center text-base py-1 w-full border-b-2 border-gray-950/80",
    attributes: [{ "icon-color": "black" }],
  },
];

const components: any = {
  shortName: {
    styles:
      "h-8 w-8 my-8 border text-xl p-10 ml-2 translate-x-2/4 font-semibold flex justify-center items-center rounded-full bg-gray-900 text-white text-center",
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
        styles:
          "text-xs mt-2 flex break-all before:aspect-square before:break-normal items-center before:mr-2  text-gray-100 before:w-4 before:h-4 before:bg-no-repeat before:bg-[url('data:image/svg+xml;base64,IDxzdmcKICAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgIHZpZXdCb3g9IjAgMCAyNCAyNCIKICAgIGZpbGw9IiNmZmZmZmYiCiAgICBjbGFzc05hbWU9InctNCBoLTQiCiAgPgogICAgPHBhdGgKICAgICAgZmlsbFJ1bGU9ImV2ZW5vZGQiCiAgICAgIGQ9Ik0xLjUgNC41YTMgMyAwIDAgMSAzLTNoMS4zNzJjLjg2IDAgMS42MS41ODYgMS44MTkgMS40MmwxLjEwNSA0LjQyM2ExLjg3NSAxLjg3NSAwIDAgMS0uNjk0IDEuOTU1bC0xLjI5My45N2MtLjEzNS4xMDEtLjE2NC4yNDktLjEyNi4zNTJhMTEuMjg1IDExLjI4NSAwIDAgMCA2LjY5NyA2LjY5N2MuMTAzLjAzOC4yNS4wMDkuMzUyLS4xMjZsLjk3LTEuMjkzYTEuODc1IDEuODc1IDAgMCAxIDEuOTU1LS42OTRsNC40MjMgMS4xMDVjLjgzNC4yMDkgMS40Mi45NTkgMS40MiAxLjgyVjE5LjVhMyAzIDAgMCAxLTMgM2gtMi4yNUM4LjU1MiAyMi41IDEuNSAxNS40NDggMS41IDYuNzVWNC41WiIKICAgICAgY2xpcFJ1bGU9ImV2ZW5vZGQiCiAgICAvPgogIDwvc3ZnPg==')]",
        tag: "span",
      },
      {
        id: "email",
        styles:
          "text-xs mt-2 flex break-all before:aspect-square before:break-normal items-center before:mr-2 text-gray-100 before:w-4 before:h-4 before:bg-no-repeat before:bg-[url('data:image/svg+xml;base64,IDxzdmcKICAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgIHZpZXdCb3g9IjAgMCAyNCAyNCIKICAgIGZpbGw9IiNmZmZmZmYiCiAgICBjbGFzc05hbWU9InctNCBoLTQiCiAgPgogICAgPHBhdGggZD0iTTEuNSA4LjY3djguNThhMyAzIDAgMCAwIDMgM2gxNWEzIDMgMCAwIDAgMy0zVjguNjdsLTguOTI4IDUuNDkzYTMgMyAwIDAgMS0zLjE0NCAwTDEuNSA4LjY3WiIgLz4KICAgIDxwYXRoIGQ9Ik0yMi41IDYuOTA4VjYuNzVhMyAzIDAgMCAwLTMtM2gtMTVhMyAzIDAgMCAwLTMgM3YuMTU4bDkuNzE0IDUuOTc4YTEuNSAxLjUgMCAwIDAgMS41NzIgMEwyMi41IDYuOTA4WiIgLz4KICA8L3N2Zz4=')]",
        tag: "span",
      },
      {
        id: "linkedIn",
        styles:
          "text-xs mt-2 flex break-all before:aspect-square before:break-normal text-gray-100 before:w-7 before:h-7 items-center flex before:justify-center before:items-center flex before:content-[url('data:image/svg+xml;base64,ICA8c3ZnCiAgICB2aWV3Qm94PSIwIDAgMjQgMjQiCiAgICBjbGFzc05hbWU9InctNSBoLTUiCiAgICB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiAgICBmaWxsPSJjdXJyZW50Q29sb3IiCiAgPgogICAgPGcgaWQ9IlNWR1JlcG9fYmdDYXJyaWVyIiBzdHJva2Utd2lkdGg9IjAiPjwvZz4KICAgIDxnCiAgICAgIGlkPSJTVkdSZXBvX3RyYWNlckNhcnJpZXIiCiAgICAgIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIKICAgICAgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIKICAgID48L2c+CiAgICA8ZyBpZD0iU1ZHUmVwb19pY29uQ2FycmllciI+CiAgICAgIDxwYXRoCiAgICAgICAgZmlsbD0iI2ZmZmZmZiIKICAgICAgICBkPSJNMTIuMjI1IDEyLjIyNWgtMS43NzhWOS40NGMwLS42NjQtLjAxMi0xLjUxOS0uOTI1LTEuNTE5LS45MjYgMC0xLjA2OC43MjQtMS4wNjggMS40N3YyLjgzNEg2LjY3NlY2LjQ5OGgxLjcwN3YuNzgzaC4wMjRjLjM0OC0uNTk0Ljk5Ni0uOTUgMS42ODQtLjkyNSAxLjgwMiAwIDIuMTM1IDEuMTg1IDIuMTM1IDIuNzI4bC0uMDAxIDMuMTR6TTQuNjcgNS43MTVhMS4wMzcgMS4wMzcgMCAwMS0xLjAzMi0xLjAzMWMwLS41NjYuNDY2LTEuMDMyIDEuMDMyLTEuMDMyLjU2NiAwIDEuMDMxLjQ2NiAxLjAzMiAxLjAzMiAwIC41NjYtLjQ2NiAxLjAzMi0xLjAzMiAxLjAzMnptLjg4OSA2LjUxaC0xLjc4VjYuNDk4aDEuNzh2NS43Mjd6TTEzLjExIDJIMi44ODVBLjg4Ljg4IDAgMDAyIDIuODY2djEwLjI2OGEuODguODggMCAwMC44ODUuODY2aDEwLjIyNmEuODgyLjg4MiAwIDAwLjg4OS0uODY2VjIuODY1YS44OC44OCAwIDAwLS44ODktLjg2NHoiCiAgICAgID48L3BhdGg+CiAgICA8L2c+CiAgPC9zdmc+')]",
        tag: "a",
      },
      {
        id: "address",
        styles:
          "text-xs mt-2 flex break-all before:aspect-square before:break-normal items-center before:mr-2 text-gray-100 before:w-4 before:h-4 before:bg-no-repeat before:bg-[url('data:image/svg+xml;base64,IDxzdmcKICAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgIHZpZXdCb3g9IjAgMCAyNCAyNCIKICAgIGZpbGw9IiNmZmZmZmYiCiAgICBjbGFzc05hbWU9InctNCBoLTQiCiAgPgogICAgPHBhdGggZD0iTTExLjQ3IDMuODQxYS43NS43NSAwIDAgMSAxLjA2IDBsOC42OSA4LjY5YS43NS43NSAwIDEgMCAxLjA2LTEuMDYxbC04LjY4OS04LjY5YTIuMjUgMi4yNSAwIDAgMC0zLjE4MiAwbC04LjY5IDguNjlhLjc1Ljc1IDAgMSAwIDEuMDYxIDEuMDZsOC42OS04LjY4OVoiIC8+CiAgICA8cGF0aCBkPSJtMTIgNS40MzIgOC4xNTkgOC4xNTljLjAzLjAzLjA2LjA1OC4wOTEuMDg2djYuMTk4YzAgMS4wMzUtLjg0IDEuODc1LTEuODc1IDEuODc1SDE1YS43NS43NSAwIDAgMS0uNzUtLjc1di00LjVhLjc1Ljc1IDAgMCAwLS43NS0uNzVoLTNhLjc1Ljc1IDAgMCAwLS43NS43NVYyMWEuNzUuNzUgMCAwIDEtLjc1Ljc1SDUuNjI1YTEuODc1IDEuODc1IDAgMCAxLTEuODc1LTEuODc1di02LjE5OGEyLjI5IDIuMjkgMCAwIDAgLjA5MS0uMDg2TDEyIDUuNDMyWiIgLz4KICA8L3N2Zz4=')]",
        tag: "span",
      },
    ],
  },

  languages: {
    styles: "",
    elements: [
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
  primarySkills: {
    styles:
      "text-xs flex mt-2 text-gray-100 before:content-['\\2022'] before:mr-2",
    tag: "span",
  },
  summary: {
    styles: "text-justify my-2 text-xs text-gray-950/80",
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
            styles:
              "before:content-['-'] before:w-4 before:h-4 before:text-gray-950/80 text-gray-950/80 before:mr-1",
            tag: "span",
          },
          { id: "toYear", styles: "text-gray-950/80", tag: "span" },
          {
            id: "company",
            styles:
              "before:content-['|'] before:w-4 before:h-4 before:text-gray-950/80 before:mr-2 text-gray-950/80",
            tag: "span",
          },
          {
            id: "cityState",
            styles:
              "text-gray-950/80 before:content-['|'] before:w-4 before:h-4 before:text-gray-950/80 before:mr-2",
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
                styles:
                  "text-xs after:content-['-'] after:text-gray-950/80 after:ml-2 text-gray-950/80",
                tag: "span",
              },
              {
                id: "toMonth",
                styles: "text-xs text-gray-950/80 ",
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
};

const templateLayout: any = {
  styles: "w-full",
  attributes: [{ "template-no": "4" }],
  fragment: {
    styles: "flex flex-row bg-white fragment",
    sideBar: {
      styles: "bg-[#323B4C] w-[28%] flex flex-col justify-start px-4",
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
        "text-black w-[72%] flex-1 flex flex-col justify-start items-start px-6 my-6",
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
          id: "projects",
        },
        {
          id: "references",
        },
      ],
    },
  },
};

const GenerationOrder = [
  "shortName",
  "name",
  "jobTitle",
  "contact",
  "primarySkills",
  "interests",
  "languages",
  "summary",
  "workExperienceArray",
  "publications",
  "certifications",
  "trainings",
  "projects",
  "awards",
  "references",
  "education",
];
export const template = {
  templateLayout,
  components,
  cvHeadings,
  GenerationOrder,
};
