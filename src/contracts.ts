export type ClientOptions = {
	senderName?: string;
	baseUrl?: string;
};

export type MessageResponse = {
	message_id: number;
	user_id: number;
	user: string;
	account_id: number;
	account: string;
	recipient: string;
	message: string;
	sender_name: string;
	network: string;
	status: 'Queued' | 'Pending' | 'Sent' | 'Failed' | 'Refunded';
	type: string;
	source: string;
	created_at: string;
	updated_at: string;
};

export type Account = {
	account_id: number;
	account_name: string;
	status: string;
	credit_balance: number;
};

export type SenderName = {
	name: string;
	status: string;
	created_at: string;
};

export type FetchMessagesOptions = {
	limit?: number;
	page?: number;
	startDate?: string;
	endDate?: string;
	status?: string;
	network?: string;
	sendername?: string;
};

export type User = {
	user_id: number;
	email: string;
	role: string;
	status?: string;
};
