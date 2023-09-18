import Link from "next/link";
import { RadarLink } from "@/components/shared/icons";

export default function Footer() {
  return (
    <div className="border-border bg-background absolute flex w-full items-center justify-between border-t py-5 text-center">
      <p className="text-primary/50 mx-5 w-48 text-left">
        © {new Date().getFullYear()} RadarLink
      </p>
      <Link href="/" className="font-display mx-auto flex items-center text-2xl">
        <RadarLink className="mr-2 h-8 w-8" width={30} height={30} />
        <p>RadarLink</p>
      </Link>
      <p className="text-primary/50 mx-5 w-48" />
    </div>
  );
}
