export interface BoardPost{
    id: number;
    writerId: string | null;
    writerName: string;
    title: string;
    content: string;
    createdAt: string;
}