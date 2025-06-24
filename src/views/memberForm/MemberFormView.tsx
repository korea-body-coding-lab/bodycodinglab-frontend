/** @jsxImportSource @emotion/react */
import React from "react";
import * as m from "./memberFrom.style";
import { memberFormResponseDto } from "@/dtos/memberForm/response/get.memberForm.response.dto";

const LABEL_MAP: Record<string, string> = {
  SLIM: "마름",
  NORMAL: "보통",
  FAT: "뚱뚱",
  DIET: "다이어트",
  IMPROVEMENT_OF_MUSCLE: "근육 향상",
  PERFORMANCE: "퍼포먼스",
  LESS_18: "18 미만",
  BETWEEN_18TO23: "18 ~ 23",
  BETWEEN_23TO25: "23 ~ 25",
  MORE_25: "25 초과",
  CHEST: "가슴",
  ARM: "팔",
  STOMACH: "복부",
  LEG: "다리",
  NOT_APPLICABLE: "선택 안 함",
  VEGETARIAN: "채식",
  VEGAN: "비건",
  KITO: "키토",
  MEDITERRANEAN: "지중해식",
  CANIBORE: "육식",
  DONT_OFTEN: "거의 안 먹음",
  WEEK_3TO5: "주 3~5회",
  EVERYDAY: "매일",
  COFFE_TEA: "커피/차 위주",
  LESS_2: "하루 2잔 이하",
  BETWEEN_2TO6: "2~6잔",
  BETWEEN_7TO10: "7~10잔",
  MORE_10: "10 이상",
  MOTIVATION: "동기 부족",
  EFFECT: "효과 부족",
  HARD: "너무 힘듦",
  PLAN: "계획 없음",
  COACHING: "코칭 필요",
  LESS_5: "5개 이하",
  BETWEEN_5TO10: "5~10개",
  NEVER: "안 함",
  WEEK_1TO2: "주 1~2회",
  WEEK_3: "주 3회",
  MORE_WEEK_3: "주 3회 이상",
  MIN30: "30분",
  MIN40: "40분",
  HOUR1: "1시간",
  FREEDOM: "자유롭게",
};

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
            {LABEL_MAP[option] || option}
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
        {renderRadioGroup(
          "체형",
          "bodyForm",
          ["SLIM", "NORMAL", "FAT"],
          data.bodyForm
        )}
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
          [
            "VEGETARIAN",
            "VEGAN",
            "KITO",
            "MEDITERRANEAN",
            "CANIBORE",
            "NOT_APPLICABLE",
          ],
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
          <input
            type="text"
            value={data.weightGoal}
            readOnly
            css={m.formNumber}
          />
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
          [
            "MOTIVATION",
            "EFFECT",
            "HARD",
            "PLAN",
            "COACHING",
            "NOT_APPLICABLE",
          ],
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
