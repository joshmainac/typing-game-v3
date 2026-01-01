export interface Profile {
    id: string;            // UUID from auth.users.id
    created_at: string;    // ISO timestamp string
    profile_name: string | null;
}
