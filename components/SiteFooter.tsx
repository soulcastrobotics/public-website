import { site, whatsappLink } from "@/lib/site";
import Logo from "./Logo";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-brand">
        <Logo size={22} />
        <span>{site.name}</span>
      </div>
      <address>
        <span>{site.address.locality}, {site.address.region}, {site.address.country}</span>
        <a href={`mailto:${site.email}`}>{site.email}</a>
        <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
          WhatsApp {site.whatsapp.display}
        </a>
      </address>
      <p className="copy">© {new Date().getFullYear()} {site.name}. All systems nominal.</p>
    </footer>
  );
}
