"use strict";
const path = require("path");
const { C, MX, MY, TH, CY, CH, CW, newPres, addCover, cs, hdr, dr, card, conclusionBanner } = require("./design.cjs");

async function createP3(outDir) {
  const pres = newPres("P3 — Интерфейс подсистем");

  // Slide 1: Cover
  addCover(pres, "Тема 3", "Интерфейс подсистем\nSubsystem Interfaces");

  // === Новый слайд: Постановка задачи ===
  {
    const s = cs(pres, "Постановка задачи моделирования");
    card(s, pres, MX, CY, CW, CH, C.ICE);
    s.addText("Постановка практической задачи", {
      x: MX + 0.18, y: CY + 0.12, w: CW - 0.36, h: 0.45,
      color: C.NAVY, fontSize: 12, bold: true, fontFace: "Cambria"
    });
    s.addText(
      "• Обеспечить стабильное взаимодействие Frontend, Backend, двух баз PostgreSQL, MinIO и внешней системы 1С.\n\n" +
      "Конкретная задача моделирования:\n" +
      "• Описать интерфейсы (контракты) между всеми подсистемами для достижения слабой связанности, масштабируемости и отказоустойчивости.",
      {
        x: MX + 0.18, y: CY + 0.65, w: CW - 0.36, h: CH - 0.9,
        color: C.DARK, fontSize: 16, fontFace: "Times New Roman", align: "left", valign: "top"
      }
    );
  }

  // Slide 2: Что такое интерфейс подсистемы? (было две колонки -> одна)
  {
    const s = cs(pres, "Что такое интерфейс подсистемы?");
    card(s, pres, MX, CY, CW, CH, C.ICE);
    s.addText("Понятие интерфейса-контракта и зачем его проектировать", {
      x: MX + 0.18, y: CY + 0.12, w: CW - 0.36, h: 0.45,
      color: C.NAVY, fontSize: 12, bold: true, fontFace: "Cambria"
    });
    s.addText(
      "Интерфейс — это четко определенная граница взаимодействия (стык) между независимыми частями системы. Он выступает в роли контракта: одна сторона обязуется предоставить данные строго определенного формата, а вторая — принять их.\n\n" +
      "Зачем проектировать интерфейсы?\n" +
      "• Полная инкапсуляция: скрытие деталей реализации подсистемы.\n" +
      "• Слабая связанность: замена бэкенда не ломает верстку фронтенда.\n" +
      "• Параллельная разработка команд по заранее согласованным мокам.",
      {
        x: MX + 0.18, y: CY + 0.65, w: CW - 0.36, h: CH - 0.9,
        color: C.DARK, fontSize: 16, fontFace: "Times New Roman", align: "left", valign: "top"
      }
    );
  }

  // Slide 3: Подсистемы в нашем проекте (без изменений, это сетка)
  {
    const s = cs(pres, "Подсистемы в проекте client-portal");
    const subs = [
      { n: "1. Web / Mobile Frontend", d: "Клиентская часть на React. Отправляет JSON-запросы на Backend API, отрисовывает UI, рендерит чат и загружает файлы." },
      { n: "2. Backend API", d: "Серверное ядро на Node.js (Express). Отвечает за роутинг, валидацию данных, JWT-авторизацию и фоновые задачи." },
      { n: "3. PostgreSQL Database", d: "Основная реляционная БД портала. Хранит учетные записи пользователей, сессии чата, логи синхронизации и тикеты." },
      { n: "4. S3 Storage MinIO", d: "Объектное хранилище для тяжелых вложений (скриншоты ошибок, базы данных 1С клиентов, логи, отчеты)." },
      { n: "5. WebSocket Service", d: "Служба мгновенной доставки сообщений и нотификаций. Держит постоянное дуплексное сетевое соединение." },
      { n: "6. Sync & 1C Simulator", d: "Внешняя база-реплика и фоновые процессы обмена, симулирующие учетный контур 1С на предприятии." },
    ];
    const cw = (CW - 0.2) / 2;
    const rh = (CH - 0.2) / 3;
    subs.forEach((sub, i) => {
      const col = i % 2, row = Math.floor(i / 2);
      const x = MX + col * (cw + 0.2);
      const y = CY + row * (rh + 0.1);
      card(s, pres, x, y, cw, rh, col === 0 ? C.ICE : C.GRNL);
      s.addText(sub.n, { x: x + 0.15, y: y + 0.08, w: cw - 0.3, h: 0.32,
        color: C.NAVY, fontSize: 12, bold: true, fontFace: "Cambria" });
      s.addText(sub.d, { x: x + 0.15, y: y + 0.42, w: cw - 0.3, h: rh - 0.5,
        color: C.DARK, fontSize: 12, fontFace: "Times New Roman", align: "left", valign: "top" });
    });
  }

  // Slide 4: Спецификация стыковки подсистем (Таблица) — без изменений
  {
    const s = cs(pres, "Стыковка подсистем: спецификация интерфейсов");
    const interfaces = [
      ["Пара подсистем", "Протокол / Стык", "Характер передачи данных"],
      ["Frontend ↔ Backend API", "REST API (HTTP, JSON)", "Синхронный (запрос-ответ)"],
      ["Frontend ↔ WebSocket", "WebSocket (WS, JSON)", "Асинхронный дуплексный (push)"],
      ["Backend ↔ PostgreSQL", "TCP / PostgreSQL Driver", "Синхронный пул соединений"],
      ["Backend ↔ S3 MinIO", "AWS SDK S3 API", "Синхронный (запросы presigned URLs)"],
      ["Frontend ↔ S3 MinIO", "HTTP PUT / Direct binary", "Прямая бинарная загрузка в обход API"],
      ["Backend ↔ 1C Replica", "PostgreSQL / pg Client", "Асинхронная очередь (Outbox pattern)"],
    ];
    s.addTable([
      hdr(interfaces[0]),
      ...interfaces.slice(1).map((row, i) => dr(row, i % 2 === 0)),
    ], { x: MX, y: CY, w: CW, h: CH,
      fontSize: 12, fontFace: "Times New Roman", align: "left", valign: "top",
      border: { pt: 0.5, color: C.ICE2 },
      colW: [2.5, 2.8, 3.86], rowH: 0.58 });
  }

  // Slide 5: Диаграмма компонентов UML (без изменений)
  {
    const s = cs(pres, "Диаграмма компонентов UML (Component Diagram)");
    const boxes = [
      { x: 0.5, y: CY + 0.2, w: 2.2, h: 1.0, t: "Web / Mobile Client\n(Frontend)" },
      { x: 3.5, y: CY + 0.2, w: 2.5, h: 1.0, t: "Backend API\n(Node.js + Express)" },
      { x: 6.8, y: CY + 0.2, w: 2.2, h: 1.0, t: "Internal DB\n(PostgreSQL)" },
      { x: 3.0, y: CY + 2.0, w: 2.8, h: 1.0, t: "S3 Storage\n(MinIO)" },
      { x: 0.5, y: CY + 2.0, w: 1.8, h: 1.0, t: "Sync Service\n(Inbound/Outbox)" },
      { x: 6.5, y: CY + 2.2, w: 2.5, h: 1.0, t: "External DB\n(1C Simulation)" },
    ];
    boxes.forEach(b => {
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: b.x, y: b.y, w: b.w, h: b.h,
        fill: { color: C.ICE }, line: { color: C.TEAL, pt: 1.2 }, rectRadius: 0.08 });
      s.addText(b.t, { x: b.x, y: b.y, w: b.w, h: b.h,
        color: C.NAVY, fontSize: 11, bold: true, align: "center", valign: "middle" });
    });
    // Lines
    s.addShape(pres.shapes.LINE, { x: 2.7, y: CY + 0.7, w: 0.8, h: 0, line: { color: C.TEAL, pt: 1.5 } });
    s.addShape(pres.shapes.LINE, { x: 6.0, y: CY + 0.7, w: 0.8, h: 0, line: { color: C.TEAL, pt: 1.5 } });
    s.addShape(pres.shapes.LINE, { x: 4.4, y: CY + 1.2, w: 0, h: 0.8, line: { color: C.TEAL, pt: 1.5 } });
    s.addShape(pres.shapes.LINE, { x: 1.4, y: CY + 1.2, w: 0, h: 0.8, line: { color: C.TEAL, pt: 1.5 } });
    s.addShape(pres.shapes.LINE, { x: 5.8, y: CY + 2.5, w: 0.7, h: 0, line: { color: C.TEAL, pt: 1.5 } });
  }

  // Slide 6: Спецификация REST API: /api/tickets (таблица, без изменений)
  {
    const s = cs(pres, "Спецификация REST API: /api/tickets");
    const routes = [
      ["Метод HTTP", "URL-путь", "Параметры", "Описание операции"],
      ["GET", "/api/tickets", "page, status, search", "Получить постраничный список обращений"],
      ["POST", "/api/tickets", "title, description", "Создать новое обращение клиента"],
      ["GET", "/api/tickets/:id", "id (uuid)", "Получить полную карточку обращения"],
      ["PUT", "/api/tickets/:id", "id, title, version", "Обновить поля обращения (locking)"],
      ["GET", "/api/tickets/:id/chat", "id (uuid)", "Получить историю сообщений в чате"],
    ];
    s.addTable([
      hdr(routes[0]),
      ...routes.slice(1).map((row, i) => dr(row, i % 2 === 0)),
    ], { x: MX, y: CY, w: CW, h: CH,
      fontSize: 11, fontFace: "Times New Roman", align: "left", valign: "top",
      border: { pt: 0.5, color: C.ICE2 },
      colW: [1.3, 2.2, 1.8, 3.86], rowH: 0.7 });
  }

  // Slide 7: Безопасность и проверка прав в REST API (было две колонки -> одна)
  {
    const s = cs(pres, "REST API: Безопасность и Middleware");
    card(s, pres, MX, CY, CW, CH, C.ICE);
    s.addText("Аутентификация, RBAC и защита API", {
      x: MX + 0.18, y: CY + 0.12, w: CW - 0.36, h: 0.45,
      color: C.NAVY, fontSize: 12, bold: true, fontFace: "Cambria"
    });
    s.addText(
      "Проверка JWT-токенов (Auth Middleware):\n" +
      "Каждый защищенный роут API проходит проверку в промежуточном слое `verifyToken`. Он считывает заголовок `Authorization: Bearer <token>`, валидирует подпись и извлекает `userId` и `role`, прикрепляя их к объекту запроса `req.user`.\n\n" +
      "Безопасное разграничение ролей (RBAC):\n" +
      "• Роуты `/api/tickets` доступны клиенту для чтения только своих обращений.\n" +
      "• Роуты `/api/manager/*` доступны только пользователям с флагом `role='manager'`.\n" +
      "• Любые несанкционированные попытки доступа блокируются ошибками 401 Unauthorized или 403 Forbidden.",
      {
        x: MX + 0.18, y: CY + 0.65, w: CW - 0.36, h: CH - 0.9,
        color: C.DARK, fontSize: 16, fontFace: "Times New Roman", align: "left", valign: "top"
      }
    );
  }

  // Slide 8: Интерфейс реального времени: WebSocket (было две колонки -> одна)
  {
    const s = cs(pres, "Интерфейс реального времени: WebSocket");
    card(s, pres, MX, CY, CW, CH, C.ICE);
    s.addText("Протокол, подключение и события WebSocket", {
      x: MX + 0.18, y: CY + 0.12, w: CW - 0.36, h: 0.45,
      color: C.NAVY, fontSize: 12, bold: true, fontFace: "Cambria", align: "left", valign: "top"
    });
    s.addText(
      "WebSocket обеспечивает постоянный двусторонний обмен данными без оверхеда HTTP-заголовков. При открытии карточки тикета клиент подключается к сокет-серверу и подписывается на комнату `ticket:<ticketId>`, отправляя событие `join`.\n\n" +
      "События WebSocket-сервиса:\n" +
      "• `message:send` — отправка нового сообщения в чат тикета.\n" +
      "• `message:receive` — получение сообщения от собеседника в реальном времени.\n" +
      "• `ticket:status_changed` — push-оповещение клиента о смене статуса обращения менеджером или базой 1С.",
      {
        x: MX + 0.18, y: CY + 0.65, w: CW - 0.36, h: CH - 0.9,
        color: C.DARK, fontSize: 16, fontFace: "Times New Roman", align: "left", valign: "top"
      }
    );
  }

  // Slide 9: Интерфейс хранилища файлов: S3 Presigned URLs (было две колонки -> одна)
  {
    const s = cs(pres, "Интерфейс хранилища файлов: S3 Presigned URLs");
    card(s, pres, MX, CY, CW, CH, C.ICE);
    s.addText("Проблема классического подхода и решение через presigned URLs", {
      x: MX + 0.18, y: CY + 0.12, w: CW - 0.36, h: 0.45,
      color: C.NAVY, fontSize: 12, bold: true, fontFace: "Cambria", align: "left", valign: "top"
    });
    s.addText(
      "Обычно файлы загружают на бэкенд API-сервера, а тот перекладывает их в хранилище. Это забивает дисковый кэш, перегружает оперативную память Node.js бинарным буфером данных и блокирует поток событий (Event Loop) при загрузке тяжелых логов или баз 1С.\n\n" +
      "Решение: Временные ссылки S3\n" +
      "1. Фронтенд шлет запрос на `/api/files/presigned-put`.\n" +
      "2. Бэкенд за миллисекунду генерирует криптографически подписанный URL с лимитом жизни 15 минут.\n" +
      "3. Фронтенд шлет бинарный файл напрямую в корзину MinIO. Бэкенд не нагружается.",
      {
        x: MX + 0.18, y: CY + 0.65, w: CW - 0.36, h: CH - 0.9,
        color: C.DARK, fontSize: 16, fontFace: "Times New Roman", align: "left", valign: "top"
      }
    );
  }

  // Slide 10: Интерфейс базы данных PostgreSQL (SQL/Drizzle) (было две колонки -> одна)
  {
    const s = cs(pres, "Интерфейс СУБД: Drizzle ORM + Пул соединений");
    card(s, pres, MX, CY, CW, CH, C.ICE);
    s.addText("Пул соединений и преимущества Drizzle ORM", {
      x: MX + 0.18, y: CY + 0.12, w: CW - 0.36, h: 0.45,
      color: C.NAVY, fontSize: 12, bold: true, fontFace: "Cambria"
    });
    s.addText(
      "Создание TCP-соединения с Postgres на каждый запрос — дорогая операция. Бэкенд инициализирует пул соединений `node-postgres` с лимитом от 10 до 20 активных сессий. Это позволяет мгновенно выполнять SQL-запросы за счет повторного использования открытых сокетов.\n\n" +
      "Преимущества Drizzle ORM:\n" +
      "• Полная типобезопасность возвращаемых строк.\n" +
      "• Отсутствие оверхеда традиционных тяжелых ORM (код Drizzle компилируется в эффективные нативные сырые SQL-запросы).\n" +
      "• Автоматическое управление миграциями и версионированием таблиц.",
      {
        x: MX + 0.18, y: CY + 0.65, w: CW - 0.36, h: CH - 0.9,
        color: C.DARK, fontSize: 16, fontFace: "Times New Roman", align: "left", valign: "top"
      }
    );
  }

  // Slide 11: 1С Интеграция: Outbox-паттерн (было две колонки -> одна)
  {
    const s = cs(pres, "Интеграция с 1С: Асинхронный Outbox Pattern");
    card(s, pres, MX, CY, CW, CH, C.ICE);
    s.addText("Проблема синхронной интеграции и решение Outbox", {
      x: MX + 0.18, y: CY + 0.12, w: CW - 0.36, h: 0.45,
      color: C.NAVY, fontSize: 12, bold: true, fontFace: "Cambria"
    });
    s.addText(
      "Если при нажатии кнопки 'Создать тикет' слать запрос напрямую в 1С по HTTP REST: при сбое связи, перегрузке или плановом перезапуске 1С клиент получит ошибку 500, а тикет будет потерян. Это недопустимо для бизнес-системы.\n\n" +
      "Асинхронное решение Outbox:\n" +
      "1. Тикет и событие в таблицу `outbox` пишутся в локальный Postgres в рамках одной ACID транзакции.\n" +
      "2. Фоновый воркер Node.js раз в 5с шлет события в симулятор 1С.\n" +
      "3. При успехе ставит статус `processed`. При сбое повторяет попытку с задержкой.",
      {
        x: MX + 0.18, y: CY + 0.65, w: CW - 0.36, h: CH - 0.9,
        color: C.DARK, fontSize: 16, fontFace: "Times New Roman", align: "left", valign: "top"
      }
    );
  }

  // Slide 12: Защита интерфейсов: CORS и Rate Limiting (было две колонки -> одна)
  {
    const s = cs(pres, "Защита стыков: CORS, Rate Limiting и Валидация");
    card(s, pres, MX, CY, CW, CH, C.ICE);
    s.addText("Ограничение запросов и контроль источников", {
      x: MX + 0.18, y: CY + 0.12, w: CW - 0.36, h: 0.45,
      color: C.NAVY, fontSize: 12, bold: true, fontFace: "Cambria"
    });
    s.addText(
      "Rate Limiting (Защита от DOS):\n" +
      "Чтобы злоумышленники не завалили базу запросами и не перегрузили СУБД, на бэкенде включен `express-rate-limit`. Ограничение: максимум 150 запросов в 1 минуту с одного IP-адреса. Для роутов отправки SMS-кодов лимит еще жестче: 3 запроса в минуту.\n\n" +
      "Cross-Origin Resource Sharing (CORS):\n" +
      "Бэкенд принимает запросы только со строго разрешенного списка доменов (White List), прописанных в переменной `CORS_ALLOWED_ORIGINS`. Попытки отправки AJAX-запросов со сторонних вредоносных фишинговых сайтов блокируются на уровне браузера.",
      {
        x: MX + 0.18, y: CY + 0.65, w: CW - 0.36, h: CH - 0.9,
        color: C.DARK, fontSize: 16, fontFace: "Times New Roman", align: "left", valign: "top"
      }
    );
  }

  // Slide 13: Заменяемость и масштабирование интерфейсов (было две колонки -> одна)
  {
    const s = cs(pres, "Гибкость и заменяемость интерфейсов");
    card(s, pres, MX, CY, CW, CH, C.ICE);
    s.addText("Замена S3-провайдера и масштабирование бэкенда", {
      x: MX + 0.18, y: CY + 0.12, w: CW - 0.36, h: 0.45,
      color: C.NAVY, fontSize: 12, bold: true, fontFace: "Cambria", align: "left", valign: "top"
    });
    s.addText(
      "Замена S3-провайдера за 1 минуту:\n" +
      "Поскольку загрузка файлов спроектирована по стандартному протоколу AWS S3 API, мы можем заменить локальный контейнер MinIO на коммерческое Яндекс.Облако (Yandex Object Storage) без изменения единой строчки кода бэкенда — просто изменив `S3_ENDPOINT` в `.env`.\n\n" +
      "Масштабирование бэкенда:\n" +
      "Так как бэкенд спроектирован по принципу 'Stateless' (состояние сессии не хранится в памяти Node.js, а пишется в СУБД Postgres), мы можем запустить 5 параллельных контейнеров Express за балансировщиком Nginx для распределения нагрузки.",
      {
        x: MX + 0.18, y: CY + 0.65, w: CW - 0.36, h: CH - 0.9,
        color: C.DARK, fontSize: 16, fontFace: "Times New Roman", align: "left", valign: "top"
      }
    );
  }

  // Slide 13.5: Отказоустойчивость интерфейсов и сбои (было две колонки -> одна)
  {
    const s = cs(pres, "Отказоустойчивость интерфейсов и сбои");
    card(s, pres, MX, CY, CW, CH, C.ICE);
    s.addText("Сбои сети и конфликты API", {
      x: MX + 0.18, y: CY + 0.12, w: CW - 0.36, h: 0.45,
      color: C.NAVY, fontSize: 12, bold: true, fontFace: "Cambria"
    });
    s.addText(
      "Сбои сетевого подключения (Offline-First WS):\n" +
      "При отсутствии интернета во время отправки сообщений по WebSocket, чат-клиент временно сохраняет сообщение в LocalStorage и включает статус 'Ожидание сети'. После реконнекта сокета сообщения отправляются автоматически с сохранением исходного порядка.\n\n" +
      "Конфликты API (Optimistic Locking):\n" +
      "Если клиент и менеджер редактируют одно обращение через REST-интерфейс одновременно, бэкенд сверяет поле 'version'. Первая транзакция успешно фиксируется, а второй возвращается код ошибки 409 Conflict с предложением обновить форму.",
      {
        x: MX + 0.18, y: CY + 0.65, w: CW - 0.36, h: CH - 0.9,
        color: C.DARK, fontSize: 16, fontFace: "Times New Roman", align: "left", valign: "top"
      }
    );
  }

  // Slide 14: Заключение
  {
    const s = cs(pres, "Выводы по теме");
    conclusionBanner(s, pres,
      "Проектирование интерфейсов подсистем является центральным ядром архитектуры «Личного кабинета». " +
      "Благодаря четкому разделению на 6 подсистем и стандартизации их контрактов (REST JSON, WebSocket events, S3 API), " +
      "нам удалось построить отказоустойчивую, безопасную и слабосвязанную систему. Асинхронная интеграция с 1С через Outbox " +
      "гарантирует сохранность заявок клиентов даже при падении или сбоях учетной базы предприятия.");
  }

  const outFile = path.join(outDir, "P3_Интерфейс_подсистем.pptx");
  await pres.writeFile({ fileName: outFile });
  console.log("✓ P3:", outFile);
}

module.exports = { createP3 };