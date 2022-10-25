import {Style} from "../response/style";
import {KeywordList} from "../response/keyWordList";

export interface Layer {
    name:        string;
    title:       string;
    groupName:   string;
    groupTitle:  string;
    keywordList: KeywordList[];
    styles:      Style[];
    times?:      string[];
}