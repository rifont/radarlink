import { MetadataRoute } from "next";
import prisma from "@/lib/prisma";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const accounts = await prisma.account.findMany({
    select: {
      id: true,
    },
    take: 1,
  });

  return [
    {
      url: "https://radarlink.tech",
      lastModified: new Date(),
    },
    ...accounts.map((account) => ({
      url: `https://radarlink.tech/${account.id}`,
      lastModified: new Date(),
    })),
  ];
}
