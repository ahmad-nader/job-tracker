import { Status } from "./generated/prisma";

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
    description: string;
    status: Status;
    subtitle: string;
}
