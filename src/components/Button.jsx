import React from 'react';

const Button = ({
  children,
  type = 'button',
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  loadingText = 'Carregando...',
  className = '',
  onClick,
  ...props
}) => {
  const baseClasses = 'font-semibold rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100';
  
  const variantClasses = {
    primary: 'bg-gradient-to-r from-pink-500 to-rose-500 text-white hover:shadow-lg hover:scale-[1.02]',
    secondary: 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-[1.02]',
    outline: 'border-2 border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white hover:scale-[1.02]',
    danger: 'bg-red-500 text-white hover:bg-red-600 hover:shadow-lg hover:scale-[1.02]',
    success: 'bg-green-500 text-white hover:bg-green-600 hover:shadow-lg hover:scale-[1.02]',
    ghost: 'text-pink-500 hover:bg-pink-50 hover:scale-[1.02]'
  };
  
  const sizeClasses = {
    small: 'py-2 px-4 text-sm',
    medium: 'py-3 px-6 text-base',
    large: 'py-4 px-8 text-lg'
  };
  
  const buttonClasses = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${sizeClasses[size]}
    ${className}
  `.trim();

  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={buttonClasses}
      onClick={onClick}
      {...props}
    >
      {loading ? (
        <div className="flex items-center justify-center gap-2">
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          <span>{loadingText}</span>
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
