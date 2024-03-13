"use client";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import "../../templateStyles.css";
import DownloadService from "@/helpers/downloadFile";
import { useSearchParams } from "next/navigation";
import { getTemplates } from "@/components/dashboard/resume-templates/static-templates";
const Page = () => {
  const params = useSearchParams();
  const [scale, setScale] = useState<number>(1);
  const [cvMaxHeight, setCvMaxHeight] = useState<any>(null);
  const [fileName, setFileName] = useState<string>("");
  const templateId: number = parseInt(params.get("templateId") || "0");
  const resumeId: string = params.get("resumeId") || "";
  let resumeData = useSelector((state: any) => state.resume);
  const userData = useSelector((state: any) => state.userData);
  const cvRef = useRef<any>(null);
  let template: any;
  template = getTemplates(templateId);

  useEffect(() => {
    if (resumeData.id === "") {
      resumeData = userData.resumes.find(
        (resume: any) => resume.id === resumeId
      );
    }
  }, [templateId, resumeId]);
  const { components, templateLayout, cvHeadings } = template;

  let newCvHeadings: any = [];
  console.log(resumeData);
  for (const singleHeading of Object.entries(resumeData.headings)) {
    const [key, value] = singleHeading;

    let singleValue = cvHeadings.find(
      (heading: any) => heading.headingKey === key
    );
    if (singleValue && singleValue.text !== "") {
      singleValue.text = value;
      newCvHeadings.push(singleValue);
    }
  }
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

  const getAllSettings = () => {
    if (cvRef.current) {
      const scaling =
        window.innerWidth < 1024
          ? (window.innerWidth * 0.38) / 320
          : ((window.innerWidth - 212) * 0.38) / 320;
      const roundedScale = Math.floor(scaling * 100) / 100;
      setScale(roundedScale);
      const scaledHeight = cvRef.current.offsetHeight; // Get the actual height of the scaled element
      const unscaledHeight = scaledHeight * roundedScale; // Calculate the unscaled height
      setCvMaxHeight(unscaledHeight + 100); // Set the scaled down height plus 100 (adjust as needed)
    }
  };
  const cleanUpHTML = (page: any) => {
    const cleanUpIds = [
      "shortName",
      "email",
      "linkedIn",
      "phone",
      "primarySkills",
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
      "body",
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

  const cleanUpLastPageHTML = (page: any) => {
    // Function to check if an element has text content
    const hasTextContent = (element: any) => {
      return element.textContent.trim().length > 0;
    };

    // Function to recursively check if any child element has text content
    const hasChildWithTextContent = (element: any) => {
      // Check if the current element has text content
      if (hasTextContent(element)) {
        return true; // Found text content, no need to check further
      }
      // Check text content of child elements recursively
      for (const child of element.children) {
        if (hasChildWithTextContent(child)) {
          return true; // Found text content in child, no need to check further
        }
      }
      return false; // No child has text content
    };

    // Check if the page has any child with text content
    if (!hasChildWithTextContent(page)) {
      // Remove the page if no child has text content
      page.remove();
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
      return true;
    } else {
      return false;
    }
  }

  const setSidebarHeight = (page: any) => {
    const getSideBar = page.querySelector('div[data-container-name="sideBar"]');
    if (getSideBar) {
      getSideBar.style.height = "29.62cm";
    }
  };

  const canFitEducation = (page: any, educationHeading: any) => {
    return educationHeading.offsetTop + 140 < page.clientHeight;
  };
  const educationDivs = (page: any, nextPage?: any) => {
    const educationDivs = document.querySelectorAll(
      "[data-education-container-index]"
    );
    let newDiv;
    newDiv = document.createElement("div");
    newDiv.setAttribute("data-container-name", "education");
    setStylesToElement(newDiv, "m-2 flex gap-4 flex-wrap w-full");
    let newNextDiv;
    newNextDiv = document.createElement("div");
    newNextDiv.setAttribute("data-container-name", "education");
    setStylesToElement(newNextDiv, "px-6 m-2 flex flex-wrap gap-4 w-full");
    const getEducationHeading = page.querySelector("h2[data-name='education']");
    if (getEducationHeading) {
      let indicatorDiv = document.createElement("span");
      indicatorDiv.setAttribute("data-container-name", "education-indicator");
      indicatorDiv.textContent = "indicator";
      setStylesToElement(indicatorDiv, "w-full h-2 bg-red-600");
      getEducationHeading.parentNode.insertBefore(
        indicatorDiv,
        getEducationHeading.nextSibling
      );
      let isSpaceAvailable = canFitEducation(page, indicatorDiv);
      let rowItemCount = 1;
      for (const singleEducation of Array.from(educationDivs)) {
        if (isSpaceAvailable && rowItemCount <= 3) {
          newDiv.appendChild(singleEducation);
          getEducationHeading.parentNode.insertBefore(
            newDiv,
            getEducationHeading.nextSibling
          );
          rowItemCount++;
        } else {
          isSpaceAvailable = canFitEducation(page, indicatorDiv);
          if (isSpaceAvailable) {
            rowItemCount = 1;
            newDiv.appendChild(singleEducation);
            getEducationHeading.parentNode.insertBefore(
              newDiv,
              getEducationHeading.nextSibling
            );

            rowItemCount++;
          } else {
            if (nextPage) {
              newNextDiv.appendChild(singleEducation);
              nextPage.append(newNextDiv);
            }
          }
        }
      }

      let elementsToRemove = document.querySelectorAll(
        '[data-container-name="education-indicator"]'
      );

      if (nextPage) {
        cleanUpLastPageHTML(nextPage);
      }
      // Loop through each matching element and remove it from the DOM
      elementsToRemove.forEach((element: any) => {
        element.parentNode.removeChild(element);
      });
    }
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
      styles.split(/\s+/).map((cls: any) => elem.classList.add(cls));
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
                      //
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
        setStylesToElement(page, templateLayout[templatepart]);
      } else if (templatepart === "attributes") {
        setAttributesToElem(templateLayout[templatepart], page);
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
    const newJsonObject: any = {};

    GenerationOrder.forEach((key) => {
      if (jsonData.hasOwnProperty(key)) {
        newJsonObject[key] = jsonData[key];
      }
    });

    for (const item of Object.entries(newJsonObject)) {
      createElements(item);
    }

    const firstPage = newPage();
    generateLayout(firstPage);
    newCvHeadings.forEach((item: any) => {
      let found = false; // Flag to track if the condition is met
      spans.forEach((singleSpan: any, index: any) => {
        if (found) return; // If the condition is already met, exit the loop
        const getSpan = singleSpan.getAttribute("data-name");
        if (getSpan === item.section) {
          const heading = document.createElement("h2");
          heading.textContent = item.text;
          if (item.attributes.length > 0) {
            setAttributesToElem(item.attributes, heading);
          }
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
        educationDivs(pages[index], pages[index + 1]);
        setSidebarHeight(pages[index]);
        checkOverflow(index);
        cleanUpHTML(page);
      });
      getAllSettings();
      // cleanUpHTML(pages[pages.length - 1]);
      // addHeadings()
    }, 100);
  };

  useEffect(() => {
    setFileName(
      `${resumeData?.name
        ?.replaceAll(" ", "-")
        .replaceAll("/", "")}-${resumeData?.jobTitle
        ?.replaceAll(" ", "-")
        .replaceAll("/", "")}`
    );
    generate(resumeData);
  }, [resumeData]);

  return (
    <div
      className="lg:ml-[234px] ml-0"
      style={{ maxHeight: `${cvMaxHeight}px` }}
    >
      <div className="flex items-center justify-center gap-3 xs:pb-0 md:pb-4">
        <DownloadService
          componentRef={cvRef}
          fileName={fileName}
          preview={false}
        />
      </div>
      <div
        ref={cvRef}
        className="cv-container text-[#000] origin-top-left"
        style={{ scale: scale < 1 ? scale : 1 }}
      ></div>
    </div>
  );
};

export default Page;
