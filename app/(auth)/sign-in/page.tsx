'use client'
import FooterLink from '@/components/forms/footer-link'
import InputField from '@/components/forms/input-field'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'

const SignIn = () => {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<SignUpFormData>({
		defaultValues: {
			email: '',
			password: '',
		},
		mode: 'onBlur',
	})

	const onSubmit = async (data: SignUpFormData) => {
		try {
			console.log(data)
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<>
			<h1 className='form-title'>Welcome back</h1>

			<form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
				<InputField
					name='email'
					label='Email'
					placeholder='example@gmail.com'
					error={errors.email}
					register={register}
					validation={{
						required: 'Email is required',
						pattern: /^\w+@\w+\.\w+$/,
						message: 'Email address is required',
					}}
				/>

				<InputField
					name='password'
					label='Password'
					placeholder='Enter a strong password'
					type='password'
					register={register}
					error={errors.password}
					validation={{ required: 'Password is required', minLength: 8 }}
				/>

				<Button
					type='submit'
					disabled={isSubmitting}
					className='yellow-btn w-full mt-5'
				>
					{isSubmitting ? 'Signing In' : 'Sign In'}
				</Button>

				<FooterLink
					text="Don't  have an account?"
					linkText='Create an account'
					href='/sign-up'
				/>
			</form>
		</>
	)
}

export default SignIn
