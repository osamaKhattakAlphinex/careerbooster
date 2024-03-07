const cvHeadings = [
  {
    text: "",
    section: "phone",
    styles: "",
    attributes: [],
  },
  {
    text: "executive summary",
    section: "summary",
    attributes: [],
    styles:
      "font-bold mt-4 uppercase text-base text-center text-gray-950/80 border-y-2 border-gray-950/80 py-0.5",
  },
  {
    attributes: [],
    text: "work experience",
    section: "workExperienceArray",
    styles:
      "font-bold uppercase text-center text-md text-gray-950/80 border-y-2 border-gray-950/80 py-0.5",
  },
  {
    attributes: [],
    text: "education",
    section: "education",
    styles:
      "font-bold text-center mt-2 w-full uppercase text-md text-gray-950/80 border-y-2 border-gray-950/80 py-0.5",
  },
  {
    attributes: [],
    text: "skills",
    section: "primarySkills",
    styles:
      "font-bold uppercase text-center text-base py-0.5 w-full text-gray-950/80 border-y-2 border-gray-950/80",
  },
];
const templateLayout = {
  styles: "w-full",
  attributes: [{ "template-no": "7" }],

  fragment: {
    styles: "flex flex-col bg-white fragment py-5 relative",

    header: {
      styles:
        "text-black relative m-2 flex flex-col w-3/4 justify-start items-start",
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
        "flex flex-col absolute text-base w-1/4 justify-between items-start top-0 right-10 m-2 p-3 gap-1",
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
      ],
    },
    summary: {
      styles: "bg-red text-black text-junstify px-8 pt-8",
      elements: [
        {
          id: "summary",
        },
      ],
    },
    skills: {
      styles:
        "text-black w-full flex-1 gap-2 flex flex-row flex-wrap justify-start items-start px-8 my-6",
      elements: [
        {
          id: "primarySkills",
        },
      ],
    },
    workExperienceArray: {
      styles: "flex flex-col px-8 w-full",

      elements: [
        {
          id: "workExperienceArray",
        },
      ],
    },
    education: {
      styles:
        "bg-red text-black flex flex-col justify-start items-start px-6 w-full",
      elements: [
        {
          id: "education",
        },
      ],
    },
  },
};
const components = {
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
          "text-xs text-gray-950/80 mt-2 break-all before:break-normal before:content-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCAyNCAyNCIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZT0iY3VycmVudENvbG9yIiBjbGFzcz0idy02IGgtNiI+CiAgPHBhdGggc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBkPSJNMi4yNSA2Ljc1YzAgOC4yODQgNi43MTYgMTUgMTUgMTVoMi4yNWEyLjI1IDIuMjUgMCAwIDAgMi4yNS0yLjI1di0xLjM3MmMwLS41MTYtLjM1MS0uOTY2LS44NTItMS4wOTFsLTQuNDIzLTEuMTA2Yy0uNDQtLjExLS45MDIuMDU1LTEuMTczLjQxN2wtLjk3IDEuMjkzYy0uMjgyLjM3Ni0uNzY5LjU0Mi0xLjIxLjM4YTEyLjAzNSAxMi4wMzUgMCAwIDEtNy4xNDMtNy4xNDNjLS4xNjItLjQ0MS4wMDQtLjkyOC4zOC0xLjIxbDEuMjkzLS45N2MuMzYzLS4yNzEuNTI3LS43MzQuNDE3LTEuMTczTDYuOTYzIDMuMTAyYTEuMTI1IDEuMTI1IDAgMCAwLTEuMDkxLS44NTJINC41QTIuMjUgMi4yNSAwIDAgMCAyLjI1IDQuNXYyLjI1WiIgLz4KPC9zdmc+Cg==')] before:w-4 before:h-4 flex before:mr-2",
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
    ],
  },
  primarySkills: {
    styles:
      "text-xs inline-block w-[32%] before:content-['\\2022'] text-gray-950/80 flex before:mr-2",
    tag: "span",
  },
  summary: { styles: "text-center mb-4 text-xs text-gray-950/80", tag: "span" },
  workExperienceArray: {
    styles: "my-2",
    elements: [
      {
        id: "title",
        styles: "text-base mt-2 text-gray-950/80 font-bold",
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
          "text-xs text-justify text-gray-950/80 flex pb-1 before:content-['\\2022'] before:mr-2",
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
        styles: "flex flex-col w-[30%] p-2 rounded-md",
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
                styles: "text-xs before:content-['\\268A'] before:mr-2",
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
