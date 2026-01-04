import { Status, Tag } from "@prisma/client";

export enum CardStatus {
    APPLIED = "APPLIED",
    TASKED = "TASKED",
    INTERVIEWING = "INTERVIEWING",
    OFFER = "OFFER",
    REJECTED = "REJECTED",
}

export interface BoardCard {
    id: number;
    title: string;
    company: string;
    location: string;
    status: Status;
    description?: string;
    tags?: Tag[];
    link?: string;
}

export interface ApplicationWithTags {
    id: number;
    title: string;
    company: string;
    location: string | null;
    status: Status;
    dateApplied: Date;
    description: string | null;
    link: string | null;
    notes: string | null;
    tags: Tag[];
}