type BodyForm = "SLIM" | "NORMAL" | "FAT";
type Goal = "DIET" | "IMPROVEMENT_OF_MUSCLE" | "PERFORMANCE";
type Bmi = "LESS_18" | "BETWEEN_18TO23" | "BETWEEN_23TO25" | "MORE_25";
type Improved_part = "CHEST" | "ARM" | "STOMACH" | "LEG" | "NOT_APPLICATION";
type PreferredDiet = "VEGETARIAN" | "VEGAN" | "KITO" | "MEDITERRANEAN" | "CANIBORE" | "NOT_APPLICABLE";
type SugarIntake = "DONT_OFTEN" | "WEEK_3TO5" | "EVERYDAY";
type WaterIntake = "COFFEE_TEA" | "LESS_2" | "BETWEEN_2TO6" | "BETWEEN_7TO10" | "MORE_10";
type ExercisingProblem = "MOTIVATION" | "EFFECT" | "HARD" | "PLAN" | "COACHING" | "NOT_APPLICABLE";
type PushupLevel = "LESS_5" | "BETWEEN_5TO10" | "MORE_10";
type PullupLevel = "LESS_5" | "BETWEEN_5TO10" | "MORE_10";
type ExerciseFrequency = "NEVER"| "WEEK_1TO2" | "WEEK_3" | "MORE_WEEK_3";
type InvestableTime = "MIN30" | "MIN40" | "HOUR1" | "FREEDOM";

export interface memberFormResponseDto { 
  memberId: number;
  memberName: string;
  bodyForm: BodyForm;
  goal: Goal;
  bmi: Bmi;
  improvedPart: Improved_part;
  preferredDiet: PreferredDiet;
  sugarIntake: SugarIntake;
  waterIntake: WaterIntake;
  height: number;
  weight: number;
  weightGoal: number;
  physicalLevel: number;
  exercisingProblem: ExercisingProblem;
  pushupLevel: PushupLevel;
  pullupLevel: PullupLevel;
  exerciseFrequency: ExerciseFrequency
  investableTime: InvestableTime
}