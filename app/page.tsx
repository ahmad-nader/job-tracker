"use client";
import { useEffect, useState } from "react";
import { UncontrolledBoard, KanbanBoard, OnDragEnd } from "@caldwell619/react-kanban";
import "@caldwell619/react-kanban/dist/styles.css";
import { CardStatus } from "./types";
import { getApplications, updateApplicationStatus } from "./components/Applications";
import { Status } from "@prisma/client";
import { BoardCard } from "./types";

export default function Home() {
    const [board, setBoard] = useState<KanbanBoard<BoardCard>>()

    const handleCardMove = (_board: KanbanBoard<BoardCard>, subject: BoardCard, _source: OnDragEnd<BoardCard>['source'], destination: OnDragEnd<BoardCard>['destination']) => {
        const cardId = subject.id;
        updateApplicationStatus(cardId, destination?.toColumnId as Status)
    }


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
        <div className="flex h-screen font-[family-name:var(--font-geist-sans)] flex-col p-8 ">
            <h1 className="text-2xl font-bold mb-6">Job Application Tracker</h1>
            {/*  @ts-expect-error known issue from library https://github.com/christopher-caldwell/react-kanban/issues/47*/}
            {board && <UncontrolledBoard initialBoard={board} onCardDragEnd={handleCardMove} />}
        </div>
    );
}
