export interface TrainerInfoResponseDto {
  id: number;
  trainerId: number;
  jobAddress: string ;
  shortIntroduce: string ;
  longIntroduce: string ;
  file?: File
  fileName?: string;
  educationName: string ;
  educationEntrance: string;
  educationGraduate: string;
}