import { Resend } from "resend";
import { NextResponse } from "next/server";

type Body = {
  name: string;
  phone: string;
  email: string;
  pageUrl: string;
};

function parseBody(json: unknown): Body | null {
  if (typeof json !== "object" || json === null) return null;
  const o = json as Record<string, unknown>;
  return {
    name: typeof o.name === "string" ? o.name : "",
    phone: typeof o.phone === "string" ? o.phone : "",
    email: typeof o.email === "string" ? o.email : "",
    pageUrl: typeof o.pageUrl === "string" ? o.pageUrl : "",
  };
}

type ResendErr = {
  message?: string;
  name?: string;
  statusCode?: number | null;
};

function mapResendError(error: ResendErr): string {
  const raw = error.message ?? "";
  const msg = raw.toLowerCase();
  const code = error.statusCode;

  if (code === 401 || msg.includes("api key")) {
    return "Неверный ключ Resend: в resend.com → API Keys создайте ключ и вставьте в .env.local строку RESEND_API_KEY=re_... без кавычек и пробелов, затем перезапустите npm run dev.";
  }
  if (msg.includes("unable to fetch") || msg.includes("could not be resolved")) {
    return "Сервер не достучался до Resend (сеть, VPN, DNS). Повторите позже или смените сеть.";
  }
  // Тестовый отправитель: письма только на email аккаунта Resend (не произвольный info@домен)
  if (
    msg.includes("only send") ||
    msg.includes("testing emails") ||
    msg.includes("verify a domain") ||
    (msg.includes("recipient") && (msg.includes("not allowed") || msg.includes("invalid")))
  ) {
    return "С onboarding@resend.dev можно слать только на email, с которым вы зарегистрировались в Resend. В .env.local укажите CONTACT_TO_EMAIL на тот же адрес, что в аккаунте resend.com. Для приёма на info@sev-izba.ru подключите домен в Resend и отправителя с этого домена.";
  }
  if (
    msg.includes("domain") ||
    msg.includes("sender") ||
    msg.includes("not verified") ||
    msg.includes("invalid from")
  ) {
    return "Отправитель CONTACT_FROM_EMAIL не подтверждён в Resend. Для теста: CONTACT_FROM_EMAIL=\"Северная изба <onboarding@resend.dev>\".";
  }
  return raw
    ? `Resend: ${raw}`
    : "Не удалось отправить письмо. Проверьте лог терминала (npm run dev) и настройки Resend.";
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.CONTACT_FROM_EMAIL?.trim();
  const to = (process.env.CONTACT_TO_EMAIL ?? "info@sev-izba.ru").trim();

  if (!apiKey || !from) {
    return NextResponse.json(
      { error: "Почта на сервере не настроена (RESEND_API_KEY, CONTACT_FROM_EMAIL)" },
      { status: 503 },
    );
  }

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json({ error: "Неверный формат данных" }, { status: 400 });
  }

  const parsed = parseBody(raw);
  if (!parsed) {
    return NextResponse.json({ error: "Неверный формат данных" }, { status: 400 });
  }

  const name = parsed.name.trim();
  const phone = parsed.phone.trim();
  const email = parsed.email.trim();
  const pageUrl = parsed.pageUrl.trim();

  if (!name || !phone || !email) {
    return NextResponse.json({ error: "Заполните все поля" }, { status: 400 });
  }

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!emailOk) {
    return NextResponse.json({ error: "Некорректный e-mail" }, { status: 400 });
  }

  const resend = new Resend(apiKey);
  const text = [
    `Имя: ${name}`,
    `Телефон: ${phone}`,
    `E-mail: ${email}`,
    pageUrl ? `Страница: ${pageUrl}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  const { error } = await resend.emails.send({
    from,
    to: [to],
    replyTo: email,
    subject: "Обратная связь с сайта",
    text,
  });

  if (error) {
    console.error("[contact]", error);
    return NextResponse.json(
      { error: mapResendError(error as ResendErr) },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
