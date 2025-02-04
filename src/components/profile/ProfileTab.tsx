'use client';
import { useForm } from 'react-hook-form'
import { CustomerData, UserData } from "@/lib/profile";
import { useEffect } from 'react';
import authClient from '@/services/authClient';


export const ProfileTab = ({ customerData, userData, onUpdateCustomer, onUpdateUser }: {
	customerData: CustomerData | null,
	userData: UserData | null,
	onUpdateCustomer: () => void,
	onUpdateUser: () => void
}) => {
	const customerForm = useForm({ defaultValues: customerData || {} });
	const userForm = useForm({ defaultValues: userData || {} });
	const passForm = useForm();

	useEffect(() => {
		if (customerData) customerForm.reset(customerData);
		if (userData) userForm.reset(userData);
	}, [customerData, userData]);

	const handleCustomerSubmit = async (data: any) => {
		try {
			await authClient.put('/customers/me/', data);
			onUpdateCustomer();
		} catch (error) {
			console.error('Update failed:', error);
		}
	};

	const handleUserSubmit = async (data: any) => {
		try {
			await authClient.put('/auth/users/me/', data);
			onUpdateUser();
		} catch (error) {
			console.error('Update failed:', error);
		}
	};

	const handlePasswordSubmit = async (data: any) => {
		try {
			await authClient.post('/auth/users/set_password/', data);
			passForm.reset();
		} catch (error) {
			console.error('Password change failed:', error);
		}
	};

	return (
		<div className="row g-4">
			<div className="col-md-6">
				<form onSubmit={customerForm.handleSubmit(handleCustomerSubmit)}>
					<h5 className="mb-3">Personal Information</h5>
					<div className="mb-3">
						<input {...customerForm.register('first_name')} placeholder="First Name" className="form-control" />
					</div>
					<div className="mb-3">
						<input {...customerForm.register('last_name')} placeholder="Last Name" className="form-control" />
					</div>
					<div className="mb-3">
						<input
							type="date"
							{...customerForm.register('birth_date')}
							className="form-control"
						/>
					</div>
					<button type="submit" className="btn btn-primary">Save Changes</button>
				</form>
			</div>

			<div className="col-md-6">
				<form onSubmit={userForm.handleSubmit(handleUserSubmit)} className="mb-4">
					<h5 className="mb-3">Account Information</h5>
					<div className="mb-3">
						<input
							type="email"
							{...userForm.register('email')}
							placeholder="Email"
							className="form-control"
						/>
					</div>
					<button type="submit" className="btn btn-secondary">Update Email</button>
				</form>

				<form onSubmit={passForm.handleSubmit(handlePasswordSubmit)}>
					<h5 className="mb-3">Change Password</h5>
					<div className="mb-3">
						<input
							type="password"
							{...passForm.register('current_password')}
							placeholder="Current Password"
							className="form-control"
						/>
					</div>
					<div className="mb-3">
						<input
							type="password"
							{...passForm.register('new_password')}
							placeholder="New Password"
							className="form-control"
						/>
					</div>
					<button type="submit" className="btn btn-success">Change Password</button>
				</form>
			</div>
		</div>
	);
};
