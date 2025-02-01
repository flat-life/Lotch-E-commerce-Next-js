
export function getCSRFToken(): string {
	const cookieValue = document.cookie
		.split('; ')
		.find(row => row.startsWith('csrftoken='))
		?.split('=')[1];

	console.log(document.cookie)
	console.log(cookieValue)
	if (!cookieValue) {
		throw new Error('CSRF token not found');
	}

	return cookieValue;
}
