import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { registerSchema } from '../../utils/validators';
import FormInput from '../../components/FormInput';
import { toast } from 'react-toastify';

const Register = () => {
  const navigate = useNavigate();
  const { register: registerUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    try {
      const { confirmPassword, ...userData } = data;
      await registerUser(userData);
      toast.success('Cadastro realizado com sucesso! Faça login para continuar.');
      navigate('/login');
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-2xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Criar Conta
          </h1>
          <p className="text-gray-600">Preencha os dados para se cadastrar</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormInput
            label="Nome Completo"
            name="name"
            type="text"
            placeholder="Seu nome completo"
            register={register('name')}
            error={errors.name}
            required
          />

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

          <FormInput
            label="Confirmar Senha"
            name="confirmPassword"
            type="password"
            placeholder="••••••••"
            register={register('confirmPassword')}
            error={errors.confirmPassword}
            required
          />

          <div className="mb-4">
            <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
              Perfil
              <span className="text-red-500 ml-1">*</span>
            </label>
            <select
              id="role"
              {...register('role')}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition ${
                errors.role ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Selecione um perfil</option>
              <option value="client">Cliente</option>
              <option value="professional">Profissional</option>
              <option value="admin">Administrador</option>
            </select>
            {errors.role && (
              <p className="mt-1 text-sm text-red-600">{errors.role.message}</p>
            )}
          </div>

          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-xs text-blue-800">
              ℹ️ A senha deve conter letras maiúsculas, minúsculas e números.
            </p>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Cadastrando...' : 'Cadastrar'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Já tem uma conta?{' '}
            <Link
              to="/login"
              className="text-primary-600 font-medium hover:text-primary-800"
            >
              Fazer login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;

