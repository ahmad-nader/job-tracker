'use server';
import  prisma  from "@/app/lib/prisma";
import { Status } from "@prisma/client";
import { Application } from "@prisma/client";
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

export async function createApplication(data: Application) {
    const application = await prisma.application.create({
        data,
    });
    return application;
}
export async function deleteApplication(id: number) {
    const deletedApplication = await prisma.application.delete({
        where: { id },
    });
    return deletedApplication;
}
export async function getApplicationById(id: number) {
    const application = await prisma.application.findUnique({
        where: { id },
    });
    return application;
}
export async function updateApplication(id: number, data: Partial<Application>) {
    const updatedApplication = await prisma.application.update({
        where: { id },
        data,
    });
    return updatedApplication;
}
export async function getApplicationsByStatus(status: Status) {
    const applications = await prisma.application.findMany({
        where: { status },
    });
    return applications;
}
export async function getApplicationsByCompany(company: string) {
    const applications = await prisma.application.findMany({
        where: { company },
    });
    return applications;
}
export async function getApplicationsByDate(date: string) {
    const applications = await prisma.application.findMany({
        where: {
            dateApplied: {
                gte: new Date(date),
            },
        },
    });
    return applications;
}