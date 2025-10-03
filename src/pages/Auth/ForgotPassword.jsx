import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, useNavigate } from 'react-router-dom';
import { forgotPasswordSchema } from '../../utils/validators';
import { authAPI } from '../../services/api';
import FormInput from '../../components/FormInput';
import { toast } from 'react-toastify';

const ForgotPassword = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await authAPI.forgotPassword(data.email);
      toast.success(response.message);
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      toast.error('Erro ao enviar e-mail de recuperação.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-2xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Recuperar Senha
          </h1>
          <p className="text-gray-600">
            Digite seu e-mail para receber instruções de recuperação
          </p>
        </div>

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

          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-xs text-blue-800">
              ℹ️ Enviaremos um link de recuperação para o e-mail cadastrado.
            </p>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Enviando...' : 'Enviar Link de Recuperação'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link
            to="/login"
            className="text-primary-600 font-medium hover:text-primary-800"
          >
            ← Voltar para o login
          </Link>
        </div>

        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-xs text-yellow-800">
            🔔 Este é um recurso simulado. Em produção, um e-mail real seria enviado.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;

