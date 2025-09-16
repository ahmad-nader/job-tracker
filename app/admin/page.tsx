"use client";
import { SubmitErrorHandler, useForm } from "react-hook-form";
import { createApplication } from "../components/Applications";
import { Status } from "@prisma/client";
type FormData = {
  title: string;
  company: string;
  location: string;
  status: Status;
  dateApplied: Date;
  link: string;
  notes: string;
  tags: string[] | null;
};

export default function CreateApplicationPage() {
  const { register, handleSubmit } = useForm<FormData>({
    defaultValues: {
      title: "",
      company: "",
      location: "",
      status: "APPLIED",
      dateApplied: new Date(),
      link: "",
      notes: "",
    },
  });
  const onError: SubmitErrorHandler<FormData> = (errors) => console.log(errors);
  const onSubmit = async (data: FormData) => {
    console.log("data", data)
    const payload = {
      ...data,
      dateApplied: new Date(data.dateApplied),
    };

    const res = await createApplication(payload);
    console.log(res);
  };

  return (
    <main className="max-w-lg mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Create Job Application</h1>
      <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-4">
        <input
          {...register("title", { required: true })}
          placeholder="Job Title"
          className="w-full p-2 border rounded"
        />
        <input
          {...register("company", { required: true })}
          placeholder="Company"
          className="w-full p-2 border rounded"
        />
        <input
          {...register("location")}
          placeholder="Location"
          className="w-full p-2 border rounded"
        />
        <select {...register("status")} className="w-full p-2 border rounded">
          <option value="APPLIED">Applied</option>
          <option value="TASKED">Tasked</option>
          <option value="INTERVIEWING">Interviewing</option>
          <option value="OFFER">Offer</option>
          <option value="REJECTED">Rejected</option>
        </select>
        <input
          type="date"
          {...register("dateApplied", { required: true })}
          className="w-full p-2 border rounded"
        />
        <input
          {...register("link")}
          placeholder="Application Link"
          className="w-full p-2 border rounded"
        />
        <textarea
          {...register("notes")}
          placeholder="Notes"
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Create Application
        </button>
      </form>
    </main>
  );
}
