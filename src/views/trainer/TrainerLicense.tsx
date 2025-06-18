/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { deleteAllLicense, deleteLicense, postLicense, updateLicense } from '@/apis/trainer/trainer-license.api';
import { TrainerLicenseResponseDto } from '@/dtos/trainer/response/trainer-license.response.dto';
import { TrainerLicenseRequestDto } from '@/dtos/trainer/request/trainer-license.request.dto';
import {
  container,
  heading,
  formBox,
  input,
  fileInput,
  submitButton,
  card,
  cardText,
  cardButtons,
  deleteAllButton,
} from '@/views/trainer/TrainerLicenseStyle';


const TrainerLicense = () => {
  const [cookies] = useCookies(['accessToken']);
  const accessToken = cookies.accessToken || '';
  const [licenses, setLicenses] = useState<TrainerLicenseResponseDto[]>([]);
  const [form, setForm] = useState<TrainerLicenseRequestDto>({
    licenseType: '',
    licenseName: '',
    file: undefined,
  });
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
  setForm((prev: TrainerLicenseRequestDto) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setForm((prev: TrainerLicenseRequestDto) => ({ ...prev, file: e.target.files![0] }));
    }
  };

  const handleSubmit = async () => {
    if (!form.licenseType || !form.licenseName || !form.file) return;

    try {
      if (editIndex !== null && 'id' in form && form.id !== undefined) {
        const updated = await updateLicense(form, accessToken);
        if (updated.code && updated.data) {
          const newLicenses = [...licenses];
          newLicenses[editIndex] = updated.data;
          setLicenses(newLicenses);
          setEditIndex(null);
        }
      } else {
        const created = await postLicense(form, accessToken);
        if (created.code && created.data) {
          setLicenses([...licenses, created.data]);
        }
      }

      setForm({ licenseType: '', licenseName: '', file: undefined });
    } catch (error) {
      console.error('자격증 등록 실패', error);
    }
  };

  const handleEdit = (index: number) => {
    const selected = licenses[index];
    setForm({
      id: selected.id,
      licenseType: selected.licenseType,
      licenseName: selected.licenseName,
      file: undefined,
    });
    setEditIndex(index);
  };

  const handleDelete = async (id: number) => {
    try {
      const result = await deleteLicense(id, accessToken);
      if (result.code) {
        setLicenses(licenses.filter(l => l.id !== id));
      }
    } catch (error) {
      console.error('삭제 실패', error);
    }
  };

  const handleDeleteAll = async () => {
    try {
      const result = await deleteAllLicense(accessToken);
      if (result.code) setLicenses([]);
    } catch (error) {
      console.error('전체 삭제 실패', error);
    }
  };

  return (
    <div css={container}>
      <h2 css={heading}>🎓 트레이너 자격증 관리</h2>

      <div css={formBox}>
        <input
          type="text"
          name="licenseType"
          placeholder="자격증 종류"
          value={form.licenseType}
          onChange={handleChange}
          css={input}
        />
        <input
          type="text"
          name="licenseName"
          placeholder="자격증 이름"
          value={form.licenseName}
          onChange={handleChange}
          css={input}
        />
        <input
          type="file"
          onChange={handleFileChange}
          css={fileInput}
        />
        <button onClick={handleSubmit} css={submitButton}>
          {editIndex !== null ? '✏️ 수정하기' : '➕ 추가하기'}
        </button>
      </div>

      <div>
        {licenses.map((license, index) => (
          <div key={license.id} css={card}>
            <div css={cardText}>
              <strong>{license.licenseType}</strong> - {license.licenseName}
            </div>
            <div css={cardButtons}>
              <button className="edit" onClick={() => handleEdit(index)}>수정</button>
              <button className="delete" onClick={() => handleDelete(license.id)}>삭제</button>
            </div>
          </div>
        ))}
      </div>

      {licenses.length > 0 && (
        <button onClick={handleDeleteAll} css={deleteAllButton}>
          ❌ 전체 삭제
        </button>
      )}
    </div>
  );
};

export default TrainerLicense;