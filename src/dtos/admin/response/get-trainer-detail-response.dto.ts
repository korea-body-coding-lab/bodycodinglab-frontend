export interface GetTrainerDetailResponseDto {
    userId: number;
    trainerId: number;
    username: string;
    name: string;
    birthdate: string;
    gender: 'MAN' | 'WOMAN';
    phone: string;
    email: string;
    jobAddress: string;
    createdAt: string;
    status: 'PENDING' | 'APPROVE' | 'REJECT';
    attachmentFileUrl?: string;
    profileImageUrl?: string;
}