import { CustomLink } from "../custom-link/CustomLink";
import "./style.scss";
import Image from "next/image";
import MobMenu from "./mob-menu";


const navItems = [
  { label: "Главная", href: "/" },
  { label: "Проекты", href: "/projects" },
  { label: "Наши работы", href: "/works" },
  { label: "Услуги", href: "/services" },
  { label: "О нас", href: "/about" },
  { label: "Блог", href: "/blog" },
  { label: "Контакты", href: "/contacts" },
] as const;

export default function Header() {
  return (
    <header>
      <div className="container">
        <CustomLink href="/" className="logo">
          <Image
            className="logo__image"
            src="/site-modules/logo-img-white.png"
            loading="eager"
            priority
            alt="Logo"
            width={50}
            height={50}
            sizes="(min-width: 1025px) 50px, 35px"
          />
          <Image src="/site-modules/logo-text-img-white.png" className="logo__text" alt="Logo" width={200} height={40} loading="eager" priority />
        </CustomLink>
        <nav className="header-nav">
          {navItems
            .filter((item) => item.href !== "/")
            .map((item) => (
              <CustomLink key={item.href} href={item.href}>
                {item.label}
              </CustomLink>
            ))}
        </nav>
        <div className="header-buttons">
          <MobMenu />
        </div>
      </div>
    </header>
  );
}
