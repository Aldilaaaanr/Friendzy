import { getApiUrl } from "@/config/api";

// Types
export interface Story {
    id: number;
    name: string;
    profileImage: string;
    isMyStory: boolean;
}

export interface Post {
    id: number;
    image: string;
    category: string;
    title: string;
    user: {
        name: string;
        location: string;
        avatar: string;
    };
}

export interface NewUser {
    id: number;
    name: string;
    age: number;
    location: string;
    distance: number;
    image: string;
    isNew: boolean;
    isOnline: boolean;
}

export interface NearbyUser {
    id: number;
    name: string;
    lat: number;
    lng: number;
    avatar: string;
    interests: string[];
}

export interface Match {
    id: string;
    name: string;
    age: number;
    location: string;
    distance: string;
    matchPercentage: number;
    isOnline: boolean;
    image: string;
}

export interface MatchDetail extends Match {
    about: string;
    interests: string[];
}

export interface MatchStats {
    likes: number;
    connects: number;
}

export interface RecentMatch {
    id: string;
    type: "likes" | "user";
    count?: number;
    image: string;
}

export interface Message {
    id: string;
    name: string;
    message: string;
    time: string;
    avatar: string;
    unread: boolean;
}

export interface ApiResponse<T> {
    success: boolean;
    data: T;
    message?: string;
}

export interface Pagination {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

export interface PostsResponse {
    data: Post[];
    pagination: Pagination;
}

// Generic fetch function
async function fetchApi<T>(
    endpoint: string,
    options?: RequestInit
): Promise<T> {
    const url = getApiUrl(endpoint);

    try {
        const response = await fetch(url, {
            ...options,
            headers: {
                "Content-Type": "application/json",
                ...options?.headers,
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const jsonData = await response.json();
        console.log(
            `API Response [${endpoint}]:`,
            JSON.stringify(jsonData, null, 2)
        );

        // Handle jika response langsung adalah data (tanpa wrapper success)
        if (!jsonData.success && jsonData.data === undefined) {
            // Mungkin response langsung adalah data, bukan wrapped
            if (
                Array.isArray(jsonData) ||
                (typeof jsonData === "object" && jsonData !== null)
            ) {
                console.warn(
                    `API [${endpoint}]: Response tidak memiliki wrapper, menggunakan data langsung`
                );
                return jsonData as T;
            }
        }

        // Handle response dengan wrapper { success, data }
        if (jsonData.success !== undefined) {
            const data: ApiResponse<T> = jsonData;

            if (!data.success) {
                throw new Error(data.message || "API request failed");
            }

            // Pastikan data.data tidak undefined
            if (data.data === undefined || data.data === null) {
                console.error(
                    `API [${endpoint}]: data.data is undefined/null`,
                    data
                );
                throw new Error("API response data is undefined or null");
            }

            console.log(`API [${endpoint}]: Returning data:`, data.data);
            return data.data;
        }

        // Fallback: return langsung jika tidak ada wrapper
        console.warn(
            `API [${endpoint}]: No success field, returning data directly`
        );
        return jsonData as T;
    } catch (error) {
        console.error(`API Error [${endpoint}]:`, error);
        throw error;
    }
}

// API Functions
export const api = {
    // Get Stories
    getStories: async (): Promise<Story[]> => {
        return fetchApi<Story[]>("api/stories");
    },

    // Get Posts
    getPosts: async (
        page: number = 1,
        limit: number = 10
    ): Promise<PostsResponse> => {
        const params = new URLSearchParams({
            page: page.toString(),
            limit: limit.toString(),
        });
        return fetchApi<PostsResponse>(`api/posts?${params.toString()}`);
    },

    // Get New Users
    getNewUsers: async (limit: number = 10): Promise<NewUser[]> => {
        const params = new URLSearchParams({
            limit: limit.toString(),
        });
        return fetchApi<NewUser[]>(`api/users/new?${params.toString()}`);
    },

    // Get Nearby Users
    getNearbyUsers: async (
        lat: number,
        lng: number,
        radius: number = 5,
        interests?: string[]
    ): Promise<NearbyUser[]> => {
        const params = new URLSearchParams({
            lat: lat.toString(),
            lng: lng.toString(),
            radius: radius.toString(),
        });

        if (interests && interests.length > 0) {
            params.append("interests", interests.join(","));
        }

        return fetchApi<NearbyUser[]>(`api/users/nearby?${params.toString()}`);
    },

    // Get Matches
    getMatches: async (): Promise<{
        data: Match[];
        stats: MatchStats;
    }> => {
        return fetchApi<{
            data: Match[];
            stats: MatchStats;
        }>("api/matches");
    },

    // Get Match Detail
    getMatchDetail: async (id: string): Promise<MatchDetail> => {
        return fetchApi<MatchDetail>(`api/matches/${id}`);
    },

    // Get Messages
    getMessages: async (): Promise<{
        recentMatches: RecentMatch[];
        messages: Message[];
    }> => {
        return fetchApi<{
            recentMatches: RecentMatch[];
            messages: Message[];
        }>("api/messages");
    },

    // Get Interests
    getInterests: async (): Promise<string[]> => {
        return fetchApi<string[]>("api/interests");
    },
};
