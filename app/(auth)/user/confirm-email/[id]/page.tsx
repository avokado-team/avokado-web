import EmailConfirmDone from "@/components/email-confirm-done";
import EmailConfirmError from "@/components/email-confirm-error";

async function verifyEmailToken(token: string) {
  const api = `${process.env.GATEWAY_ENDPOINT}/user/confirm-email/${token}`;
  console.log(api);
  try {
    const res = await fetch(api, {
      cache: "no-cache",
    });
    console.log(res);
    return res.ok;
  } catch (error) {
    console.log(error);
    return false;
  }
}
export default async function ConfrimEmail({
  params,
}: {
  params: { id: string };
}) {
  const token = params.id;
  const isVerified = await verifyEmailToken(token);

  return <>{isVerified ? <EmailConfirmDone /> : <EmailConfirmError />}</>;
}
