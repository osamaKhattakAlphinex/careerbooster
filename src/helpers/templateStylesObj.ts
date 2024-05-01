import { educationIcon, sparkleIcon } from "./iconsProvider";

// Header Styles

const header = {
  full_Name_Style: "fullName_temp_2",
  jobTitle: "jobTitle_temp_2",
};

const conditionStyleHeader = {
  line: false,
  span1: false,
};

//contact styles

const contact = {
  contact_ul: "contact_ul",
  contact_li: "contact_li",
};
export const contact_temp_8 = {
  contact_8_ul: "contact_8_ul",
  contact_8_li: "contact_8_li",
};
export const skill_temp_8 = {
  skill_8_ul: "skill_8_ul",
  skill_8_li: "skill_8_li",
  skill_8_heading: "skill_8_heading",
  skill_8_New: "skill_New",
};
export const template_6_styles = {
  full_Name_Style:
    "text-4xl font-bold border-2 border-transparent xs:text-2xl md:4xl lg:text-4xl hover:shadow-md hover:bg-gray-100 hover:border-dashed hover:border-gray-500     ",
  jobTitle:
    "w-full text-lg border-2 border-transparent xs:text-xs md:text-2xl lg:text-2xl xs:leading-none hover:shadow-md hover:bg-gray-100 hover:border-dashed hover:border-gray-500",
  conatact_heading:
    "flex flex-row items-center gap-2 mb-2 -mr-6 text-base font-semibold uppercase border-2 border-transparent md:-mr-6 md:mt-4 hover:border-dashed hover:border-gray-500 hover:w-full",
  contact_ul:
    "flex  flex-col xs:flex-col justify-between  pl-0 my-2 text-xs break-all md:flex-row",
  contact_li:
    "hover:shadow-md hover:bg-gray-100 text-xs   flex flex-row gap-1  items-center justify-start md:w-[20%] xs:w-full ",
  skill_heading:
    "flex flex-row flex-wrap items-center gap-2 my-1 text-base font-semibold uppercase border-2 border-transparent hover:border-dashed hover:border-gray-500",
  skill_ul:
    "border-2 border-transparent hover:border-dashed hover:border-gray-500  pl-0 flex flex-row  flex-wrap gap-1 h-[20%] text-xs !list-disc",
  skill_li:
    "hover:shadow-md  w-[32%]  sm:w-[32%]  hover:cursor-move parent hover:border-dashed hover:border-gray-500 hover:border  hover:bg-gray-100 border-transparent border-[1px] flex  items-center !list-disc",
  training_h3: "publication_h3",
  training_div: "publication_div",
  training_h1: "achievement_h1",
  training_h2: "publication_h2",
  training_h2_1: "publication_h2_1",
  training_date: "publication_date",
  training_ul: "publication_ul",
  training_li: "publication_li",
  training_line: "publication_line",
  training_delete1: "publication_delete1",
  training_delete: "publication_delete",
  training_div_input: "publication_div_input",
  training_new_input: "publication_new_input",
  certification_h3: "publication_h3",
  certification_div: "publication_div",
  certification_h1: "achievement_h1",
  certification_h2_1: "publication_h2_1",
  certification_date: "publication_date",
  certification_ul: "publication_ul",
  certification_li: "publication_li",
  certification_line: "publication_line",
  certification_delete1: "publication_delete1",
  certification_delete: "publication_delete",
  certification_div_input: "publication_div_input",
  certification_new_input: "publication_new_input",
  experienceHeading_temp_2: "experienceHeading_temp_2",
  summary_heading: "summary_heading",
  summary_text: "summary_text",
  publication_h3: "publication_h3",
  achievement_div: "achievement_div",
  achievement_h2: "achievement_h2",
  achievement_h1: "achievement_h1",
  achievement_save_btn: "achievement-save-btn",
  achievement_delete_btn: "achievement-delete-btn",
  education_h3: "education_h3",
  education_ul: "education_ul",
  education_div: "education_div",
  education_li: "education_li",
  education_delete: "education_delete",
  education_li_2: "education_li_2",
  education_li_italic: "education_li_italic",
  education_li_date: "education_li_date",
  publication_div: "publication_div",
  publication_h2: "publication_h2",
  publication_h2_1: "publication_h2_1",
  publication_new_input: "publication_new_input",
  publication_delete: "publication_delete",
  publication_delete1: "publication_delete1 ",
  publication_line: "publication_line",
  publication_date: "publication_date",
  publication_ul: "publication_ul",
  publication_li: "publication_li",
  publication_div_input: "publication_div_input",
  project_h3: "publication_h3",
  project_div: "publication_div",
  project_h2: "publication_h2",
  project_h2_1: "publication_h2_1",
  project_new_input: "publication_new_input",
  project_delete: "publication_delete",
  project_delete1: "publication_delete1 ",
  project_line: "publication_line",
  project_date: "publication_date",
  project_ul: "publication_ul",
  project_li: "publication_li",
  project_div_input: "publication_div_input",
  interest_h3: "publication_h3",
  interest_div: "publication_div",
  interest_h1: "achievement_h1",
  interest_h2: "publication_h2",
  interest_h2_1: "publication_h2_1",
  interest_date: "publication_date",
  interest_ul: "publication_ul",
  interest_li: "publication_li",
  interest_line: "publication_line",
  interest_delete1: "publication_delete1",
  interest_delete: "publication_delete",
  interest_div_input: "publication_div_input",
  interest_new_input: "publication_new_input",
  award_h3: "publication_h3",
  award_div: "publication_div",
  award_h1: "achievement_h1",
  award_h2: "publication_h2",
  award_h2_1: "publication_h2_1",
  award_date: "publication_date",
  award_ul: "publication_ul",
  award_li: "publication_li",
  award_line: "publication_line",
  award_delete1: "publication_delete1",
  award_delete: "publication_delete",
  award_div_input: "publication_div_input",
  award_new_input: "publication_new_input",
  reference_h3: "publication_h3",
  reference_ul: "reference_ul",
  reference_li: "reference_li",
  reference_div: "publication_div",
  reference_h1: "achievement_h1",
  reference_h2: "publication_h2",
  reference_h2_1: "publication_h2_1",
  reference_date: "publication_date",
  reference_line: "publication_line",
  reference_delete1: "publication_delete1",
  reference_delete: "publication_delete",
  reference_div_input: "publication_div_input",
  reference_new_input: "publication_new_input",
  language_h3: "publication_h3",
  language_ul: "reference_ul",
  language_li: "reference_li",
  language_div: "language_div ",
  language_h1: "achievement_h1",
  language_h2_1: "publication_h2_1",
  language_date: "publication_date",
  span1: "span1",
  span2: "span2",
};
export const template_4_styles = {
  language_ul: "flex flex-col flex-wrap pl-0 ",
  language_h3: "publication_h3",
  language_li:
    "m-2 xs:m-0 relative border-transparent border-2 hover:border-dashed hover:border-gray-500 ",
  language_div:
    "flex justify-between items-center border-2 border-transparent md:w-full hover:cursor-move ",
  language_h1:
    "flex text-[14px] xs:text-[12px] md:text-xs font-bold leading-8 hover:shadow-md hover:cursor-text hover:bg-gray-500",
  language_h2_1:
    "flex flex-wrap gap-1 text-[10px] font-semibold leading-relaxed hover:cursor-default",
  language_date: "hover:shadow-md hover:bg-gray-500",
  interest_h3: "publication_h3",
  interest_div:
    "flex justify-between items-center border-2 border-transparent md:w-full hover:cursor-move ",
  interest_h1:
    "flex text-base font-bold leading-8 hover:shadow-md hover:cursor-text hover:bg-gray-500",
  interest_h2:
    "text-xs xs:text-[12px] md:text-xs font-bold leading-8 hover:shadow-md hover:cursor-text hover:bg-gray-500",
  interest_h2_1:
    "flex flex-wrap gap-1 text-[10px] font-semibold leading-relaxed hover:cursor-default",
  interest_date: "hover:shadow-md hover:bg-gray-500",
  interest_ul: "flex flex-col flex-wrap pl-0 text-xs xs:text-[12px] md:text-xs",
  interest_li:
    "m-2 xs:m-0 relative border-transparent border-2 hover:border-dashed hover:border-gray-500",
  interest_line: "publication_line",
  interest_delete1:
    "hover:border-dashed list-disc hover:cursor-move hover:border-gray-500 border-[1px] hover:border-[1px] border-transparent hover:shadow-md relative hover:bg-gray-500",
  interest_delete: "publication_delete",
  interest_div_input: "publication_div_input",
  interest_new_input: "publication_new_input",
  full_Name_Style:
    "text-4xl font-bold border-2 border-transparent hover:border-dashed hover:border-gray-500 xs:text-2xl md:4xl lg:text-4xl hover:shadow-md hover:bg-gray-100",
  jobTitle:
    "text-lg border-2 border-transparent xs:text-xs md:text-2xl lg:text-2xl hover:shadow-md hover:bg-gray-100 hover:border-dashed hover:border-gray-500",
  skill_heading:
    "flex flex-row items-center gap-2 mb-2 -mr-6 text-base font-semibold uppercase border-2 border-transparent md:-mr-6 md:text-md hover:border-dashed hover:border-gray-500 hover:w-full",
  skill_ul:
    "border-2 border-transparent hover:border-dashed hover:border-gray-500  pl-0 flex list-styled flex-col gap-3 mb-4 text-xs xs:text-[12px] md:text-xs list-disc",
  skill_li:
    "hover:shadow-md hover:cursor-move  border-transparent border-[1px] hover:border-dashed hover:border-gray-500 hover:border  hover:bg-gray-500 flex  items-center gap-3 list-disc",
  skill_New: "skill_New",
  span1: "span1",
  span2: "span2",
  skill_input: "skill_input",
  conatact_heading:
    "flex flex-row items-center gap-2 mb-2 -mr-6 text-base font-semibold uppercase border-2 border-transparent md:-mr-6 md:mt-4 hover:border-dashed hover:border-gray-500 hover:w-full",
  contact_ul: "flex flex-col gap-2 pl-0 mb-4 text-xs break-all",
  contact_li:
    "hover:shadow-md mb-[8px] hover:bg-gray-500  flex flex-row gap-2  justify-start items-center",
};
export const templates = {
  template_2: "template_2",
  template_3: "template_3",
  template_8: "template_8",
  template_9: "template_9",
};

