import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CompanyShowroomPage } from "@/components/landing/ExperiencePages";
import { companies } from "@/components/landing/experience-data";
import { companySlug } from "@/components/landing/experience-utils";

export const dynamicParams = false;

export function generateStaticParams() {
  return companies.map((company) => ({ slug: companySlug(company) }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const company = companies.find((entry) => companySlug(entry) === slug);
  return { title: company ? company.name + " | The Innovators" : "Company not found | The Innovators" };
}

export default async function CompanyProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const company = companies.find((entry) => companySlug(entry) === slug);
  if (!company) notFound();
  return <CompanyShowroomPage company={company} key={slug} />;
}
