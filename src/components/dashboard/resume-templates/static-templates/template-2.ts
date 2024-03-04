const components: any = {
  shortName: {
    styles:
      "h-8 w-8 my-8 border text-xl p-10 -ml-2 translate-x-2/4 font-semibold flex justify-center items-center rounded-full bg-gray-900 text-white text-center",
    tag: "span",
  },
  name: {
    styles:
      "text-4xl font-bold flex justify-center items-center w-full mb-2 text-gray-950",
    tag: "span",
  },
  jobTitle: {
    tag: "span",
    styles:
      "text-lg flex justify-center items-center w-full mb-2 text-gray-950",
  },
  contact: {
    styles: "flex-row justify-center items-center w-full text-gray-950",
    elements: [
      {
        id: "phone",
        styles: "text-sm mt-2 text-gray-950",
        tag: "span",
      },
      {
        id: "email",
        styles: "text-sm mt-2 text-gray-950",
        tag: "span",
      },
      {
        id: "linkedIn",
        styles: "text-sm mt-2 text-gray-950",
        tag: "span",
      },
    ],
  },
  primarySkills: {
    styles: "text-sm px-5 py-3 bg-gray-300 rounded-full text-gray-950",
    tag: "span",
  },
  summary: { styles: "text-justify mb-4 text-sm text-gray-950", tag: "span" },
  workExperienceArray: {
    styles: "my-2",
    elements: [
      {
        id: "title",
        styles: "text-lg font-bold text-gray-950",
        tag: "span",
      },
      {
        styles: "flex gap-1 font-semibold pb-2 text-sm flex-wrap text-gray-950",
        tag: "div",
        container: [
          { id: "fromMonth", styles: "text-gray-950", tag: "span" },
          { id: "fromYear", styles: "text-gray-950", tag: "span" },
          {
            id: "toMonth",
            styles: "before:content-['\\268A'] before:mr-1 text-gray-950",
            tag: "span",
          },
          { id: "toYear", styles: "text-gray-950", tag: "span" },
          {
            id: "company",
            styles:
              "before:content-['\\2758'] before:mr-2 after:content-['\\2758'] after:ml-2 text-gray-950",
            tag: "span",
          },
          { id: "cityState", styles: "text-gray-950", tag: "span" },
          { id: "country", styles: "text-gray-950", tag: "span" },
          // { id: "isContinue", styles: "", tag: "span" },
        ],
      },
      {
        id: "achievements",
        styles:
          "text-sm text-justify pb-1 before:content-['\\2022'] before:mr-2 text-gray-950",
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
          "bg-gray-200 flex flex-col w-[30%] p-4 rounded-md text-gray-950",
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
              { id: "fromYear", styles: "text-xs text-gray-950", tag: "span" },
              {
                id: "toMonth",
                styles:
                  "text-xs before:content-['\\268A'] before:mr-2 text-gray-950",
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

const templateLayout: any = {
  styles: "w-full",

  fragment: {
    styles: "flex flex-col bg-white fragment py-5 text-gray-950",

    header: {
      styles:
        "text-black m-2 p-3 flex flex-col w-[98%] justify-start rounded-md bg-gray-300 items-start my-6 text-gray-950",
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
        "flex flex-row text-base w-[98%] justify-center items-center m-2 p-3 rounded-md gap-4 bg-gray-300 text-gray-950",
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
      styles: "bg-red text-black text-justify px-8 text-gray-950",
      elements: [
        {
          id: "summary",
        },
      ],
    },
    skills: {
      styles:
        "bg-red text-black w-full flex-1 gap-2 flex flex-row flex-wrap justify-start items-start px-6 my-6 text-gray-950",
      elements: [
        {
          id: "primarySkills",
        },
      ],
    },
    workExperienceArray: {
      styles: "flex flex-col px-8 w-full text-gray-950",

      elements: [
        {
          id: "workExperienceArray",
        },
      ],
    },
    education: {
      styles:
        "bg-red text-black flex flex-col justify-start items-start px-6 my-6 text-gray-950",
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
