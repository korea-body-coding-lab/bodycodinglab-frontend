export interface GetTrainerDetailResponseDto {
    trainerId: number;
    username: string;
    name: string;
    birthdate: string;
    gender: 'MAN' | 'WOMAN';
    phone: string;
    email: string;
    jobAddress: string;
    attachmentFileUrl: string;
    createdAt: string;
    status: 'PENDING' | 'APPROVE' | 'REJECT';
    profileImageUrl?: string;
}