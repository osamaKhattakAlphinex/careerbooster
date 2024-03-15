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
      "text-gray-950/80 text-base font-semibold w-full uppercase flex flex-row items-center my-2",
    attributes: [{ "icon-color": "black" }],
  },
  {
    text: "work experience",
    section: "workExperienceArray",
    headingKey: "workExperienceArray",
    styles:
      "text-gray-950/80 text-base font-semibold w-full uppercase flex flex-row items-center my-2",
    attributes: [{ "icon-color": "black" }],
  },
  {
    text: "education",
    section: "education",
    headingKey: "education",

    styles:
      "text-gray-950/80 text-base font-semibold w-full uppercase flex flex-row items-center my-2",
    attributes: [{ "icon-color": "black" }],
  },
  {
    text: "skills",
    section: "primarySkills",
    headingKey: "primarySkills",

    styles:
      "font-semibold uppercase text-base w-full text-gray-950/80 flex flex-row items-center my-2",
    attributes: [{ "icon-color": "black" }],
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
      "text-2xl font-bold flex justify-center items-center w-full mb-2 text-gray-950/80",
    tag: "span",
  },
  jobTitle: {
    tag: "span",
    styles:
      "text-base flex justify-center items-center w-full mb-2 text-gray-950/80",
  },
  contact: {
    styles: "w-full",
    elements: [
      {
        id: "phone",
        styles:
          "text-xs text-gray-950/80  mt-2 break-all before:break-normal before:content-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCAyNCAyNCIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZT0iY3VycmVudENvbG9yIiBjbGFzcz0idy02IGgtNiI+CiAgPHBhdGggc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBkPSJNMi4yNSA2Ljc1YzAgOC4yODQgNi43MTYgMTUgMTUgMTVoMi4yNWEyLjI1IDIuMjUgMCAwIDAgMi4yNS0yLjI1di0xLjM3MmMwLS41MTYtLjM1MS0uOTY2LS44NTItMS4wOTFsLTQuNDIzLTEuMTA2Yy0uNDQtLjExLS45MDIuMDU1LTEuMTczLjQxN2wtLjk3IDEuMjkzYy0uMjgyLjM3Ni0uNzY5LjU0Mi0xLjIxLjM4YTEyLjAzNSAxMi4wMzUgMCAwIDEtNy4xNDMtNy4xNDNjLS4xNjItLjQ0MS4wMDQtLjkyOC4zOC0xLjIxbDEuMjkzLS45N2MuMzYzLS4yNzEuNTI3LS43MzQuNDE3LTEuMTczTDYuOTYzIDMuMTAyYTEuMTI1IDEuMTI1IDAgMCAwLTEuMDkxLS44NTJINC41QTIuMjUgMi4yNSAwIDAgMCAyLjI1IDQuNXYyLjI1WiIgLz4KPC9zdmc+Cg==')] before:w-4 before:h-4 flex before:mr-2",
        tag: "span",
      },
      {
        id: "email",
        styles:
          "text-xs break-all before:break-normal text-gray-950/80 mt-2 before:w-4 before:h-4 before:content-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCAyNCAyNCIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZT0iY3VycmVudENvbG9yIiBjbGFzcz0idy02IGgtNiI+CiAgPHBhdGggc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBkPSJNMjEuNzUgNi43NXYxMC41YTIuMjUgMi4yNSAwIDAgMS0yLjI1IDIuMjVoLTE1YTIuMjUgMi4yNSAwIDAgMS0yLjI1LTIuMjVWNi43NW0xOS41IDBBMi4yNSAyLjI1IDAgMCAwIDE5LjUgNC41aC0xNWEyLjI1IDIuMjUgMCAwIDAtMi4yNSAyLjI1bTE5LjUgMHYuMjQzYTIuMjUgMi4yNSAwIDAgMS0xLjA3IDEuOTE2bC03LjUgNC42MTVhMi4yNSAyLjI1IDAgMCAxLTIuMzYgMEwzLjMyIDguOTFhMi4yNSAyLjI1IDAgMCAxLTEuMDctMS45MTZWNi43NSIgLz4KPC9zdmc+Cg==')] flex before:mr-2",
        tag: "span",
      },
      {
        id: "linkedIn",
        styles:
          "text-xs break-all before:break-normal before:p-1 text-gray-950/80 mt-2 before:w-4 before:h-4 before:font-semibold flex before:text-xs before:content-['in'] before:border-[1.5px] before:border-[#333333] before:flex before:justify-center before:rounded-sm before:items-center flex before:mr-2",
        tag: "span",
      },
      {
        id: "address",
        styles:
          "text-xs break-all before:break-normal text-gray-950/80 mt-2 before:w-4 before:h-4 before:content-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCAyNCAyNCIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZT0iY3VycmVudENvbG9yIiBjbGFzcz0idy02IGgtNiI+CiAgPHBhdGggc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBkPSJtMi4yNSAxMiA4Ljk1NC04Ljk1NWMuNDQtLjQzOSAxLjE1Mi0uNDM5IDEuNTkxIDBMMjEuNzUgMTJNNC41IDkuNzV2MTAuMTI1YzAgLjYyMS41MDQgMS4xMjUgMS4xMjUgMS4xMjVIOS43NXYtNC44NzVjMC0uNjIxLjUwNC0xLjEyNSAxLjEyNS0xLjEyNWgyLjI1Yy42MjEgMCAxLjEyNS41MDQgMS4xMjUgMS4xMjVWMjFoNC4xMjVjLjYyMSAwIDEuMTI1LS41MDQgMS4xMjUtMS4xMjVWOS43NU04LjI1IDIxaDguMjUiIC8+Cjwvc3ZnPgo=')] flex before:mr-2",
        tag: "span",
      },
    ],
  },
  primarySkills: {
    styles: "text-xs px-3 py-2 bg-gray-300 rounded-full text-gray-950/80",
    tag: "span",
  },
  summary: {
    styles: "text-justify my-2 text-xs text-gray-950/80",
    tag: "span",
  },
  workExperienceArray: {
    styles: "my-2",
    elements: [
      {
        id: "title",
        styles: "text-base mt-2 font-bold text-gray-950/80",
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
          "bg-gray-300 flex flex-col w-[30%] p-4 rounded-md text-gray-950/80",
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
  attributes: [{ "template-no": "2" }],
  fragment: {
    styles: "flex flex-col bg-white fragment py-5 text-gray-950/80",
    header: {
      styles:
        "text-black my-2 mx-auto p-3 flex flex-col w-[94%]  justify-start  rounded-md bg-gray-300 items-start text-gray-950/80",
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
        "flex flex-row flex-wrap text-base w-[94%] justify-between items-center my-2 mx-auto p-3 rounded-md gap-4 bg-gray-300 text-gray-950/80",
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
      styles: "bg-red text-black text-justify px-8 text-gray-950/80",
      elements: [
        {
          id: "summary",
        },
      ],
    },
    skills: {
      styles:
        "bg-red text-black w-full flex-1 gap-2 flex flex-row flex-wrap justify-start items-start px-6 my-6 text-gray-950/80",
      elements: [
        {
          id: "primarySkills",
        },
      ],
    },
    workExperienceArray: {
      styles: "flex flex-col px-8 w-full text-gray-950/80",
      elements: [
        {
          id: "workExperienceArray",
        },
      ],
    },
    education: {
      styles:
        "text-black flex flex-col justify-start items-start px-6 text-gray-950/80",
      elements: [
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
