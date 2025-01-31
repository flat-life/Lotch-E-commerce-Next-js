export const addToCart = async (productId: number) => {
	const cartId = localStorage.getItem('cartId');

	try {
		if (!cartId) {
			const cartResponse = await authClient.post('/cart/');
			localStorage.setItem('cartId', cartResponse.data.id);
			await addToCart(productId);
		} else {
			await authClient.post(`/cart/${cartId}/items/`, {
				product_id: productId,
				quantity: 1,
			});
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

