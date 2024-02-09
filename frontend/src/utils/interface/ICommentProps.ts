export interface ICommentsProps {
	id: number;
	comment: string;
	updatedAt: string;
	createdAt: string;
	user: {
		username: string;
		id: Number;
	};
}
