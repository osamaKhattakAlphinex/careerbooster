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
    attributes: [{ "icon-color": "black" }],
    styles:
      "font-semibold uppercase w-full text-base text-gray-950/80 mt-4 mb-2 border-y-[1.5px] py-1.5 border-gray-950/80 flex items-center",
  },
  {
    text: "work experience",
    headingKey: "workExperienceArray",
    attributes: [{ "icon-color": "black" }],
    section: "workExperienceArray",
    styles:
      "font-semibold uppercase w-full text-base text-gray-950/80 my-2 border-y-[1.5px] py-1.5 border-gray-950/80 flex items-center",
  },
  {
    attributes: [{ "icon-color": "black" }],
    text: "education",
    headingKey: "education",
    section: "education",
    styles:
      "font-semibold w-full uppercase text-base text-gray-950/80 my-2 border-y-[1.5px] py-1.5 border-gray-950/80 flex items-center",
  },
  {
    attributes: [{ "icon-color": "black" }],
    text: "skills",
    headingKey: "primarySkills",
    section: "primarySkills",
    styles:
      "font-semibold uppercase text-base my-2 w-full text-gray-950/80 border-y-[1.5px] py-1.5 border-gray-950/80 flex items-center",
  },
];

const templateLayout: any = {
  styles: "w-full",
  attributes: [{ "template-no": "8" }],

  fragment: {
    styles: "flex flex-col bg-white fragment fragmentDecor py-5",
    header: {
      styles: "text-black flex flex-col justify-start items-start ml-8 px-8",
      elements: [
        {
          id: "name",
        },
        {
          id: "jobTitle",
        },
      ],
    },

    contact: {
      styles:
        "flex flex-row flex-wrap text-base justify-between items-start px-8 gap-3 ml-8",
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
      styles: "text-xs text-gray-950/80/80 text-justify px-8 ml-8",
      elements: [
        {
          id: "summary",
        },
      ],
    },
    skills: {
      styles:
        "ml-8 text-black gap-2 flex flex-row flex-wrap justify-start items-start px-8",
      elements: [
        {
          id: "primarySkills",
        },
      ],
    },
    workExperienceArray: {
      styles: "flex flex-col px-8  ml-8",

      elements: [
        {
          id: "workExperienceArray",
        },
      ],
    },
    education: {
      styles:
        "text-gray-950/80 flex flex-row flex-wrap justify-start items-start px-8 ml-8",
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
    styles: "text-2xl font-bold flex text-gray-950/80 items-center w-full",
    tag: "span",
  },
  jobTitle: {
    tag: "span",
    styles: "text-base flex text-gray-950/80 w-full mb-2",
  },
  contact: {
    styles: "w-full border-y-2",
    elements: [
      {
        id: "phone",
        styles:
          "text-xs whitespace-nowrap before:aspect-square text-gray-950/80 mt-2 break-all before:break-normal before:content-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCAyNCAyNCIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZT0iY3VycmVudENvbG9yIiBjbGFzcz0idy02IGgtNiI+CiAgPHBhdGggc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBkPSJNMi4yNSA2Ljc1YzAgOC4yODQgNi43MTYgMTUgMTUgMTVoMi4yNWEyLjI1IDIuMjUgMCAwIDAgMi4yNS0yLjI1di0xLjM3MmMwLS41MTYtLjM1MS0uOTY2LS44NTItMS4wOTFsLTQuNDIzLTEuMTA2Yy0uNDQtLjExLS45MDIuMDU1LTEuMTczLjQxN2wtLjk3IDEuMjkzYy0uMjgyLjM3Ni0uNzY5LjU0Mi0xLjIxLjM4YTEyLjAzNSAxMi4wMzUgMCAwIDEtNy4xNDMtNy4xNDNjLS4xNjItLjQ0MS4wMDQtLjkyOC4zOC0xLjIxbDEuMjkzLS45N2MuMzYzLS4yNzEuNTI3LS43MzQuNDE3LTEuMTczTDYuOTYzIDMuMTAyYTEuMTI1IDEuMTI1IDAgMCAwLTEuMDkxLS44NTJINC41QTIuMjUgMi4yNSAwIDAgMCAyLjI1IDQuNXYyLjI1WiIgLz4KPC9zdmc+Cg==')] before:w-4 before:h-4 flex before:mr-2",
        tag: "span",
      },
      {
        id: "email",
        styles:
          "text-xs whitespace-nowrap before:aspect-square break-all before:break-normal text-gray-950/80 mt-2 before:w-4 before:h-4 before:content-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCAyNCAyNCIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZT0iY3VycmVudENvbG9yIiBjbGFzcz0idy02IGgtNiI+CiAgPHBhdGggc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBkPSJNMjEuNzUgNi43NXYxMC41YTIuMjUgMi4yNSAwIDAgMS0yLjI1IDIuMjVoLTE1YTIuMjUgMi4yNSAwIDAgMS0yLjI1LTIuMjVWNi43NW0xOS41IDBBMi4yNSAyLjI1IDAgMCAwIDE5LjUgNC41aC0xNWEyLjI1IDIuMjUgMCAwIDAtMi4yNSAyLjI1bTE5LjUgMHYuMjQzYTIuMjUgMi4yNSAwIDAgMS0xLjA3IDEuOTE2bC03LjUgNC42MTVhMi4yNSAyLjI1IDAgMCAxLTIuMzYgMEwzLjMyIDguOTFhMi4yNSAyLjI1IDAgMCAxLTEuMDctMS45MTZWNi43NSIgLz4KPC9zdmc+Cg==')] flex before:mr-2",
        tag: "span",
      },
      {
        id: "linkedIn",
        styles:
          "text-xs break-all before:aspect-square before:break-normal before:p-1 text-gray-950/80 mt-2 before:w-4 before:h-4 before:font-semibold flex before:text-[8px] before:content-['in'] before:border-[1.2px] before:border-[#333333] break-all before:break-normal before:flex before:justify-center before:rounded-full before:items-center flex before:mr-2",
        tag: "span",
      },
      {
        id: "address",
        styles:
          "text-xs whitespace-nowrap before:aspect-square break-all before:break-normal text-gray-950/80 mt-2 before:w-4 before:h-4 before:content-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCAyNCAyNCIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZT0iY3VycmVudENvbG9yIiBjbGFzcz0idy02IGgtNiI+CiAgPHBhdGggc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBkPSJtMi4yNSAxMiA4Ljk1NC04Ljk1NWMuNDQtLjQzOSAxLjE1Mi0uNDM5IDEuNTkxIDBMMjEuNzUgMTJNNC41IDkuNzV2MTAuMTI1YzAgLjYyMS41MDQgMS4xMjUgMS4xMjUgMS4xMjVIOS43NXYtNC44NzVjMC0uNjIxLjUwNC0xLjEyNSAxLjEyNS0xLjEyNWgyLjI1Yy42MjEgMCAxLjEyNS41MDQgMS4xMjUgMS4xMjVWMjFoNC4xMjVjLjYyMSAwIDEuMTI1LS41MDQgMS4xMjUtMS4xMjVWOS43NU04LjI1IDIxaDguMjUiIC8+Cjwvc3ZnPgo=')] flex before:mr-2",
        tag: "span",
      },
    ],
  },
  primarySkills: {
    styles:
      "text-xs inline-block w-[32%] before:content-['\\2022'] text-gray-950/80 flex before:mr-2",
    tag: "span",
  },
  summary: {
    styles: "text-center my-6 text-xs text-gray-950/80",
    tag: "span",
  },
  workExperienceArray: {
    styles: "my-2",
    elements: [
      {
        id: "title",
        styles: "text-sm text-gray-950/80 font-bold mt-2",
        tag: "span",
      },
      {
        styles: "flex gap-1 font-semibold pb-2 text-xs  mt-1 flex-wrap",
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
          "text-xs text-gray-950/80 flex justify-start pb-1 before:content-['\\2022'] before:mr-2",
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
        styles: "flex flex-col w-[30%] -m-2",
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
              { id: "fromYear", styles: "text-xs", tag: "span" },
              {
                id: "toMonth",
                styles:
                  "text-xs before:content-['-'] before:w-4 before:h-4 before:text-gray-950/80 before:mr-2",
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
};

export const template = { components, cvHeadings, templateLayout };
