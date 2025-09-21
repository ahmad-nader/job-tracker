interface JobCardProps {
    title: string;
    company: string;
    location: string;
    jobId: number;
}

export const JobCard = ({
    title, 
    company,
    location,
    jobId
} : JobCardProps) => {
  return (
    <div className="rounded-lg shadow-md p-4 mb-4" key={jobId}>
      <p className="text-gray-600 text-sm">{title}</p>
      <h3 className="text-xl font-semibold mb-4 mt-1.5">{company}</h3>
      <div className="flex flex-row justify-between  items-center">
        <p className="text-gray-600 mr-4">{location}</p>
        <button className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer" onClick={() => {console.log("display modal")}}>See More</button>
      </div>
    </div>
  );
};
