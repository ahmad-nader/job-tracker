
import { useEffect, useState, useCallback } from "react";
import { KanbanBoard } from "@caldwell619/react-kanban";
import { ApplicationWithTags, CardStatus, BoardCard } from "@/app/types";
import { getApplications } from "@/app/components/Applications";
import { Status } from "@prisma/client";

export function useApplications() {
    const [board, setBoard] = useState<KanbanBoard<BoardCard>>();
    const [apps, setApps] = useState<ApplicationWithTags[] | null>(null);

    const fetchApplications = useCallback(async () => {
        const fetchedApps = await getApplications();
        if (fetchedApps) {
            setApps(fetchedApps);

            const boardData: KanbanBoard<BoardCard> = {
                columns: Object.keys(CardStatus).map((columnName) => ({
                    id: columnName,
                    title: columnName,
                    cards: fetchedApps
                        .filter((card) => card.status === columnName)
                        .map((card) => ({
                            id: card.id,
                            title: card.title,
                            company: card.company || "",
                            status: card.status as Status,
                            location: card.location || "",
                            description: card.description || "",
                            tags: card.tags || [],
                            link: card.link || "",
                        })) || [],
                })),
            };
            setBoard(boardData);
        }
    }, []);

    useEffect(() => {
        fetchApplications();
    }, [fetchApplications]);

    const refetch = useCallback(() => {
        fetchApplications();
    }, [fetchApplications]);

    return { board, apps, refetch };
}
