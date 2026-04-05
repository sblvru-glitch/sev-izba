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
            <a
              href="https://yandex.ru/maps/org/severnaya_izba/56150678455/?ll=39.893984%2C59.217613&z=14"
              target="_blank"
              rel="noopener noreferrer"
            >
              Россия, Вологда,<br />
              Советский&nbsp;пр-кт&nbsp;12, (3&nbsp;этаж)
            </a>
            <h2>Телефон:</h2>
            <a href="tel:88002503550">8(800)250-35-50</a>
            <h2>Email:</h2>
            <a href="mailto:info@sev-izba.ru">info@sev-izba.ru</a>
            </div>
            <div className="contacts-content__item" data-reveal>
            <h2>Социальные сети:</h2>
            <div className="contacts-content__item-social">
              <a href="https://vk.com/sev_izba" target="_blank" rel="noopener noreferrer" aria-label="ВКонтакте">
                <svg width="35" height="35" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  <path d="M17.802 12.298s1.617 1.597 2.017 2.336a.127.127 0 0 1 .018.035c.163.273.203.487.123.645-.135.261-.592.392-.747.403h-2.858c-.199 0-.613-.052-1.117-.4-.385-.269-.768-.712-1.139-1.145-.554-.643-1.033-1.201-1.518-1.201a.548.548 0 0 0-.18.03c-.367.116-.833.639-.833 2.032 0 .436-.344.684-.585.684H9.674c-.446 0-2.768-.156-4.827-2.327C2.324 10.732.058 5.4.036 5.353c-.141-.345.155-.533.475-.533h2.886c.387 0 .513.234.601.444.102.241.48 1.205 1.1 2.288 1.004 1.762 1.621 2.479 2.114 2.479a.527.527 0 0 0 .264-.07c.644-.354.524-2.654.494-3.128 0-.092-.001-1.027-.331-1.479-.236-.324-.638-.45-.881-.496.065-.094.203-.238.38-.323.441-.22 1.238-.252 2.029-.252h.439c.858.012 1.08.067 1.392.146.628.15.64.557.585 1.943-.016.396-.033.842-.033 1.367 0 .112-.005.237-.005.364-.019.711-.044 1.512.458 1.841a.41.41 0 0 0 .217.062c.174 0 .695 0 2.108-2.425.62-1.071 1.1-2.334 1.133-2.429.028-.053.112-.202.214-.262a.479.479 0 0 1 .236-.056h3.395c.37 0 .621.056.67.196.082.227-.016.92-1.566 3.016-.261.349-.49.651-.691.915-1.405 1.844-1.405 1.937.083 3.337z" />
                </svg>
              </a>
              <a href="https://t.me/SevernayaIzba" target="_blank" rel="noopener noreferrer" aria-label="Telegram">
                <svg width="35" height="35" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  <path d="m20.665 3.717-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42 10.532-6.645c.498-.303.953-.14.579.192l-8.533 7.701h-.002l.002.001-.314 4.692c.46 0 .663-.211.921-.46l2.211-2.15 4.599 3.397c.848.467 1.457.227 1.668-.785l3.019-14.228c.309-1.239-.473-1.8-1.282-1.434z" />
                </svg>
              </a>
            </div>
            <h2>Реквизиты:</h2>
            <div className="contacts-content__item-requisites">
              <p>ИНН: 3525219535</p>
              <p>ОГРН: 1093525002438</p>
              <p>КПП: 352501001</p>
            </div>
            </div>
          </div>

          <section className="contacts-map" data-reveal aria-labelledby="contacts-map-heading">
            <h2 id="contacts-map-heading" className="contacts-map__title">
              Карта
            </h2>
            <div className="contacts-map__frame">
              <iframe
                title="Северная Изба — Яндекс.Карты"
                src="https://yandex.ru/map-widget/v1/?ll=39.893984%2C59.217613&z=14&pt=39.893984%2C59.217613~pm2rdl"
                width="100%"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <a
              className="contacts-map__link"
              href="https://yandex.ru/maps/org/severnaya_izba/56150678455/?ll=39.893984%2C59.217613&z=14"
              target="_blank"
              rel="noopener noreferrer"
            >
              Открыть в Яндекс.Картах
            </a>
          </section>
      </PageModule>
    </>
  );
}
