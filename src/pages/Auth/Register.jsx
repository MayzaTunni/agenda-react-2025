import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { registerSchema } from '../../utils/validators';
import FormInput from '../../components/FormInput';
import PasswordValidator from '../../components/PasswordValidator';
import { toast } from 'react-toastify';
import 'remixicon/fonts/remixicon.css';
import Button from '../../components/Button';

const Register = () => {
  const navigate = useNavigate();
  const { register: registerUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
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

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-pink-500 via-pink-600 to-rose-600">
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
          {/* Tabs */}
          <div className="flex gap-2 mb-8 self-end">
            <div className="px-6 py-2 text-sm font-semibold bg-pink-500 text-white shadow-md rounded-md">
              CADASTRAR
            </div>
            <Link
              to="/login"
              className="px-6 py-2 text-sm font-semibold transition-all duration-300 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-md"
            >
              LOGIN
            </Link>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 flex-1">
            <FormInput
              label="Nome Completo"
              name="name"
              type="text"
              placeholder="Digite seu nome completo"
              register={register('name')}
              error={errors.name}
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

            <div>
              <label
                htmlFor="role"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Perfil
                <span className="text-red-500 ml-1">*</span>
              </label>
              <select
                id="role"
                {...register('role')}
                className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition ${
                  errors.role ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Selecione um perfil</option>
                <option value="client">Cliente</option>
                <option value="professional">Profissional</option>
                <option value="admin">Administrador</option>
              </select>
              {errors.role && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.role.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              variant="primary"
              size="medium"
              disabled={isSubmitting}
              loading={isSubmitting}
              loadingText="Cadastrando..."
              className="w-full"
            >
              CADASTRAR
            </Button>
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
                <div className="w-3 h-3 bg-white rounded-full" />
                <span className="text-white text-sm font-medium tracking-wide">
                  WEBSITE
                </span>
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
