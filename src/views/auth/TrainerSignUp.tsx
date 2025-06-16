/** @jsxImportSource @emotion/react */
import React, { ChangeEvent, FormEvent, useState } from 'react'
import Header from '../header/Header';
import * as authStyle from '@/views/auth/auth.style';
import { useNavigate } from 'react-router-dom';
import { SignUpTrainerRequestDto } from '@/dtos/auth/request/sign-up-trainer.request.dto';
import { signUpTrainerRequest } from '@/apis/auth/sign-up.api';
import { validateTrainerForm } from '@/utils/sign-up.valid';

function TrainerSignUp() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    name: "",
    birthdate: "",
    gender: "",
    phone: "",
    email: "",
    jobAddress: ""
  });
  const [attachmentFile, setAttachmentFile] = useState<File | null>(null);
  const [profile, setProfile] = useState<File | null>(null);
  const [isPasswordConfirmed, setIsPasswordConfirmed] = useState(false);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    if (name === 'password' || name === 'confirmPassword') setIsPasswordConfirmed(false);
  };
  
  const handleConfirmPassword = () => {
    if (form.password !== form.confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      setIsPasswordConfirmed(false);
      return;
    } else {
      alert('비밀번호가 일치합니다.');
      setIsPasswordConfirmed(true);
      return;
    }
  };

  const handleAttachmentChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setAttachmentFile(e.target.files[0]);
  };

  const handleProfileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setProfile(e.target.files[0]);
  };

  const handleSubmit = async(e: FormEvent) => {
    e.preventDefault();

    const validMessage = validateTrainerForm(form);
    if (validMessage) {
      alert(validMessage);
      return;
    }

    if (!attachmentFile) {
      alert('첨부 파일은 필수 항목입니다.');
      return;
    }

    if (!isPasswordConfirmed) {
      alert('비밀번호 확인 버튼을 눌러주세요.');
      return;
    }

    const requestBody: SignUpTrainerRequestDto = {
      ...form,
      gender: form.gender.toUpperCase()
    };

    const formData = new FormData();

    formData.append('dto', new Blob([
      JSON.stringify(requestBody)
    ], { type: 'application/json' }));
    formData.append('attachmentFile', attachmentFile);
    if (profile) formData.append('profile', profile);

    try {
      const response = await signUpTrainerRequest(formData);
      const { code, message } = response;

      if (code !== 'SU') {
        alert(message);
        return;
      }

      alert('회원가입이 완료되었습니다.');
      navigate('/auth/login');
    } catch(error) {
      alert('서버 오류로 인해 가입에 실패하였습니다.');
    }
    
  }

  return (
    <>
      <div>
        <Header />
      </div>
      <div css={authStyle.containerStyle}>
        <form onSubmit={handleSubmit} css={authStyle.formWrapperStyle}>
          <div css={authStyle.formSectionStyle}>
            <h2 css={authStyle.formSignUpTitleStyle}>기본 정보</h2>
            <div css={authStyle.formSignUpStyle}>
              <label css={authStyle.formLabelStyle}>아이디</label>
              <div css={authStyle.inputSignUpWrapperStyle}>
                <input
                  type="text"
                  name='username'
                  value={form.username}
                  onChange={handleInputChange}
                  css={authStyle.inputStyle}
                />
              </div>
            </div>
            <div css={authStyle.formSignUpStyle}>
              <label css={authStyle.formLabelStyle}>비밀번호</label>
              <div css={authStyle.inputSignUpWrapperStyle}>
                <input
                  type="password"
                  name='password'
                  value={form.password}
                  onChange={handleInputChange}
                  css={authStyle.inputStyle}
                />
              </div>
            </div>
            <div css={authStyle.formSignUpStyle}>
              <label css={authStyle.formLabelStyle}>비밀번호 확인</label>
              <div css={authStyle.inputSignUpWrapperStyle}>
                <input
                  type="password"
                  name='confirmPassword'
                  value={form.confirmPassword}
                  onChange={handleInputChange}
                  css={authStyle.inputStyle}
                />
                <button type="button" onClick={handleConfirmPassword} css={authStyle.inputButtonStyle}>
                  확인
                </button>
              </div>
            </div>
            <div css={authStyle.formSignUpStyle}>
              <label css={authStyle.formLabelStyle}>성명</label>
              <div css={authStyle.inputSignUpWrapperStyle}>
                <input
                  type="text"
                  name='name'
                  value={form.name}
                  onChange={handleInputChange}
                  css={authStyle.inputStyle}
                />
              </div>
            </div>
            <div css={authStyle.formSignUpStyle}>
              <label css={authStyle.formLabelStyle}>생년월일</label>
              <div css={authStyle.inputSignUpWrapperStyle}>
                <input
                  type="date"
                  name='birthdate'
                  value={form.birthdate}
                  onChange={handleInputChange}
                  css={authStyle.inputStyle}
                />
              </div>
            </div>
            <div css={authStyle.formSignUpStyle}>
              <label css={authStyle.formLabelStyle}>성별</label>
              <div css={authStyle.genderSectionStyle}>
                <input
                  type="radio"
                  id='man'
                  name='gender'
                  value="man"
                  checked={form.gender === "man"}
                  onChange={handleInputChange}
                  css={authStyle.hiddenRadioStyle}
                />
                <label
                  htmlFor="man"
                  css={[authStyle.genderButtonStyle, form.gender === "man" && authStyle.genderSelectionStyle]}
                >
                  남성
                </label>

                <input
                  type="radio"
                  id='woman'
                  name='gender'
                  value="woman"
                  checked={form.gender === "woman"}
                  onChange={handleInputChange}
                  css={authStyle.hiddenRadioStyle}
                />
                <label
                  htmlFor="woman"
                  css={[authStyle.genderButtonStyle, form.gender === "woman" && authStyle.genderSelectionStyle]}
                >
                  여성
                </label>
              </div>
            </div>
            <div css={authStyle.formSignUpStyle}>
              <label css={authStyle.formLabelStyle}>휴대폰번호</label>
              <div css={authStyle.inputSignUpWrapperStyle}>
                <input
                  type="text"
                  name='phone'
                  value={form.phone}
                  onChange={handleInputChange}
                  css={authStyle.inputStyle}
                />
              </div>
            </div>
            <div css={authStyle.formSignUpStyle}>
              <label css={authStyle.formLabelStyle}>이메일</label>
              <div css={authStyle.inputSignUpWrapperStyle}>
                <input
                  type="email"
                  name='email'
                  value={form.email}
                  onChange={handleInputChange}
                  css={authStyle.inputStyle}
                />
              </div>
            </div>
          </div>
          <div css={authStyle.formSectionStyle}>
            <h2 css={authStyle.formSignUpTitleStyle}>추가 정보</h2>
            <div css={authStyle.formSignUpStyle}>
              <label css={authStyle.formLabelStyle}>근무지 주소</label>
              <div css={authStyle.inputSignUpWrapperStyle}>
                <input
                  type="text"
                  name='jobAddress'
                  value={form.jobAddress}
                  onChange={handleInputChange}
                  css={authStyle.inputStyle}
                />
                <button css={authStyle.inputButtonStyle}>찾아보기</button>
              </div>
            </div>
            <div css={authStyle.formSignUpStyle}>
              <label css={authStyle.formLabelStyle}>
                첨부 파일 <br />
                (계약서 등)
              </label>
              <div css={authStyle.inputSignUpWrapperStyle}>
                <input
                  type="file"
                  name='attachmentFile'
                  onChange={handleAttachmentChange}
                  css={authStyle.inputStyle}
                />
              </div>
            </div>       
          </div>
          <div css={authStyle.formSectionStyle}>
            <h2 css={authStyle.formSignUpTitleStyle}>선택 정보</h2>
            <div css={authStyle.formSignUpStyle}>
              <label css={authStyle.formLabelStyle}>프로필 사진</label>
              <div css={authStyle.inputSignUpWrapperStyle}>
                <input
                  type="file"
                  name='profile'
                  onChange={handleProfileChange}
                  css={authStyle.inputStyle}
                />
              </div>
            </div>       
          </div>
          <button type='submit' css={authStyle.buttonSignUpStyle}>
            가입하기
          </button>
        </form>
      </div>
    </>
  )
}

export default TrainerSignUp;