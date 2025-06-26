export interface TrainerInfoResponseDto {
  trainerId: number;
  jobAddress: string ;
  shortIntroduce: string ;
  longIntroduce: string ;
  files?: File
  fileName?: string;
  educationName: string ;
  educationEntrance: string;
  educationGraduate: string;
}