export const allTemplate = {};
//summary styles

const summary = {
  summary_heading: "summary_heading",
  summary_text: "summary_text",
  publication_h3: "publication_h3",
  span1: "span1",
  span2: "span2",
};
//work Experience

export const experience = {
  experienceHeading_temp_2: "experienceHeading_temp_2",
  achievement_div: "achievement_div",
  achievement_h2: "achievement_h2",
  achievement_h1: "achievement_h1",
  achievement_save_btn: "achievement-save-btn",
  achievement_delete_btn: "achievement-delete-btn",
  span1: "span1",
  span2: "span2",
};

//skills styles

const skill = {
  skill_heading: "skill_heading",
  skill_ul: "skill_ul",
  skill_li: "skill_li",
  skill_New: "skill_New",
  span1: "span1",
  span2: "span2",
  skill_input: "skill_input",
};

//publication styles

const publicationStyles = {
  publication_h3: "publication_h3",
  publication_div: "publication_div",
  publication_h2: "publication_h2",
  publication_h2_1: "publication_h2_1",
  publication_new_input: "publication_new_input",
  publication_delete: "publication_delete",
  publication_delete1: "publication_delete1 ",
  publication_line: "publication_line",
  publication_date: "publication_date",
  span1: "span1",
  span2: "span2",
  publication_ul: "publication_ul",
  publication_li: "publication_li",
  publication_div_input: "publication_div_input",
};
export const projectStyles = {
  project_h3: "publication_h3",
  project_div: "publication_div",
  project_h2: "publication_h2",
  project_h2_1: "publication_h2_1",
  project_new_input: "publication_new_input",
  project_delete: "publication_delete",
  project_delete1: "publication_delete1 ",
  project_line: "publication_line",
  project_date: "publication_date",
  span1: "span1",
  span2: "span2",
  project_ul: "publication_ul",
  project_li: "publication_li",
  project_div_input: "publication_div_input",
};

