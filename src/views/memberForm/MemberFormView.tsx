/** @jsxImportSource @emotion/react */
import React from "react";
import * as m from "./memberFrom.writer.style";
import { MemberFormDto } from "@/dtos/match/response/find.member.match.response.dto";
import { memberFormResponseDto } from "@/dtos/memberForm/response/get.memberForm.response.dto";

const FormViewer = ({ data }: { data: memberFormResponseDto }) => {
   const renderRadioGroup = (
    label: string,
    name: string,
    options: string[],
    selectedValue: string
  ) => (
    <div css={m.formRow} key={name}>
      <label css={m.formLabel}>{label}</label>
      <div css={m.formOptions}>
        {options.map((option) => (
          <label key={option} css={m.formRadio}>
            <input
              type="radio"
              name={name}
              value={option}
              checked={selectedValue === option}
              readOnly
          
            />
            {option}
          </label>
        ))}
      </div>
    </div>
  );
  return (
    <div>
      <div css={m.formContainer}>
      <h2 css={m.formLabel}>{data.memberName}님의 작성된 폼</h2>
      <br />
      <br />
      {renderRadioGroup("체형", "bodyForm", ["SLIM", "NORMAL", "FAT"], data.bodyForm)}
      {renderRadioGroup(
        "운동 목표",
        "goal",
        ["DIET", "IMPROVEMENT_OF_MUSCLE", "PERFORMANCE"],
        data.goal
      )}
      {renderRadioGroup(
        "BMI",
        "bmi",
        ["LESS_18", "BETWEEN_18TO23", "BETWEEN_23TO25", "MORE_25"],
        data.bmi
      )}
      {renderRadioGroup(
        "개선 부위",
        "improvedPart",
        ["CHEST", "ARM", "STOMACH", "LEG", "NOT_APPLICABLE"],
        data.improvedPart
      )}
      {renderRadioGroup(
        "식이 선호",
        "preferredDiet",
        ["VEGETARIAN", "VEGAN", "KITO", "MEDITERRANEAN", "CANIBORE", "NOT_APPLICABLE"],
        data.preferredDiet
      )}
      {renderRadioGroup(
        "당류 섭취",
        "sugarIntake",
        ["DONT_OFTEN", "WEEK_3TO5", "EVERYDAY"],
        data.sugarIntake
      )}
      {renderRadioGroup(
        "수분 섭취",
        "waterIntake",
        ["COFFE_TEA", "LESS_2", "BETWEEN_2TO6", "BETWEEN_7TO10", "MORE_10"],
        data.waterIntake
      )}

      <div css={m.formRow}>
        <label css={m.formLabel}>키 (cm)</label>
        <input type="text" value={data.height} readOnly css={m.formNumber} />
      </div>

      <div css={m.formRow}>
        <label css={m.formLabel}>몸무게 (kg)</label>
        <input type="text" value={data.weight} readOnly css={m.formNumber} />
      </div>

      <div css={m.formRow}>
        <label css={m.formLabel}>목표 몸무게 (kg)</label>
        <input type="text" value={data.weightGoal} readOnly css={m.formNumber} />
      </div>

      <div css={m.formRow}>
        <label css={m.formLabel}>신체 능력</label>
        <input
          type="range"
          min={0}
          max={10}
          step={1}
          value={data.physicalLevel}
          readOnly
          css={m.formNumber}
        />
        <span>{data.physicalLevel}점</span>
      </div>

      {renderRadioGroup(
        "운동 문제",
        "exercisingProblem",
        ["MOTIVATION", "EFFECT", "HARD", "PLAN", "COACHING", "NOT_APPLICABLE"],
        data.exercisingProblem
      )}
      {renderRadioGroup(
        "푸쉬업",
        "pushupLevel",
        ["LESS_5", "BETWEEN_5TO10", "MORE_10"],
        data.pushupLevel
      )}
      {renderRadioGroup(
        "턱걸이",
        "pullupLevel",
        ["LESS_5", "BETWEEN_5TO10", "MORE_10"],
        data.pullupLevel
      )}
      {renderRadioGroup(
        "주간 운동 빈도",
        "exerciseFrequency",
        ["NEVER", "WEEK_1TO2", "WEEK_3", "MORE_WEEK_3"],
        data.exerciseFrequency
      )}
      {renderRadioGroup(
        "투자 가능한 시간",
        "investableTime",
        ["MIN30", "MIN40", "HOUR1", "FREEDOM"],
        data.investableTime
      )}
    </div>
    </div>
  );
};

export default FormViewer;