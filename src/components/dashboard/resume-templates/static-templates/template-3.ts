const cvHeadings: any = [
    {
      text: "contact",
      section: "phone",
      styles:
        "font-semibold uppercase text-md py-0.5 w-full text-white text-center border-2 rounded-full border-[#043382] mt-[166px]",
    },
    {
      text: "executive summary",
      section: "summary",
      styles:
        "font-semibold uppercase text-md text-white text-white bg-[#043382] px-4 rounded-full mt-[150px] py-0.5 mb-1",
    },
    {
      text: "work experience",
      section: "workExperienceArray",
      styles:
        "font-semibold uppercase text-md text-white text-white bg-[#043382] px-4 rounded-full py-0.5 mb-1",
    },
    {
      text: "education",
      section: "education",
      styles:
        "font-semibold uppercase text-md text-white text-white bg-[#043382] border-2 px-4 rounded-full py-0.5",
    },
    {
      text: "skills",
      section: "primarySkills",
      styles:
        "font-semibold uppercase text-md py-0.5 w-full text-white text-center border-2 rounded-full border-[#043382] mt-6",
    },
  ];
  
  const templateLayout: any = {
    styles: "w-full",
    fragment: {
      styles: "flex flex-row relative bg-white fragment",
      header: {
        styles:
          "text-gray-100 absolute h-28 top-5 z-10 bg-[#043382] flex flex-col w-full justify-center items-start my-6",
        elements: [
          // {
          //   id: "shortName",
          // },
          {
            id: "name",
          },
          {
            id: "jobTitle",
          },
        ],
      },
      sideBar: {
        styles: "bg-gray-950 text-white w-3/12 flex flex-col justify-start px-6",
        elements: [
          // {
          //   heading: false,
          //   headingText: "",
          //   id: "shortName",
          // },
          {
            id: "phone",
          },
          {
            id: "email",
          },
          {
            id: "linkedin",
          },
          {
            id: "primarySkills",
          },
        ],
      },
  
      body: {
        styles:
          "text-black w-9/12 flex-1 flex flex-col justify-start items-start px-6 my-4",
        elements: [
          {
            heading: true,
            headingText: "Exective Summary",
            id: "summary",
          },
          {
            heading: true,
            headingText: "Work Experience",
            id: "workExperienceArray",
          },
          {
            heading: true,
            headingText: "Education",
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
          styles: "text-xs mt-2",
          tag: "span",
        },
        {
          id: "email",
          styles: "text-xs mt-2",
          tag: "span",
        },
        {
          id: "linkedIn",
          styles: "text-xs mt-2",
          tag: "span",
        },
      ],
    },
    primarySkills: {
      styles: "text-xs py-2",
      tag: "span",
    },
    summary: { styles: "text-justify mb-4 text-xs", tag: "span" },
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

  export const template = {
    components,
    templateLayout,
    cvHeadings
  };
  