'use client'
import InputField from '@/components/forms/input-field'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

const SignUp = () => {
	const router = useRouter()
	const {
		register,
		handleSubmit,
		control,
		formState: { errors, isSubmitting },
	} = useForm<SignUpFormData>({
		defaultValues: {
			fullName: '',
			email: '',
			password: '',
			country: 'US',
			investmentGoals: 'Growth',
			riskTolerance: 'Medium',
			preferredIndustry: 'Technology',
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
			<h1 className='form-title'>Sign Up & Personalize</h1>

			<form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
				<InputField
					name='fullName'
					label='Full Name'
					placeholder='John Doe'
					register={register}
					error={errors.fullName}
					validation={{ required: 'Full name is required', minLength: 2 }}
				/>

				<InputField
					name='email'
					label='Email'
					placeholder='example@gmail.com'
					register={register}
					error={errors.email}
					validation={{ required: 'Email is required', minLength: 10 }}
				/>

				<Button
					type='submit'
					disabled={isSubmitting}
					className='yellow-btn w-full mt-5'
				>
					{isSubmitting ? 'Creating Account' : 'Start Your Investing Journey'}
				</Button>
			</form>
		</>
	)
}

export default SignUp
