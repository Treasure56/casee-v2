import { Resend } from "resend";

const RESEND_API_KEY = process.env.RESEND_API_KEY;

if (!RESEND_API_KEY) {
  throw new Error(
    "Please define the RESEND_API_KEY environment variable inside .env",
  );
}

const resend = new Resend(RESEND_API_KEY);

/**
 * Sends a password reset OTP email to the specified address.
 */
export async function sendPasswordResetEmail(
  email: string,
  otp: string,
): Promise<void> {
  console.log(`[Email Service] Attempting to send OTP to ${email}...`);
  try {
    const data = await resend.emails.send({
      from: "Casee <onboarding@resend.dev>",
      to: email,
      subject: "Your Password Reset Code — Casee",
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 40px 24px;">
          <h2 style="color: #111; font-size: 22px; font-weight: 600; margin: 0 0 8px;">
            Password Reset
          </h2>
          <p style="color: #555; font-size: 15px; line-height: 1.6; margin: 0 0 28px;">
            You requested a password reset for your Casee account. Use the verification code below to continue.
          </p>

          <div style="background: #f4f4f5; border-radius: 12px; padding: 24px; text-align: center; margin: 0 0 28px;">
            <span style="font-size: 36px; font-weight: 700; letter-spacing: 8px; color: #111; font-family: 'Courier New', monospace;">
              ${otp}
            </span>
          </div>

          <p style="color: #888; font-size: 13px; line-height: 1.5; margin: 0 0 4px;">
            This code expires in <strong>10 minutes</strong>.
          </p>
          <p style="color: #888; font-size: 13px; line-height: 1.5; margin: 0;">
            If you didn't request this, you can safely ignore this email.
          </p>
        </div>
      `,
    });

    if (data.error) {
      throw new Error(data.error.message);
    }

    console.log(`[Email Service] OTP email successfully sent to ${email}`);
  } catch (err: any) {
    console.error(
      `[Email Service] Failed to send email to ${email} via Resend. Error:`,
      err.message || err,
    );
    console.log(
      `\n==================================================\n[DEVELOPMENT OTP BYPASS] Email: ${email} | OTP: ${otp}\n==================================================\n`,
    );
    
    // In production, we throw the error so the client knows it failed.
    // In development, we do not throw so the developer can continue testing locally.
    if (process.env.NODE_ENV === "production") {
      throw err;
    }
  }
}
