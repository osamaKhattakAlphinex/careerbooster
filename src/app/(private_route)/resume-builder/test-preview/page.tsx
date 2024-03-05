"use client";
import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { template } from "@/components/dashboard/resume-templates/static-templates/template-3";
import "../../templateStyles.css";
import DownloadService from "@/helpers/downloadFile";
const Page = () => {
  const resumeData = useSelector((state: any) => state.resume);
  const cvRef = useRef<any>(null);
  const { components, templateLayout, cvHeadings } = template;
  

  const GenerationOrder = [
    "shortName",
    "name",
    "jobTitle",
    "contact",
    "primarySkills",
    "summary",
    "workExperienceArray",
    "education",
  ];

  let spans: any = [];
  let currentPageIndex = 0;
  let pages: any = [];
  let parts: any = [];
  let fragment: any = [];
  let leftSpan: any = [];

  const cleanUpHTML = (page: any) => {
    const cleanUpIds = [
      "shortName",
      "email",
      "linkedin",
      "phone",
      "primarySkills",
      "education",
      "name",
      "jobTitle",
      "summary",
    ];

    const containerNames = [
      "header",
      "skills",
      "summary",
      "contact",
      "workExperienceArray",
      "education",
      "sideBar",
    ];
    for (const cleanUpId of cleanUpIds) {
      let emptyIds = page.querySelectorAll(`#${cleanUpId}`);
      for (const emptyId of emptyIds) {
        emptyId.remove();
      }
    }
    for (const containerName of containerNames) {
      let emptyDivs = page.querySelectorAll(
        `[data-container-name="${containerName}"]`
      );
      for (const emptyDiv of emptyDivs) {
        if (emptyDiv.children.length === 0) {
          emptyDiv.remove();
        }
      }
    }
  };

  function checkOverflow(id: any) {
    var element = document.getElementById(`page-${id}`);
    // Check if element exists
    if (!element) {
      return false;
    }

    var fragment = element.children[0];
    var children: any = fragment.children;

    var totalHeight = 0;

    // Calculate combined height of children
    for (var i = 0; i < children.length; i++) {
      let attr = children[i].getAttribute("data-container-name");
      if (attr === "sideBar") {
      } else {
        totalHeight += children[i].offsetHeight;
      }
    }

    // Check if total height exceeds viewport height
    if (totalHeight > element.clientHeight) {
      console.log("Overflow detected!");
      return true;
    } else {
      console.log("No overflow detected.");
      return false;
    }
  }

  const setSidebarHeight = (page: any) => {
    const getSideBar = page.querySelector('div[data-container-name="sideBar"]');
    if (getSideBar) {
      getSideBar.style.height = "29.62cm";
    }
  };
  const newHeading = (name: any, content: any) => {
    console.log("inside");
    let elemHeading = document.createElement("h2");
    elemHeading.textContent = content;
    setStylesToElement(
      elemHeading,
      "font-bold text-base uppercase border-t-2 border-b-2 py-0.5 w-full"
    );
    const elem: any = document.querySelectorAll(`[data-name='${name}']`);
    elem[0]?.parentNode.insertBefore(elemHeading, elem[0]);
  };
  const addHeadings = () => {
    newHeading("summary", "executive summary");
    newHeading("phone", "contact");
    newHeading("workExperienceArray", "work experience");
    newHeading("primarySkills", "Skills");
    newHeading("education", "education");
  };
  const educationDivs = (page: any) => {
    const educationDivs = document.querySelectorAll(
      "[data-education-container-index]"
    );
    let newDiv = document.createElement("div");
    newDiv.setAttribute("data-container-name", "education");
    for (const singleEducation of Array.from(educationDivs)) {
      newDiv.appendChild(singleEducation);
    }
    setStylesToElement(newDiv, "flex flex-row gap-4 px-6 flex-wrap");
    page.append(newDiv);
  };

  const isContentBleeding = (page: any, checking: any) => {
    let height = 0;
    let margins = 0;
    if (checking === "before") {
      height = 50;
    }
    let getBody = page.querySelector('div[data-container-name="body"]');
    if (getBody) {
      let style = window.getComputedStyle(getBody);
      margins = parseInt(style.marginTop) + parseInt(style.marginBottom);
    } else {
      getBody = page.children[0];
    }
    let isOverflowingVertically =
      getBody.clientHeight + height > 1119 - margins;
    if (isOverflowingVertically) {
      cleanUpHTML(page);
      isOverflowingVertically = getBody.clientHeight + height > 1119 - margins;
      if (!isOverflowingVertically) {
        return false;
      }
    }
    return isOverflowingVertically;
  };

  const setAttributesToElem = (attr: any, elem: any) => {
    attr.map((atr: any) => {
      const [[key, value]] = Object.entries(atr);
      elem.setAttribute(`data-${key}`, value);
    });
  };

  const setStylesToElement = (elem: any, styles: any) => {
    if (styles) {
      styles.split(" ").map((cls: any) => elem.classList.add(cls));
    }
  };
  const newPage = () => {
    const div = document.createElement("div");
    div.classList.add("page");
    div.id = "page-" + pages.length;
    pages.push(div);
    cvRef.current.append(div);
    return div;
  };

  const createElements = (obj: any) => {
    const [key, value] = obj;

    //   append the attribute to the elements

    let template = components[key];

    let attr = [{ name: key }];
    //   if the value is a object
    if (typeof value === "object" && !Array.isArray(value)) {
      if (template.elements) {
        for (const element of template.elements) {
          if (value.hasOwnProperty(element.id) && value[element.id] !== "") {
            const _element = document.createElement(element.tag);
            const styles = element.styles;
            setStylesToElement(_element, styles);
            setAttributesToElem(attr, _element);
            setAttributesToElem([{ name: element.id }], _element);
            _element.textContent = value[element.id];
            spans.push(_element);
          }
        }
      }
    }

    //   if the value is an array
    if (Array.isArray(value)) {
      let i = 1;
      for (const singleItem of value) {
        let newAttr = [];
        if (typeof singleItem === "object" && !Array.isArray(singleItem)) {
          if (template.elements) {
            for (const element of template.elements) {
              if (
                singleItem.hasOwnProperty(element.id) &&
                singleItem[element.id] !== ""
              ) {
                if (Array.isArray(singleItem[element.id])) {
                  let k = 1;
                  for (const singleAchievement of singleItem[element.id]) {
                    newAttr.push({ [`${key}-${element.id}-${i}-index`]: k });
                    const _element = document.createElement(element.tag);
                    setAttributesToElem(attr, _element);
                    setAttributesToElem(
                      [{ [`${key}-index`]: i }, { [`${element.id}-index`]: k }],
                      _element
                    );
                    _element.textContent = singleAchievement;
                    const styles = element.styles;
                    setStylesToElement(_element, styles);
                    spans.push(_element);
                    k++;
                  }
                } else {
                  const _element = document.createElement(element.tag);
                  setAttributesToElem(attr, _element);
                  setAttributesToElem(
                    [{ [`${key}-${element.id}-index`]: i }],
                    _element
                  );
                  _element.textContent = singleItem[element.id];
                  const styles = element.styles;
                  setStylesToElement(_element, styles);
                  spans.push(_element);
                }
              } else {
                if (element.container) {
                  const container_element = document.createElement(element.tag);
                  setAttributesToElem(attr, container_element);

                  setAttributesToElem(
                    [{ [`${key}-container-index`]: i }],
                    container_element
                  );
                  for (const item of element.container) {
                    if (
                      singleItem.hasOwnProperty(item.id) &&
                      singleItem[item.id] !== ""
                    ) {
                      const singlespan = document.createElement(item.tag);
                      setAttributesToElem(attr, singlespan);
                      const styles = item.styles;
                      setStylesToElement(singlespan, styles);
                      singlespan.textContent = singleItem[item.id];
                      container_element.append(singlespan);
                    }
                    if (item.container) {
                      const inner_container_element = document.createElement(
                        item.tag
                      );
                      setAttributesToElem(attr, inner_container_element);

                      setAttributesToElem(
                        [{ [`${key}-inner-container-index`]: i }],
                        inner_container_element
                      );
                      for (const one of item.container) {
                        if (
                          singleItem.hasOwnProperty(one.id) &&
                          singleItem[one.id] !== ""
                        ) {
                          const singlespan = document.createElement(one.tag);
                          setAttributesToElem(attr, singlespan);
                          const styles = one.styles;
                          setStylesToElement(singlespan, styles);
                          singlespan.textContent = singleItem[one.id];
                          inner_container_element.append(singlespan);
                        }
                      }
                      const styles = item.styles;
                      setStylesToElement(inner_container_element, styles);
                      container_element.append(inner_container_element);
                    }
                  }
                  const styles = element.styles;
                  setStylesToElement(container_element, styles);
                  spans.push(container_element);
                }
              }
            }
          }
        } else {
          newAttr.push({ [`${key}-index`]: i });
          const element = document.createElement(template.tag);
          setAttributesToElem(attr, element);
          setAttributesToElem(newAttr, element);
          element.textContent = singleItem;
          const styles = template.styles;
          setStylesToElement(element, styles);
          spans.push(element);
        }
        i++;
      }
    }
    //   if the value is a string
    else {
      const element = document.createElement(template.tag);
      setAttributesToElem(attr, element);
      setAttributesToElem(attr, element);
      element.textContent = value;
      const styles = template.styles;
      setStylesToElement(element, styles);
      spans.push(element);
    }
  };

  const generateElements = (element: any, tag: any) => {
    let elem = document.createElement(tag);
    elem.id = element.id;
    if (tag === "div") {
      elem.textContent = "ok";
    }
    return elem;
  };

  const generateLayout = (page: any) => {
    const currentPage = page.getAttribute("id").split("-").pop();
    for (let templatepart in templateLayout) {
      if (templatepart === "styles") {
      } else if (templatepart === "fragment") {
        for (let fragmentpart in templateLayout[templatepart]) {
          if (fragmentpart === "styles") {
          } else {
            const styles = templateLayout[templatepart][fragmentpart].styles;
            let div = document.createElement("div");
            setAttributesToElem([{ "container-name": fragmentpart }], div);
            styles.split(" ").map((cls: any) => div.classList.add(cls));
            const _elements = templateLayout[templatepart][
              fragmentpart
            ].elements.map((element: any) => {
              if (element.hasOwnProperty("fragment")) {
                return generateElements(element.fragment.elements[0], "div");
              } else {
                return generateElements(element, "span");
              }
            });

            _elements.map((_element: any) => div.append(_element));
            fragment.push({
              [fragmentpart]: div,
            });
          }
        }
        parts.push(fragment);
        fragment = [];
      } else {
        let div = document.createElement("div");
        const styles = templateLayout[templatepart].styles;
        styles.split(" ").map((cls: any) => div.classList.add(cls));

        const _elements = templateLayout[templatepart].elements.map(
          (element: any) => generateElements(element, "span")
        );

        _elements.map((_element: any) => div.append(_element));

        parts.push({
          [templatepart]: div,
        });
      }
    }

    if (Array.isArray(parts[currentPage])) {
      let container = document.createElement("div");
      templateLayout.fragment.styles
        .split(" ")
        .map((cls: any) => container.classList.add(cls));
      parts[currentPage]
        .map((part: any) => {
          if (typeof part === "object" && !Array.isArray(part)) {
            const [[partName, partElem]]: any = Object.entries(part);
            container.append(partElem);
          }
        })
        .join("");
      page.append(container);
    }
  };

  const getToNode = (span: any, attribute: any, page: any) => {
    const currentPage = page.getAttribute("id").split("-").pop();
    for (const p of parts[currentPage]) {
      const [[key, value]]: any = Object.entries(p);

      const findChild = value.children[attribute];
      const isHeading = span.getAttribute("data-type-heading");
      if (findChild) {
        if (
          attribute === "primarySkills" ||
          attribute === "education" ||
          attribute === "workExperienceArray"
        ) {
          value.appendChild(span);
          findChild.textContent = "";
        } else {
          if (isHeading) {
            findChild.parentNode.insertBefore(span, findChild);
            findChild.textContent = "";
          } else value.replaceChild(span, value.children[attribute]);
        }
      } else {
      }
    }
  };

  function FinalizeGeneration(span: any, page: any) {
    const attribute = span.getAttribute("data-name");

    const isItBefore = isContentBleeding(page, "before");
    if (attribute && !isItBefore) {
      getToNode(span, attribute, page);
    }
    if (isItBefore) {
      leftSpan.push({ span: span, attribute: attribute });
      return true;
    }

    const isItAfter = isContentBleeding(page, "after");
    return isItAfter;
  }

  const generate = (jsonData: any) => {
    console.log(jsonData);

    const newJsonObject: any = {};

    GenerationOrder.forEach((key) => {
      if (jsonData.hasOwnProperty(key)) {
        newJsonObject[key] = jsonData[key];
      }
    });

    console.log(newJsonObject);

    for (const item of Object.entries(newJsonObject)) {
      createElements(item);
    }

    const firstPage = newPage();
    generateLayout(firstPage);
    cvHeadings.forEach((item: any) => {
      let found = false; // Flag to track if the condition is met
      spans.forEach((singleSpan: any, index: any) => {
        if (found) return; // If the condition is already met, exit the loop
        const getSpan = singleSpan.getAttribute("data-name");
        if (getSpan === item.section) {
          const heading = document.createElement("h2");
          heading.textContent = item.text;
          setAttributesToElem(
            [{ name: item.section }, { "type-heading": true }],
            heading
          );
          const style = item.styles;
          setStylesToElement(heading, style);

          spans.splice(index, 0, heading);
          found = true; // Set the flag to true when the condition is met
          // You can perform other actions here if needed
        }
      });
    });
    spans.forEach((span: any) => {
      setTimeout(() => {
        const gen = FinalizeGeneration(span, pages[currentPageIndex]);

        if (gen) {
          const latestPage = newPage();

          generateLayout(latestPage);
          currentPageIndex = pages.length - 1;
          if (leftSpan.length > 0) {
            const leftOutSpan = FinalizeGeneration(
              leftSpan[0].span,
              pages[currentPageIndex]
            );
            leftSpan.pop();
          }
        }
      });
    }, 1000);
    setTimeout(() => {
      pages.map((page: any, index: any) => {
        educationDivs(pages[index]);
        setSidebarHeight(pages[index]);
        checkOverflow(index);
        cleanUpHTML(page);
      });
      // addHeadings()
    }, 100);
  };

  useEffect(() => {
    generate(resumeData);
  }, [resumeData]);
  return (
    <div className="ml-[234px]">
      <DownloadService
        componentRef={cvRef}
        fileName="ai-resume"
        preview={true}
      />
      <div ref={cvRef} className="cv-container text-[#000]"></div>
    </div>
  );
};

export default Page;
