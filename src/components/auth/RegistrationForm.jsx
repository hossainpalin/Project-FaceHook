import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Field from '../common/Field';

export default function RegistrationForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const submitForm = async (formData) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/auth/register`,
        formData,
      );
      if (response.status === 201) {
        navigate('/login');
      }
    } catch (error) {
      setError('root.random', {
        type: 'random',
        message: `Something went wrong: ${error?.message}`,
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(submitForm)}
      className="border-b border-[#3F3F3F] pb-10 lg:pb-[30px]">
      <Field label="First Name" error={errors.firstName}>
        <input
          {...register('firstName', { required: 'First Name is Required' })}
          className={`auth-input ${errors.firstName ? 'border-red-600' : ''}`}
          type="text"
          name="firstName"
          id="firstName"
        />
      </Field>

      <Field label="Last Name" error={errors.lastName}>
        <input
          {...register('lastName')}
          className="auth-input"
          type="text"
          name="lastName"
          id="lastName"
        />
      </Field>

      <Field label="Email" error={errors.email}>
        <input
          {...register('email', { required: 'Email is Required' })}
          className={`auth-input ${errors.email ? 'border-red-600' : ''}`}
          type="email"
          name="email"
          id="email"
        />
      </Field>

      <Field label="Password" error={errors.password}>
        <input
          {...register('password', {
            required: 'Password is Required',
            minLength: {
              value: 8,
              message: 'Password must be 8 characters',
            },
          })}
          className={`auth-input ${errors.password ? 'border-red-600' : ''}`}
          type="password"
          name="password"
          id="password"
        />
      </Field>
      <p>{errors?.root?.random?.message}</p>
      <button
        className="auth-input bg-lwsGreen font-bold text-deepDark transition-all hover:opacity-90"
        type="submit">
        Register
      </button>
    </form>
  );
}
