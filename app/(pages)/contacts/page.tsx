import PageModule from "@/app/components/page_modul";
import "./style.scss";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Северная Изба | Контакты",
  description: "Свяжитесь с нами",
  keywords: ["контакты", "адрес", "телефон"],
  openGraph: {
    title: "Северная Изба | Контакты",
    description: "Контактная информация.",
    url: "/contacts",
    type: "website",
  },
  alternates: {
    canonical: "/contacts",
  },
};

export default function ContactsPage() {
  return (
    <>
      <PageModule variant="contacts-page">
          <h1 data-reveal>Контакты</h1>
          <div className="contacts-content">
            <div className="contacts-content__item" data-reveal>
            <h2>Адрес:</h2>
            <a href="https://yandex.ru/maps/-/CPbdzPO5" target="_blank">Россия, Вологда,<br/>Советский&nbsp;пр-кт&nbsp;12, (3&nbsp;этаж)</a>
            <h2>Телефон:</h2>
            <a href="tel:88002503550">8(800)250-35-50</a>
            <h2>Email:</h2>
            <a href="mailto:info@sev-izba.ru">info@sev-izba.ru</a>
            </div>
            <div className="contacts-content__item" data-reveal>
            <h2>Социальные сети:</h2>
            <div className="contacts-content__item-social">
              <a href="https://www.instagram.com/sev_izba/" target="_blank">In</a>
              <a href="https://www.facebook.com/sev.izba" target="_blank">Fa</a>
              <a href="https://www.vk.com/sev_izba" target="_blank">VK</a>
            </div>
            <h2>Реквизиты:</h2>
            <div className="contacts-content__item-requisites">
              <p>ИНН: 3525219535</p>
              <p>ОГРН: 1093525002438</p>
              <p>КПП: 352501001</p>
            </div>
            </div>
          </div>
      </PageModule>
    </>
  );
}
