export type CoverLetterCard = {
    jobDescription: string;
    name: string;
    phone: string;
    email: string;
    address: string;
    date: string;
    coverLetterText: string;
    generatedOnDate: string;
    generatedViaOption: string;
    userEmail: string;
}
export type EmailCard = {
    id: string;
    jobDescription: string;
    emailText: string;
    generatedOnDate: string;
    generatedViaOption: string;
    userEmail: string;
    emailFirstFollowUpText?: string;
    emailSecondFollowUpText?: string;

}
export type ResumeCard = {

}
export type LinkedinHeadlineCard = {

}
export type LinkedinAboutCard = {

}
export type LinkedinJobDescCard = {

}
export type LinkedinKeywordsCard = {
    
}
export type UserDataType = {

}

export type SingleJob = {
    _id: string;
    jobTitle: string;
    location: string;
    employer: string;
    category: string;
    jobDescription: string;
    link: string;
    skills: string[];
    addedByUserId: string;
    noOfProposals: number;
    status: string;
    featured: number;
    updatedAt: Date;
}
