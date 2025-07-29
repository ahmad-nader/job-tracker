"use client";
import { useEffect, useState } from "react";
import { UncontrolledBoard, KanbanBoard, OnDragEnd } from "@caldwell619/react-kanban";
import "@caldwell619/react-kanban/dist/styles.css";
import { CardStatus } from "./types";
import { getApplications, updateApplicationStatus } from "./components/Applications";
import { Status } from "@prisma/client";
import { BoardCard } from "./types";

export default function Home() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [board, setBoard] = useState<KanbanBoard<BoardCard>>()

    const handleCardMove = (_board: KanbanBoard<BoardCard>, subject: BoardCard, _source: OnDragEnd<BoardCard>['source'], destination: OnDragEnd<BoardCard>['destination']) => {
        const cardId = subject.id;
        updateApplicationStatus(cardId, destination?.toColumnId as Status)
    }

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    useEffect(() => {
        async function getApps() {
            const apps = await getApplications();
            const board: KanbanBoard<BoardCard> = {
                columns: Object.keys(CardStatus).map((columnName) => ({
                    id: columnName,
                    title: columnName,
                    cards: apps
                        ?.filter((card) => card.status === columnName)
                        ?.map((card) => ({
                            id: card.id,
                            title: card.title,
                            description: card.company || "",
                            status: card.status as Status,
                            subtitle: card.company || "",
                        })) || [],
                })),
            };
            setBoard(board)
        }
        getApps();
    }, [])

    return (
        <div className="flex h-screen font-[family-name:var(--font-geist-sans)]">
            <aside
                className={`relative transition-all duration-300 ease-in-out  p-6 shadow-md border-r border-gray-200 ${isSidebarOpen ? "w-64" : "w-16"
                    }`}
            >
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

            <main className="flex-1 p-8 overflow-auto">
                <h1 className="text-2xl font-bold mb-6">Job Application Tracker</h1>
                {/* https://github.com/christopher-caldwell/react-kanban/issues/47 */}
                {/*  @ts-ignore */}
                {board && <UncontrolledBoard initialBoard={board} onCardDragEnd={handleCardMove} />}
            </main>
        </div>
    );
}
