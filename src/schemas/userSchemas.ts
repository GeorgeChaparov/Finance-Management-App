import { z } from "zod";

export const userSchema = z.object({ 
    email: z.string().nonempty("Email can't be empty!").email("Invalid email!").max(50).trim().toLowerCase(), 
    password: z
        .string()
        .min(8, "Password must be at least 8 characters long")
        .max(32, "Password must be at most 32 characters long")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/\d/, "Password must contain at least one digit")
        .regex(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, "Password must contain at least one special character")
});

export type UserInput = z.infer<typeof userSchema>;
