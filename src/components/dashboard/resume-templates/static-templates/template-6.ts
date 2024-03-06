const cvHeadings: any = [
    {
      text: "",
      section: "phone",
      styles: "",
    },
    {
      text: "executive summary",
      section: "summary",
      styles: "font-semibold border-t-2 border-b-2 border-gray-950 mt-2 uppercase text-base text-gray-950 py-0.5",
    },
    {
      text: "work experience",
      section: "workExperienceArray",
      styles: "font-semibold uppercase border-t-2 border-b-2 border-gray-950 text-md text-gray-950 py-0.5",
    },
    {
      text: "education",
      section: "education",
      styles: "font-semibold border-t-2 border-b-2 border-gray-950 mt-2 w-full uppercase text-md text-gray-950 py-0.5",
    },
    {
      text: "skills",
      section: "primarySkills",
      styles:
        "font-semibold uppercase border-t-2 border-b-2 border-gray-950 text-base py-0.5 w-full text-gray-950 before:block",
    },
  ];

  
  const templateLayout: any = {
    styles: "w-full",
  
    fragment: {
      styles: "flex flex-col bg-white fragment py-5",
  
      header: {
        styles:
          "text-black relative m-2 px-3 flex flex-col w-[98%] justify-start items-start",
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
          "flex flex-row text-base w-[98%] justify-between px-8 items-center m-2 p-3gap-4",
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
          "bg-red text-black flex flex-col justify-start items-start px-6 w-full",
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
      styles:
        "text-4xl font-bold flex text-gray-950 items-center w-full mx-6",
      tag: "span",
    },
    jobTitle: {
      tag: "span",
      styles: "text-lg flex text-gray-950 w-full mb-2 px-6",
    },
    contact: {
      styles: "w-full",
      elements: [
        {
          id: "phone",
          styles: "text-xs text-gray-950 mt-2 before:content-['Ph:'] before:mr-2",
          tag: "span",
        },
        {
          id: "email",
          styles:
            "text-xs text-gray-950 mt-2 before:content-['Email:'] before:mr-2",
          tag: "span",
        },
        {
          id: "linkedIn",
          styles:
            "text-xs text-gray-950 mt-2 before:content-['Linkedin:'] before:mr-2",
          tag: "span",
        },
      ],
    },
    primarySkills: {
      styles: "text-xs inline-block w-1/3",
      tag: "span",
    },
    summary: { styles: "text-justify mb-4 text-xs text-gray-950", tag: "span" },
    workExperienceArray: {
      styles: "my-2",
      elements: [
        {
          id: "title",
          styles: "text-lg text-gray-950 font-bold",
          tag: "span",
        },
        {
          styles: "flex gap-1 font-semibold pb-2 text-sm flex-wrap",
          tag: "div",
          container: [
            { id: "fromMonth", styles: "text-gray-950", tag: "span" },
            { id: "fromYear", styles: "text-gray-950", tag: "span" },
            {
              id: "toMonth",
              styles: "before:content-['\\268A'] text-gray-950 before:mr-1",
              tag: "span",
            },
            { id: "toYear", styles: "text-gray-950", tag: "span" },
            {
              id: "company",
              styles:
                "before:content-['\\2758'] before:mr-2 text-gray-950 after:content-['\\2758'] after:ml-2",
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
            "text-sm text-justify text-gray-950 pb-1 before:content-['\\2022'] before:mr-2",
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
  
  export const template = { components, cvHeadings, templateLayout };
  