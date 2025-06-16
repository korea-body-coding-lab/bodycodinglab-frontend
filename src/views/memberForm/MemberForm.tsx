import React from 'react'

function MemberForm() {
  return (
      <div>
  {/* //     <h1>설문조사</h1>
  // <div className="memberFormContainer">

  //   <div className="bodyFormContainer">
  //     <h1>체형</h1>
  //       <div className="bodyFormOption">
  //         <label>
  //           슬림한 편<input type="checkbox" value="SLIM" >
  //         </label>
        
  //         <label>
  //           보통 체형<input type="checkbox" value="NORMAL">
  //         </label>
          
  //         <label>
  //           통통한 편<input type="checkbox" value="FAT">
  //         </label>
        
  //       </div>
    
  //   </div>

  //   <div className="goalContainer">
  //       <h1>목표</h1>
  //       <div className="goalOption">
  //         <label>
  //           다이어트 <input type="checkbox" value="DIET">
  //         </label>
  //         <label>
  //           근육량 증가<input type="checkbox" value="IMPROVEMENT_OF_MUSCLE">
  //         </label>
  //         <label>
  //           퍼포먼스 향상<input type="checkbox" value="PERFORMANCE">
  //         </label>
  //       </div>
  //   </div>

  //   <div className="bmiContainer">
  //     <h1>BMI</h1>
  //     <div className="bmiOption">
  //         <label>
  //           18이하 <input type="checkbox" value="LESS_18">
  //         </label>
  //         <label>
  //           18~23사이 <input type="checkbox" value="BETWEEN_18TO23">
  //         </label>
  //         <label>
  //           23~25사이 <input type="checkbox" value="BETWEEN_23TO25">
  //         </label>
  //         <label>
  //           25 이상<input type="checkbox" value="MORE_25">
  //         </label>
  //     </div>
    
  //   </div>

  //   <div className="improvePartContainer">
  //     <h1>개선하고 싶은 부위</h1>
  //     <div class="improvePartOption">
  //     <label>
  //       가슴 <input type="checkbox" value="CHEST">
  //     </label>
  //     <label>
  //       팔 <input type="checkbox" value="ARM">
  //     </label>
  //     <label>
  //       배 <input type="checkbox" value="STOMACH">
  //     </label>
  //     <label>
  //       다리 <input type="checkbox" value="LEG">
  //     </label>
  //     <label>
  //       해당 사항 없음 <input type="checkbox" value="NOT_APPLICABLE">
  //     </label>
  //     </div>
    
  //   </div >

  //   <div className="preferredDietContainer">
  //     <h1>따르고 싶은 식단</h1>
  //     <div className="preferredDietOption">
  //       <label>
  //       배지테리언 <input type="checkbox" value="VEGETARIAN"></label>
  //       <label>
  //       비건 <input type="checkbox" value="VEGAN"></label>
  //       <label>
  //       키토 <input type="checkbox" value="KITO"></label>
  //       <label>
  //       지중해식 <input type="checkbox" value="MEDITERRANEAN"></label>
  //       <label>
  //       카니보어 <input type="checkbox" value="CANIBORE"></label>
  //       <label>
  //       해당 사항 없음 <input type="checkbox" value="NOT_APPLICABLE"></label>
  //     </div>
  //   </div >

  //   <div className="sugarIntakeContainer">
  //     <h1>단 음식 섭취 빈도</h1>
  //     <div className="sugartIntakeOption">
  //       <label>
  //       잘 섭취하지 않음 <input type="checkbox" value="DONT_OFTEN"></label>
  //       <label>
  //       주 3~5회 <input type="checkbox" value="WEEK_3TO5"></label>
  //       <label>
  //       거의 매일 섭취 <input type="checkbox" value="EVERYDAY"></label>
  //     </div>
  //   </div>

  //   <div className="waterIntakeContainer">
  //     <h1>일일 수분 섭취량</h1>
  //     <div className="waterIntakeOption">
  //       <label>
  //       커피 또는 차만 섭취 <input type="checkbox" value="COFFE_TEA"></label>
  //       <label>
  //       2잔 미만 <input type="checkbox" value="LESS_2"></label>
  //       <label>
  //       2잔에서 6잔 <input type="checkbox" value="BETWEEN_2TO6"></label>
  //       <label>
  //       7잔에서 10잔 <input type="checkbox" value="BETWEEN_7TO10"></label>
  //       <label>
  //       10잔 이상 <input type="checkbox" value="MORE_10"></label>
  //     </div>
  //   </div>

  //   <div className="heightContainer">
  //     <h1>신장</h1>
  //     <input type="text" placeholder="cm">
  //   </div>

  //   <div className="weightContainer">
  //     <h1>체중</h1>
  //     <input type="text" placeholder="kg">
  //   </div>

  //   <div className="weightGoalContainer">
  //     <h1>목표 체중</h1>
  //     <input type="text" placeholder="kg">
  //   </div>

  //   <div className="physicalLevelContainer">
  //     <h1>신체 능력 수준</h1>
  //     <input type="range" min="0" max="10">
  //   </div>

  //   <div className="exercisingProblemContainer">
  //     <h1>운동시 겪었던 어려움</h1>
  //     <div className="exercisingProblemOption">
  //       <label>
  //       동기부여 부족 <input type="checkbox" value="MOTIVATION"></label>
  //       <label>
  //       제대로 된 효과 없었음 <input type="checkbox" value="EFFECT"></label>
  //       <label>
  //       운동이 어려웠음 <input type="checkbox" value="HARD"></label>
  //       <label>
  //       뚜렸한 계획이 없었음 <input type="checkbox" value="PLAN"></label>
  //       <label>
  //       잘 못된 코칭 <input type="checkbox" value="COACHING"></label>
  //       <label>
  //       해당 사항 없음 <input type="checkbox" value="NOT_APPLICABLE"></label>
  //     </div>
  //   </div>

  //   <div className="pushupLevelContainer">
  //     <h1>팔굽혀 펴기 수준</h1>
  //     <div className="pushupLevelOption">
  //       <label>
  //       5개 미만 <input type="checkbox" value="LESS_5"></label>
  //       <label>
  //       5개에서 10개 정도 <input type="checkbox" value="BETWEEN_5TO10"></label>
  //       <label>
  //       10개 이상 <input type="checkbox" value="MORE_10"></label>
  //     </div>
  //   </div>

  //   <div className="pullupLevelContainer">
  //     <h2>턱걸이 수준</h2>
  //     <div className="pullupLevelOption">
  //       <label>
  //       5개 미만 <input type="checkbox" value="LESS_5"></label>
  //       <label>
  //       5개에서 10개 정도 <input type="checkbox" value="BETWEEN_5TO10"></label>
  //       <label>
  //       10개 이상 <input type="checkbox" value="MORE_10"></label>
  //     </div>
  //   </div>

  //   <div className="exerciseFrequencyContainer">
  //     <h2>운동 빈도</h2>
  //     <div className="exerciseFrequencyOption">
  //       <label>
  //       전혀 하지 않음 <input type="checkbox" value="NEVER"></label>
  //       <label>
  //       주 1~2회 <input type="checkbox" value="WEEK_1TO2"></label>
  //       <label>
  //       주 3회 <input type="checkbox" value="WEEK_3"></label>
  //       <label>
  //       주 3회 초과  <input type="checkbox" value="MORE_WEEK_3"></label>
  //     </div>
  //   </div>

  //   <div className="investableTimeContainer">
  //     <h1>하루 운동 투자 가능 시간</h1>
  //       <div>
  //         <label>
  //         하루 30분  <input type="checkbox" value="MIN30"></label>
  //         <label>
  //         하루 45분  <input type="checkbox" value="MIN30"></label>
  //         <label>
  //         하루 1시간  <input type="checkbox" value="HOUR1"></label>
  //         <label >
  //         상관 없음  <input type="checkbox" value="FREEDOM"></label>
  //       </div>
    
  //   </div>

  //   <button className="submitButton">제출하기</button>
  // </div> */}
    </div>
  )
}

export default MemberForm