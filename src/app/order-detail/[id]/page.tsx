'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import authClient from '@/services/authClient';
import Link from 'next/link';

interface OrderItem {
	product: {
		translations: {
			[key: string]: {
				title: string;
			};
		};
	};
	quantity: number;
	price: number;
}

interface OrderData {
	id: number;
	updated_at: string;
	total_price: number;
	order_status: string;
	first_name: string;
	last_name: string;
	phone_number: string;
	email: string;
	province: string;
	city: string;
	path: string;
	zip_code: string;
	orders: OrderItem[];
}

export default function OrderDetailPage() {
	const router = useRouter();
	const { id } = useParams();
	const [orderData, setOrderData] = useState<OrderData | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const verifyToken = async () => {
			const token = localStorage.getItem('JWT');
			if (!token) {
				router.push('/login');
				return;
			}

			try {
				await authClient.post('/auth/jwt/verify/', { token });
				fetchOrderData();
			} catch (err) {
				localStorage.removeItem('JWT');
				router.push('/login');
			}
		};

		const fetchOrderData = async () => {
			try {
				const response = await authClient.get(`/orders/${id}/`);
				setOrderData(response.data);
			} catch (err: any) {
				setError(err.message || 'Failed to fetch order details');
			} finally {
				setLoading(false);
			}
		};

		verifyToken();
	}, [id, router]);

	const getOrderStatusLabel = (status: string) => {
		switch (status) {
			case 'N': return 'Not Paid';
			case 'P': return 'Pending';
			case 'S': return 'Shipping';
			case 'D': return 'Delivered';
			case 'F': return 'Failed';
			default: return 'Unknown';
		}
	};

	if (loading) {
		return <div className="container text-center py-5">Loading...</div>;
	}

	if (error) {
		return <div className="container text-center py-5 text-danger">{error}</div>;
	}

	if (!orderData) {
		return <div className="container text-center py-5">Order not found</div>;
	}

	return (
		<section className="banner-area organic-breadcrumb">
			<div className="container">
				<div className="breadcrumb-banner d-flex flex-wrap align-items-center justify-content-end">
					<div className="col-first">
						<h1 className="text-danger">Order Detail</h1>
						<nav className="d-flex align-items-center">
							<Link className="text-danger" href="/">
								Home<span className="lnr lnr-arrow-right"></span>
							</Link>
							<span className="text-danger">Order Detail</span>
						</nav>
					</div>
				</div>
			</div>

			<section className="order_details section_gap">
				<div className="container">
					<h3 className="title_confirmation">Your order has been received.</h3>
					<div className="row order_d_inner">
						<div className="col-lg-4">
							<div className="details_item">
								<h4>Order Info</h4>
								<ul className="list">
									<li><span>Order number</span><h6>{orderData.id}</h6></li>
									<li><span>Date</span><h6>{new Date(orderData.updated_at).toLocaleDateString()}</h6></li>
									<li><span>Total</span><h6>${orderData.total_price.toFixed(2)}</h6></li>
									<li><span>Payment Status</span><h6>{getOrderStatusLabel(orderData.order_status)}</h6></li>
								</ul>
							</div>
						</div>

						<div className="col-lg-4">
							<div className="details_item">
								<h4>Customer Information</h4>
								<ul className="list">
									<li><span>First Name</span><h6>{orderData.first_name}</h6></li>
									<li><span>Last Name</span><h6>{orderData.last_name}</h6></li>
									<li><span>Phone Number</span><h6>{orderData.phone_number}</h6></li>
									<li><span>Email</span><h6>{orderData.email}</h6></li>
								</ul>
							</div>
						</div>

						<div className="col-lg-4">
							<div className="details_item">
								<h4>Shipping Address</h4>
								<ul className="list">
									<li><span>Province</span><h6>{orderData.province}</h6></li>
									<li><span>City</span><h6>{orderData.city}</h6></li>
									<li><span>Path</span><h6>{orderData.path}</h6></li>
									<li><span>Zip Code</span><h6>{orderData.zip_code}</h6></li>
								</ul>
							</div>
						</div>
					</div>

					<div className="order_details_table">
						<h2>Order Details</h2>
						<div className="table-responsive">
							<table className="table">
								<thead>
									<tr>
										<th scope="col">Product</th>
										<th scope="col">Quantity</th>
										<th scope="col">Total</th>
									</tr>
								</thead>
								<tbody>
									{orderData.orders.map((item, index) => (
										<tr key={index}>
											<td>
												<p>{item.product.translations.en?.title}</p>
											</td>
											<td>
												<h5>x {item.quantity}</h5>
											</td>
											<td>
												<p>${item.price.toFixed(2)}</p>
											</td>
										</tr>
									))}
									<tr>
										<td>
											<h4>Total</h4>
										</td>
										<td></td>
										<td>
											<p>${orderData.total_price.toFixed(2)}</p>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</section>
		</section>
	);
}
