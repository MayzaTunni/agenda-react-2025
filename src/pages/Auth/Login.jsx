import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { loginSchema } from '../../utils/validators';
import FormInput from '../../components/FormInput';
import Button from '../../components/Button';
import { toast } from 'react-toastify';
import 'remixicon/fonts/remixicon.css';

const Login = () => {
  const navigate = useNavigate();
  const { login, isBlocked, loginAttempts } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      await login(data.email, data.password);
      toast.success('Login realizado com sucesso!');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.message);
    }
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

      {/* Main card container with animation */}
      <div className="relative z-10 w-full max-w-5xl mx-4 bg-white rounded-2xl shadow-2xl overflow-hidden flex min-h-[600px] animate-fadeIn">
        {/* Left side - Pink panel (LOGIN) */}
        <div className="w-2/5 bg-gradient-to-br from-pink-500 to-rose-500 p-12 flex flex-col justify-center relative overflow-hidden transition-all duration-700 ease-in-out animate-slideInFromLeft">
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="absolute top-[-20%] left-[-20%] w-64 h-64 bg-white rounded-full" />
            <div className="absolute bottom-[-10%] right-[-10%] w-48 h-48 bg-white rounded-full" />
          </div>

          <div className="relative z-10">
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-8">
                <img src="public/logo-barbie.png" alt="Logo" className="w-[20%]" />
              </div>
            </div>

            <h1 className="text-5xl font-bold text-white mb-4 leading-tight">
              Login
            </h1>
            <div className="w-16 h-1 bg-white rounded-full" />

            <div className="mt-12 flex items-center gap-3 text-white/90">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                <i className="ri-arrow-right-line text-2xl" />
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Form (LOGIN) */}
        <div className="w-3/5 p-12 flex flex-col transition-all duration-700 ease-in-out animate-slideInFromRight justify-center">
          {/* Alerts */}
          {isBlocked && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-md animate-slideDown">
              <div className="flex items-center gap-2">
                <i className="ri-error-warning-line text-xl" />
                <span className="text-sm font-medium">
                  Conta bloqueada por 15 minutos após 5 tentativas inválidas.
                </span>
              </div>
            </div>
          )}

          {!isBlocked && loginAttempts > 0 && (
            <div className="mb-6 p-4 bg-yellow-50 border-l-4 border-yellow-500 text-yellow-700 rounded-md animate-slideDown">
              <div className="flex items-center gap-2">
                <i className="ri-alert-line text-xl" />
                <span className="text-sm font-medium">
                  Tentativa {loginAttempts} de 5. Atenção!
                </span>
              </div>
            </div>
          )}

          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6 flex flex-col justify-center my-auto h-fit"
          >
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

            <div className="flex items-center justify-between pt-2">
              <Link
                to="/forgot-password"
                className="text-sm text-pink-500 hover:text-pink-600 font-medium transition-colors"
              >
                Esqueceu a senha?
              </Link>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="medium"
              disabled={isBlocked}
              loading={isSubmitting}
              loadingText="Entrando..."
              className="w-full"
            >
              ENTRAR
            </Button>
          </form>

          {/* Footer links */}
          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm">
              Não tem uma conta?{' '}
              <Link
                to="/register"
                className="text-pink-500 font-semibold hover:text-pink-600 transition-colors"
              >
                Cadastre-se
              </Link>
            </p>
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

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
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

        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
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

export default Login;
