"use client";
import { useForm } from "react-hook-form";

type FormData = {
  title: string;
  company: string;
  location?: string;
  status: string;
  dateApplied: string;
  link?: string;
  notes?: string;
  tags?: string; 
};

export default function CreateApplicationPage() {
  const { register, handleSubmit, reset } = useForm<FormData>({
    defaultValues: {
      title: "",
      company: "",
      location: "",
      status: "APPLIED",
          dateApplied: new Date().toISOString().slice(0, 10), 
      link: "",
      notes: "",
      tags: "",
    },
  });

    const onSubmit = async (data: FormData) => {
    const payload = {
      ...data,
      tags: data.tags ? data.tags.split(",").map(tag => tag.trim()) : [],
    };
    const res = await fetch("/api/applications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (res.ok) {
      alert("Application created!");
      reset();
    } else {
      alert("Error creating application.");
    }
  };

  return (
    <main className="max-w-lg mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Create Job Application</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
        <select
          {...register("status")}
          className="w-full p-2 border rounded"
        >
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
        <input
          {...register("tags")}
          placeholder="Tags"
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Create Application
        </button>
      </form>
    </main>
  );
}