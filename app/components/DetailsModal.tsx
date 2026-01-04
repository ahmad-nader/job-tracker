import { Dispatch, SetStateAction } from "react";
import { Box, Modal } from "@mui/material";
import ReactMarkdown from "react-markdown";

interface DetailsModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  title: string;
  company: string;
  location: string;
  jobId: number;
  description: string;
  tags: string[];
  link: string;
}
export const DetailsModal = ({
  open,
  setOpen,
  title,
  company,
  location,
  jobId,
  description,
  tags,
  link,
}: DetailsModalProps) => {
  const handleClose = () => setOpen(false);


  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        key={jobId}
      >
        <Box className="absolute left-1/2 top-1/2 w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white shadow-xl outline-none">
          <div className="flex items-start justify-between border-b px-6 py-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
              <p className="text-sm text-gray-600">
                {company} · {location}
              </p>
            </div>

          </div>
          <div className="max-h-[70vh] overflow-y-auto px-6 py-4">
            <div className="h-80 w-full resize-none rounded-md border border-gray-300 p-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-50 overflow-scroll mb-2">
              <ReactMarkdown>{description}</ReactMarkdown>
            </div>

            <div className="mb-4 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-gray-500 px-3 py-1 text-xs font-medium text-white"
                >
                  {tag}
                </span>
              ))}
            </div>

            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              {link}
            </a>
          </div>
          <div className="flex justify-end border-t px-6 py-4">
            <button
              onClick={() => setOpen(false)}
              className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        </Box>
      </Modal>
    </>
  );
};
