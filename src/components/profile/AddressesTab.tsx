'use client'

import { Address } from "@/lib/profile";
import authClient from "@/services/authClient";
import { useState } from "react";
import { useForm } from "react-hook-form";

export const AddressesTab = ({ addresses, onUpdate }: { addresses: Address[], onUpdate: () => void }) => {
	const { register, handleSubmit, reset, setValue } = useForm<Address>();
	const [editingId, setEditingId] = useState<number | null>(null);

	const onSubmit = async (data: Address) => {
		try {
			if (editingId) {
				await authClient.put(`/addresses/${editingId}/`, data);
			} else {
				await authClient.post('/addresses/', data);
			}
			onUpdate();
			reset();
			setEditingId(null);
		} catch (error) {
			console.error('Address operation failed:', error);
		}
	};

	const handleEdit = (address: Address) => {
		setEditingId(address.id);
		Object.entries(address).forEach(([key, value]) => {
			setValue(key as keyof Address, value);
		});
	};

	const handleDelete = async (id: number) => {
		try {
			await authClient.delete(`/addresses/${id}/`);
			onUpdate();
		} catch (error) {
			console.error('Delete failed:', error);
		}
	};

	return (
		<div>
			<table className="table table-hover">
				<thead>
					<tr>
						<th>Zip Code</th>
						<th>Province</th>
						<th>City</th>
						<th>Path</th>
						<th>Default</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{addresses.map(address => (
						<tr key={address.id}>
							<td>{address.zip_code}</td>
							<td>{address.province}</td>
							<td>{address.city}</td>
							<td>{address.path}</td>
							<td>{address.default ? 'Yes' : 'No'}</td>
							<td>
								<button className="btn btn-sm btn-primary me-2" onClick={() => handleEdit(address)}>
									Edit
								</button>
								<button className="btn btn-sm btn-danger" onClick={() => handleDelete(address.id)}>
									Delete
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>

			<form onSubmit={handleSubmit(onSubmit)} className="mt-4">
				<div className="row g-3">
					<div className="col-md-6">
						<input {...register('zip_code')} placeholder="Zip Code" className="form-control" />
					</div>
					<div className="col-md-6">
						<input {...register('province')} placeholder="Province" className="form-control" />
					</div>
					<div className="col-md-6">
						<input {...register('city')} placeholder="City" className="form-control" />
					</div>
					<div className="col-md-6">
						<input {...register('path')} placeholder="Path" className="form-control" />
					</div>
					<div className="col-md-6">
						<label className="form-check-label">
							<input type="checkbox" {...register('default')} className="form-check-input" />
							Default Address
						</label>
					</div>
					<div className="col-12">
						<button type="submit" className="btn btn-dark">
							{editingId ? 'Update Address' : 'Add Address'}
						</button>
					</div>
				</div>
			</form>
		</div>
	);
};