const conditionStylePublication = {
  span1_2: false,
};
//certification styles

const certification = {
  certification_h3: "publication_h3",
  certification_div: "publication_div",
  certification_h1: "achievement_h1",
  certification_h2_1: "publication_h2_1",
  certification_date: "publication_date",
  certification_ul: "publication_ul",
  certification_li: "publication_li",
  certification_line: "publication_line",
  certification_delete1: "publication_delete1",
  certification_delete: "publication_delete",
  certification_div_input: "publication_div_input",
  certification_new_input: "publication_new_input",
  span1: "span1",
  span2: "span2",
};

//training styles

const training = {
  training_h3: "publication_h3",
  training_div: "publication_div",
  training_h1: "achievement_h1",
  training_h2: "publication_h2",
  training_h2_1: "publication_h2_1",
  training_date: "publication_date",
  training_ul: "publication_ul",
  training_li: "publication_li",
  training_line: "publication_line",
  training_delete1: "publication_delete1",
  training_delete: "publication_delete",
  training_div_input: "publication_div_input",
  training_new_input: "publication_new_input",
  span1: "span1",
  span2: "span2",
};

//interest styles

const interest = {
  interest_h3: "publication_h3",
  interest_div: "publication_div",
  interest_h1: "achievement_h1",
  interest_h2: "publication_h2",
  interest_h2_1: "publication_h2_1",
  interest_date: "publication_date",
  interest_ul: "publication_ul",
  interest_li: "publication_li",
  interest_line: "publication_line",
  interest_delete1: "publication_delete1",
  interest_delete: "publication_delete",
  interest_div_input: "publication_div_input",
  interest_new_input: "publication_new_input",
  span1: "span1",
  span2: "span2",
};

