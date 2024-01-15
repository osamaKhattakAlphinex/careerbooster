// app/checkout-sessions/route.ts
import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";
import Stripe from "stripe";

// data needed for checkout
export interface CheckoutSubscriptionBody {
  plan: string;
  limit: {
    resumes_generation: number;
    can_edit_resume: boolean;
    keywords_generation: number;
    headline_generation: number;
    about_generation: number;
    job_desc_generation: number;
    cover_letter_generation: number;
    email_generation: number;
    pdf_files_upload: number;
    review_resume: number;
    consulting_bids_generation: number;
  };
  amount: number;
  coupon?: string;
  interval: "month" | "year";
  // customerId?: string;
  customer: any;
}

//COUPON jIqH36bY
export async function POST(req: Request) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL;
  // const body = (await req.json()) as CheckoutSubscriptionBody;
  const body = await req.json()
  console.log(body);

  const origin = req.headers.get("origin") || appUrl;

  // if coupon is provided add it otherwise leave it empty
  let discounts: any = [];
  if (body?.coupon !== "") {
    discounts = [
      {
        coupon: body.coupon,
      },
    ];
  }

  // if user is logged in, redirect to thank you page, otherwise redirect to signup page.
  const success_url = !body.customer
    ? `${origin}/subscribed?session_id={CHECKOUT_SESSION_ID}`
    : `${origin}/subscribed?session_id={CHECKOUT_SESSION_ID}`;

  try {
    const customer = await stripe.customers.create({
      metadata: body.customer.metadata,
    });
    console.log("customer created", customer);

    const session = await stripe.checkout.sessions.create({
      // if user is logged in, stripe will set the email in the checkout page
      customer: customer.id,
      // mode: "subscription", // mode should be subscription
      mode: "payment",
      line_items: [
        // generate inline price and product
        {
          price_data: {
            currency: "usd",
            // recurring: {
            //   interval: body.interval,
            // },
            unit_amount: body.amount,
            product_data: {
              name: body.plan,
              description: `CareerBooster.AI ${body.plan} Plan `,
            },
          },
          quantity: 1,
        },
      ],
      success_url: success_url,
      discounts: discounts,
      cancel_url: `${origin}/subscribe?session_id={CHECKOUT_SESSION_ID}`,
    });
    return NextResponse.json(session);
  } catch (error) {
    if (error instanceof Stripe.errors.StripeError) {
      const { message } = error;
      return NextResponse.json({ message }, { status: error.statusCode });
    }
  }
}
