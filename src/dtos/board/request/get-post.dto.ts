export interface PostDetailData {
    id: number;
    writerId: string | null;
    title: string;
    content: string;
    createdAt: string;
    postLike?: number; 
    commentCount?: number;
    viewCount?: number; 
    profileImageUrl?: string;
    images: { url: string }[];
  };