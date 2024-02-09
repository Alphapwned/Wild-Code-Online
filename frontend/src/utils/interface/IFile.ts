export interface Fileinterface {
    getFile: {
        id: number;
        filename: string;
        content: string;
        createdAt: string;
        isPublic: boolean;
        language: {
            name: string;
            id: number
        };
        interactions: Array<{
            type: string;
            user: {
                username: string;
            };
        }>;
        user: {
            username: string;
        }
    };
};