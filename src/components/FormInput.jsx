import { useState } from 'react';

const FormInput = ({
  label,
  name,
  type = 'text',
  register,
  error,
  placeholder,
  required = false,
  ...rest
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className="mb-4">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="relative">
        <input
          id={name}
          type={inputType}
          placeholder={placeholder}
          {...register}
          {...rest}
          className={`w-full px-4 py-2 ring-1 focus:ring-[#E3B8B9] rounded-lg transition-all duration-300 outline-none focus:outline-none focus-visible:outline-none ease-in-out hover:placeholder-gray-700 hover:bg-[#FEF4F4] hover:ring-[#E3B8B9] bg-white ${
            error ? 'ring-red-500' : 'ring-gray-200'
          } placeholder:transition-colors placeholder:duration-300 focus:shadow-[0_0_0_4px_rgba(236,72,153,0.25)] ${
            isPassword ? 'pr-12' : ''
          }`}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors duration-200 focus:outline-none focus:text-pink-500"
            aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
          >
            <i
              className={`ri-${showPassword ? 'eye-off' : 'eye'}-line text-lg`}
            />
          </button>
        )}
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error.message}</p>}
    </div>
  );
};

export default FormInput;
