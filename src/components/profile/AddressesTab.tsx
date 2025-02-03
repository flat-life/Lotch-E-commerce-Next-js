'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

type Address = {
	id: string;
	zip_code: string;
	province: string;
	city: string;
	path: string;
	default: boolean;
};

export default function AddressesTab() {
	const [addresses, setAddresses] = useState<Address[]>([]);
	const [editAddress, setEditAddress] = useState<Address | null>(null);
	const { register, handleSubmit, reset } = useForm();

	useEffect(() => {
		fetchAddresses();
	}, []);

	const fetchAddresses = async () => {
		try {
			const res = await fetch('/api-v1/addresses/', {
				headers: { Authorization: `JWT ${localStorage.getItem('JWT')}` },
			});
			const data = await res.json();
			setAddresses(data);
		} catch (error) {
			console.error('Failed to fetch addresses:', error);
		}
	};

	const onSubmit = async (data: any) => {
		const url = editAddress ? `/api-v1/addresses/${editAddress.id}/` : '/api-v1/addresses/';
		const method = editAddress ? 'PUT' : 'POST';

		try {
			const res = await fetch(url, {
				method,
				headers: {
					'Content-Type': 'application/json',
					Authorization: `JWT ${localStorage.getItem('JWT')}`,
				},
				body: JSON.stringify(data),
			});

			if (res.ok) {
				fetchAddresses();
				reset();
				setEditAddress(null);
			}
		} catch (error) {
			console.error('Address operation failed:', error);
		}
	};

	const deleteAddress = async (id: string) => {
		try {
			await fetch(`/api-v1/addresses/${id}/`, {
				method: 'DELETE',
				headers: { Authorization: `JWT ${localStorage.getItem('JWT')}` },
			});
			fetchAddresses();
		} catch (error) {
			console.error('Delete failed:', error);
		}
	};

	return (
		<div className="tab-content p-3">
			<table className="table table-hover">
				{/* Table implementation */}
			</table>

			<form onSubmit={handleSubmit(onSubmit)}>
				<input type="hidden" {...register('id')} />
				{/* Form fields implementation */}
				<button type="submit" className="btn btn-dark">
					{editAddress ? 'Update' : 'Save'}
				</button>
			</form>
		</div>
	);
}
