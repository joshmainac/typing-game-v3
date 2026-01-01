export interface UserHistory {
    id: string;            // uuid (auth.users.id)
    created_at: string;    // ISO timestamp
    wpm: number;           // numeric → number
    accuracy: number;      // numeric → number
    duration: number;      // int4
    mode: string;          // text
}
