'use server';
import  prisma  from "@/app/lib/prisma";
export  async function getApplications() {
    const applications = await prisma.application.findMany();
    return applications;
}