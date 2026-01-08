"use client";

import React, { useState } from 'react';

interface RegisterProps {
  onCancel: () => void;
}

const Register: React.FC<RegisterProps> = ({ onCancel }) => {
  const [formData, setFormData] = useState({
    userId: '',
    password: '',
    passwordConfirm: '',
    jobTitle: '',
    group: '',
    role: '',
    joinDate: '',
    email: '',
    remarks: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Register submitted:', formData);
    // TODO: Implement registration logic
  };

  return (
    <div className="flex h-full items-center justify-center bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="w-full max-w-2xl space-y-8 bg-white p-8 rounded-xl shadow-lg border border-gray-100">
        <div>
          <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">
            회원가입
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            SOC_PMS 이용을 위해 정보를 입력해주세요.
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
            
            {/* 아이디 */}
            <div className="sm:col-span-2">
              <label htmlFor="userId" className="block text-sm font-medium leading-6 text-gray-900">아이디</label>
              <div className="mt-1">
                <input
                  type="text"
                  name="userId"
                  id="userId"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={formData.userId}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* 비밀번호 */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">비밀번호</label>
              <div className="mt-1">
                <input
                  type="password"
                  name="password"
                  id="password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* 비밀번호 확인 */}
            <div>
              <label htmlFor="passwordConfirm" className="block text-sm font-medium leading-6 text-gray-900">비밀번호 확인</label>
              <div className="mt-1">
                <input
                  type="password"
                  name="passwordConfirm"
                  id="passwordConfirm"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={formData.passwordConfirm}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* 직급 */}
            <div>
              <label htmlFor="jobTitle" className="block text-sm font-medium leading-6 text-gray-900">직급</label>
              <div className="mt-1">
                <select
                  id="jobTitle"
                  name="jobTitle"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={formData.jobTitle}
                  onChange={handleChange}
                >
                  <option value="">선택하세요</option>
                  <option value="Associate">사원</option>
                  <option value="Senior Associate">대리</option>
                  <option value="Manager">과장</option>
                  <option value="Senior Manager">차장</option>
                  <option value="Director">부장</option>
                </select>
              </div>
            </div>

            {/* 그룹 */}
            <div>
              <label htmlFor="group" className="block text-sm font-medium leading-6 text-gray-900">그룹</label>
              <div className="mt-1">
                <select
                  id="group"
                  name="group"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={formData.group}
                  onChange={handleChange}
                >
                  <option value="">선택하세요</option>
                  <option value="R&D">연구소 (R&D)</option>
                  <option value="SI">SI 사업부</option>
                  <option value="SM">SM 사업부</option>
                  <option value="PMO">PMO</option>
                  <option value="Sales">영업본부</option>
                </select>
              </div>
            </div>

            {/* 권한 */}
            <div>
              <label htmlFor="role" className="block text-sm font-medium leading-6 text-gray-900">권한</label>
              <div className="mt-1">
                <select
                  id="role"
                  name="role"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={formData.role}
                  onChange={handleChange}
                >
                  <option value="Member">일반 사용자 (Member)</option>
                  <option value="PMO">관리자 (PMO)</option>
                  <option value="Admin">시스템 관리자 (Admin)</option>
                </select>
              </div>
            </div>

            {/* 입사일자 */}
            <div>
              <label htmlFor="joinDate" className="block text-sm font-medium leading-6 text-gray-900">입사일자</label>
              <div className="mt-1">
                <input
                  type="date"
                  name="joinDate"
                  id="joinDate"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={formData.joinDate}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* 이메일 */}
            <div className="sm:col-span-2">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">이메일</label>
              <div className="mt-1">
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* 비고 */}
            <div className="sm:col-span-2">
              <label htmlFor="remarks" className="block text-sm font-medium leading-6 text-gray-900">비고</label>
              <div className="mt-1">
                <textarea
                  name="remarks"
                  id="remarks"
                  rows={3}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={formData.remarks}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="pt-4 flex items-center justify-end space-x-4">
             <button
              type="button"
              className="text-sm font-semibold leading-6 text-gray-900 hover:text-gray-700"
              onClick={onCancel}
            >
              취소
            </button>
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-8 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              가입하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
