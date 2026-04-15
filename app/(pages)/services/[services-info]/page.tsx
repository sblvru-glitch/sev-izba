import PageModule from "@/app/components/page_modul";
import { getAllServiceSlugs, getServiceItemBySlug } from "@/app/data/services-data";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import "./style.scss";

type Props = {
  params: Promise<{ "services-info": string }>;
};

export async function generateStaticParams() {
  return getAllServiceSlugs();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params)["services-info"];
  const service = getServiceItemBySlug(slug);
  if (!service) {
    return { title: "Северная Изба | Услуга не найдена" };
  }
  const url = `/services/${slug}`;
  const displayName =
    "pageTitle" in service && service.pageTitle
      ? service.pageTitle
      : service.name;
  const title = `Северная Изба | ${displayName}`;
  const info = service.info as string | ReactNode;
  const description =
    "metaDescription" in service &&
    typeof service.metaDescription === "string" &&
    service.metaDescription
      ? service.metaDescription
      : typeof info === "string"
        ? info.slice(0, 160).replace(/\s+/g, " ").trim()
        : service.name;
  return {
    title,
    description,
    openGraph: { title: displayName, description, url, type: "website" },
    alternates: { canonical: url },
  };
}

export default async function ServicesInfoPage({ params }: Props) {
  const slug = (await params)["services-info"];
  const service = getServiceItemBySlug(slug);
  if (!service) {
    notFound();
  }

  const priceSuffix =
    service.categoryDescription === "building" ? "руб. / м²" : "руб.";
  const info = service.info as string | ReactNode;

  return (
    <PageModule
      variant="services-info-page"
      backgroundImageUrl="/page-bg/services-bg.jpg"
      breadcrumbCurrentLabel={service.name}
    >
      <article className="service-info" data-reveal>
        <p className="service-info__category">{service.categoryName}</p>
        <h1 className="service-info__title">
          {"pageTitle" in service && service.pageTitle
            ? service.pageTitle
            : service.name}
        </h1>

        <p className="service-info__price">
          <span>от</span> {service.price} <span className="service-info__price-unit">{priceSuffix}</span>
        </p>

        <div className="service-info__body">
          <p className="service-info__body_description">
            Мы предлагаем профессиональное строительство домов из клееного бруса — от&nbsp;разработки архитектурной концепции до финишной отделки и ландшафтных работ. Клееный брус — это «золотой стандарт» современного деревянного домостроения, сочетающий природную эстетику и технологичность.
          </p>
          <div className="service-info__body_plus">
            <h2 className="service-info__h2">Преимущества строительства домов из клееного бруса</h2>
            <ul className="service-info__body_plus_list">
              <li className="service-info__body_plus_list_item">
                <div className="service-info__body_plus_list_item_icon">
                  01
                </div>
                <h3 className="service-info__body_plus_list_item_title">Минимальная усадка (до 1–2%)</h3>
                <p className="service-info__body_plus_list_item_description">В отличие от сырого бревна, в дом из клееного бруса можно устанавливать окна, двери и монтировать инженерные сети сразу после сборки. Вы экономите до 1,5 лет времени и можете заехать в дом в кратчайшие сроки.</p>
              </li>
              <li className="service-info__body_plus_list_item">
                <div className="service-info__body_plus_list_item_icon">
                  01
                </div>
                <h3 className="service-info__body_plus_list_item_title">Геометрическая стабильность.</h3>
                <p className="service-info__body_plus_list_item_description">Благодаря технологии склеивания ламелей с разным направлением волокон, брус устойчив к деформации. Его не «крутит» и не ведет, а глубокие трещины в стенах практически исключены.</p>
              </li>
              <li className="service-info__body_plus_list_item">
                <div className="service-info__body_plus_list_item_icon">
                  01
                </div>
                <h3 className="service-info__body_plus_list_item_title">Энергоэффективность и&nbsp;тепло.</h3>
                <p className="service-info__body_plus_list_item_description">Идеальный заводской профиль обеспечивает плотное прилегание венцов (непродуваемый замок). Это значительно снижает цену эксплуатации дома и затраты на отопление зимой.</p>
              </li>
              <li className="service-info__body_plus_list_item">
                <div className="service-info__body_plus_list_item_icon">
                  01
                </div>
                <h3 className="service-info__body_plus_list_item_title">Здоровый микроклимат.</h3>
                <p className="service-info__body_plus_list_item_description">Мы используем только сертифицированные экологически чистые клеевые системы, которые сохраняют способность дерева «дышать».</p>
              </li>
              <li className="service-info__body_plus_list_item">
                <div className="service-info__body_plus_list_item_icon">
                  01
                </div>
                <h3 className="service-info__body_plus_list_item_title">Архитектурная эстетика.</h3>
                <p className="service-info__body_plus_list_item_description">Поверхность бруса имеет мебельное качество. Дом выглядит современно без дополнительной обшивки — достаточно защитить текстуру дерева маслом или лазурью.</p>
              </li>
            </ul>
          </div>
          <div className="service-info__body_steps">
            <h2>Что входит в услугу «Дом из клееного бруса под ключ»</h2>
            <ul className="service-info__body_steps_list">
              <li className="service-info__body_steps_list_item">
                <div className="service-info__body_steps_list_item_icon">
                  01
                </div>
                <div className="service-info__body_steps_list_item_content">
                  <h3 className="service-info__body_steps_list_item_title">Проектирование и аудит участка.</h3>
                  <p className="service-info__body_steps_list_item_description">Мы разрабатываем проект, который идеально сочетается с ландшафтом и окружающей средой. Ваш дом будет не только функциональным, но и эстетически привлекательным.</p>
                </div>
              </li>
              <li className="service-info__body_steps_list_item">
                <div className="service-info__body_steps_list_item_icon">
                  02
                </div>
                <div className="service-info__body_steps_list_item_content">
                  <h3 className="service-info__body_steps_list_item_title">Заводское производство домокомплекта.</h3>
                  <p className="service-info__body_steps_list_item_description">Ваш дом изготавливается на автоматизированных линиях с ЧПУ. Каждая деталь имеет свой номер и строго выверенные зарезки чаш. Это гарантирует сборку «миллиметр в миллиметр».</p>
                </div>
              </li>
              <li className="service-info__body_steps_list_item">
                <div className="service-info__body_steps_list_item_icon">
                  03
                </div>
                <div className="service-info__body_steps_list_item_content">
                  <h3 className="service-info__body_steps_list_item_title">Надежный фундамент.</h3>
                  <p className="service-info__body_steps_list_item_description">Подбираем оптимальный тип основания: плитный фундамент, ленточный или свайно-ростверковый. Мы рассчитываем нагрузки так, чтобы исключить любые перекосы строения в будущем.</p>
                </div>
              </li>
              <li className="service-info__body_steps_list_item">
                <div className="service-info__body_steps_list_item_icon">
                  04
                </div>
                <div className="service-info__body_steps_list_item_content">
                  <h3 className="service-info__body_steps_list_item_title">Монтаж стенового комплекта.</h3>
                  <p className="service-info__body_steps_list_item_description">Сборка теплового контура выполняется опытными бригадами. Используется профессиональный крепеж (пружинные узлы «Сила», шпильки), что обеспечивает максимальную герметичность и плотность прилегания бруса.</p>
                </div>
              </li>
              <li className="service-info__body_steps_list_item">
                <div className="service-info__body_steps_list_item_icon">
                  05
                </div>
                <div className="service-info__body_steps_list_item_content">
                  <h3 className="service-info__body_steps_list_item_title">Монтаж кровли.</h3>
                  <p className="service-info__body_steps_list_item_description">Мы разрабатываем проект, который идеально сочетается с ландшафтом и окружающей средой. Ваш дом будет не только функциональным, но и эстетически привлекательным.</p>
                </div>
              </li>
              <li className="service-info__body_steps_list_item">
                <div className="service-info__body_steps_list_item_icon">
                  06
                </div>
                <div className="service-info__body_steps_list_item_content">
                  <h3 className="service-info__body_steps_list_item_title">Теплый контур: окна и «окосячка».</h3>
                  <p className="service-info__body_steps_list_item_description">Устанавливаем энергоэффективные стеклопакеты. Особое внимание уделяем монтажу обсады (окосячки) — это специальная конструкция, которая защищает окна от давления стен при естественной жизни деревянного дома.</p>
                </div>
              </li>
              <li className="service-info__body_steps_list_item">
                <div className="service-info__body_steps_list_item_icon">
                  07
                </div>
                <div className="service-info__body_steps_list_item_content">
                  <h3 className="service-info__body_steps_list_item_title">Скрытые инженерные сети.</h3>
                  <p className="service-info__body_steps_list_item_description">Проектируем и монтируем скрытую разводку электрики, водоснабжения и отопления. Все коммуникации закладываются в специальные каналы внутри бруса еще на этапе производства, сохраняя чистоту интерьера.</p>
                </div>
              </li>
              <li className="service-info__body_steps_list_item">
                <div className="service-info__body_steps_list_item_icon">
                  08
                </div>
                <div className="service-info__body_steps_list_item_content">
                  <h3 className="service-info__body_steps_list_item_title">Финишная отделка и защита.</h3>
                  <p className="service-info__body_steps_list_item_description">Профессиональная шлифовка стен, покраска долговечными составами, монтаж чистовых полов и потолков. Мы сдаем готовый объект, в который остается только завезти мебель.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </article>
    </PageModule>
  );
}
