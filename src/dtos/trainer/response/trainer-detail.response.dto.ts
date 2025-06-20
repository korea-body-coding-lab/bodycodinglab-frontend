import { TrainerCareerResponseDto } from "./trainer-career.response.dto";
import { TrainerLicenseResponseDto } from "./trainer-license.response.dto";

export interface TrainerDetailResponseDto {
    trainerId: number;
    name: string;
    jobAddress: string ;
    shortIntroduce: string ;
    longIntroduce: string ;
    educationName: string ;
    educationEntrance: string;
    educationGraduate: string;
    careers: TrainerCareerResponseDto[];
    licenses: TrainerLicenseResponseDto[];
}