//award styles

const award = {
  award_h3: "publication_h3",
  award_div: "publication_div",
  award_h1: "achievement_h1",
  award_h2: "publication_h2",
  award_h2_1: "publication_h2_1",
  award_date: "publication_date",
  award_ul: "publication_ul",
  award_li: "publication_li",
  award_line: "publication_line",
  award_delete1: "publication_delete1",
  award_delete: "publication_delete",
  award_div_input: "publication_div_input",
  award_new_input: "publication_new_input",
  span1: "span1",
  span2: "span2",
};

// reference styles

const reference = {
  reference_h3: "publication_h3",
  reference_ul: "reference_ul",
  reference_li: "reference_li",
  reference_div: "publication_div",
  reference_h1: "achievement_h1",
  reference_h2: "publication_h2",
  reference_h2_1: "publication_h2_1",
  reference_date: "publication_date",
  reference_line: "publication_line",
  reference_delete1: "publication_delete1",
  reference_delete: "publication_delete",
  reference_div_input: "publication_div_input",
  reference_new_input: "publication_new_input",
  span1: "span1",
  span2: "span2",
};

//language styles

const language = {
  language_h3: "publication_h3",
  language_ul: "reference_ul",
  language_li: "reference_li",
  language_div: "language_div ",
  language_h1: "achievement_h1",
  language_h2_1: "publication_h2_1",
  language_date: "publication_date",
  span1: "span1",
  span2: "span2",
};

// education style

const education = {
  education_h3: "education_h3",
  education_ul: "education_ul",
  education_div: "education_div",
  education_li: "education_li",
  education_delete: "education_delete",
  education_li_2: "education_li_2",
  education_li_italic: "education_li_italic",
  education_li_date: "education_li_date",
  span1: "span1",
  span2: "span2",
};
export const customStyle_4 = {
  borderTopBottom: false,
  borderBottom: true,
  centeredHeading: false,
};
export const customStyle_2 = {
  borderTopBottom: false,
  borderBottom: false,
  centeredHeading: false,
};
export const customStyle_8 = { borderTopBottom: true, centeredHeading: true };
export const customStyle_6 = { borderTopBottom: true, centeredHeading: false };
export const customStyle_9 = {
  borderTopBottom: true,
  centeredHeading: false,
  education_bg: "education_bg",
};
export const customStyle_10 = {
  borderTopBottom: false,
  centeredHeading: false,
  bgColor: "bg_color_9",
  education_bg: "education_bg",
};
export const customStyle_15 = {
  borderTopBottom: false,
  centeredHeading: false,
  bgColor: "bg_color",
  education_bg: "education_bg",
};
export const customStyle_16 = {
  borderTopBottom: false,
  centeredHeading: false,
  borderBottom: true,
  education_bg: "education_bg",
};

export {
  publicationStyles,
  conditionStylePublication,
  certification,
  training,
  interest,
  award,
  reference,
  language,
  education,
  summary,
  skill,
  header,
  conditionStyleHeader,
  contact,
};
