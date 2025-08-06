"use client";
import { Dispatch, SetStateAction } from "react";
import "@caldwell619/react-kanban/dist/styles.css";




export default function SidebarButton({isSidebarOpen, setIsSidebarOpen}: {isSidebarOpen: boolean; setIsSidebarOpen: Dispatch<SetStateAction<boolean>>}) {

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen );
    };

    return (
                <button
                    onClick={toggleSidebar}
                    className={`absolute top-4 right-4 p-1 text-gray-600 hover:text-gray-900 ${!isSidebarOpen ? "right-1/2 translate-x-1/2" : ""
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
    );
}