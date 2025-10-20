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
  const baseClasses =
    'font-semibold rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed';

  const variantClasses = {
    primary: 'bg-white text-black',
    secondary:
      'bg-transparent text-black border border-black hover:bg-white hover:border-white',
    outline:
      'border-2 border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white',
    danger: 'bg-red-500 text-white hover:bg-red-600 hover:shadow-lg',
    success: 'bg-green-500 text-white hover:bg-green-600 hover:shadow-lg',
    ghost: 'text-pink-500 hover:bg-pink-50',
  };

  const sizeClasses = {
    small: 'py-2 px-4 text-sm',
    medium: 'py-3 px-6 text-base',
    large: 'py-4 px-8 text-lg',
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
