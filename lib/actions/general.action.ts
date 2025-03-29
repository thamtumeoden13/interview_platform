 "use server";

import { auth, db } from "@/firebase/admin";
import { cookies } from "next/headers";


export async function getInterviewByUserId(
  userId: string
): Promise<Interview[] | null> {
  if (!userId) return null;

  const interviews = await db
    .collection("interviews")
    .where("userId", "==", userId)
    .orderBy("createdAt", "desc")
    .get();

  return interviews.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Interview[];
}

export async function getLatestInterviewByUserId(
  params: GetLatestInterviewsParams
): Promise<Interview[] | null> {
  const { userId, limit =20} = params;

  if (!userId) return null;

  const interviews = await db
    .collection("interviews")
    .orderBy("createdAt", "desc")
    .where("finalized", "==", true)
    .where("userId", "!=", userId)
    .limit(limit)
    .get();

  return interviews.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Interview[];
}

export async function getInterviewById(
  id: string
): Promise<Interview | null> {

  const interview = await db
    .collection("interviews")
    .doc(id)
    .get();

  return interview.data() as Interview | null
}