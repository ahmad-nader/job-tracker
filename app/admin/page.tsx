"use client";
import { SubmitErrorHandler, useForm } from "react-hook-form";
import { createApplication, getApplicationById, updateApplication } from "../components/Applications";
import { Status, Tag } from "@prisma/client";
import { ToastContainer, toast } from "react-toastify";
import { useEffect, useState } from "react"; 
import { formatDateToISO } from "../utils/utils";
import { useSearchParams } from "next/navigation";

type FormData = {
  id?: number; // id is optional
  title: string;
  company: string;
  location: string | null;
  status: Status;
  dateApplied: string;
  description: string | null;
  link: string | null;
  notes: string | null;
  tags: Tag[] | null;
};

const applicationStatuses = [
{
    value: "APPLIED",
    label: "Applied",
},
{
    value: "INTERVIEWING",
    label: "Interviewing",
},
{
    value: "TASKED",
    label: "Tasked",
},
{
    value: "OFFER",
    label: "Offer",
},
{
    value: "REJECTED",
    label: "Rejected",
}
];


export default function CreateApplicationPage() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    defaultValues: {
      title: "",
      company: "",
      location: "",
      status: "APPLIED",
      dateApplied: formatDateToISO(new Date()), 
      link: "",
      notes: "",
    },
  });
  const [isLoading, setIsLoading] = useState(false); 
  const searchParams = useSearchParams();
  const applicationId = searchParams.get('jobId');
  const isEditing = !!applicationId;

  useEffect(() => {
    if (isEditing) {
      const fetchApplication = async () => {
        const app = await getApplicationById(Number(applicationId));
        if (app) {
            reset({
                ...app,
                location: app.location || "",
                link: app.link || "",
                notes: app.notes || "",
                description: app.description || "",
                dateApplied: formatDateToISO(new Date(app.dateApplied))
            });
        }
      };
      fetchApplication();
    }
  }, [applicationId, isEditing, reset]);

  const notifySuccess = (message: string) => toast.success(message);
  const notifyFailure = (message: string) => toast.error(message);
  const onError: SubmitErrorHandler<FormData> = () =>
    notifyFailure("Failed to create application. Please check your form inputs are valid.");
  
  const onSubmit = async (data: FormData) => {
    setIsLoading(true); 
    const { ...formData } = data; 

    const payload = {
      ...formData,
      dateApplied: new Date(data.dateApplied),
    };

    try {
      if (isEditing && applicationId) {
        const res = await updateApplication(Number(applicationId), payload);
        if (res) {
          notifySuccess("Application updated successfully.");
        }
      } else {
        const res = await createApplication(payload);
        if (res) {
          notifySuccess("Application created successfully.");
        }
      }
    } catch {
      notifyFailure(isEditing ? "Failed to update application." : "Failed to create application.");
    } finally {
      setIsLoading(false); 
    }
  };
  const getInputClasses = (fieldName: keyof Omit<FormData, 'id' | 'tags'>) =>
    `w-full p-2 border rounded mb-4 ${
      errors[fieldName] ? "border-red-500" : "border-gray-300"
    }`;

  return (
    <div className="max-w-3xl p-8">
    <h1 className="text-2xl font-bold mb-6">{isEditing ? 'Edit' : 'Create'} Job Application</h1>
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
        {applicationStatuses.map((status) => (
          <option key={status.value} value={status.value}>{status.label}</option>
        ))}
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
        {isLoading ? (isEditing ? 'Updating...' : 'Creating...') : (isEditing ? 'Update Application' : 'Create Application')}
      </button>
    </form>
  </div>
  );
}
