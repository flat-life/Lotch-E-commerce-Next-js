import authClient from "@/services/authClient";
import { getCSRFToken } from "./base";
import apiClient from "@/services/apiClient";

export const addToCart = async (productId: number, quantity = 1) => {
	const token = localStorage.getItem('JWT')
	const cartId = localStorage.getItem('cartId');
	const csrfToken = getCSRFToken();
	let Client = apiClient
	if (token) {
		Client = authClient
	}
	try {
		if (!cartId) {

			const cartResponse = await Client.post('/cart/');
			localStorage.setItem('cartId', cartResponse.data.id);
			await addToCart(productId, quantity);
		} else {
			await Client.post(`/cart/${cartId}/items/`, {
				product_id: productId,
				quantity
			}, {
				headers: {
					'X-CSRFToken': csrfToken,
					'Content-Type': 'application/json',
					'Origin': 'http://localhost:3000'
				}
			})
			alert('Item added to cart successfully');
		}
	} catch (error) {
		console.error('Error adding item to cart:', error);
		if (error.response?.status === 401) {
			localStorage.removeItem('JWT');
			alert('Session expired. Please log in again.');
		} else {
			alert('Failed to add item to cart');
		}
	}
};

