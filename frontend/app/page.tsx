"use client";
import { useState } from "react";
import { UncontrolledBoard, KanbanBoard } from "@caldwell619/react-kanban";
import "@caldwell619/react-kanban/dist/styles.css"; // import here for "builtin" styles

const columnNames = ["Applied", "Tasked", "Interviewing", "Offer", "Rejected"];
const cards = [
  {
    id: 1,
    title: "Google",
    description: "Software Engineer 1",
    status: "Applied",
    subtitle: "Applied on 2025-05-20",
  },
  {
    id: 2,
    title: "Instagram",
    description: "Software Engineer 1",
    status: "Tasked",
    subtitle: "Tasked on 2025-05-20",
  },
  {
    id: 3,
    title: "Aramco",
    description: "Senior Software Engineer",
    status: "Interviewing",
    subtitle: "Interviewing on 2025-05-20",
  },
  {
    id: 4,
    title: "Amazon",
    description: "Software Engineer 1",
    status: "Offer",
    subtitle: "Offer on 2025-05-20",
  },
  {
    id: 5,
    title: "Apple",
    description: "Software Engineer 1",
    status: "Rejected",
    subtitle: "Rejected on 2025-05-20",
  },
  {
    id: 6,
    title: "Microsoft",
    description: "Software Engineer 1",
    status: "Rejected",
    subtitle: "Rejected on 2025-05-20",
  },
  {
    id: 7,
    title: "Facebook",
    description: "Software Engineer 1",
    status: "Applied",
    subtitle: "Applied on 2025-05-20",
  },
  {
    id: 8,
    title: "Twitter",
    description: "Software Engineer 1",
    status: "Interviewing",
    subtitle: "Interviewing on 2025-05-20",
  },
];

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const board: KanbanBoard<{
    id: number | string;
    title: string;
    description: string;
    status: string;
    subtitle: string;
  }> = {
    columns: columnNames.map((columnName) => ({
      id: columnName,
      title: columnName,
      cards: cards.filter((card) => card.status === columnName),
    })),
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen font-[family-name:var(--font-geist-sans)]">
      {/* Sidebar */}
      <aside
        className={`relative transition-all duration-300 ease-in-out  p-6 shadow-md border-r border-gray-200 ${
          isSidebarOpen ? "w-64" : "w-16"
        }`}
      >
        <button
          onClick={toggleSidebar}
          className={`absolute top-4 right-4 p-1 text-gray-600 hover:text-gray-900 ${
            !isSidebarOpen ? "right-1/2 translate-x-1/2" : ""
          }`}
          title={isSidebarOpen ? "Collapse Sidebar" : "Expand Sidebar"}
        >
          {isSidebarOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          )}
        </button>
        <div className={`${isSidebarOpen ? "block mt-8" : "hidden"}`}>
          <h2 className="text-xl font-semibold mb-4">Sidebar</h2>
          <ul className="space-y-2">
            <li>
              <a href="#" className="block p-2 rounded ">
                Dashboard
              </a>
            </li>
            <li>
              <a href="#" className="block p-2 rounded ">
                Applications
              </a>
            </li>
            <li>
              <a href="#" className="block p-2 rounded ">
                Settings
              </a>
            </li>
          </ul>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 overflow-auto">
        <h1 className="text-2xl font-bold mb-6">Job Application Tracker</h1>
        <UncontrolledBoard initialBoard={board} />
      </main>
    </div>
  );
}
