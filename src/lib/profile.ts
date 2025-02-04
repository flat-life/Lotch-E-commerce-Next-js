
export type Address = {
	id: number;
	zip_code: string;
	province: string;
	city: string;
	path: string;
	default: boolean;
};

export type Order = {
	id: number;
	updated_at: string;
	order_status: string;
	total_price: number;
};

export type CustomerData = {
	id: number;
	first_name: string;
	last_name: string;
	birth_date: string;
	membership: string;
	user_id: number;
};

export type UserData = {
	id: number;
	email: string;
	phone_number: string;
};

