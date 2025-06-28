type PreferencesJson = {
    theme: "light" | "dark";
};

export interface User {
    username: string,
    email: string,
    password: string,
    preferences: PreferencesJson,
    bankAmount: number,
    cashAmount: number
}

export interface UserRequest {
    id?: string
    email?: string,
}

// Database specific interfaces
export interface DBUser extends User{
    id: string;
}

