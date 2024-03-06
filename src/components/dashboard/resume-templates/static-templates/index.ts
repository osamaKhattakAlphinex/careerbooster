import {template as template1} from "./template-1"
import {template as template2} from "./template-2"
import {template as template3} from "./template-3"
import {template as template4} from "./template-4"

export const getTemplates = (tempId: number) =>{
    switch(tempId){
        case 1:
            return template1
        case 2:
            return template2
        case 3:
            return template3
        case 4:
            return template4
        default:
            return template1
    }

}