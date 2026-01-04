"use client";
import { useState } from "react";
import { UncontrolledBoard, OnDragEnd, KanbanBoard } from "@caldwell619/react-kanban";
import "@caldwell619/react-kanban/dist/styles.css";
import { updateApplicationStatus } from "./components/Applications";
import { Status } from "@prisma/client";
import { BoardCard } from "./types";
import { DetailsModal } from "./components/DetailsModal";
import { JobCard } from "./components/JobCard";
import { useApplications } from "./hooks/useApplications";

export default function Home() {
    const { board, apps, refetch } = useApplications();
    const [detailsModalAppId, setDetailsModalAppId] = useState<number | null>(null);
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  
    const handleCardMove = async (_board: KanbanBoard<BoardCard>, subject: BoardCard, _source: OnDragEnd<BoardCard>['source'], destination: OnDragEnd<BoardCard>['destination']) => {
        const cardId = subject.id;
        await updateApplicationStatus(cardId, destination?.toColumnId as Status)
        refetch();
    }


    return (
        <div className="flex h-screen font-[family-name:var(--font-geist-sans)] flex-col p-8  overflow-auto">
            <h1 className="text-2xl font-bold mb-6">Job Application Tracker</h1>

            {   isDetailsModalOpen &&   <DetailsModal
                open={detailsModalAppId !== null}
                setOpen={(isOpen) => {
                    if (!isOpen) {
                        setDetailsModalAppId(null);
                    }
                }}
                title={apps?.find(app => app.id === detailsModalAppId)?.title || ""}
                company={apps?.find(app => app.id === detailsModalAppId)?.company || ""}
                location={apps?.find(app => app.id === detailsModalAppId)?.location || ""}
                jobId={detailsModalAppId || 0}
                description={apps?.find(app => app.id === detailsModalAppId)?.description || ""}
                tags={apps?.find(app => app.id === detailsModalAppId)?.tags?.map(tag => tag.name) || []}
                link={apps?.find(app => app.id === detailsModalAppId)?.link || ""}
            />}
            
            {/*  @ts-expect-error known issue from library https://github.com/christopher-caldwell/react-kanban/issues/47 */}
            {board && <UncontrolledBoard initialBoard={board} onCardDragEnd={handleCardMove} renderCard={ (card) => {
                return <JobCard title={card.title} company={card.company} location={card.location} jobId={card.id} onClick={() => {
                    setIsDetailsModalOpen(true);
                    setDetailsModalAppId(card.id)}}/>
            }}/>}
        </div>
    );
}

