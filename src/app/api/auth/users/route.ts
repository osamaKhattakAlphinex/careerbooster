import { NextResponse } from "next/server";
import startDB from "@/lib/db";
import User from "@/db/schemas/User";
import { Education, WorkExperience } from "@/store/userDataSlice";

interface NewUserRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  contact?: {
    country?: string;
    street?: string;
    cityState?: string;
    postalCode?: string;
  };
  education?: Education[];
  experience?: WorkExperience[];
  skills?: string[];
  userPackage?: string;
  resumes_generation: Number;
  keywords_generation: Number;
  headline_generation: Number;
  about_generation: Number;
  job_desc_generation: Number;
  cover_letter_generation: Number;
  pdf_files_upload: Number;
  review_resume: Number;
  consulting_bids_generation: Number;
}
interface NewUserResponse {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  userPackage?: string;
  // phone?: string;
  // contact?: {
  //   country?: string;
  //   street?: string;
  //   cityState?: string;
  //   postalCode?: string;
  // };
  // education?: Education[];
  // experience?: WorkExperience[];
  // skills?: string[];
}

type NewResponse = NextResponse<{ user?: NewUserResponse; error?: string }>;

export const POST = async (req: Request): Promise<NewResponse> => {
  const body = (await req.json()) as NewUserRequest;
  await startDB();

  const oldUser = await User.findOne({ email: body.email });
  if (oldUser) {
    return NextResponse.json(
      {
        error: "An account with the same email already exist! ",
      },
      { status: 500 }
    );
  }

  const user = await User.create({ ...body });

  return NextResponse.json({
    user: {
      id: user._id.toString(),
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
    },
  });
};
