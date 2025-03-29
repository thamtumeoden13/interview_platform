import Agent from "@/components/Agent";
import DisplayTechIcons from "@/components/DisplayTechIcons";
import { getCurrentUser } from "@/lib/actions/auth.action";
import { getInterviewById } from "@/lib/actions/general.action";
import { getRandomInterviewCover } from "@/lib/utils";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";

const Page = async ({ params }: RouteParams) => {
  const { id } = await params;
  const user = await getCurrentUser();

  const interview = await getInterviewById(id);

  if (!interview) redirect("/");

  return (
    <>
      <div className="flex flex-row justify-between gap-4">
        <div className="flex flex-row items-center gap-4 max-sm:flex-col">
          <div className="flex flex-row items-center gap-4">
            <Image
              src={getRandomInterviewCover()}
              alt="cover-image"
              width={40}
              height={40}
              className="rounded-full object-cover size-[40px]"
            />

            <h3 className="capitalize ">{interview.role}</h3>
          </div>

          <DisplayTechIcons techStack={interview.techstack} />
        </div>

        <p className="px-4 py-2 capitalize rounded-lg bg-dark-200 h-fit">
          {interview.type}
        </p>
      </div>

      <Agent
        userName={user!.name!}
        userId={user?.id}
        interviewId={id}
        type="interview"
        questions={interview.questions}
      />
    </>
  );
};

export default Page;
