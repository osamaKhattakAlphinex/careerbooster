const cvHeadings: any = [
  {
    text: "contact",
    section: "phone",
    headingKey: "contact",
    styles:
      "font-semibold uppercase text-gray-100 flex items-center text-base py-0.5 w-full border-b-2 border-white my-2",
    attributes: [{ "icon-color": "white" }],
  },
  {
    text: "executive summary",
    section: "summary",
    headingKey: "summary",
    styles:
      "font-semibold uppercase text-gray-950/80 flex items-center text-base py-0.5 w-full border-b-2 border-[#1F1E1E]",
    attributes: [{ "icon-color": "black" }],
  },
  {
    text: "work experience",
    section: "workExperienceArray",
    headingKey: "workExperienceArray",
    styles:
      "font-semibold uppercase text-gray-950/80 flex items-center text-base py-0.5 w-full border-b-2 border-[#1F1E1E]",
    attributes: [{ "icon-color": "black" }],
  },
  {
    text: "education",
    section: "education",
    headingKey: "education",
    attributes: [{ "icon-color": "black" }],
    styles:
      "font-semibold uppercase text-gray-950/80 flex items-center text-base py-0.5 w-full border-b-2 border-[#1F1E1E]",
  },
  {
    text: "skills",
    section: "primarySkills",
    headingKey: "primarySkills",
    attributes: [{ "icon-color": "white" }],
    styles:
      "font-semibold uppercase text-gray-100 flex items-center text-md border-b-2 border-white py-0.5 w-full my-2",
  },
];

