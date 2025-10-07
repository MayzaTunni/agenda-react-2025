import React from 'react';
import { cn } from '../utils/cn';

interface PasswordValidatorProps {
  password: string;
  confirmPassword: string;
}

export default function PasswordValidator({
  password,
  confirmPassword,
}: PasswordValidatorProps) {
  const getValidationIcon = (isValid: boolean) => {
    return isValid ? 'ri-checkbox-circle-fill' : 'ri-close-circle-fill';
  };

  const getValidationColor = (isValid: boolean) => {
    return isValid ? 'text-green-500' : 'text-red-500';
  };

  const getTextColor = (isValid: boolean) => {
    return isValid ? 'text-green-600' : 'text-red-600';
  };

  const validationRules = [
    {
      isValid: /[A-Z]/.test(password),
      text: 'Contém letra maiúscula',
    },
    {
      isValid: /[a-z]/.test(password),
      text: 'Contém letra minúscula',
    },
    {
      isValid: /\d/.test(password),
      text: 'Contém número',
    },
    {
      isValid: password === confirmPassword && confirmPassword.length > 0,
      text: 'As senhas coincidem',
    },
  ];

  const ProgressBar = ({ isValid }: { isValid: boolean }) => (
    <div
      style={{
        transition: 'background-color 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        backgroundColor: isValid ? '#22c55e' : '#d1d5db',
      }}
      className="flex-1 h-1.5 rounded-full"
    />
  );

  return (
    <div className="space-y-2">
      <div className="flex flex-row items-center gap-2 w-full">
        {validationRules.map((rule, index) => (
          <ProgressBar key={index} isValid={rule.isValid} />
        ))}
      </div>
      {validationRules.map((rule, index) => (
        <div key={index} className="flex items-center gap-2 text-sm">
          <i
            className={cn(
              getValidationIcon(rule.isValid),
              getValidationColor(rule.isValid)
            )}
          />
          <span className={cn('text-sm', getTextColor(rule.isValid))}>
            {rule.text}
          </span>
        </div>
      ))}
    </div>
  );
}
