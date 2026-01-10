export type EarlyAccessPayload = {
  email: string;
  source?: string;
};

/**
 * Mock email capture integration.
 * Later you can plug this into:
 * - Supabase / Postgres
 * - Mailchimp / ConvertKit
 * - Firebase
 */
export async function saveEarlyAccessLead(
  payload: EarlyAccessPayload
): Promise<void> {
  console.log("Early access lead:", payload);
}