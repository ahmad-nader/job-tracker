"use client";
import { useState } from "react";
import "@caldwell619/react-kanban/dist/styles.css";
import SidebarButton from "./SidebarButton";

export default function Sidebar() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    return (
        <div
            className={`h-full bg-gray-800 text-white transition-all duration-300
                ${isSidebarOpen ? "w-64" : "w-16"}`}
        >
            <aside
                className={`relative h-full transition-all duration-300 ease-in-out p-6 shadow-md border-r border-gray-200
                    ${isSidebarOpen ? "w-64" : "w-16"}`}
            >
                <SidebarButton isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
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
                {/* Show only an icon or a vertical bar when collapsed */}
                {!isSidebarOpen && (
                    <div className="flex flex-col items-center mt-8">
                        <span className="w-6 h-6 bg-gray-700 rounded mb-2"></span>
                        <span className="w-6 h-6 bg-gray-700 rounded mb-2"></span>
                        <span className="w-6 h-6 bg-gray-700 rounded"></span>
                    </div>
                )}
            </aside>
        </div>
    );
}