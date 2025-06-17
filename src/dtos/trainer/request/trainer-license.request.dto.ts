export interface TrainerLicenseRequestDto {
  id?: number;
  licenseType: string;
  licenseName: string;
  file?: File;
}