"use-client";
import React, { useEffect } from "react";
import PizZip from "pizzip";
import { DOMParser } from "@xmldom/xmldom";

const saveToLocalStorage = (text: any) => {
  localStorage.setItem("pdfText", text);
};
const WordFileHandler = ({
  file,
  fetchRegistrationDataFromResume,
  text,
  setText,
}: any) => {
    
  const str2xml = (str: any) => {
    if (str.charCodeAt(0) === 65279) {
      // BOM sequence
      str = str.substr(1);
    }
    return new DOMParser().parseFromString(str, "text/xml");
  };

  const getParagraphs = (content: any) => {
    const zip = new PizZip(content);
    const xml = str2xml(zip.files["word/document.xml"].asText());

    const paragraphsXml = xml.getElementsByTagName("w:p");
    let _paragraphs = "";

    for (let i = 0, len = paragraphsXml.length; i < len; i++) {
      let fullText = "";
      const textsXml = paragraphsXml[i].getElementsByTagName("w:t");
      for (let j = 0, len2 = textsXml.length; j < len2; j++) {
        const textXml = textsXml[j];
        if (textXml.childNodes) {
          fullText += textXml.childNodes[0].nodeValue;
        }
      }
      if (fullText) {
        _paragraphs += fullText;
      }
    }
    return _paragraphs;
  };

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e?.target?.result;
        const paragraphs = getParagraphs(content);
        setText(paragraphs);
      };

      reader.onerror = (err) => console.error(err);

      reader.readAsBinaryString(file);
    }
  }, [file]);

  useEffect(() => {
    if (text !== "") {
      saveToLocalStorage(text);
      if (fetchRegistrationDataFromResume !== undefined) {
        fetchRegistrationDataFromResume(text);
      }
    }
  }, [text]);

  return <></>;
};

export default WordFileHandler;