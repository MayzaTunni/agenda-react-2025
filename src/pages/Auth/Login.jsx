import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { loginSchema } from '../../utils/validators';
import FormInput from '../../components/FormInput';
import { toast } from 'react-toastify';

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
    <div className="min-h-screen bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-2xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Sistema de Agendamento
          </h1>
          <p className="text-gray-600">Faça login para acessar o sistema</p>
        </div>

        {isBlocked && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            ⚠️ Conta bloqueada por 15 minutos após 5 tentativas inválidas.
          </div>
        )}

        {!isBlocked && loginAttempts > 0 && (
          <div className="mb-4 p-4 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded-lg">
            ⚠️ Tentativa {loginAttempts} de 5. Atenção!
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormInput
            label="E-mail"
            name="email"
            type="email"
            placeholder="seu@email.com"
            register={register('email')}
            error={errors.email}
            required
          />

          <FormInput
            label="Senha"
            name="password"
            type="password"
            placeholder="••••••••"
            register={register('password')}
            error={errors.password}
            required
          />

          <div className="flex items-center justify-between">
            <Link
              to="/forgot-password"
              className="text-sm text-primary-600 hover:text-primary-800"
            >
              Esqueceu a senha?
            </Link>
          </div>

          <button
            type="submit"
            disabled={isSubmitting || isBlocked}
            className="w-full bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Não tem uma conta?{' '}
            <Link
              to="/register"
              className="text-primary-600 font-medium hover:text-primary-800"
            >
              Cadastre-se
            </Link>
          </p>
        </div>

        <div className="mt-6 p-4 bg-gray-100 rounded-lg">
          <p className="text-xs text-gray-600 font-semibold mb-2">
            Credenciais de teste:
          </p>
          <p className="text-xs text-gray-600">
            E-mail: teste@teste.com<br />
            Senha: 123456<br />
            Perfil: Administrador
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

