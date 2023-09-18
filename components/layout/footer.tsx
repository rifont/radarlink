import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <div className="absolute w-full border-t border-border bg-background py-5 text-center flex items-center justify-between">
      <p className="text-primary/50 mx-5 w-48 text-left">
        © {new Date().getFullYear()} RadarLink
      </p>
      <Link href="/" className="flex items-center font-display text-2xl mx-auto">
        <Image
          src="/logo.svg"
          alt="Logo"
          className="h-8 w-8 mr-2"
          width={30}
          height={30}
        />
        <p>RadarLink</p>
      </Link>
      <p className="text-primary/50 mx-5 w-48" />
    </div>
  );
}
