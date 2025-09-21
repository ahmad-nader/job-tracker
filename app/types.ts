import { Status } from "@prisma/client";

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
}
