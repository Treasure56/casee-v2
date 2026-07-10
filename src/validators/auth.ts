import { z } from "zod";

export const RegisterSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters long").max(50),
    email: z.email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z.string().min(6, "Password confirmation is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterInput = z.infer<typeof RegisterSchema>;

export const LoginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export type LoginInput = z.infer<typeof LoginSchema>;

// ─── Forgot Password Schemas

export const ForgotPasswordSchema = z.object({
  email: z.email("Invalid email address"),
});

export type ForgotPasswordInput = z.infer<typeof ForgotPasswordSchema>;

export const VerifyOtpSchema = z.object({
  email: z.email("Invalid email address"),
  otp: z
    .string()
    .length(6, "Verification code must be 6 digits")
    .regex(/^\d+$/, "Verification code must contain only numbers"),
});

export type VerifyOtpInput = z.infer<typeof VerifyOtpSchema>;

export const ResetPasswordSchema = z
  .object({
    email: z.email("Invalid email address"),
    otp: z
      .string()
      .length(6, "Verification code must be 6 digits")
      .regex(/^\d+$/, "Verification code must contain only numbers"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z.string().min(6, "Password confirmation is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type ResetPasswordInput = z.infer<typeof ResetPasswordSchema>;
