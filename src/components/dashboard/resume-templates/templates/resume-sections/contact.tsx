"use client";
import EditableField from "@/components/dashboard/EditableField";
import {
  emailIconFilled,
  phoneIconFilled,
  linkedInIconFilled,
  homeIconFilled,
} from "@/helpers/iconsProvider";
import useUpdateAndSave from "@/hooks/useUpdateAndSave";
import React from "react";

type Props = {
  contact: any;
  styles: any;
};

const Contact = ({ contact, styles }: Props) => {
  const { updateSaveHook } = useUpdateAndSave();

  return (
    <ul
      className={`${styles?.contact_ul}`}
      // style={{ backgroundColor: color_second }}
    >
<<<<<<< HEAD
      <li className={`${contactStyle_li}`}>
        {phoneIconFilled}
=======
      <li className={`${styles?.contact_li}`}>
        {phoneIcon}
>>>>>>> b05f0c661062b2d08e3ff03b3bbe72bfcd39e234
        <EditableField
          value={contact?.phone ? contact?.phone : "(555) 555-1234"}
          onSave={(value: string) => {
            if (value !== contact?.phone) {
              updateSaveHook.updateAndSaveBasicInfo({ phone: value });
            }
          }}
        />
      </li>
<<<<<<< HEAD
      <li className={`${contactStyle_li}`}>
        {emailIconFilled}
=======
      <li className={`${styles?.contact_li}`}>
        {emailIcon}
>>>>>>> b05f0c661062b2d08e3ff03b3bbe72bfcd39e234
        <EditableField
          value={contact?.email ? contact?.email : "your@email.com"}
          onSave={(value: string) => {
            if (value !== contact?.email) {
              updateSaveHook.updateAndSaveBasicInfo({ email: value });
            }
          }}
        />
      </li>

<<<<<<< HEAD
      <li className={`${contactStyle_li}`}>
        <div className="grid place-content-center">
          {/* <svg
=======
      <li className={`${styles?.contact_li}`}>
        <div className="">
          <svg
>>>>>>> b05f0c661062b2d08e3ff03b3bbe72bfcd39e234
            width="16"
            height="16"
            viewBox="0 0 19 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.5 18.4C14.4153 18.4 18.4 14.4153 18.4 9.5C18.4 4.58467 14.4153 0.6 9.5 0.6C4.58467 0.6 0.6 4.58467 0.6 9.5C0.6 14.4153 4.58467 18.4 9.5 18.4Z"
              stroke="black"
              strokeWidth="0.8"
            />
            <path
              d="M6.15572 13V7.54545H6.99379V13H6.15572ZM6.58185 6.63636C6.4185 6.63636 6.27764 6.58073 6.15927 6.46946C6.04326 6.35819 5.98526 6.22443 5.98526 6.06818C5.98526 5.91193 6.04326 5.77817 6.15927 5.6669C6.27764 5.55563 6.4185 5.5 6.58185 5.5C6.74521 5.5 6.88488 5.55563 7.00089 5.6669C7.11926 5.77817 7.17844 5.91193 7.17844 6.06818C7.17844 6.22443 7.11926 6.35819 7.00089 6.46946C6.88488 6.58073 6.74521 6.63636 6.58185 6.63636ZM9.36683 9.71875V13H8.52876V7.54545H9.33842V8.39773H9.40945C9.53729 8.12074 9.73142 7.8982 9.99183 7.73011C10.2522 7.55966 10.5884 7.47443 11.0004 7.47443C11.3697 7.47443 11.6928 7.55019 11.9698 7.7017C12.2468 7.85085 12.4622 8.07812 12.6161 8.38352C12.77 8.68655 12.8469 9.07008 12.8469 9.53409V13H12.0089V9.59091C12.0089 9.16241 11.8976 8.8286 11.6751 8.58949C11.4525 8.34801 11.1471 8.22727 10.7589 8.22727C10.4914 8.22727 10.2522 8.28527 10.0415 8.40128C9.83321 8.51728 9.66868 8.68655 9.54794 8.90909C9.4272 9.13163 9.36683 9.40152 9.36683 9.71875Z"
              fill="black"
            />
          </svg> */}
          {linkedInIconFilled}
        </div>
        <EditableField
          value={
            contact?.linkedIn ? contact?.linkedIn : "https://www.linkedin.com/"
          }
          // overrideValue={name ? name : "Full Name"}
          onSave={(value: string) => {
            if (value !== contact.linkedIn) {
              updateSaveHook.updateAndSaveBasicInfo({ linkedIn: value });
            }
          }}
        />
      </li>
<<<<<<< HEAD
      <li className={`${contactStyle_li}`}>
        <div className="">{homeIconFilled}</div>
=======
      <li className={`${styles?.contact_li}`}>
        <div className="">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
            />
          </svg>
        </div>
>>>>>>> b05f0c661062b2d08e3ff03b3bbe72bfcd39e234
        <EditableField
          value={contact?.address ? contact.address : ""}
          onSave={(value: string) => {
            if (value !== contact.address) {
              updateSaveHook.updateAndSaveBasicInfo({ address: value });
            }
          }}
        />
      </li>
    </ul>
  );
};

export default Contact;
