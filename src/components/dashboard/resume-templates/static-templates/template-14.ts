const cvHeadings: any = [
  {
    text: "contact",
    section: "email",
    headingKey: "contact",

    styles:
      "font-semibold uppercase text-gray-100 px-3 py-1 bg-[#444440] flex items-center text-sm w-full my-2",
    attributes: [{ "icon-color": "white" }],
  },
  {
    text: "executive summary",
    section: "summary",
    headingKey: "summary",

    styles:
      "font-semibold uppercase text-gray-100 px-3 py-1 bg-[#444440] flex items-center text-sm w-full my-2",
    attributes: [{ "icon-color": "white" }],
  },
  {
    text: "work experience",
    section: "workExperienceArray",
    headingKey: "workExperienceArray",

    styles:
      "font-semibold uppercase text-gray-100 px-3 py-1 bg-[#444440] flex items-center  text-sm w-full my-2",
    attributes: [{ "icon-color": "white" }],
  },
  {
    text: "education",
    section: "education",
    headingKey: "education",

    attributes: [{ "icon-color": "white" }],
    styles:
      "font-semibold uppercase text-gray-100 px-3 py-1 bg-[#444440] flex items-center text-sm border-t-2 border-b-2 my-2 w-full",
  },
  {
    text: "skills",
    section: "primarySkills",
    headingKey: "primarySkills",

    attributes: [{ "icon-color": "white" }],
    styles:
      "font-semibold uppercase text-gray-100 px-3 py-1 bg-[#444440] flex items-center  text-sm border-t-2 border-b-2  w-full my-2",
  },
  {
    text: "certificates",
    section: "certifications",
    headingKey: "certifications",
    styles:
      "font-semibold uppercase text-gray-100 px-3 py-1 bg-[#444440] flex items-center text-sm border-t-2 border-b-2 my-2 w-full",
    attributes: [{ "icon-color": "white" }],
  },
  {
    text: "awards",
    section: "awards",
    headingKey: "awards",
    styles:
      "font-semibold uppercase text-gray-100 px-3 py-1 bg-[#444440] flex items-center text-sm border-t-2 border-b-2 my-2 w-full",
    attributes: [{ "icon-color": "white" }],
  },
  {
    text: "publications",
    section: "publications",
    headingKey: "publications",
    styles:
      "font-semibold uppercase text-gray-100 px-3 py-1 bg-[#444440] flex items-center text-sm border-t-2 border-b-2 my-2 w-full",
    attributes: [{ "icon-color": "white" }],
  },
  {
    text: "languages",
    section: "languages",
    headingKey: "languages",
    styles:
      "font-semibold uppercase text-gray-100 px-3 py-1 bg-[#444440] flex items-center text-sm border-t-2 border-b-2 my-2 w-full",
    attributes: [{ "icon-color": "white" }],
  },
  {
    text: "references",
    section: "references",
    headingKey: "references",
    styles:
      "font-semibold uppercase text-gray-100 px-3 py-1 bg-[#444440] flex items-center text-sm border-t-2 border-b-2 my-2 w-full",
    attributes: [{ "icon-color": "white" }],
  },
  {
    text: "interests",
    section: "interests",
    headingKey: "interests",
    styles:
      "font-semibold uppercase text-gray-100 px-3 py-1 bg-[#444440] flex items-center text-sm border-t-2 border-b-2 my-2 w-full",
    attributes: [{ "icon-color": "white" }],
  },
  {
    text: "Trainings",
    section: "trainings",
    headingKey: "trainings",
    styles:
      "font-semibold uppercase text-gray-100 px-3 py-1 bg-[#444440] flex items-center text-sm border-t-2 border-b-2 my-2 w-full",
    attributes: [{ "icon-color": "white" }],
  },
  {
    text: "Projects",
    section: "projects",
    headingKey: "projects",
    styles:
      "font-semibold uppercase text-gray-100 px-3 py-1 bg-[#444440] flex items-center text-sm border-t-2 border-b-2 my-2 w-full",
    attributes: [{ "icon-color": "white" }],
  },
];
const components: any = {
  shortName: {
    styles:
      "h-10 w-10 my-8 border text-xl p-10 ml-3 translate-x-2/4 font-semibold flex justify-center items-center rounded-full bg-[#444440] text-white text-center border-4 border-gray-100 shadow",
    tag: "span",
  },
  name: {
    styles:
      "text-2xl text-gray-950/80 font-bold flex justify-center items-center w-full mb-2",
    tag: "span",
  },
  jobTitle: {
    tag: "span",
    styles:
      "text-base flex text-gray-950/80 justify-center items-center w-full mb-2",
  },
  contact: {
    styles: "",
    elements: [
     
      {
        id: "email",
        styles:
          "text-xs mt-2 flex break-all before:aspect-square before:break-normal items-center before:mr-2 text-gray-950/80 before:w-4 before:h-4 before:bg-no-repeat before:bg-[url('data:image/svg+xml;base64,IDxzdmcKICAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgIHZpZXdCb3g9IjAgMCAyNCAyNCIKICAgIGZpbGw9IiM0NDQ0NDAiCiAgICBjbGFzc05hbWU9InctNCBoLTQiCiAgPgogICAgPHBhdGggZD0iTTEuNSA4LjY3djguNThhMyAzIDAgMCAwIDMgM2gxNWEzIDMgMCAwIDAgMy0zVjguNjdsLTguOTI4IDUuNDkzYTMgMyAwIDAgMS0zLjE0NCAwTDEuNSA4LjY3WiIgLz4KICAgIDxwYXRoIGQ9Ik0yMi41IDYuOTA4VjYuNzVhMyAzIDAgMCAwLTMtM2gtMTVhMyAzIDAgMCAwLTMgM3YuMTU4bDkuNzE0IDUuOTc4YTEuNSAxLjUgMCAwIDAgMS41NzIgMEwyMi41IDYuOTA4WiIgLz4KICA8L3N2Zz4=')]",
        tag: "span",
      },
      {
        id: "phone",
        styles:
          "text-xs mt-2 flex break-all before:aspect-square before:break-normal items-center before:mr-2 text-gray-950/80 before:w-4 before:h-4 before:bg-no-repeat before:bg-[url('data:image/svg+xml;base64,IDxzdmcKICAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgIHZpZXdCb3g9IjAgMCAyNCAyNCIKICAgIGZpbGw9IiM0NDQ0NDAiCiAgICBjbGFzc05hbWU9InctNCBoLTQiCiAgPgogICAgPHBhdGgKICAgICAgZmlsbFJ1bGU9ImV2ZW5vZGQiCiAgICAgIGQ9Ik0xLjUgNC41YTMgMyAwIDAgMSAzLTNoMS4zNzJjLjg2IDAgMS42MS41ODYgMS44MTkgMS40MmwxLjEwNSA0LjQyM2ExLjg3NSAxLjg3NSAwIDAgMS0uNjk0IDEuOTU1bC0xLjI5My45N2MtLjEzNS4xMDEtLjE2NC4yNDktLjEyNi4zNTJhMTEuMjg1IDExLjI4NSAwIDAgMCA2LjY5NyA2LjY5N2MuMTAzLjAzOC4yNS4wMDkuMzUyLS4xMjZsLjk3LTEuMjkzYTEuODc1IDEuODc1IDAgMCAxIDEuOTU1LS42OTRsNC40MjMgMS4xMDVjLjgzNC4yMDkgMS40Mi45NTkgMS40MiAxLjgyVjE5LjVhMyAzIDAgMCAxLTMgM2gtMi4yNUM4LjU1MiAyMi41IDEuNSAxNS40NDggMS41IDYuNzVWNC41WiIKICAgICAgY2xpcFJ1bGU9ImV2ZW5vZGQiCiAgICAvPgogIDwvc3ZnPg==')]",
        tag: "span",
      },
      {
        id: "linkedIn",
        styles:
          "text-xs mt-2 flex break-all before:aspect-square before:break-normal text-gray-950/80 items-center before:w-4 before:h-4 before:mr-2 items-center flex before:justify-center before:rounded-full before:items-center flex before:content-[url('data:image/svg+xml;base64,IDxzdmcKICAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgIHdpZHRoPSIxNnB4IgogICAgaGVpZ2h0PSIxNnB4IgogICAgdmlld0JveD0iMCAwIDE2IDE2IgogICAgdmVyc2lvbj0iMS4xIgogICAgZmlsbD0iY3VycmVudENvbG9yIgogID4KICAgIDxnPgogICAgICA8cGF0aAogICAgICAgIHN0cm9rZT0ibm9uZSIKICAgICAgICBmaWxsUnVsZT0ibm9uemVybyIKICAgICAgICBmaWxsPSIjNDQ0NDQwIgogICAgICAgIGZpbGxPcGFjaXR5PSIxIgogICAgICAgIGQ9Ik0gMTQuMzkwNjI1IDAuNTAzOTA2IEwgMS41OTM3NSAwLjUwMzkwNiBDIDAuOTk2MDk0IDAuNSAwLjUwNzgxMiAwLjk4NDM3NSAwLjUwMzkwNiAxLjU4MjAzMSBMIDAuNTAzOTA2IDE0LjQxNzk2OSBDIDAuNTA3ODEyIDE1LjAxNTYyNSAwLjk5NjA5NCAxNS40OTYwOTQgMS41OTM3NSAxNS40OTYwOTQgTCAxNC40MDIzNDQgMTUuNDk2MDk0IEMgMTUgMTUuNDk2MDk0IDE1LjQ4ODI4MSAxNS4wMTU2MjUgMTUuNSAxNC40MTc5NjkgTCAxNS41IDEuNTgyMDMxIEMgMTUuNDg4MjgxIDAuOTg0Mzc1IDE1IDAuNSAxNC40MDIzNDQgMC41MDM5MDYgTCAxNC4zODY3MTkgMC41MDM5MDYgWiBNIDQuOTQ5MjE5IDEzLjI4MTI1IEwgMi43MjI2NTYgMTMuMjgxMjUgTCAyLjcyMjY1NiA2LjEyNSBMIDQuOTQ5MjE5IDYuMTI1IFogTSAzLjgzNTkzOCA1LjE0ODQzOCBDIDMuMTI1IDUuMTQ4NDM4IDIuNTQ2ODc1IDQuNTcwMzEyIDIuNTQ2ODc1IDMuODU1NDY5IEMgMi41NDY4NzUgMy4xNDQ1MzEgMy4xMjUgMi41NjY0MDYgMy44MzU5MzggMi41NjY0MDYgQyA0LjU0Njg3NSAyLjU2NjQwNiA1LjEyNSAzLjE0NDUzMSA1LjEyNSAzLjg1NTQ2OSBMIDUuMTI1IDMuODU5Mzc1IEMgNS4xMjUgNC41NzAzMTIgNC41NTA3ODEgNS4xNDg0MzggMy44Mzk4NDQgNS4xNDg0MzggWiBNIDEzLjI3NzM0NCAxMy4yODEyNSBMIDExLjA1ODU5NCAxMy4yODEyNSBMIDExLjA1ODU5NCA5LjgwMDc4MSBDIDExLjA1ODU5NCA4Ljk3MjY1NiAxMS4wMzkwNjIgNy45MDIzNDQgOS45MDIzNDQgNy45MDIzNDQgQyA4Ljc0MjE4OCA3LjkwMjM0NCA4LjU2NjQwNiA4LjgwODU5NCA4LjU2NjQwNiA5Ljc0MjE4OCBMIDguNTY2NDA2IDEzLjI4MTI1IEwgNi4zNDM3NSAxMy4yODEyNSBMIDYuMzQzNzUgNi4xMjUgTCA4LjQ3NjU2MiA2LjEyNSBMIDguNDc2NTYyIDcuMTAxNTYyIEwgOC41MDc4MTIgNy4xMDE1NjIgQyA4Ljk0NTMxMiA2LjM1NTQ2OSA5Ljc1MzkwNiA1LjkxNDA2MiAxMC42MTcxODggNS45NDUzMTIgTCAxMC42MTMyODEgNS45NDUzMTIgQyAxMi44NjMyODEgNS45NDUzMTIgMTMuMjc3MzQ0IDcuNDI1NzgxIDEzLjI3NzM0NCA5LjM1NTQ2OSBaIE0gMTMuMjc3MzQ0IDEzLjI4MTI1ICIKICAgICAgLz4KICAgIDwvZz4KICA8L3N2Zz4=')]",
        tag: "a",
      },
      {
        id: "address",
        styles:
          "text-xs mt-2 flex break-all before:aspect-square before:break-normal items-center before:mr-2 text-gray-950/80 before:w-4 before:h-4 before:bg-no-repeat before:bg-[url('data:image/svg+xml;base64,IDxzdmcKICAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgIHZpZXdCb3g9IjAgMCAyNCAyNCIKICAgIGZpbGw9IiM0NDQ0NDAiCiAgICBjbGFzc05hbWU9InctNCBoLTQiCiAgPgogICAgPHBhdGggZD0iTTExLjQ3IDMuODQxYS43NS43NSAwIDAgMSAxLjA2IDBsOC42OSA4LjY5YS43NS43NSAwIDEgMCAxLjA2LTEuMDYxbC04LjY4OS04LjY5YTIuMjUgMi4yNSAwIDAgMC0zLjE4MiAwbC04LjY5IDguNjlhLjc1Ljc1IDAgMSAwIDEuMDYxIDEuMDZsOC42OS04LjY4OVoiIC8+CiAgICA8cGF0aCBkPSJtMTIgNS40MzIgOC4xNTkgOC4xNTljLjAzLjAzLjA2LjA1OC4wOTEuMDg2djYuMTk4YzAgMS4wMzUtLjg0IDEuODc1LTEuODc1IDEuODc1SDE1YS43NS43NSAwIDAgMS0uNzUtLjc1di00LjVhLjc1Ljc1IDAgMCAwLS43NS0uNzVoLTNhLjc1Ljc1IDAgMCAwLS43NS43NVYyMWEuNzUuNzUgMCAwIDEtLjc1Ljc1SDUuNjI1YTEuODc1IDEuODc1IDAgMCAxLTEuODc1LTEuODc1di02LjE5OGEyLjI5IDIuMjkgMCAwIDAgLjA5MS0uMDg2TDEyIDUuNDMyWiIgLz4KICA8L3N2Zz4=')]",
        tag: "span",
      },
    ],
  },
  primarySkills: {
    styles:
      "text-xs mt-2 before:content-['\\2022'] flex before:text-gray-950/80 text-gray-950/80 before:mr-2",
    tag: "span",
  },
  summary: {
    styles: "text-justify text-gray-950/80 my-2 text-xs",
    tag: "span",
  },
  workExperienceArray: {
    styles: "",
    elements: [
      {
        id: "title",
        styles: "text-base font-bold w-full mt-2 text-gray-950/80",
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
            styles:
              "before:content-['-'] before:w-4 before:h-4 before:text-gray-950/80 before:mr-1 text-gray-950/80",
            tag: "span",
          },
          { id: "toYear", styles: "text-gray-950/80", tag: "span" },
          {
            id: "company",
            styles:
              "before:content-['|'] before:w-4 before:h-4 before:text-gray-950/80 before:mr-2 before:mr-2   text-gray-950/80",
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
          "bg-gray-200 flex flex-col w-[30%] p-4  rounded-md text-gray-950/80",
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
                styles:
                  "text-xs text-gray-950/80 after:content-['-'] after:w-4 after:h-4 after:text-gray-950/80 after:ml-2",
                tag: "span",
              },
              {
                id: "toMonth",
                styles: "text-xs text-gray-950/80",
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
          "text-xs my-1 flex text-justify pb-1 before:content-['\\2022'] before:w-4 before:h-4 before:text-gray-950/80 before:mr-2 before:mr-2 text-gray-950/80",
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
    styles: "",
    elements: [
      {
        tag: "div",
        styles:
          "flex flex-row justify-between w-full p-1 rounded-md text-gray-950/80",
        container: [
          {
            id: "language",
            styles: "font-semibold text-sm text-gray-950/80",
            tag: "span",
          },
          {
            id: "proficiency",
            styles: "text-xs font-normal text-gray-950/80 ",
            tag: "span",
          },
        ],
      },
    ],
  },
};
const templateLayout: any = {
  styles: "w-full",
  attributes: [{ "template-no": "14" }],
  fragment: {
    styles: "flex flex-row bg-white fragment",
    sideBar: {
      styles: "bg-[#E2E2E2] w-[30%] flex flex-col justify-start px-6",
      elements: [
        {
          id: "shortName",
        },
        {
          id: "email",
        },
        {
          id: "phone",
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
        "text-black w-[70%] flex-1 flex flex-col justify-start items-start px-6 my-6",
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
          id: "awards",
        },
        {
          id: "trainings",
        },
        {
          id: "references",
        },

        {
          id: "publications",
        },
        {
          id: "certifications",
        },
        {
          id: "projects",
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
  "languages",
  "interests",
  "summary",
  "workExperienceArray",
  "publications",
  "certifications",
  "awards",
  "projects",
  "trainings",
  "references",
  "education",
];
export const template = {
  components,
  templateLayout,
  cvHeadings,
  GenerationOrder,
};
