import { template as template1 } from "./template-1";
import { template as template2 } from "./template-2";
import { template as template3 } from "./template-3";
import { template as template4 } from "./template-4";
import { template as template5 } from "./template-5";
import { template as template6 } from "./template-6";
import { template as template7 } from "./template-7";
import { template as template8 } from "./template-8";

export const getTemplates = (tempId: number) => {
  switch (tempId) {
    case 1:
      return template1;
    case 2:
      return template2;
    case 3:
      return template3;
    case 4:
      return template4;
    case 5:
      return template5;
    case 6:
      return template6;
    case 7:
      return template7;
    case 8:
      return template8;
    default:
      return template1;
  }
};
