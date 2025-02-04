import { Order } from "@/lib/profile";
import { useRouter } from "next/navigation";

export const OrdersTab = ({ orders }: { orders: Order[] }) => {
	const router = useRouter();

	const getStatusLabel = (status: string) => {
		switch (status) {
			case 'N': return 'Not Paid';
			case 'P': return 'Pending';
			case 'S': return 'Shipping';
			case 'D': return 'Delivered';
			case 'F': return 'Failed';
			default: return '';
		}
	};

	return (
		<div className="table-responsive">
			<table className="table table-hover">
				<thead>
					<tr>
						<th>Date</th>
						<th>Status</th>
						<th>Total</th>
					</tr>
				</thead>
				<tbody>
					{orders.map(order => (
						<tr key={order.id} onClick={() => router.push(`/order-detail/${order.id}`)} style={{ cursor: 'pointer' }}>
							<td>{new Date(order.updated_at).toLocaleDateString()}</td>
							<td>{getStatusLabel(order.order_status)}</td>
							<td>${order.total_price}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};


