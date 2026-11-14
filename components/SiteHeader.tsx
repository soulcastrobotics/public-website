import Link from "next/link";
import { nav, site } from "@/lib/site";
import Logo from "./Logo";

export default function SiteHeader() {
  return (
    <header className="site-header">
      <Link href="/" className="brand" aria-label={`${site.name} home`}>
        <Logo />
        <span>
          SOULCAST<em>ROBOTICS</em>
        </span>
      </Link>
      <nav aria-label="Main">
        {nav.map((item) => (
          <Link key={item.href} href={item.href}>
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
