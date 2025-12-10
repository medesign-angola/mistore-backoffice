import { HelpTabsEnum } from "./help-tabs.enum";

export type HelpContent = {
    [tag in HelpTabsEnum]: Faq[];
};

export interface Faq {
    question: string,
    answer: string
}