import { type NextRequest, NextResponse } from "next/server";
import { source } from "@/lib/source";
import { notFound } from "next/navigation";
import { getLLMText } from "@/lib/llm.text";

export const revalidate = false;

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug?: string[] }> },
) {
  const { slug } = await params;
  const page = source.getPage(slug);
  if (!page) notFound();

  return new NextResponse(await getLLMText(page));
}

export function generateStaticParams() {
  return source.generateParams();
}
