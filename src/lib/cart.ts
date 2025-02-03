import authClient from "@/services/authClient";
import { getCSRFToken } from "./base";
import apiClient from "@/services/apiClient";

export interface ProductTranslation {
	title: string;
	slug: string;
	description: string;
}

export interface Product {
	id: number;
	translations: {
		[key: string]: ProductTranslation;
	};
	org_price: number;
	price: number;
	title: string;
	description: string;
}

export interface CartItem {
	id: number;
	product: Product;
	quantity: number;
	total_price: number;
}

export interface Cart {
	id: string;
	items: CartItem[];
	total_price: number;
	org_price: number;
}

export const addToCart = async (productId: number, quantity = 1) => {
	const token = localStorage.getItem('JWT')
	const cartId = localStorage.getItem('cartId');
	const csrfToken = getCSRFToken();
	let Client = apiClient
	if (token) {
		console.log('token found')
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


export const getOrCreateCart = async (): Promise<Cart> => {
	const token = localStorage.getItem('JWT');
	const cartId = localStorage.getItem('cartId');
	const Client = token ? authClient : apiClient;

	if (cartId) {
		try {
			const response = await Client.get<Cart>(`/cart/${cartId}/`);
			return response.data;
		} catch (error) {
			console.error('Error fetching cart:', error);
			localStorage.removeItem('cartId');
		}
	}

	const response = await Client.post<Cart>('/cart/');
	localStorage.setItem('cartId', response.data.id);
	return response.data;
};

export const updateCartItem = async (itemId: number, quantity: number): Promise<Cart> => {
	const cartId = localStorage.getItem('cartId');
	if (!cartId) throw new Error('No cart found');

	const Client = localStorage.getItem('JWT') ? authClient : apiClient;
	const response = await Client.patch<Cart>(`/cart/${cartId}/items/${itemId}/`, { quantity });
	return response.data;
};

export const deleteCartItem = async (itemId: number): Promise<Cart> => {
	const cartId = localStorage.getItem('cartId');
	if (!cartId) throw new Error('No cart found');

	const Client = localStorage.getItem('JWT') ? authClient : apiClient;
	const response = await Client.delete<Cart>(`/cart/${cartId}/items/${itemId}/`);
	return response.data;
};

export const applyDiscount = async (code: string): Promise<Cart> => {
	const cartId = localStorage.getItem('cartId');
	if (!cartId) throw new Error('No cart found');

	const Client = localStorage.getItem('JWT') ? authClient : apiClient;
	const response = await Client.post<Cart>(`/cart/${cartId}/apply_discount/`, { discount_code: code });
	return response.data;
};

export const createOrder = async (): Promise<{ id: number; total_price: number }> => {
	const cartId = localStorage.getItem('cartId');
	if (!cartId) throw new Error('No cart found');

	const response = await authClient.post<{ id: number; total_price: number }>('/orders/', { cart_id: cartId });
	return response.data;
};
