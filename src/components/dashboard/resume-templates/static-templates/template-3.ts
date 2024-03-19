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
        styles:
          "text-xs mt-2 flex break-all before:aspect-square before:break-normal items-center before:mr-2  text-gray-100 before:w-4 before:h-4 before:bg-no-repeat before:bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCAyNCAyNCIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZT0id2hpdGUiIGNsYXNzPSJ3LTYgaC02Ij4KICA8cGF0aCBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGQ9Ik0yLjI1IDYuNzVjMCA4LjI4NCA2LjcxNiAxNSAxNSAxNWgyLjI1YTIuMjUgMi4yNSAwIDAgMCAyLjI1LTIuMjV2LTEuMzcyYzAtLjUxNi0uMzUxLS45NjYtLjg1Mi0xLjA5MWwtNC40MjMtMS4xMDZjLS40NC0uMTEtLjkwMi4wNTUtMS4xNzMuNDE3bC0uOTcgMS4yOTNjLS4yODIuMzc2LS43NjkuNTQyLTEuMjEuMzhhMTIuMDM1IDEyLjAzNSAwIDAgMS03LjE0My03LjE0M2MtLjE2Mi0uNDQxLjAwNC0uOTI4LjM4LTEuMjFsMS4yOTMtLjk3Yy4zNjMtLjI3MS41MjctLjczNC40MTctMS4xNzNMNi45NjMgMy4xMDJhMS4xMjUgMS4xMjUgMCAwIDAtMS4wOTEtLjg1Mkg0LjVBMi4yNSAyLjI1IDAgMCAwIDIuMjUgNC41djIuMjVaIiAvPgo8L3N2Zz4K')]",
        tag: "span",
      },
      {
        id: "email",
        styles:
          "text-xs mt-2 flex break-all before:aspect-square before:break-normal items-center before:mr-2 text-gray-100 before:w-4 before:h-4 before:bg-no-repeat before:bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCAyNCAyNCIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZT0id2hpdGUiIGNsYXNzPSJ3LTYgaC02Ij4KICA8cGF0aCBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGQ9Ik0yMS43NSA2Ljc1djEwLjVhMi4yNSAyLjI1IDAgMCAxLTIuMjUgMi4yNWgtMTVhMi4yNSAyLjI1IDAgMCAxLTIuMjUtMi4yNVY2Ljc1bTE5LjUgMEEyLjI1IDIuMjUgMCAwIDAgMTkuNSA0LjVoLTE1YTIuMjUgMi4yNSAwIDAgMC0yLjI1IDIuMjVtMTkuNSAwdi4yNDNhMi4yNSAyLjI1IDAgMCAxLTEuMDcgMS45MTZsLTcuNSA0LjYxNWEyLjI1IDIuMjUgMCAwIDEtMi4zNiAwTDMuMzIgOC45MWEyLjI1IDIuMjUgMCAwIDEtMS4wNy0xLjkxNlY2Ljc1IiAvPgo8L3N2Zz4=')]",
        tag: "span",
      },
      {
        id: "linkedIn",
        styles:
          "text-xs mt-2 flex break-all before:aspect-square before:break-normal text-gray-100  before:w-3.5 before:h-3 items-center before:border-gray-300 flex before:text-[8px] before:font-semibold  before:border-[1.5px] before:p-1.5  before:flex before:justify-center before:rounded-full before:items-center flex before:mr-2 before:content-['in']",
        tag: "span",
      },
      {
        id: "address",
        styles:
          "text-xs mt-2 flex break-all before:aspect-square before:break-normal items-center before:mr-2 text-gray-100 before:w-4 before:h-4 before:bg-no-repeat before:bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCAyNCAyNCIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZT0id2hpdGUiIGNsYXNzPSJ3LTYgaC02Ij4KICA8cGF0aCBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGQ9Im0yLjI1IDEyIDguOTU0LTguOTU1Yy40NC0uNDM5IDEuMTUyLS40MzkgMS41OTEgMEwyMS43NSAxMk00LjUgOS43NXYxMC4xMjVjMCAuNjIxLjUwNCAxLjEyNSAxLjEyNSAxLjEyNUg5Ljc1di00Ljg3NWMwLS42MjEuNTA0LTEuMTI1IDEuMTI1LTEuMTI1aDIuMjVjLjYyMSAwIDEuMTI1LjUwNCAxLjEyNSAxLjEyNVYyMWg0LjEyNWMuNjIxIDAgMS4xMjUtLjUwNCAxLjEyNS0xLjEyNVY5Ljc1TTguMjUgMjFoOC4yNSIgLz4KPC9zdmc+')]",
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
    styles: "text-justify my-y text-xs text-gray-950/80",
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
                styles: "text-xs text-gray-950/80",
                tag: "span",
              },
              {
                id: "toMonth",
                styles:
                  "text-xs before:content-['-'] before:text-gray-950/80 text-gray-950/80 before:mr-2",
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
          id: "address",
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
