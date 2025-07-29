'use server';
import  prisma  from "@/app/lib/prisma";
import { Status } from "../generated/prisma";
export  async function getApplications() {
    const applications = await prisma.application.findMany();
    return applications;
}

export async function updateApplicationStatus(id: number, status: Status) {
    const updatedApplication = await prisma.application.update({
        where: { id },
        data: { status: Status[status] },
    });
    return updatedApplication;
}