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
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        {...register}
        {...rest}
        className={`w-full px-4 py-2 ring-1 focus:ring-pink-500 rounded-lg transition-all duration-300 outline-none focus:outline-none focus-visible:outline-none ease-in-out hover:placeholder-gray-700 hover:bg-pink-50 hover:ring-pink-50 bg-white ${
          error ? 'ring-red-500' : 'ring-gray-200'
        } placeholder:transition-colors placeholder:duration-300 focus:shadow-[0_0_0_4px_rgba(236,72,153,0.25)]`}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error.message}</p>
      )}
    </div>
  );
};

export default FormInput;

