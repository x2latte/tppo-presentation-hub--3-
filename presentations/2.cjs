"use strict";
const path = require("path");
const { C, MX, MY, TH, CY, CH, CW, newPres, addCover, cs, hdr, dr, card, conclusionBanner, codeBox } = require("./design.cjs");

async function createP2(outDir) {
  const pres = newPres("P2 — Атрибуты качества для разработчиков");

  // Slide 1: Cover
  addCover(pres, "Тема 2", "Атрибуты качества для разработчиков\nDeveloper-Oriented Quality Attributes");

  // === Новый слайд: Постановка задачи ===
  {
    const s = cs(pres, "Постановка задачи моделирования");
    card(s, pres, MX, CY, CW, CH, C.ICE);
    s.addText("Постановка практической задачи", {
      x: MX + 0.18, y: CY + 0.12, w: CW - 0.36, h: 0.45,
      color: C.NAVY, fontSize: 12, bold: true, fontFace: "Cambria"
    });
    s.addText(
      "• Команда должна длительно поддерживать и масштабировать клиентский портал (интеграция с 1С, рост числа клиентов).\n\n" +
      "Конкретная задача моделирования:\n" +
      "• Определить и оценить внутренние атрибуты качества ПО (модульность, тестируемость, поддерживаемость, безопасность), важные именно для разработчиков и архитекторов проекта TPPO.",
      {
        x: MX + 0.18, y: CY + 0.65, w: CW - 0.36, h: CH - 0.9,
        color: C.DARK, fontSize: 16, fontFace: "Times New Roman", align: "left", valign: "top"
      }
    );
  }

  // Slide 2: Пользователь vs Разработчик (было две колонки -> одна)
  {
    const s = cs(pres, "Атрибуты качества: пользователь vs разработчик");
    card(s, pres, MX, CY, CW, CH, C.ICE);
    s.addText("Атрибуты качества: пользователь vs разработчик", {
      x: MX + 0.18, y: CY + 0.12, w: CW - 0.36, h: 0.45,
      color: C.NAVY, fontSize: 12, bold: true, fontFace: "Cambria"
    });
    s.addText(
      "Что видит конечный пользователь?\n" +
      "• Простоту и отзывчивость интерфейса (Usability).\n" +
      "• Высокую скорость отклика системы (Performance).\n" +
      "• Постоянную доступность без сбоев (Uptime / Reliability).\n\n" +
      "Что важно инженеру и архитектору?\n" +
      "• Модульность: легкое разделение на изолированные блоки.\n" +
      "• Тестируемость: простое написание автотестов.\n" +
      "• Поддерживаемость и расширяемость кодовой базы.",
      {
        x: MX + 0.18, y: CY + 0.65, w: CW - 0.36, h: CH - 0.9,
        color: C.DARK, fontSize: 16, fontFace: "Times New Roman", align: "left", valign: "top"
      }
    );
  }

  // Slide 3: Ключевые атрибуты качества (сетка из 5 карточек, не меняем)
  {
    const s = cs(pres, "Ключевые атрибуты качества в проекте");
    const attrs = [
      { n: "1. Модульность", d: "Строгое разделение ответственности слоев (REST, Services, DB) для снижения зацепления (coupling)." },
      { n: "2. Тестируемость", d: "Возможность легкого модульного, интеграционного и нагрузочного автоматического тестирования." },
      { n: "3. Читаемость/Поддерживаемость", d: "Единообразие структуры кода, строгая типизация и самодокументируемость." },
      { n: "4. Расширяемость", d: "Слабая связанность модулей позволяет быстро добавлять новые типы услуг и уведомлений." },
      { n: "5. Безопасность", d: "Надежная авторизация, разграничение прав и защита от внедрения вредоносного кода." },
    ];
    const cw = (CW - 0.2) / 2;
    const rh = (CH - 0.2) / 3;
    attrs.forEach((a, i) => {
      const col = i % 2, row = Math.floor(i / 2);
      const x = MX + col * (cw + 0.2);
      const y = CY + row * (rh + 0.1);
      card(s, pres, x, y, cw, rh, i % 2 === 0 ? C.ICE : C.GRNL);
      s.addText(a.n, { x: x + 0.15, y: y + 0.08, w: cw - 0.3, h: 0.32,
        color: C.NAVY, fontSize: 12, bold: true, fontFace: "Cambria" });
      s.addText(a.d, { x: x + 0.15, y: y + 0.42, w: cw - 0.3, h: rh - 0.5,
        color: C.DARK, fontSize: 12, fontFace: "Times New Roman" });
    });
  }

  // Slide 3.5: Целевые количественные метрики качества (таблица, не меняем)
  {
    const s = cs(pres, "Целевые количественные метрики качества");
    const metrics = [
      ["Атрибут качества", "Количественная метрика", "Целевое значение", "Способ контроля"],
      ["Модульность", "Размер модуля (строк кода / SLOC)", "≤ 250 строк на файл / класс", "Линтер (ESLint max-lines)"],
      ["Тестируемость", "Покрытие операторов кодовой базы", "≥ 80% (для бизнес-логики)", "Jest Coverage Report"],
      ["Производительность", "Время отклика API (95-й процентиль)", "≤ 150 мс под нагрузкой 50 rps", "Artillery Load Test"],
      ["Надежность", "Время доступности сервиса (Uptime)", "≥ 99.9% годового аптайма", "UptimeRobot / Promtail"],
      ["Безопасность", "Критические уязвимости в зависимостях", "0 уязвимостей (High / Critical)", "npm audit / Snyk CI"],
    ];
    s.addTable([
      hdr(metrics[0]),
      ...metrics.slice(1).map((row, i) => dr(row, i % 2 === 0)),
    ], { x: MX, y: CY, w: CW, h: CH,
      fontSize: 12, fontFace: "Times New Roman",
      border: { pt: 0.5, color: C.ICE2 },
      colW: [2.0, 3.2, 2.1, 1.86], rowH: 0.65 });
  }

  // Slide 4: Модульность: структура директорий (card + codeBox, не две колонки)
  {
    const s = cs(pres, "Модульность: структура директорий бэкенда");
    card(s, pres, MX, CY, 3.8, CH, C.ICE);
    s.addText("Преимущества структуры", { x: MX + 0.15, y: CY + 0.12, w: 3.5, h: 0.35,
      color: C.NAVY, fontSize: 12, bold: true, fontFace: "Cambria" });
    s.addText("• Разделение ответственности слоев.\n• Эндпоинты (routes) не содержат сырых запросов к SQL.\n• Вся бизнес-логика вынесена в сервисы (services).\n• Доступ к СУБД изолирован в слое миграций и репозиториев (db).", {
      x: MX + 0.15, y: CY + 0.55, w: 3.5, h: CH - 0.8, color: C.DARK, fontSize: 11, fontFace: "Times New Roman" });

    codeBox(s, pres, MX + 4.1, CY, 5.06, CH,
      "backend/src/\n  ├── routes/         # REST API эндпоинты (контроллеры)\n  ├── services/       # Бизнес-логика, воркеры, синк\n  ├── middleware/     # Аутентификация, Zod-валидация\n  ├── config/         # Подключения (Postgres, MinIO, 1C)\n  ├── db/             # Схемы Drizzle ORM, миграции\n  ├── types/          # Общие типы данных TypeScript\n  └── index.ts        # Главный файл запуска сервера", 10.5);
  }

  // Slide 5: Изоляция слоев и слабая связанность (было две колонки -> одна)
  {
    const s = cs(pres, "Изоляция слоев и слабая связанность");
    card(s, pres, MX, CY, CW, CH, C.ICE);
    s.addText("Нарушение связанности (Плохой подход) vs Разделение слоев (Хороший подход)", {
      x: MX + 0.18, y: CY + 0.12, w: CW - 0.36, h: 0.45,
      color: C.NAVY, fontSize: 12, bold: true, fontFace: "Cambria"
    });
    s.addText(
      "Нарушение связанности (Плохой подход):\n" +
      "• Роутер напрямую делает SQL-запрос `SELECT * FROM tickets`.\n" +
      "• Смешивание логики авторизации и рендеринга.\n" +
      "• Фронтенд обращается к базе данных напрямую.\n" +
      "• Любые изменения в СУБД ломают клиентский код.\n" +
      "• Сложно писать изолированные тесты, так как все связано.\n\n" +
      "Разделение слоев (Хороший подход):\n" +
      "• Контроллер лишь принимает запрос и отдает ответ.\n" +
      "• Бизнес-логика живет в `TicketService`.\n" +
      "• Работа с Postgres идет через `Drizzle` репозиторий.\n" +
      "• Интеграция с 1С асинхронна через outbox-очередь.\n" +
      "• Любой слой можно легко заменить или протестировать.",
      {
        x: MX + 0.18, y: CY + 0.65, w: CW - 0.36, h: CH - 0.9,
        color: C.DARK, fontSize: 16, fontFace: "Times New Roman", align: "left", valign: "top"
      }
    );
  }

  // Slide 6: Тестируемость: стратегии мокирования (было две колонки -> одна)
  {
    const s = cs(pres, "Тестируемость: стратегии мокирования (Mocking)");
    card(s, pres, MX, CY, CW, CH, C.ICE);
    s.addText("Изоляция базы данных и имитация внешних систем", {
      x: MX + 0.18, y: CY + 0.12, w: CW - 0.36, h: 0.45,
      color: C.NAVY, fontSize: 12, bold: true, fontFace: "Cambria"
    });
    s.addText(
      "Изоляция базы данных:\n" +
      "Для тестирования роутов API реальная СУБД PostgreSQL подменяется мок-пулом `pg-mock`. Это исключает загрязнение тестовой базы данных и обеспечивает скорость выполнения тестов (миллисекунды вместо минут).\n\n" +
      "Имитация внешних систем (1С, MinIO):\n" +
      "• Вместо вызовов к боевому серверу 1С используется легковесный мок-сервер API.\n" +
      "• Пакет AWS SDK S3 настраивается на локальную заглушку, которая не загружает файлы в облако, а симулирует сохранение в оперативной памяти.",
      {
        x: MX + 0.18, y: CY + 0.65, w: CW - 0.36, h: CH - 0.9,
        color: C.DARK, fontSize: 16, fontFace: "Times New Roman", align: "left", valign: "top"
      }
    );
  }

  // Slide 7: Поддерживаемость: строгая типизация TypeScript (card + codeBox, не меняем)
  {
    const s = cs(pres, "Поддерживаемость: типизация TypeScript");
    card(s, pres, MX, CY, 3.8, CH, C.ICE);
    s.addText("Преимущества типизации", { x: MX + 0.15, y: CY + 0.12, w: 3.5, h: 0.35,
      color: C.NAVY, fontSize: 12, bold: true, fontFace: "Cambria" });
    s.addText("• Обнаружение 90% глупых ошибок опечаток на этапе компиляции.\n• Удобное автодополнение (IntelliSense) в редакторах.\n• Безопасный рефакторинг: при изменении структуры полей компилятор сразу подсветит все ошибочные места.", {
      x: MX + 0.15, y: CY + 0.55, w: 3.5, h: CH - 0.8, color: C.DARK, fontSize: 11, fontFace: "Times New Roman", align: "left", valign: "top" });

    codeBox(s, pres, MX + 4.1, CY, 5.06, CH,
      "export interface ITicket {\n  id: string;\n  title: string;\n  description: string;\n  status: 'new' | 'active' | 'closed';\n  client_id: string;\n  version: number;\n  created_at: Date;\n}\n\nexport interface IMessage {\n  id: string;\n  ticket_id: string;\n  sender_id: string;\n  text: string;\n  sync_status: 'pending' | 'synced';\n}", 10);
  }

  // Slide 8: Поддерживаемость: Zod-валидация схем (card + codeBox, не меняем)
  {
    const s = cs(pres, "Схемы валидации данных (Zod)");
    card(s, pres, MX, CY, 3.8, CH, C.ICE);
    s.addText("Безопасный парсинг данных", { x: MX + 0.15, y: CY + 0.12, w: 3.5, h: 0.35,
      color: C.NAVY, fontSize: 12, bold: true, fontFace: "Cambria" });
    s.addText("• Zod проверяет входящие HTTP-запросы (body, query, params) до выполнения логики.\n• Автоматически отсекает лишние поля (защита от mass assignment).\n• Преобразует строковые типы в числа/даты.\n• Из схем Zod автоматически выводятся типы TS (`z.infer<T>`).", {
      x: MX + 0.15, y: CY + 0.55, w: 3.5, h: CH - 0.8, color: C.DARK, fontSize: 11, fontFace: "Times New Roman", align: "left", valign: "top" });

    codeBox(s, pres, MX + 4.1, CY, 5.06, CH,
      "import { z } from 'zod';\n\nexport const CreateTicketSchema = z.object({\n  title: z.string().min(3).max(100),\n  description: z.string().min(10),\n  category: z.enum(['1C_ERP', '1C_Accounting', 'Other']),\n  attachments: z.array(z.string().uuid()).optional(),\n});\n\ntype CreateTicketDto = z.infer<typeof CreateTicketSchema>;", 10);
  }

  // Slide 9: Расширяемость: паттерны проектирования (было две колонки -> одна)
  {
    const s = cs(pres, "Расширяемость: плагины и паттерны");
    card(s, pres, MX, CY, CW, CH, C.ICE);
    s.addText("Паттерн Стратегия и слабая связанность хранилищ", {
      x: MX + 0.18, y: CY + 0.12, w: CW - 0.36, h: 0.45,
      color: C.NAVY, fontSize: 12, bold: true, fontFace: "Cambria"
    });
    s.addText(
      "Паттерн Стратегия (Strategy):\n" +
      "Для отправки уведомлений используется паттерн 'Стратегия'. Это позволяет легко добавить новый канал (например, Telegram, E-mail, Push) без изменения логики создания тикета. Достаточно зарегистрировать класс, реализующий интерфейс `INotificationProvider`.\n\n" +
      "Слабая связанность хранилищ файлов:\n" +
      "Интеграция с S3 скрыта за абстракцией `IFileStorage`. В процессе разработки мы используем локальный MinIO, но при развертывании в облаке можем переключиться на AWS S3 или Yandex Object Storage простым изменением переменной среды в `.env`.",
      {
        x: MX + 0.18, y: CY + 0.65, w: CW - 0.36, h: CH - 0.9,
        color: C.DARK, fontSize: 16, fontFace: "Times New Roman", align: "left", valign: "top"
      }
    );
  }

  // Slide 10: Безопасность: авторизация JWT + SMS OTP (было две колонки -> одна)
  {
    const s = cs(pres, "Безопасность: авторизация JWT + SMS OTP");
    card(s, pres, MX, CY, CW, CH, C.ICE);
    s.addText("Двухфакторный вход и Bearer JWT", {
      x: MX + 0.18, y: CY + 0.12, w: CW - 0.36, h: 0.45,
      color: C.NAVY, fontSize: 12, bold: true, fontFace: "Cambria", align: "left", valign: "top"
    });
    s.addText(
      "Двухфакторный вход по SMS:\n" +
      "Пользователь вводит номер телефона, система генерирует случайный 6-значный код и отправляет по SMS. Код хэшируется в БД с ограничением жизни в 5 минут. При успешном вводе генерируется пара токенов.\n\n" +
      "Bearer JWT (Access & Refresh):\n" +
      "• Access Token: живет 15 минут, хранится в памяти, используется для авторизации запросов.\n" +
      "• Refresh Token: живет 7 дней, хранится в Cookie HTTPOnly, используется для безопасного обновления access-токена.\n" +
      "• Это исключает кражу токенов через XSS-скрипты.",
      {
        x: MX + 0.18, y: CY + 0.65, w: CW - 0.36, h: CH - 0.9,
        color: C.DARK, fontSize: 16, fontFace: "Times New Roman", align: "left", valign: "top"
      }
    );
  }

  // Slide 11: Безопасность: защита от сетевых атак (было две колонки -> одна)
  {
    const s = cs(pres, "Безопасность: защита от сетевых атак");
    card(s, pres, MX, CY, CW, CH, C.ICE);
    s.addText("Защита данных и валидация трафика", {
      x: MX + 0.18, y: CY + 0.12, w: CW - 0.36, h: 0.45,
      color: C.NAVY, fontSize: 12, bold: true, fontFace: "Cambria", align: "left", valign: "top"
    });
    s.addText(
      "Защита данных и S3:\n" +
      "Файлы клиентов не хранятся в публичном доступе. Ссылка на скачивание имеет срок жизни 15 минут. На сервере включена библиотека `helmet` для защиты заголовков HTTP и CORS для блокировки посторонних доменов.\n\n" +
      "Валидация входящего трафика:\n" +
      "• Полная очистка входящих строк от HTML-тегов (XSS Clean).\n" +
      "• Параметризованные SQL-запросы в Drizzle полностью исключают SQL-инъекции.\n" +
      "• Ограничение частоты запросов (Rate Limiter) спасает авторизацию и отправку SMS от перебора (Brute Force).",
      {
        x: MX + 0.18, y: CY + 0.65, w: CW - 0.36, h: CH - 0.9,
        color: C.DARK, fontSize: 16, fontFace: "Times New Roman", align: "left", valign: "top"
      }
    );
  }

  // Slide 12: Оптимистичная блокировка (было две колонки -> одна)
  {
    const s = cs(pres, "Многопользовательский доступ: Optimistic Locking");
    card(s, pres, MX, CY, CW, CH, C.ICE);
    s.addText("Зачем нужна блокировка и механизм версии", {
      x: MX + 0.18, y: CY + 0.12, w: CW - 0.36, h: 0.45,
      color: C.NAVY, fontSize: 12, bold: true, fontFace: "Cambria", align: "left", valign: "top"
    });
    s.addText(
      "Зачем нужна блокировка?\n" +
      "Если Клиент и Менеджер откроют один и тот же тикет одновременно, сделают разные правки и сохранят, то последнее сохранение перезапишет первое (проблема 'lost update'). Оптимистичная блокировка решает это без блокирования таблиц БД.\n\n" +
      "Механизм версии (version):\n" +
      "• Каждая запись тикета содержит поле `version` (например, 5).\n" +
      "• При PUT-запросе бэкенд проверяет: `UPDATE tickets SET title = ?, version = version + 1 WHERE id = ? AND version = 5`.\n" +
      "• Если версия в базе изменилась, запрос вернет 0 измененных строк. Система выдаст конфликт 409.",
      {
        x: MX + 0.18, y: CY + 0.65, w: CW - 0.36, h: CH - 0.9,
        color: C.DARK, fontSize: 16, fontFace: "Times New Roman", align: "left", valign: "top"
      }
    );
  }

  // Slide 13: Инструменты статического и динамического анализа (таблица, не меняем)
  {
    const s = cs(pres, "Инструменты контроля качества");
    const tools = [
      ["Инструмент", "Тип анализа", "Что проверяет в нашем проекте"],
      ["ESLint", "Статический", "Качество синтаксиса JS/TS, соответствие стандартам кодирования"],
      ["TypeScript", "Статический", "Корректность типов, сигнатур вызовов функций, отсутствие undefined"],
      ["Jest Coverage", "Динамический", "Процент покрытия строк кода автотестами (цель >80%)"],
      ["npm audit", "Статический", "Сканирование зависимостей на уязвимости (OWASP база)"],
      ["Artillery", "Динамический", "Нагрузочное тестирование критических сценариев (RPS, Latency)"],
    ];
    s.addTable([
      hdr(tools[0]),
      ...tools.slice(1).map((row, i) => dr(row, i % 2 === 0)),
    ], { x: MX, y: CY, w: CW, h: CH,
      fontSize: 11, fontFace: "Times New Roman", align: "left", valign: "top",
      border: { pt: 0.5, color: C.ICE2 },
      colW: [2.0, 2.0, 5.16], rowH: 0.65 });
  }

  // Slide 14: Заключение
  {
    const s = cs(pres, "Выводы по теме");
    conclusionBanner(s, pres,
      "Внутренние атрибуты качества (модульность, тестируемость, расширяемость, поддерживаемость, безопасность) " +
      "напрямую определяют живучесть проекта «Личный кабинет». Благодаря использованию слоистой архитектуры бэкенда, " +
      "строгой валидации Zod, надежной JWT-авторизации, механизма optimistic locking и автоматических тестов, " +
      "команда получает чистый, защищенный код, готовый к безболезненному масштабированию и развертыванию.");
  }

  const outFile = path.join(outDir, "P2_Атрибуты_качества.pptx");
  await pres.writeFile({ fileName: outFile });
  console.log("✓ P2:", outFile);
}

module.exports = { createP2 };
