export interface UpdateTrainerStatusRequestDto {
    newStatus: 'APPROVE' | 'REJECT';
    changeReason: string;
}