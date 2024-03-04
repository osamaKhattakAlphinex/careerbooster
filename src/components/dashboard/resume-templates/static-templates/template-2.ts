const components: any = {
  shortName: {
    styles:
      "h-8 w-8 my-8 border text-xl p-10 -ml-2 translate-x-2/4 font-semibold flex justify-center items-center rounded-full bg-gray-900 text-white text-center",
    tag: "span",
  },
  name: {
    styles: "text-4xl font-bold flex justify-center items-center w-full mb-2",
    tag: "span",
  },
  jobTitle: {
    tag: "span",
    styles: "text-lg flex justify-center items-center w-full mb-2",
  },
  contact: {
    styles: "flex-row justify-center items-center w-full",
    elements: [
      {
        id: "phone",
        styles: "text-sm mt-2",
        tag: "span",
      },
      {
        id: "email",
        styles: "text-sm mt-2",
        tag: "span",
      },
      {
        id: "linkedIn",
        styles: "text-sm mt-2",
        tag: "span",
      },
    ],
  },
  primarySkills: {
    styles: "text-sm px-5 py-3 bg-gray-300 rounded-full",
    tag: "span",
  },
  summary: { styles: "text-justify mb-4 text-sm", tag: "span" },
  workExperienceArray: {
    styles: "my-2",
    elements: [
      {
        id: "title",
        styles: "text-lg font-bold",
        tag: "span",
      },
      {
        styles: "flex gap-1 font-semibold pb-2 text-sm flex-wrap",
        tag: "div",
        container: [
          { id: "fromMonth", styles: "", tag: "span" },
          { id: "fromYear", styles: "", tag: "span" },
          {
            id: "toMonth",
            styles: "before:content-['\\268A'] before:mr-1",
            tag: "span",
          },
          { id: "toYear", styles: "", tag: "span" },
          {
            id: "company",
            styles:
              "before:content-['\\2758'] before:mr-2 after:content-['\\2758'] after:ml-2",
            tag: "span",
          },
          { id: "cityState", styles: "", tag: "span" },
          { id: "country", styles: "", tag: "span" },
          // { id: "isContinue", styles: "", tag: "span" },
        ],
      },
      {
        id: "achievements",
        styles:
          "text-sm text-justify pb-1 before:content-['\\2022'] before:mr-2",
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

const templateLayout: any = {
  styles: "w-full",

  fragment: {
    styles: "flex flex-col bg-white fragment py-5",

    header: {
      styles:
        "text-black m-2 p-3 flex flex-col w-[98%] justify-start rounded-md bg-gray-300 items-start my-6",
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
        "flex flex-row text-base w-[98%] justify-center items-center m-2 p-3 rounded-md gap-4 bg-gray-300",
      elements: [
        {
          id: "phone",
        },
        {
          id: "email",
        },
        {
          id: "linkedin",
        },
      ],
    },
    summary: {
      styles: "bg-red text-black text-justify px-8",
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
      styles: "flex flex-col px-8 w-full",

      elements: [
        {
          id: "workExperienceArray",
        },
      ],
    },
    education: {
      styles:
        "bg-red text-black flex flex-col justify-start items-start px-6 my-6",
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
};
