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

export interface CreateUserRequest {
    username: string,
    email: string,
    password: string,
}

// Database specific interfaces
export interface DBUser extends User{
    id: number;
}

