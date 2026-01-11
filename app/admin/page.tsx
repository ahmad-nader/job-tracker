"use client";
import { SubmitErrorHandler, useForm } from "react-hook-form";
import { createApplication } from "../components/Applications";
import { Status, Tag } from "@prisma/client";
import { ToastContainer, toast } from "react-toastify";
import { useState } from "react"; 
import { formatDateToISO } from "../utils/utils";

type FormData = {
  title: string;
  company: string;
  location: string;
  status: Status;
  dateApplied: Date;
  description: string | null;
  link: string;
  notes: string;
  tags: Tag[] | null;
};


export default function CreateApplicationPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      title: "",
      company: "",
      location: "",
      status: "APPLIED",
      dateApplied: formatDateToISO(new Date()) as unknown as Date, 
      link: "",
      notes: "",
    },
  });
  const [isLoading, setIsLoading] = useState(false); 

  const notifySuccess = (message: string) => toast.success(message);
  const notifyFailure = (message: string) => toast.error(message);
  const onError: SubmitErrorHandler<FormData> = () =>
    notifyFailure("Failed to create application. Please check your form inputs are valid.");
  
  const onSubmit = async (data: FormData) => {
    setIsLoading(true); 
    const payload = {
      ...data,
      dateApplied: new Date(data.dateApplied),
    };

    try {
      const res = await createApplication(payload);
      if (res) {
        notifySuccess("Application created successfully.");
      }
    } catch {
      notifyFailure("Failed to create application.");
    } finally {
      setIsLoading(false); 
    }
  };
  const getInputClasses = (fieldName: keyof FormData) =>
    `w-full p-2 border rounded mb-4 ${
      errors[fieldName] ? "border-red-500" : "border-gray-300"
    }`;

  return (
    <div className="max-w-3xl p-8">
    <h1 className="text-2xl font-bold mb-6">Create Job Application</h1>
    <ToastContainer />
    <form onSubmit={handleSubmit(onSubmit, onError)} className="flex flex-col w-3xl">
      <div>
        <label htmlFor="title">Job Title</label>
        <input
          {...register("title", { required: "Job title is required" })}
          placeholder="Job Title"
          className={getInputClasses("title")}
        />
        {errors.title && (
          <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="company">Company</label>
        <input
          {...register("company", { required: "Company is required" })}
          placeholder="Company"
          className={getInputClasses("company")}
        />
        {errors.company && (
          <p className="text-red-500 text-sm mt-1">
            {errors.company.message}
          </p>
        )}
      </div>

      <label htmlFor="location">Location</label>
      <input
        {...register("location")}
        placeholder="Location"
        className={getInputClasses("location")}
      />

      <label htmlFor="status">Status</label>
      <select
        {...register("status", { required: "Status is required" })}
        className={getInputClasses("status")}
      >
        <option value="APPLIED">Applied</option>
        <option value="TASKED">Tasked</option>
        <option value="INTERVIEWING">Interviewing</option>
        <option value="OFFER">Offer</option>
        <option value="REJECTED">Rejected</option>
      </select>
      {errors.status && (
          <p className="text-red-500 text-sm mt-1">{errors.status.message}</p>
      )}

      <div>
        <label htmlFor="dateApplied">Date Applied</label>
        <input
          type="date"
          {...register("dateApplied", { required: "Date is required" })}
          className={getInputClasses("dateApplied")}
        />
        {errors.dateApplied && (
          <p className="text-red-500 text-sm mt-1">
            {errors.dateApplied.message}
          </p>
        )}
      </div>

      <label htmlFor="link">Application Link</label>
      <input
        {...register("link")}
        placeholder="Application Link"
        className={getInputClasses("link")}
      />

      <label htmlFor="notes">Notes</label>
      <textarea
        {...register("notes")}
        placeholder="Notes"
        className={getInputClasses("notes")}
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded ml-auto"
        disabled={isLoading}
      >
        {isLoading ? 'Creating...' : 'Create Application'}
      </button>
    </form>
  </div>
  );
}
