import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { registerSchema, formatPhone, formatCPF } from '../../utils/validators';
import FormInput from '../../components/FormInput';
import { toast } from 'react-toastify';
import 'remixicon/fonts/remixicon.css';
import Button from '../../components/Button';
import { useState } from 'react';
import PasswordValidator from '../../components/PasswordValidator';

const Register = () => {
  const navigate = useNavigate();
  const { register: registerUser } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    trigger,
    getValues,
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  // Watch password fields for real-time validation
  const watchedPassword = watch('password', '');
  const watchedConfirmPassword = watch('confirmPassword', '');

  const onSubmit = async (data) => {
    try {
      const { confirmPassword, ...userData } = data;
      await registerUser(userData);
      toast.success(
        'Cadastro realizado com sucesso! Faça login para continuar.'
      );
      navigate('/login');
    } catch (error) {
      toast.error(error.message);
    }
  };

  const nextStep = async () => {
    const fieldsToValidate = ['name', 'email', 'phone', 'cpf', 'birthDate'];
    const isValid = await trigger(fieldsToValidate);

    if (isValid) {
      setCurrentStep(2);
    }
  };

  const prevStep = () => {
    setCurrentStep(1);
  };

  const handleCPFChange = (e) => {
    const value = e.target.value;
    const formatted = formatCPF(value);
    e.target.value = formatted;
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    const formatted = formatPhone(value);
    e.target.value = formatted;
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-pink-500 via-pink-600 to-rose-600">
      <Button
        className="absolute top-10 left-[23vw] bg-transparent text-white flex flex-row items-center gap-2 hover:bg-transparent hover:underline"
        variant="secondary"
        size="small"
        onClick={() => navigate('/')}
      >
        <i className="ri-arrow-left-long-line text-white" /> Voltar para a
        página inicial
      </Button>

      {/* Decorative circles */}
      <div className="absolute top-[-10%] left-[-5%] w-96 h-96 bg-pink-400/30 rounded-full blur-3xl animate-pulse" />
      <div
        className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-rose-400/30 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: '1s' }}
      />
      <div className="absolute top-[20%] right-[10%] w-64 h-64 bg-pink-300/20 rounded-full blur-2xl" />

      {/* Main card container with animation - REVERSED ORDER */}
      <div className="relative z-10 w-full max-w-5xl mx-4 bg-white rounded-2xl shadow-2xl overflow-hidden flex min-h-[600px] animate-fadeIn">
        {/* Left side - Form (REGISTER) */}
        <div className="w-3/5 p-12 flex flex-col transition-all duration-700 ease-in-out animate-slideInFromLeft">
          {/* Step Indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-center space-x-4">
              <div
                className={`flex items-center ${currentStep >= 1 ? 'text-pink-500' : 'text-gray-400'}`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                    currentStep >= 1
                      ? 'bg-pink-500 text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  1
                </div>
                <span className="ml-2 text-sm font-medium">Dados Pessoais</span>
              </div>
              <div
                className={`w-8 h-0.5 ${currentStep >= 2 ? 'bg-pink-500' : 'bg-gray-200'}`}
              />
              <div
                className={`flex items-center ${currentStep >= 2 ? 'text-pink-500' : 'text-gray-400'}`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                    currentStep >= 2
                      ? 'bg-pink-500 text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  2
                </div>
                <span className="ml-2 text-sm font-medium">Senha</span>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 flex-1">
            {/* Step 1: Dados Pessoais */}
            {currentStep === 1 && (
              <>
                <FormInput
                  label="Nome Completo"
                  name="name"
                  type="text"
                  placeholder="Digite seu nome completo"
                  register={register('name')}
                  error={errors.name}
                  required
                />

                <div className="mb-4">
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Telefone
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    id="phone"
                    type="text"
                    placeholder="(11) 98765-4321"
                    maxLength={15}
                    {...register('phone')}
                    onChange={handlePhoneChange}
                    onKeyDown={(e) => {
                      // Permitir apenas números, backspace, delete, tab, escape, enter
                      if (
                        !/[0-9]/.test(e.key) &&
                        ![
                          'Backspace',
                          'Delete',
                          'Tab',
                          'Escape',
                          'Enter',
                          'ArrowLeft',
                          'ArrowRight',
                          'ArrowUp',
                          'ArrowDown',
                        ].includes(e.key)
                      ) {
                        e.preventDefault();
                      }
                    }}
                    className={`w-full px-4 py-2 ring-1 focus:ring-pink-500 rounded-lg transition-all duration-300 outline-none focus:outline-none focus-visible:outline-none ease-in-out hover:placeholder-gray-700 hover:bg-pink-50 hover:ring-pink-50 bg-white ${
                      errors.phone ? 'ring-red-500' : 'ring-gray-200'
                    } placeholder:transition-colors placeholder:duration-300 focus:shadow-[0_0_0_4px_rgba(236,72,153,0.25)]`}
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="cpf"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    CPF
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    id="cpf"
                    type="text"
                    placeholder="123.456.789-00"
                    maxLength={14}
                    {...register('cpf')}
                    onChange={handleCPFChange}
                    onKeyDown={(e) => {
                      // Permitir apenas números, backspace, delete, tab, escape, enter
                      if (
                        !/[0-9]/.test(e.key) &&
                        ![
                          'Backspace',
                          'Delete',
                          'Tab',
                          'Escape',
                          'Enter',
                          'ArrowLeft',
                          'ArrowRight',
                          'ArrowUp',
                          'ArrowDown',
                        ].includes(e.key)
                      ) {
                        e.preventDefault();
                      }
                    }}
                    className={`w-full px-4 py-2 ring-1 focus:ring-pink-500 rounded-lg transition-all duration-300 outline-none focus:outline-none focus-visible:outline-none ease-in-out hover:placeholder-gray-700 hover:bg-pink-50 hover:ring-pink-50 bg-white ${
                      errors.cpf ? 'ring-red-500' : 'ring-gray-200'
                    } placeholder:transition-colors placeholder:duration-300 focus:shadow-[0_0_0_4px_rgba(236,72,153,0.25)]`}
                  />
                  {errors.cpf && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.cpf.message}
                    </p>
                  )}
                </div>

                <FormInput
                  label="Data de Nascimento"
                  name="birthDate"
                  type="date"
                  placeholder=""
                  register={register('birthDate')}
                  error={errors.birthDate}
                  required
                />

                <FormInput
                  label="E-mail"
                  name="email"
                  type="email"
                  placeholder="Digite seu e-mail"
                  register={register('email')}
                  error={errors.email}
                  required
                />

                <Button
                  type="button"
                  variant="primary"
                  size="medium"
                  onClick={nextStep}
                  className="w-full"
                >
                  PRÓXIMO
                </Button>
              </>
            )}

            {/* Step 2: Senha */}
            {currentStep === 2 && (
              <>
                <FormInput
                  label="Senha"
                  name="password"
                  type="password"
                  placeholder="Digite sua senha"
                  register={register('password')}
                  error={errors.password}
                  required
                />

                <FormInput
                  label="Confirmar Senha"
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirme sua senha"
                  register={register('confirmPassword')}
                  error={errors.confirmPassword}
                  required
                />

                {/* Password Validator */}
                <div className="mt-4">
                  <PasswordValidator
                    password={watchedPassword}
                    confirmPassword={watchedConfirmPassword}
                  />
                </div>

                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant="secondary"
                    size="medium"
                    onClick={prevStep}
                    className="flex-1"
                  >
                    ANTERIOR
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    size="medium"
                    disabled={isSubmitting}
                    loading={isSubmitting}
                    loadingText="Cadastrando..."
                    className="flex-1"
                  >
                    CADASTRAR
                  </Button>
                </div>
              </>
            )}
          </form>

          {/* Footer links */}
          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm">
              Já tem uma conta?{' '}
              <Link
                to="/login"
                className="text-pink-500 font-semibold hover:text-pink-600 transition-colors"
              >
                Fazer login
              </Link>
            </p>
          </div>
        </div>

        {/* Right side - Pink panel (REGISTER) */}
        <div className="w-2/5 bg-gradient-to-br from-pink-500 to-rose-500 p-12 flex flex-col justify-center relative overflow-hidden transition-all duration-700 ease-in-out animate-slideInFromRight">
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="absolute top-[-20%] right-[-20%] w-64 h-64 bg-white rounded-full" />
            <div className="absolute bottom-[-10%] left-[-10%] w-48 h-48 bg-white rounded-full" />
          </div>

          <div className="relative z-10">
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-8">
                <img
                  src="public/logo-barbie.png"
                  alt="Logo"
                  className="w-[20%]"
                />
              </div>
            </div>

            <h1 className="text-5xl font-bold text-white mb-4 leading-tight">
              Sign Up
            </h1>
            <div className="w-16 h-1 bg-white rounded-full" />

            <div className="mt-12 flex items-center gap-3 text-white/90">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                <i className="ri-arrow-left-line text-2xl" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes slideInFromLeft {
          from {
            opacity: 0;
            transform: translateX(-100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInFromRight {
          from {
            opacity: 0;
            transform: translateX(100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }

        .animate-slideInFromLeft {
          animation: slideInFromLeft 0.7s ease-in-out;
        }

        .animate-slideInFromRight {
          animation: slideInFromRight 0.7s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default Register;
