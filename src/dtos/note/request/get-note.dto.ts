export interface NoteType{
    id: number;
    noteText: string;
    noteWriter: number;
    noteReceiver: number;
    isRead: boolean;
    noteCreateTime: string;
  }