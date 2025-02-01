export interface Author {
	id: number;
	first_name: string;
	last_name: string;
	user_id: number;
	birth_date: string | null;
	membership: string;
}

export interface Blog {
	id: number;
	title: string;
	body: string;
	thumbnail: string;
	views: number;
	author: Author;
	updated_at: string;
	comments_count: number;
}

export interface BlogListResponse {
	count: number;
	next: string | null;
	previous: string | null;
	results: Blog[];
}
