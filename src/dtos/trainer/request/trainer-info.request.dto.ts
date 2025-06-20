export interface TrainerInfoRequestDto {
    id?: number;
    jobAddress: string ;
    shortIntroduce: string ;
    longIntroduce: string ;
    files?: File[];
    educationName: string ;
    educationEntrance: string;
    educationGraduate: string;
}