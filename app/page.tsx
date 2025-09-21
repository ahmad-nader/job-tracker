"use client";
import { useEffect, useState } from "react";
import { UncontrolledBoard, KanbanBoard, OnDragEnd } from "@caldwell619/react-kanban";
import "@caldwell619/react-kanban/dist/styles.css";
import { CardStatus } from "./types";
import { getApplications, updateApplicationStatus } from "./components/Applications";
import { Status } from "@prisma/client";
import { BoardCard } from "./types";
import { Button } from "@mui/material";
import { EditModal } from "./components/DetailsModal";
import { JobCard } from "./components/JobCard";

export default function Home() {
    const [board, setBoard] = useState<KanbanBoard<BoardCard>>()
    const [open, setOpen] = useState(false);
    // const [modalApplication, setJobApplication] = useState();
    const handleOpen = () => setOpen(true);
  
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
                            company: card.company || "",
                            status: card.status as Status,
                            location: card.location || "",
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
            <Button onClick={handleOpen}>Open modal</Button>
            <EditModal open={open} setOpen={setOpen} /> 
            {/*  @ts-expect-error known issue from library https://github.com/christopher-caldwell/react-kanban/issues/47*/}
            {board && <UncontrolledBoard initialBoard={board} onCardDragEnd={handleCardMove} renderCard={ (card) => {
                return <JobCard title={card.title} company={card.company} location={card.location} jobId={card.id}/>
            }}/>}
        </div>
    );
}
