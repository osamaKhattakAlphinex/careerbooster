import UpdateUserPackage from "@/components/dashboard/checkout/UpdateUserPackage";
import { stripe } from "@/lib/stripe";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import Stripe from "stripe";

type Props = {
  params: any;
  searchParams: {
    [key: string]: string | string[] | undefined;
    session_id?: string;
  };
};

async function getCustomerbySession(sessionId?: string) {
  if (!sessionId) return null;
  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["line_items"],
  });
  if (!session.customer) return null;

  const customer = await stripe.customers.retrieve(session.customer as string);
  return customer as Stripe.Customer;
}

export default async function SubscribedPage(props: Props) {
  const searchParams = props.searchParams;
  const sessionId = searchParams.session_id;
  const customer = await getCustomerbySession(sessionId);

  if (!customer || !customer.email) {
    redirect("/dashboard");
  } else {
    return (
      <main className="flex-grow-1 mb-20">
        <section className="py-10 py-lg-15">
          <div className="container">
            <div className="row justify-center mb-8">
              <div className="col-lg-10">
                <div className="text-center">
                  <h1
                    className="text-white text-4xl"
                    data-aos="fade-up-sm"
                    data-aos-delay="100"
                  >
                    Thanks for your Subscription {customer.name}
                    <UpdateUserPackage customer={customer} />
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }
}
