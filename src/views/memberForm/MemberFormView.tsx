import React from "react";
import { memberFormResponseDto } from "@/dtos/memberForm/response/get.memberForm.response.dto";

const FormViewer = ({ data }: { data: memberFormResponseDto }) => {
  return (
    <div>
      <h2>{data.memberName}님의 작성된 폼</h2>
      <ul>
        <li>체형: {data.bodyForm}</li>
        <li>운동 목표: {data.goal}</li>
        <li>BMI: {data.bmi}</li>
        <li>개선 부위: {data.improvedPart}</li>
        <li>식이 선호: {data.preferredDiet}</li>
        <li>당류 섭취: {data.sugarIntake}</li>
        <li>수분 섭취: {data.waterIntake}</li>
        <li>키: {data.height}cm</li>
        <li>몸무게: {data.weight}kg</li>
        <li>목표 체중: {data.weightGoal}kg</li>
        <li>신체 능력 점수: {data.physicalLevel}점</li>
        <li>운동 문제: {data.exercisingProblem}</li>
        <li>푸쉬업: {data.pushupLevel}</li>
        <li>턱걸이: {data.pullupLevel}</li>
        <li>주간 운동 횟수: {data.exerciseFrequency}</li>
        <li>투자 가능한 시간: {data.investableTime}</li>
      </ul>
    </div>
  );
};

export default FormViewer;