import { PLAN_CATALOG, PRO_BENEFITS, razorpayConfigured } from "@/lib/billing/config";
import { getUserPlan } from "@/lib/billing/entitlements";
import { getSession } from "@/lib/auth/session";
import { PricingView } from "@/components/billing/pricing-view";

export const metadata = {
  title: "Pricing",
  description: "AZIO — Simple pricing. Powerful life management.",
};

export const dynamic = "force-dynamic";

export default async function PricingPage() {
  const session = await getSession();
  const signedIn = Boolean(session?.user);
  const billingReady = razorpayConfigured();
  const currentPlan = session?.user?.id ? await getUserPlan(session.user.id) : null;

  return (
    <PricingView
      signedIn={signedIn}
      billingReady={billingReady}
      currentPlan={currentPlan}
      plans={[PLAN_CATALOG.FREE, PLAN_CATALOG.PRO]}
      benefits={[...PRO_BENEFITS]}
    />
  );
}
