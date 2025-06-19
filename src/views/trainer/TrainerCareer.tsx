/** @jsxImportSource @emotion/react */
import {
  container,
  heading,
  formBox,
  input,
  dateRow,
  submitButton,
  card,
  cardText,
  cardButtons,
  deleteAllButton,
} from '@/views/trainer/TrainerCareerStyle';
import { deleteAllCareer, deleteCareer, getCareerList, postCareer, updateCareer } from '@/apis/trainer/trainer-career.api';
import { TrainerCareerRequestDto } from '@/dtos/trainer/request/trainer-career.request.dto';
import { TrainerCareerResponseDto } from '@/dtos/trainer/response/trainer-career.response.dto';
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';

const TrainerCareer = () => {
  const [cookies, setCookies] = useCookies(["accessToken"]);
  const accessToken = cookies.accessToken || "";
  const [careers, setCareers] = useState<TrainerCareerResponseDto[]>([]);
  const [form, setForm] = useState<TrainerCareerRequestDto>({
    companyName: '',
    companyJoin: '',
    companyQuit: '',
  });
  const [editIndex, setEditIndex] = useState<number | null>(null);

  useEffect(() => {
    const fetchCareers = async () => {
      try {
        const response = await getCareerList(accessToken);
  
        if (response.code === 'SU' && response.data) {
          const careerArray = Array.isArray(response.data) ? response.data : [response.data];
          setCareers(careerArray);
        } else {
          setCareers([]);
          console.warn("자격증 목록이 없거나 오류 발생:", response);
        }
      } catch (error) {
        console.error('자격증 목록 조회 실패', error);
        setCareers([]);
      }
    };

  fetchCareers();
}, [accessToken]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async () => {
    if (!form.companyName || !form.companyJoin || !form.companyQuit) return;

    try {
      if (editIndex !== null) {
        const updated = await updateCareer(form, accessToken);
        if (updated.code && updated.data) {
          const newCareers = [...careers];
          newCareers[editIndex] = updated.data;
          setCareers(newCareers);
          setEditIndex(null);
        } else {
          console.warn("경력 수정 실패", updated.message);
        }
      } else {
        const created = await postCareer(form, accessToken);
        if (created.code && created.data) {
          setCareers([...careers, created.data]);
        } else {
          console.warn("경력 추가 실패", created.message);
        }
      }
      setForm({ companyName: '', companyJoin: '', companyQuit: '' });
    } catch (error) {
      console.error("경력 추가/수정 중 오류 발생", error);
    }
  };

  const handleEdit = (index: number) => {
    const selected = careers[index];
    if (!selected) return;
    setForm({
      id: selected.id,
      companyName: selected.companyName,
      companyJoin: selected.companyJoin,
      companyQuit: selected.companyQuit,
    });
    setEditIndex(index);
  };

  const handleDelete = async (id: number) => {
    try {
      const result = await deleteCareer(id, accessToken);
      if (result.code) {
        setCareers(careers.filter(c => c.id !== id));
      }
    } catch (error) {
      console.error("경력 삭제 실패", error);
    }
  };

  const handleDeleteAll = async () => {
    try {
      const result = await deleteAllCareer(accessToken);
      if (result.code) {
        setCareers([]);
      }
    } catch (error) {
      console.error("전체 삭제 실패", error);
    }
  };

  
  return (
  <div css={container}>
    <h2 css={heading}>🧾 트레이너 경력 관리</h2>

    <div css={formBox}>
      <input
        type="text"
        name="companyName"
        placeholder="회사 이름"
        value={form.companyName}
        onChange={handleChange}
        css={input}
      />
      <div css={dateRow}>
        <input
          type="date"
          name="companyJoin"
          value={form.companyJoin}
          onChange={handleChange}
          css={input}
        />
        <input
          type="date"
          name="companyQuit"
          value={form.companyQuit}
          onChange={handleChange}
          css={input}
        />
      </div>
      <button onClick={handleSubmit} css={submitButton}>
        {editIndex !== null ? '✏️ 수정하기' : '➕ 추가하기'}
      </button>
    </div>

    <div>
      {careers.map((career, index) => (
        <div key={career.id ?? index} css={card}>
          <div css={cardText}>
            <div><strong>회사명:</strong> {career.companyName}</div>
            <div><strong>입사일:</strong> {career.companyJoin}</div>
            <div><strong>퇴사일:</strong> {career.companyQuit}</div>
          </div>
          <div css={cardButtons}>
            <button onClick={() => handleEdit(index)} className="edit">수정</button>
            <button onClick={() => handleDelete(career.id)} className="delete">삭제</button>
          </div>
        </div>
      ))}
    </div>

    {careers.length > 0 && (
      <button onClick={handleDeleteAll} css={deleteAllButton}>
        ❌ 전체 삭제
      </button>
    )}
  </div>
);
}

export default TrainerCareer;