const components: any = {
  shortName: {
    styles:
      "h-8 w-8 my-8 border-8 text-xl p-10 ml-2 translate-x-1/2 font-semibold flex justify-center items-center rounded-full bg-gray-[#1F1E1E] text-white text-center",
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
      "text-base flex justify-left text-gray-950/80 items-center w-full mb-2",
  },
  contact: {
    styles: "",
    elements: [
      {
        id: "phone",
        styles:
          "text-xs mt-2 flex break-all before:break-normal before:aspect-square before:border text-gray-100 before:content-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCAyNCAyNCIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZT0id2hpdGUiIGNsYXNzPSJ3LTYgaC02Ij4KICA8cGF0aCBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGQ9Ik0yLjI1IDYuNzVjMCA4LjI4NCA2LjcxNiAxNSAxNSAxNWgyLjI1YTIuMjUgMi4yNSAwIDAgMCAyLjI1LTIuMjV2LTEuMzcyYzAtLjUxNi0uMzUxLS45NjYtLjg1Mi0xLjA5MWwtNC40MjMtMS4xMDZjLS40NC0uMTEtLjkwMi4wNTUtMS4xNzMuNDE3bC0uOTcgMS4yOTNjLS4yODIuMzc2LS43NjkuNTQyLTEuMjEuMzhhMTIuMDM1IDEyLjAzNSAwIDAgMS03LjE0My03LjE0M2MtLjE2Mi0uNDQxLjAwNC0uOTI4LjM4LTEuMjFsMS4yOTMtLjk3Yy4zNjMtLjI3MS41MjctLjczNC40MTctMS4xNzNMNi45NjMgMy4xMDJhMS4xMjUgMS4xMjUgMCAwIDAtMS4wOTEtLjg1Mkg0LjVBMi4yNSAyLjI1IDAgMCAwIDIuMjUgNC41djIuMjVaIiAvPgo8L3N2Zz4K')]  before:rounded-full before:w-6 before:h-6 items-center before:p-1 before:mr-2",
        tag: "span",
      },
      {
        id: "email",
        styles:
          "text-xs mt-2 flex break-all before:break-normal before:aspect-square before:border text-gray-100 before:content-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCAyNCAyNCIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZT0id2hpdGUiIGNsYXNzPSJ3LTYgaC02Ij4KICA8cGF0aCBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGQ9Ik0yMS43NSA2Ljc1djEwLjVhMi4yNSAyLjI1IDAgMCAxLTIuMjUgMi4yNWgtMTVhMi4yNSAyLjI1IDAgMCAxLTIuMjUtMi4yNVY2Ljc1bTE5LjUgMEEyLjI1IDIuMjUgMCAwIDAgMTkuNSA0LjVoLTE1YTIuMjUgMi4yNSAwIDAgMC0yLjI1IDIuMjVtMTkuNSAwdi4yNDNhMi4yNSAyLjI1IDAgMCAxLTEuMDcgMS45MTZsLTcuNSA0LjYxNWEyLjI1IDIuMjUgMCAwIDEtMi4zNiAwTDMuMzIgOC45MWEyLjI1IDIuMjUgMCAwIDEtMS4wNy0xLjkxNlY2Ljc1IiAvPgo8L3N2Zz4=')] before:rounded-full before:w-6 before:h-6 flex items-center before:p-1 before:mr-2",
        tag: "span",
      },
      {
        id: "linkedIn",
        styles:
          "text-xs mt-2 flex break-all before:break-normal text-gray-100 before:border before:aspect-square before:w-6 before:h-6 flex before:text-xs before:content-['in'] before:flex before:justify-center before:rounded-full before:items-center items-center flex before:mr-2",
        tag: "span",
      },
      {
        id: "address",
        styles:
          "text-xs mt-2 flex break-all before:break-normal text-gray-100 before:border before:aspect-square before:rounded-full before:w-6 before:h-6 flex items-center before:p-1 before:mr-2 before:content-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCAyNCAyNCIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZT0id2hpdGUiIGNsYXNzPSJ3LTYgaC02Ij4KICA8cGF0aCBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGQ9Im0yLjI1IDEyIDguOTU0LTguOTU1Yy40NC0uNDM5IDEuMTUyLS40MzkgMS41OTEgMEwyMS43NSAxMk00LjUgOS43NXYxMC4xMjVjMCAuNjIxLjUwNCAxLjEyNSAxLjEyNSAxLjEyNUg5Ljc1di00Ljg3NWMwLS42MjEuNTA0LTEuMTI1IDEuMTI1LTEuMTI1aDIuMjVjLjYyMSAwIDEuMTI1LjUwNCAxLjEyNSAxLjEyNVYyMWg0LjEyNWMuNjIxIDAgMS4xMjUtLjUwNCAxLjEyNS0xLjEyNVY5Ljc1TTguMjUgMjFoOC4yNSIgLz4KPC9zdmc+')]",
        tag: "span",
      },
    ],
    // elements: [
    //   {
    //     id: "phone",
    //     styles:
    //       "text-xs mt-2 flex break-all before:aspect-square before:break-normal text-gray-100 before:bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiIHN0cm9rZT0iI2ZmZiIgZmlsbD0iI2ZmZiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczpjYz0iaHR0cDovL3dlYi5yZXNvdXJjZS5vcmcvY2MvIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIiBzdHlsZT0ic2hhcGUtcmVuZGVyaW5nOmdlb21ldHJpY1ByZWNpc2lvbjt0ZXh0LXJlbmRlcmluZzpnZW9tZXRyaWNQcmVjaXNpb247aW1hZ2UtcmVuZGVyaW5nOm9wdGltaXplUXVhbGl0eSIgZmlsbC1ydWxlPSJldmVub2RkIiB4bWw6c3BhY2U9InByZXNlcnZlIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIHZpZXdCb3g9IjAgMCA1OC4yODIgNTguMjgyIj4KIDxnIGlkPSJMYXllcl94MDAyMF8xIj4KICA8ZyBpZD0iXzE1MjIyMjkyMCI+CiAgIDxwYXRoIGlkPSJfMTUyMjIyMjQ4IiBjbGFzcz0iZmlsMCIgZD0ibTI0LjE4NiAyMi41Yy01LjQ0NjYgMy4xNDQ1IDIuODYzNyAxOC43MjQgOC44MjM3IDE1LjI4MyAxLjA1ODQgMS44MzMyIDQuNDY3NiA3LjczODEgNS41MjYgOS41NzEyLTIuNTE0NiAxLjQ1MTktNC42NDMyIDIuMzY3MS03LjU1ODUgMC43MDA1NC04LjA5NDYtNC42MjczLTE3LjAwNS0yMC4wNTQtMTYuNzUxLTI5LjI1NiAwLjA4ODA0Ni0zLjE5NiAxLjk3MS00LjQ0ODIgNC40MzQtNS44NzAyIDEuMDU4NCAxLjgzMzIgNC40Njc2IDcuNzM4IDUuNTI2IDkuNTcxMnoiLz4KICAgPHBhdGggaWQ9Il8xNTA1MTkxNjgiIGNsYXNzPSJmaWwwIiBkPSJtMjYuNDcgMjIuMjRjLTAuNTg4NDkgMC4zMzk3OC0xLjM0NTggMC4xMzY5Ny0xLjY4NTYtMC40NTE1OGwtNS4yMDk1LTkuMDIzMmMtMC4zMzk4NC0wLjU4ODYyLTAuMTM3MDQtMS4zNDU5IDAuNDUxNTItMS42ODU3bDIuNzM4LTEuNTgwOGMwLjU4ODU1LTAuMzM5ODQgMS4zNDYtMC4xMzY4NSAxLjY4NTggMC40NTE3bDUuMjA5NSA5LjAyMzFjMC4zMzk3OCAwLjU4ODQ5IDAuMTM2OTEgMS4zNDU4LTAuNDUxNTggMS42ODU2bC0yLjczOCAxLjU4MDh6Ii8+CiAgIDxwYXRoIGlkPSJfMjI2MTQ4MDcyIiBjbGFzcz0iZmlsMCIgZD0ibTQwLjcwMiA0Ni44OWMtMC41ODg0OSAwLjMzOTc4LTEuMzQ1OCAwLjEzNjk3LTEuNjg1Ni0wLjQ1MTY0bC01LjIwOTUtOS4wMjMyYy0wLjMzOTg0LTAuNTg4NTUtMC4xMzcwNC0xLjM0NTkgMC40NTE1Mi0xLjY4NTZsMi43MzgtMS41ODA4YzAuNTg4NTUtMC4zMzk3OCAxLjM0Ni0wLjEzNjc5IDEuNjg1OCAwLjQ1MTdsNS4yMDk1IDkuMDIzMWMwLjMzOTc4IDAuNTg4NTUgMC4xMzY5MSAxLjM0NTktMC40NTE1OCAxLjY4NTZsLTIuNzM4IDEuNTgwOHoiLz4KICA8L2c+CiAgPHBhdGggY2xhc3M9ImZpbDEiIGQ9Im0yOS4xNDEtMi44NDVlLTE1aDAuMDAwNDMxOXYwLjAwNjc4N2M4LjA1IDAuMDAwMTIzNCAxNS4zMzUgMy4yNiAyMC42MDQgOC41Mjk2IDUuMjY5MyA1LjI2OTMgOC41MjkxIDEyLjU1NCA4LjUyOTMgMjAuNjA0aDAuMDA2Nzg3djAuMDAxMzU3NGgtMC4wMDY3ODdjLTAuMDAwMTIzNCA4LjA1LTMuMjYgMTUuMzM1LTguNTI5NiAyMC42MDQtNS4yNjk0IDUuMjY5My0xMi41NTQgOC41MjkxLTIwLjYwNCA4LjUyOTN2MC4wMDY3ODdoLTAuMDAxMzU3NHYtMC4wMDY3ODdjLTguMDUtMC4wMDAxMjM0LTE1LjMzNS0zLjI2LTIwLjYwNC04LjUyOTYtNS4yNjkzLTUuMjY5NC04LjUyOTEtMTIuNTU0LTguNTI5My0yMC42MDRoLTAuMDA2Nzg3di0wLjAwMTM1NzRoMC4wMDY3ODdjMC4wMDAxMjM0LTguMDUgMy4yNi0xNS4zMzUgOC41Mjk2LTIwLjYwNCA1LjI2OTMtNS4yNjkzIDEyLjU1NC04LjUyOTEgMjAuNjA0LTguNTI5M3YtMC4wMDY3ODdoMC4wMDA5MjU1em0wLjAwMDQzMTkgMy40NzU4djAuMDA2Nzg3aC0wLjAwMTM1NzR2LTAuMDA2Nzg3Yy03LjA3OTIgMC4wMDAxODUxLTEzLjQ5NCAyLjg3NTMtMTguMTQxIDcuNTIyNi00LjY0NzcgNC42NDc2LTcuNTIyOSAxMS4wNjMtNy41MjI5IDE4LjE0MmgwLjAwNjc4N3YwLjAwMTM1NzRoLTAuMDA2Nzg3YzAuMDAwMTg1MSA3LjA3OTIgMi44NzUzIDEzLjQ5NCA3LjUyMjYgMTguMTQxIDQuNjQ3NiA0LjY0NzcgMTEuMDYzIDcuNTIyOSAxOC4xNDIgNy41MjI5di0wLjAwNjc4N2gwLjAwMTM1NzR2MC4wMDY3ODdjNy4wNzkyLTAuMDAwMTg1MSAxMy40OTQtMi44NzUzIDE4LjE0MS03LjUyMjYgNC42NDc3LTQuNjQ3NiA3LjUyMjktMTEuMDYzIDcuNTIyOS0xOC4xNDJoLTAuMDA2Nzg3di0wLjAwMTM1NzRoMC4wMDY3ODdjLTAuMDAwMTg1MS03LjA3OTItMi44NzUzLTEzLjQ5NC03LjUyMjYtMTguMTQxLTQuNjQ3Ni00LjY0NzctMTEuMDYzLTcuNTIyOS0xOC4xNDItNy41MjI5eiIvPgogPC9nPgo8L3N2Zz4=')] before:rounded-full before:w-4 before:h-4 before:bg-no-repeat items-center before:p-1 before:mr-2",
    //     tag: "span",
    //   },
    //   {
    //     id: "email",
    //     styles:
    //       "text-xs mt-2 flex break-all before:aspect-square before:break-normal text-gray-100 before:bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCAyNCAyNCIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZT0id2hpdGUiIGNsYXNzPSJ3LTYgaC02Ij4KICA8cGF0aCBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGQ9Ik0yMS43NSA2Ljc1djEwLjVhMi4yNSAyLjI1IDAgMCAxLTIuMjUgMi4yNWgtMTVhMi4yNSAyLjI1IDAgMCAxLTIuMjUtMi4yNVY2Ljc1bTE5LjUgMEEyLjI1IDIuMjUgMCAwIDAgMTkuNSA0LjVoLTE1YTIuMjUgMi4yNSAwIDAgMC0yLjI1IDIuMjVtMTkuNSAwdi4yNDNhMi4yNSAyLjI1IDAgMCAxLTEuMDcgMS45MTZsLTcuNSA0LjYxNWEyLjI1IDIuMjUgMCAwIDEtMi4zNiAwTDMuMzIgOC45MWEyLjI1IDIuMjUgMCAwIDEtMS4wNy0xLjkxNlY2Ljc1IiAvPgo8L3N2Zz4=')] before:rounded-full before:w-4 before:h-4 before:bg-no-repeat flex items-center before:p-1 before:mr-2",
    //     tag: "span",
    //   },
    //   {
    //     id: "linkedIn",
    //     styles:
    //       "text-xs mt-2 flex items-center break-all before:aspect-square before:break-normal before:border text-gray-100 before:w-6 before:h-4 flex before:text-xs before:content-['in'] before:flex before:justify-center before:rounded-full before:items-center flex before:mr-2",
    //     tag: "span",
    //   },
    //   {
    //     id: "address",
    //     styles:
    //       "text-xs mt-2 flex break-all before:aspect-square before:break-normal text-gray-100 before:rounded-full before:w-4 before:h-4 flex items-center before:p-1 before:mr-2 before:border  before:bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCAyNCAyNCIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZT0id2hpdGUiIGNsYXNzPSJ3LTYgaC02Ij4KICA8cGF0aCBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGQ9Im0yLjI1IDEyIDguOTU0LTguOTU1Yy40NC0uNDM5IDEuMTUyLS40MzkgMS41OTEgMEwyMS43NSAxMk00LjUgOS43NXYxMC4xMjVjMCAuNjIxLjUwNCAxLjEyNSAxLjEyNSAxLjEyNUg5Ljc1di00Ljg3NWMwLS42MjEuNTA0LTEuMTI1IDEuMTI1LTEuMTI1aDIuMjVjLjYyMSAwIDEuMTI1LjUwNCAxLjEyNSAxLjEyNVYyMWg0LjEyNWMuNjIxIDAgMS4xMjUtLjUwNCAxLjEyNS0xLjEyNVY5Ljc1TTguMjUgMjFoOC4yNSIgLz4KPC9zdmc+')]",
    //     tag: "span",
    //   },
    // ],
  },
  primarySkills: {
    styles:
      "text-xs mt-2 flex text-gray-100 before:content-['\\2022'] before:mr-2",
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
        styles: "text-base font-bold w-full text-gray-950/80 mt-2",
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
              "before:content-['|'] before:w-4 before:h-4 before:text-gray-950/80 before:mr-2 text-gray-950/80 before:mr-2",
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
          "text-xs flex text-justify pb-1 before:content-['\\2022'] text-gray-950/80 before:mr-2",
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
          "flex bg-gray-200 text-gray-950/80 flex-col w-[30%] p-4 rounded-md",
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
              {
                id: "fromYear",
                styles:
                  "text-xs  after:content-['-'] after:w-4 after:h-4 after:text-gray-950/80 after:ml-2",
                tag: "span",
              },
              {
                id: "toMonth",
                styles: "text-xs",
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
  attributes: [{ "template-no": "15" }],
  fragment: {
    styles: "flex flex-row bg-white fragment",
    sideBar: {
      styles: "bg-[#1F1E1E] w-[30%] flex flex-col justify-start px-4",
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
        "text-black w-[70%] flex-1 flex flex-col justify-start items-start px-6 my-6",
      elements: [
        {
          heading: false,
          headingText: "",
          id: "name",
        },
        {
          heading: false,
          headingText: "",
          id: "jobTitle",
        },
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

export const template = { templateLayout, components, cvHeadings };
