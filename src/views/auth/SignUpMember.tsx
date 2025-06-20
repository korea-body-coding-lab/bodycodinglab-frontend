/** @jsxImportSource @emotion/react */
import React, { ChangeEvent, FormEvent, useState } from 'react'
import Header from '../header/Header';
import { SignUpMemberRequestDto } from '@/dtos/auth/request/sign-up-member.request.dto';
import { signUpMemberRequest } from '@/apis/auth/sign-up-member.api';
import { useNavigate } from 'react-router-dom';
import { validateMemberForm } from '@/utils/sign-up.valid';
import { buttonSignUpStyle, containerStyle, formLabelStyle, formSectionStyle, formSignUpStyle, formSignUpTitleStyle, formWrapperStyle, genderButtonStyle, genderSectionStyle, genderSelectionStyle, hiddenRadioStyle, inputButtonStyle, inputSignUpWrapperStyle, inputStyle } from './auth.style';

function SignUpMember() {
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
    memberAddress: ""
  });
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

  const handleProfileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setProfile(e.target.files[0]);
  };

  const handleSubmit = async(e: FormEvent) => {
    e.preventDefault();

    const validMessage = validateMemberForm(form);
    if (validMessage) {
      alert(validMessage);
      return;
    }

    if (!isPasswordConfirmed) {
      alert('비밀번호 확인 버튼을 눌러주세요.');
      return;
    }
    
    const requestBody: SignUpMemberRequestDto = {
      ...form,
      gender: form.gender.toUpperCase()
    };

    const formData = new FormData();
    formData.append('dto', new Blob([
      JSON.stringify(requestBody)
    ], { type: 'application/json' }));
    if (profile) formData.append('profile', profile);

    try {
      const response = await signUpMemberRequest(formData);
      const { code, message } = response;

      if (code !== 'SU') {
        alert(message);
        return;
      }

      alert('회원가입이 완료되었습니다.');
      navigate('/auth/login');
    } catch(e) {
      console.log('회원가입 요청 오류: ', e);
      alert('서버 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.');
    }
    
  };

  return (
    <>
      <div>
        <Header />
      </div>
      <div css={containerStyle}>
        <form onSubmit={handleSubmit} css={formWrapperStyle}>
          <div css={formSectionStyle}>
            <h2 css={formSignUpTitleStyle}>기본 정보</h2>
            <div css={formSignUpStyle}>
              <label css={formLabelStyle}>아이디</label>
              <div css={inputSignUpWrapperStyle}>
                <input
                  type="text"
                  name='username'
                  value={form.username}
                  onChange={handleInputChange}
                  css={inputStyle}
                />
              </div>
            </div>
            <div css={formSignUpStyle}>
              <label css={formLabelStyle}>비밀번호</label>
              <div css={inputSignUpWrapperStyle}>
                <input
                  type="password"
                  name='password'
                  value={form.password}
                  onChange={handleInputChange}
                  css={inputStyle}
                />
              </div>
            </div>
            <div css={formSignUpStyle}>
              <label css={formLabelStyle}>비밀번호 확인</label>
              <div css={inputSignUpWrapperStyle}>
                <input
                  type="password"
                  name='confirmPassword'
                  value={form.confirmPassword}
                  onChange={handleInputChange}
                  css={inputStyle}
                />
                <button type="button" onClick={handleConfirmPassword} css={inputButtonStyle}>
                  확인
                </button>
              </div>
            </div>
            <div css={formSignUpStyle}>
              <label css={formLabelStyle}>성명</label>
              <div css={inputSignUpWrapperStyle}>
                <input
                  type="text"
                  name='name'
                  value={form.name}
                  onChange={handleInputChange}
                  css={inputStyle}
                />
              </div>
            </div>
            <div css={formSignUpStyle}>
              <label css={formLabelStyle}>생년월일</label>
              <div css={inputSignUpWrapperStyle}>
                <input
                  type="date"
                  name='birthdate'
                  value={form.birthdate}
                  onChange={handleInputChange}
                  css={inputStyle}
                />
              </div>
            </div>
            <div css={formSignUpStyle}>
              <label css={formLabelStyle}>성별</label>
              <div css={genderSectionStyle}>
                <input
                  type="radio"
                  id='man'
                  name='gender'
                  value="man"
                  checked={form.gender === "man"}
                  onChange={handleInputChange}
                  css={hiddenRadioStyle}
                />
                <label
                  htmlFor="man"
                  css={[genderButtonStyle, form.gender === "man" && genderSelectionStyle]}
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
                  css={hiddenRadioStyle}
                />
                <label
                  htmlFor="woman"
                  css={[genderButtonStyle, form.gender === "woman" && genderSelectionStyle]}
                >
                  여성
                </label>
              </div>
            </div>
            <div css={formSignUpStyle}>
              <label css={formLabelStyle}>휴대폰번호</label>
              <div css={inputSignUpWrapperStyle}>
                <input
                  type="text"
                  name='phone'
                  value={form.phone}
                  onChange={handleInputChange}
                  css={inputStyle}
                />
              </div>
            </div>
            <div css={formSignUpStyle}>
              <label css={formLabelStyle}>이메일</label>
              <div css={inputSignUpWrapperStyle}>
                <input
                  type="email"
                  name='email'
                  value={form.email}
                  onChange={handleInputChange}
                  css={inputStyle}
                />
              </div>
            </div>
          </div>
          <div css={formSectionStyle}>
            <h2 css={formSignUpTitleStyle}>추가 정보</h2>
            <div css={formSignUpStyle}>
              <label css={formLabelStyle}>주소</label>
              <div css={inputSignUpWrapperStyle}>
                <input
                  type="text"
                  name='address'
                  value={form.memberAddress}
                  onChange={handleInputChange}
                  css={inputStyle}
                />
                <button css={inputButtonStyle}>찾아보기</button>
              </div>
            </div>       
          </div>
          <div css={formSectionStyle}>
            <h2 css={formSignUpTitleStyle}>선택 정보</h2>
            <div css={formSignUpStyle}>
              <label css={formLabelStyle}>프로필 사진</label>
              <div css={inputSignUpWrapperStyle}>
                <input
                  type="file"
                  name='profile'
                  onChange={handleProfileChange}
                  css={inputStyle}
                />
              </div>
            </div>       
          </div>
          <button type='submit' css={buttonSignUpStyle}>
            가입하기
          </button>
        </form>
      </div>
    </>
  )
}

export default SignUpMember;