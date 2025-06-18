/** @jsxImportSource @emotion/react */
import * as m from "./memberFrom.writer.style";

import React, { useState } from "react";
import { memberFormRequestDto } from "@/dtos/memberForm/request/post.memberForm.request.dto";
import { postMemberFormRequest } from "@/apis/memberForm/post.memberForm.api";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const FormWriter = () => {
  const [cookies] = useCookies(["accessToken"]);
  const navigate = useNavigate();

  const [form, setForm] = useState<memberFormRequestDto>({
    bodyForm: "SLIM",
    goal: "DIET",
    bmi: "LESS_18",
    improvedPart: "CHEST",
    preferredDiet: "VEGETARIAN",
    sugarIntake: "DONT_OFTEN",
    waterIntake: "COFFEE_TEA",
    height: "",
    weight: "",
    weightGoal: "",
    physicalLevel: 0,
    exercisingProblem: "MOTIVATION",
    pushupLevel: "LESS_5",
    pullupLevel: "LESS_5",
    exerciseFrequency: "NEVER",
    investableTime: "MIN30"
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
  // 숫자 입력 필드에 대해서는 숫자만 허용
  const numericFields = ["height", "weight", "weightGoal"];

  if (numericFields.includes(name)) {
    // 빈 문자열 허용 + 숫자만 입력 허용
    if (!/^\d*$/.test(value)) return;
  }

  setForm((prev) => ({
    ...prev,
    [name]: value,
  }));
  };

  const handleSubmit = async () => {
    const token = cookies.accessToken;
    if (!token) return;

    const response = await postMemberFormRequest(form, token);
    if (response.code === "SU") {
      navigate("/");
      console.log("제출된 폼:", form);
    } else {
      alert("제출 실패");
    }
  };

  const renderRadioGroup = (label: string, name: keyof memberFormRequestDto, options: [string, string][]) => (
    <div css={m.formRow}>
      <div css={m.formLabel}>{label}</div>
      <div css={m.formOptions}> 
        {options.map(([value, text]) => (
          <label key={value} css={m.formRadio}>
            <input
              type="radio"
              name={name}
              value={value}
              checked={form[name] === value}
              onChange={handleChange}
            />
            {text}
          </label>
        ))}
      </div>
    </div>
  );


  return (
    <div css={m.fromCotinaerBox}>

    <div css={m.formContainer}>
      <h2 css={m.formTitle}>회원 폼 작성</h2>
      <form>
        {renderRadioGroup("체형", "bodyForm", [
          ["SLIM", "마름"],
          ["NORMAL", "보통"],
          ["FAT", "뚱뚱"],
        ])}

        {renderRadioGroup("운동 목표", "goal", [
          ["DIET", "다이어트"],
          ["IMPROVEMENT_OF_MUSCLE", "근육 향상"],
          ["PERFORMANCE", "퍼포먼스"],
        ])}

        {renderRadioGroup("BMI", "bmi", [
          ["LESS_18", "18 미만"],
          ["BETWEEN_18TO23", "18 ~ 23"],
          ["BETWEEN_23TO25", "23 ~ 25"],
          ["MORE_25", "25 초과"],
        ])}

        {renderRadioGroup("중점 개선 부위", "improvedPart", [
          ["CHEST", "가슴"],
          ["ARM", "팔"],
          ["STOMACH", "복부"],
          ["LEG", "다리"],
          ["NOT_APPLICATION", "선택 안 함"],
        ])}

        {renderRadioGroup("식이 선호", "preferredDiet", [
          ["VEGETARIAN", "채식"],
          ["VEGAN", "비건"],
          ["KITO", "키토"],
          ["MEDITERRANEAN", "지중해식"],
          ["CANIBORE", "육식"],
          ["NOT_APPLICABLE", "선택 안 함"],
        ])}

        {renderRadioGroup("당류 섭취 빈도", "sugarIntake", [
          ["DONT_OFTEN", "거의 안 먹음"],
          ["WEEK_3TO5", "주 3~5회"],
          ["EVERYDAY", "매일"],
        ])}

        {renderRadioGroup("수분 섭취량", "waterIntake", [
          ["COFFEE_TEA", "커피/차 위주"],
          ["LESS_2", "하루 2잔 이하"],
          ["BETWEEN_2TO6", "2~6잔"],
          ["BETWEEN_7TO10", "7~10잔"],
          ["MORE_10", "10잔 이상"],
        ])}

        <div css={m.formRow}>
        <label css={m.formLabel}>키 (cm)</label>
        <input type="text" placeholder="cm" name="height" value={form.height} onChange={handleChange} css={m.formNumber}/>
        </div>

        <div css={m.formRow}>
        <label css={m.formLabel}>몸무게 (kg)</label>
        <input type="text" placeholder="kg" name="weight" value={form.weight} onChange={handleChange} css={m.formNumber}/>
        </div>

        <div css={m.formRow}>
        <label css={m.formLabel}>목표 몸무게 (kg)</label>
        <input type="number" placeholder="kg" name="weightGoal" value={form.weightGoal} onChange={handleChange} css={m.formNumber} />
        </div>

        <div  css={m.formRow}>
        <label css={m.formLabel}>신체 능력</label>
        <input
          type="range"
          name="physicalLevel"
          min={0}
          max={10}
          step={1}
          value={form.physicalLevel}
          onChange={handleChange}
          css={m.formNumber}
        />
        <span>{form.physicalLevel}점</span>
        </div>

        {renderRadioGroup("운동 문제", "exercisingProblem", [
          ["MOTIVATION", "동기 부족"],
          ["EFFECT", "효과 부족"],
          ["HARD", "너무 힘듦"],
          ["PLAN", "계획 없음"],
          ["COACHING", "코칭 필요"],
          ["NOT_APPLICABLE", "해당 없음"],
        ])}

        {renderRadioGroup("푸쉬업 가능 횟수", "pushupLevel", [
          ["LESS_5", "5개 이하"],
          ["BETWEEN_5TO10", "5~10개"],
          ["MORE_10", "10개 이상"],
        ])}

        {renderRadioGroup("턱걸이 가능 횟수", "pullupLevel", [
          ["LESS_5", "5개 이하"],
          ["BETWEEN_5TO10", "5~10개"],
          ["MORE_10", "10개 이상"],
        ])}

        {renderRadioGroup("주간 운동 빈도", "exerciseFrequency", [
          ["NEVER", "안 함"],
          ["WEEK_1TO2", "주 1~2회"],
          ["WEEK_3", "주 3회"],
          ["MORE_WEEK_3", "주 3회 이상"],
        ])}

        {renderRadioGroup("투자 가능한 시간", "investableTime", [
          ["MIN30", "30분"],
          ["MIN40", "40분"],
          ["HOUR1", "1시간"],
          ["FREEDOM", "자유롭게"],
        ])}

        <br />
        <div css={m.submitButtonContainer}>
          <button css={m.submitButton} type="button" onClick={handleSubmit}>제출하기</button>
        </div>
        
      </form>
    </div>
        </div>
  
  );
};

export default FormWriter;