"use strict";
const path = require("path");
const { C, MX, MY, TH, CY, CH, CW, newPres, addCover, cs, hdr, dr, card, conclusionBanner } = require("./design.cjs");

async function createP1(outDir) {
  const pres = newPres("P1 — Диаграмма прецедентов");

  // Slide 1: Cover
  addCover(pres, "Тема 1", "Диаграмма прецедентов\nUse Case Diagram");

  // === Новый слайд: Постановка задачи ===
  {
    const s = cs(pres, "Постановка задачи моделирования");
    card(s, pres, MX, CY, CW, CH, C.ICE);
    s.addText("Постановка практической задачи", {
      x: MX + 0.18, y: CY + 0.12, w: CW - 0.36, h: 0.45,
      color: C.NAVY, fontSize: 12, bold: true, fontFace: "Cambria"
    });
    s.addText(
      "• Замена устаревшего «Журнала обращений» в 1С современным клиентским порталом.\n" +
      "• Клиенты часто ошибаются при выборе услуги, сложно отслеживать статусы и общаться с исполнителями.\n\n" +
      "Конкретная задача моделирования:\n" +
      "• Построить Диаграмму прецедентов UML, которая чётко определит границы системы, роли участников и основные сценарии взаимодействия.",
      {
        x: MX + 0.18, y: CY + 0.65, w: CW - 0.36, h: CH - 0.9,
        color: C.DARK, fontSize: 16, fontFace: "Times New Roman", align: "left", valign: "top" 
      }
    );
  }

  // Slide 2: Что такое диаграмма прецедентов? (было две колонки -> одна)
  {
    const s = cs(pres, "Назначение диаграммы прецедентов");
    card(s, pres, MX, CY, CW, CH, C.ICE);
    s.addText("Сущность UML Use Case и преимущества подхода", {
      x: MX + 0.18, y: CY + 0.12, w: CW - 0.36, h: 0.45,
      color: C.NAVY, fontSize: 12, bold: true, fontFace: "Cambria"
    });
    s.addText(
      "Описывает функциональность системы с точки зрения акторов.\n" +
      "Позволяет зафиксировать границы проектируемой системы.\n" +
      "Является основой для приёмо-сдаточных испытаний и тестов.\n\n" +
      "Преимущества подхода:\n" +
      "• Абстрагирование от конкретной программной реализации.\n" +
      "• Простое и понятное общение с бизнес-заказчиками компании.\n" +
      "• Прямая трассировка требований в API-эндпоинты и СУБД.",
      {
        x: MX + 0.18, y: CY + 0.65, w: CW - 0.36, h: CH - 0.9,
        color: C.DARK, fontSize: 16, fontFace: "Times New Roman", align: "left", valign: "top"
      }
    );
  }

  // Slide 3: Контекст проекта «Неосистемы Северо-Запад» (было две колонки -> одна)
  {
    const s = cs(pres, "Контекст проекта: Личный кабинет клиента");
    card(s, pres, MX, CY, CW, CH, C.ICE);
    s.addText("Бизнес-цели портала и интеграционные стыки", {
      x: MX + 0.18, y: CY + 0.12, w: CW - 0.36, h: 0.45,
      color: C.NAVY, fontSize: 12, bold: true, fontFace: "Cambria"
    });
    s.addText(
      "Бизнес-цели портала:\n" +
      "• Разгрузка линии технической поддержки клиентов.\n" +
      "• Прозрачный контроль выполнения заявок по 1С.\n" +
      "• Оперативное согласование коммерческих предложений.\n\n" +
      "Интеграционные стыки:\n" +
      "• Локальная БД PostgreSQL для хранения сессий и сообщений.\n" +
      "• Внешний симулятор 1С для синхронизации справочников.\n" +
      "• Объектное S3-хранилище MinIO для тяжелых файлов.",
      {
        x: MX + 0.18, y: CY + 0.65, w: CW - 0.36, h: CH - 0.9,
        color: C.DARK, fontSize: 16, fontFace: "Times New Roman", align: "left", valign: "top"
      }
    );
  }

  // Slide 4: Акторы (Actors) системы (сетка из 4 карточек, не меняем)
  {
    const s = cs(pres, "Действующие лица (Actors) системы");
    const cw = (CW - 0.2) / 2;
    const ch = (CH - 0.2) / 2;
    const x1 = MX, x2 = MX + cw + 0.2;
    const y1 = CY, y2 = CY + ch + 0.2;

    // Card 1
    card(s, pres, x1, y1, cw, ch, C.ICE);
    s.addText("Представитель клиента (Клиент)", { x: x1 + 0.15, y: y1 + 0.1, w: cw - 0.3, h: 0.3,
      color: C.NAVY, fontSize: 16, bold: true, fontFace: "Cambria" });
    s.addText("Внешний пользователь. Инициирует запросы на техподдержку 1С, прикрепляет скриншоты ошибок, общается в реальном времени в чате и заказывает обратные звонки.", { x: x1 + 0.15, y: y1 + 0.45, w: cw - 0.3, h: ch - 0.55,
      color: C.DARK, fontSize: 10, fontFace: "Times New Roman" });

    // Card 2
    card(s, pres, x2, y1, cw, ch, C.GRNL);
    s.addText("Сотрудник компании (Менеджер/Исполнитель)", { x: x2 + 0.15, y: y1 + 0.1, w: cw - 0.3, h: 0.3,
      color: C.NAVY, fontSize: 16, bold: true, fontFace: "Cambria" });
    s.addText("Внутренний пользователь. Принимает обращения в работу, меняет статусы, формирует коммерческие оценки трудоемкости в часах и общается с клиентом.", { x: x2 + 0.15, y: y1 + 0.45, w: cw - 0.3, h: ch - 0.55,
      color: C.DARK, fontSize: 10, fontFace: "Times New Roman" });

    // Card 3
    card(s, pres, x1, y2, cw, ch, C.PURPL);
    s.addText("Администратор портала (Administrator)", { x: x1 + 0.15, y: y2 + 0.1, w: cw - 0.3, h: 0.3,
      color: C.NAVY, fontSize: 16, bold: true, fontFace: "Cambria" });
    s.addText("Администрирует учетные записи и роли сотрудников и клиентов ООО «Неосистемы», настраивает права доступа, мониторит интеграционные логи и очереди отправки.", { x: x1 + 0.15, y: y2 + 0.45, w: cw - 0.3, h: ch - 0.55,
      color: C.DARK, fontSize: 10, fontFace: "Times New Roman" });

    // Card 4
    card(s, pres, x2, y2, cw, ch, C.AMBL);
    s.addText("Внешняя система (1С:Предприятие)", { x: x2 + 0.15, y: y2 + 0.1, w: cw - 0.3, h: 0.3,
      color: C.NAVY, fontSize: 16, bold: true, fontFace: "Cambria" });
    s.addText("Актор-система. Выступает источником справочников договоров и конфигураций. Принимает синхронизированные из портала обращения через интеграционный слой.", { x: x2 + 0.15, y: y2 + 0.45, w: cw - 0.3, h: ch - 0.55,
      color: C.DARK, fontSize: 10, fontFace: "Times New Roman" });
  }

  // Slide 5: Основные прецеденты (Use Cases) - таблица, не меняем
  {
    const s = cs(pres, "Состав прецедентов (Use Cases)");
    const ucs = [
      ["Актор", "Прецедент (Use Case)", "Описание сценария взаимодействия"],
      ["Клиент", "Вход по SMS OTP", "Двухфакторный безопасный вход без пароля по коду"],
      ["Клиент", "Создание обращения", "Оформление заявки на техподдержку с выбором конфигурации"],
      ["Клиент", "Просмотр списка", "Мониторинг статусов, поиск и фильтрация обращений"],
      ["Клиент", "Общение в чате", "Взаимодействие со специалистом в реальном времени"],
      ["Клиент", "Загрузить файл", "Прямая бинарная загрузка в MinIO S3 по временной ссылке"],
      ["Клиент", "Push-уведомления", "Получение мгновенных оповещений по WebSocket при изменении статуса обращения"],
      ["Менеджер", "Очередь тикетов", "Просмотр и фильтрация всех поступивших заявок"],
      ["Менеджер", "Взять в работу", "Назначение исполнителя и смена статуса в БД"],
      ["Менеджер", "Оценка часов", "Формирование сметы трудозатрат по обращению"],
      ["Менеджер", "Изменить статус", "Фиксация этапов выполнения (Выполнено, Закрыто)"]
    ];
    s.addTable([
      hdr(ucs[0]),
      ...ucs.slice(1).map((row, i) => dr(row, i % 2 === 0)),
    ], { x: MX, y: CY, w: CW, h: CH,
      fontSize: 11, fontFace: "Times New Roman",
      border: { pt: 0.5, color: C.ICE2 },
      colW: [1.8, 2.8, 4.56], rowH: 0.38 });
  }

  // Slide 6: Диаграмма прецедентов UML (не меняем, это графика)
  {
    const s = cs(pres, "Диаграмма прецедентов UML");
    // Border
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 1.8, y: CY, w: 7.2, h: CH,
      fill: { color: C.BG }, line: { color: C.NAVY, pt: 1.5 }, rectRadius: 0.08 });
    s.addText("«Система» client-portal", { x: 2.0, y: CY + 0.05, w: 6.8, h: 0.3,
      color: C.MUTED, fontSize: 9, italic: true, align: "center" });

    // Client UCs
    const clientUcs = ["Вход (SMS OTP)", "Создать обращение", "Просмотр списка", "Чат поддержки", "Загрузить файл", "Push-уведомления"];
    const ucx = 2.0, ucw = 2.2, uch = 0.44, startY = CY + 0.45;
    const gap = (CH - 0.45 - clientUcs.length * uch) / (clientUcs.length - 1);
    clientUcs.forEach((t, i) => {
      const y = startY + i * (uch + gap);
      s.addShape(pres.shapes.OVAL, { x: ucx, y, w: ucw, h: uch,
        fill: { color: C.ICE2 }, line: { color: C.TEAL, pt: 1.2 } });
      s.addText(t, { x: ucx, y, w: ucw, h: uch,
        color: C.DARK, fontSize: 8.5, align: "center", valign: "middle" });
    });

    // Support UCs
    const mgrUcs = ["Очередь тикетов", "Взять в работу", "Оценка часов", "Изменить статус"];
    const mgrx = 6.2, mgrw = 2.2;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: mgrx, y: CY + 0.45, w: mgrw, h: 0.32,
      fill: { color: C.NAVY }, line: { color: C.NAVY }, rectRadius: 0.05 });
    s.addText("Сотрудник / Менеджер", { x: mgrx, y: CY + 0.45, w: mgrw, h: 0.32,
      color: C.WHITE, fontSize: 9, bold: true, align: "center", valign: "middle" });
    let my = CY + 0.85;
    mgrUcs.forEach(t => {
      s.addShape(pres.shapes.OVAL, { x: mgrx, y: my, w: mgrw, h: uch,
        fill: { color: C.ICE }, line: { color: C.NAVY, pt: 1.2 } });
      s.addText(t, { x: mgrx, y: my, w: mgrw, h: uch,
        color: C.DARK, fontSize: 8.5, align: "center", valign: "middle" });
      my += uch + 0.08;
    });

    // Include/extend example oval in the middle
    s.addShape(pres.shapes.OVAL, { x: 4.4, y: CY + 1.6, w: 1.5, h: 0.44,
      fill: { color: C.ICE }, line: { color: C.MUTED, dashType: "dash", pt: 1 } });
    s.addText("Проверка прав\n<<include>>", { x: 4.4, y: CY + 1.6, w: 1.5, h: 0.44,
      color: C.DARK, fontSize: 8, align: "center", valign: "middle" });

    // Link from client Use Case to middle oval
    s.addShape(pres.shapes.LINE, { x: 4.2, y: CY + 1.5, w: 0.25, h: 0.2, line: { color: C.MUTED, dashType: "dash", pt: 1.2 } });

    // Client Stickman
    s.addShape(pres.shapes.OVAL, { x: 0.65, y: CY + 1.4, w: 0.25, h: 0.25, fill: { color: C.TEAL }, line: { color: C.TEAL } }); // Head
    s.addShape(pres.shapes.LINE, { x: 0.775, y: CY + 1.65, w: 0, h: 0.35, line: { color: C.TEAL, pt: 2 } }); // Spine
    s.addShape(pres.shapes.LINE, { x: 0.775, y: CY + 1.75, w: -0.15, h: -0.05, line: { color: C.TEAL, pt: 1.5 } }); // Left Arm
    s.addShape(pres.shapes.LINE, { x: 0.775, y: CY + 1.75, w: 0.15, h: -0.05, line: { color: C.TEAL, pt: 1.5 } }); // Right Arm
    s.addShape(pres.shapes.LINE, { x: 0.775, y: CY + 2.0, w: -0.15, h: 0.25, line: { color: C.TEAL, pt: 1.5 } }); // Left Leg
    s.addShape(pres.shapes.LINE, { x: 0.775, y: CY + 2.0, w: 0.15, h: 0.25, line: { color: C.TEAL, pt: 1.5 } }); // Right Leg
    s.addText("Клиент", { x: 0.2, y: CY + 2.3, w: 1.15, h: 0.3, color: C.TEAL, fontSize: 12, bold: true, align: "center" });
    // Line to the system boundary
    s.addShape(pres.shapes.LINE, { x: 1.1, y: CY + 1.8, w: 0.7, h: 0, line: { color: C.TEAL, pt: 1.5 } });

    // Employee Stickman
    s.addShape(pres.shapes.OVAL, { x: 8.95, y: CY + 1.4, w: 0.25, h: 0.25, fill: { color: C.NAVY }, line: { color: C.NAVY } }); // Head
    s.addShape(pres.shapes.LINE, { x: 9.075, y: CY + 1.65, w: 0, h: 0.35, line: { color: C.NAVY, pt: 2 } }); // Spine
    s.addShape(pres.shapes.LINE, { x: 9.075, y: CY + 1.75, w: -0.15, h: -0.05, line: { color: C.NAVY, pt: 1.5 } }); // Left Arm
    s.addShape(pres.shapes.LINE, { x: 9.075, y: CY + 1.75, w: 0.15, h: -0.05, line: { color: C.NAVY, pt: 1.5 } }); // Right Arm
    s.addShape(pres.shapes.LINE, { x: 9.075, y: CY + 2.0, w: -0.15, h: 0.25, line: { color: C.NAVY, pt: 1.5 } }); // Left Leg
    s.addShape(pres.shapes.LINE, { x: 9.075, y: CY + 2.0, w: 0.15, h: 0.25, line: { color: C.NAVY, pt: 1.5 } }); // Right Leg
    s.addText("Сотрудник", { x: 8.5, y: CY + 2.3, w: 1.15, h: 0.3, color: C.NAVY, fontSize: 12, bold: true, align: "center" });
    // Line to the system boundary
    s.addShape(pres.shapes.LINE, { x: 8.4, y: CY + 1.8, w: 0.5, h: 0, line: { color: C.NAVY, pt: 1.5 } });
  }

  // Slide 7: Спецификация UC-01 (таблица, не меняем)
  {
    const s = cs(pres, "UC-01: Создание обращения клиента");
    s.addTable([
      dr(["Характеристика", "Детали сценария прецедента UC-01"], false),
      dr(["Главный актор", "Представитель клиента (Клиент)"], true),
      dr(["Предусловия", "Клиент успешно прошел авторизацию OTP; активна форма 'Новое обращение'"], false),
      dr(["Основной поток", "1. Клиент выбирает конфигурацию 1С.\n2. Указывает тему и описывает проблему.\n3. Опционально прикрепляет файлы ошибок.\n4. Нажимает 'Отправить'."], true),
      dr(["Альтернативы", "Сбой валидации: поля подсвечиваются красным, отправка формы блокируется."], false),
      dr(["Постусловия", "Создана запись в таблице tickets со статусом 'Новое'; создано событие в outbox."], true),
    ], { x: MX, y: CY, w: CW, h: CH,
      fontSize: 12, fontFace: "Times New Roman", align: "left", valign: "top", 
      border: { pt: 0.5, color: C.ICE2 },
      colW: [2.0, 7.16], rowH: 0.72 });
  }

  // Slide 8: Спецификация UC-02 (таблица, не меняем)
  {
    const s = cs(pres, "UC-02: Чат в реальном времени");
    s.addTable([
      dr(["Характеристика", "Детали сценария прецедента UC-02"], false),
      dr(["Главные акторы", "Клиент и Специалист технической поддержки"], true),
      dr(["Предусловия", "Открыт экран 'Детали обращения', установлено WebSocket-соединение"], false),
      dr(["Основной поток", "1. Пользователь вводит текст в поле чата.\n2. Нажимает 'Отправить' (генерируется Idempotency-Key).\n3. Сообщение мгновенно доставляется второй стороне по протоколу WS."], true),
      dr(["Сбой сети", "WS разорван: сообщение сохраняется в LocalStorage и отправляется при реконнекте."], false),
      dr(["Постусловия", "Сообщение записано в БД с sync_status='synced', выведен статус доставки."], true),
    ], { x: MX, y: CY, w: CW, h: CH,
      fontSize: 12, fontFace: "Times New Roman", align: "left", valign: "top",
      border: { pt: 0.5, color: C.ICE2 },
      colW: [2.0, 7.16], rowH: 0.72 });
  }

  // Slide 9: Спецификация UC-03 (таблица, не меняем)
  {
    const s = cs(pres, "UC-03: Загрузка файлов в S3 MinIO");
    s.addTable([
      dr(["Характеристика", "Детали сценария прецедента UC-03"], false),
      dr(["Главный актор", "Представитель клиента (Клиент)"], true),
      dr(["Предусловия", "Выбран файл для прикрепления в форме чата или создания тикета"], false),
      dr(["Основной поток", "1. Фронтенд запрашивает временную presigned-ссылку у бэкенда.\n2. Бэкенд валидирует размер (<10MB) и тип файла.\n3. Фронтенд загружает файл методом PUT напрямую в S3 MinIO."], true),
      dr(["Альтернативы", "Превышен размер: выдается предупреждение, загрузка отклоняется."], false),
      dr(["Постусловия", "Файл успешно сохранен в S3 bucket, ссылка добавлена в таблицу attachments."], true),
    ], { x: MX, y: CY, w: CW, h: CH,
      fontSize: 12, fontFace: "Times New Roman", align: "left", valign: "top",
      border: { pt: 0.5, color: C.ICE2 },
      colW: [2.0, 7.16], rowH: 0.72 });
  }

  // Slide 10: Спецификация UC-04 (таблица, не меняем)
  {
    const s = cs(pres, "UC-04: Синхронизация обращений с 1С");
    s.addTable([
      dr(["Характеристика", "Детали сценария прецедента UC-04"], false),
      dr(["Главные акторы", "Сервис синхронизации (Sync Service) и база 1С"], true),
      dr(["Предусловия", "В PostgreSQL записана транзакция в таблицу outbox со статусом pending"], false),
      dr(["Основной поток", "1. Фоновый воркер каждые 5 секунд выбирает необработанные записи outbox.\n2. Передает данные о тикетах в симулятор 1С.\n3. При успешном ответе обновляет статус на 'processed'."], true),
      dr(["Ошибки связи", "Сервер 1С недоступен: попытка откладывается, включается экспоненциальный таймаут."], false),
      dr(["Постусловия", "Локальные обращения клиента синхронизированы с учетной базой компании."], true),
    ], { x: MX, y: CY, w: CW, h: CH,
      fontSize: 12, fontFace: "Times New Roman", align: "left", valign: "top",
      border: { pt: 0.5, color: C.ICE2 },
      colW: [2.0, 7.16], rowH: 0.72 });
  }

  // Slide 11: Трассировка прецедентов на API-маршруты (таблица, не меняем)
  {
    const s = cs(pres, "Трассировка прецедентов на API-маршруты");
    const routes = [
      ["Прецедент (Use Case)", "HTTP-метод", "Эндпоинт REST API", "Класс-валидатор Zod"],
      ["UC-02: Создание обращения", "POST", "/api/tickets", "CreateTicketSchema"],
      ["UC-04: Отправка сообщения", "POST", "/api/tickets/:id/messages", "SendMessageSchema"],
      ["UC-05: Временный S3-доступ", "POST", "/api/files/upload-request", "UploadRequestSchema"],
      ["UC-03: Получение списка", "GET", "/api/tickets", "GetTicketsQuerySchema"],
      ["UC-10: Изменить статус тикета", "PUT", "/api/tickets/:id", "UpdateTicketStatusSchema"],
    ];
    s.addTable([
      hdr(routes[0]),
      ...routes.slice(1).map((row, i) => dr(row, i % 2 === 0)),
    ], { x: MX, y: CY, w: CW, h: CH,
      fontSize: 12, fontFace: "Times New Roman", align: "left", valign: "top",
      border: { pt: 0.5, color: C.ICE2 },
      colW: [2.5, 1.2, 2.8, 2.66], rowH: 0.65 });
  }

  // Slide 12: Покрытие прецедентов автотестами (было две колонки -> одна)
  {
    const s = cs(pres, "Связь с приемочным тестированием (E2E)");
    card(s, pres, MX, CY, CW, CH, C.ICE);
    s.addText("Приёмочные сценарии Playwright и интеграционные проверки", {
      x: MX + 0.18, y: CY + 0.12, w: CW - 0.36, h: 0.45,
      color: C.NAVY, fontSize: 12, bold: true, fontFace: "Cambria", align: "left"
    });
    s.addText(
      "Приёмочные сценарии Playwright:\n" +
      "• Ключевые сценарии Use Cases покрыты приемочными сквозными тестами.\n" +
      "• Тест эмулирует клики пользователя, ввод текста и проверку UI-реакций.\n" +
      "• Проверяется сквозная цепочка: от создания на фронте до записи в СУБД.\n\n" +
      "Интеграционные сквозные проверки:\n" +
      "• Синхронизация Outbox с базой 1С тестируется через моки API.\n" +
      "• Проверка обработки сетевых разрывов при отправке чата WS.\n" +
      "• Верификация корректности загрузки файлов на мок-сервер S3 (MinIO).",
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
      "Разработка диаграммы прецедентов (Use Case Diagram) заложила надежный фундамент для всего проекта «Личный кабинет». " +
      "Она позволила точно определить роли пользователей, выявить 10 важнейших прецедентов, спроектировать " +
      "интеграционные потоки и связать требования бизнеса с техническими роутами API, автотестами и СУБД. " +
      "Благодаря этому обеспечена согласованность требований на всех стадиях жизненного цикла разработки.");
  }

  const outFile = path.join(outDir, "P1_Диаграмма_прецедентов.pptx");
  await pres.writeFile({ fileName: outFile });
  console.log("✓ P1:", outFile);
}

module.exports = { createP1 };

///////////////////////////////////////

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
      color: C.NAVY, fontSize: 14, bold: true, fontFace: "Cambria"
    });
    s.addText(
      "• Команда должна длительно поддерживать и масштабировать клиентский портал (интеграция с 1С, рост числа клиентов).\n\n" +
      "Конкретная задача моделирования:\n" +
      "• Определить и оценить внутренние атрибуты качества ПО (модульность, тестируемость, поддерживаемость, безопасность), важные именно для разработчиков и архитекторов проекта TPPO.",
      {
        x: MX + 0.18, y: CY + 0.65, w: CW - 0.36, h: CH - 0.9,
        color: C.DARK, fontSize: 18, fontFace: "Times New Roman", align: "left", valign: "top"
      }
    );
  }

  // Slide 2: Пользователь vs Разработчик (было две колонки -> одна)
  {
    const s = cs(pres, "Атрибуты качества: пользователь vs разработчик");
    card(s, pres, MX, CY, CW, CH, C.ICE);
    s.addText("Атрибуты качества: пользователь vs разработчик", {
      x: MX + 0.18, y: CY + 0.12, w: CW - 0.36, h: 0.45,
      color: C.NAVY, fontSize: 14, bold: true, fontFace: "Cambria"
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
        color: C.DARK, fontSize: 18, fontFace: "Times New Roman", align: "left", valign: "top"
      }
    );
  }

  // Slide 3: Ключевые атрибуты качества (сетка из 5 карточек, теперь с увеличенным шрифтом)
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
        color: C.NAVY, fontSize: 14, bold: true, fontFace: "Cambria" });
      s.addText(a.d, { x: x + 0.15, y: y + 0.42, w: cw - 0.3, h: rh - 0.5,
        color: C.DARK, fontSize: 14, fontFace: "Times New Roman", align: "left", valign: "top" });
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
      fontSize: 13, fontFace: "Times New Roman",
      border: { pt: 0.5, color: C.ICE2 },
      colW: [2.0, 3.2, 2.1, 1.86], rowH: 0.65 });
  }

  // Slide 4: Модульность: структура директорий (увеличен шрифт, выравнивание)
  {
    const s = cs(pres, "Модульность: структура директорий бэкенда");
    card(s, pres, MX, CY, 3.8, CH, C.ICE);
    s.addText("Преимущества структуры", { x: MX + 0.15, y: CY + 0.12, w: 3.5, h: 0.35,
      color: C.NAVY, fontSize: 14, bold: true, fontFace: "Cambria" });
    s.addText("• Разделение ответственности слоев.\n• Эндпоинты (routes) не содержат сырых запросов к SQL.\n• Вся бизнес-логика вынесена в сервисы (services).\n• Доступ к СУБД изолирован в слое миграций и репозиториев (db).", {
      x: MX + 0.15, y: CY + 0.55, w: 3.5, h: CH - 0.8, color: C.DARK, fontSize: 14, fontFace: "Times New Roman", align: "left", valign: "top" });

    codeBox(s, pres, MX + 4.1, CY, 5.06, CH,
      "backend/src/\n  ├── routes/         # REST API эндпоинты (контроллеры)\n  ├── services/       # Бизнес-логика, воркеры, синк\n  ├── middleware/     # Аутентификация, Zod-валидация\n  ├── config/         # Подключения (Postgres, MinIO, 1C)\n  ├── db/             # Схемы Drizzle ORM, миграции\n  ├── types/          # Общие типы данных TypeScript\n  └── index.ts        # Главный файл запуска сервера", 10.5);
  }

  // Slide 5: Изоляция слоев и слабая связанность (было две колонки -> одна)
  {
    const s = cs(pres, "Изоляция слоев и слабая связанность");
    card(s, pres, MX, CY, CW, CH, C.ICE);
    s.addText("Нарушение связанности (Плохой подход) vs Разделение слоев (Хороший подход)", {
      x: MX + 0.18, y: CY + 0.12, w: CW - 0.36, h: 0.45,
      color: C.NAVY, fontSize: 14, bold: true, fontFace: "Cambria"
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
        color: C.DARK, fontSize: 18, fontFace: "Times New Roman", align: "left", valign: "top"
      }
    );
  }

  // Slide 6: Тестируемость: стратегии мокирования (было две колонки -> одна)
  {
    const s = cs(pres, "Тестируемость: стратегии мокирования (Mocking)");
    card(s, pres, MX, CY, CW, CH, C.ICE);
    s.addText("Изоляция базы данных и имитация внешних систем", {
      x: MX + 0.18, y: CY + 0.12, w: CW - 0.36, h: 0.45,
      color: C.NAVY, fontSize: 14, bold: true, fontFace: "Cambria"
    });
    s.addText(
      "Изоляция базы данных:\n" +
      "Для тестирования роутов API реальная СУБД PostgreSQL подменяется мок-пулом `pg-mock`. Это исключает загрязнение тестовой базы данных и обеспечивает скорость выполнения тестов (миллисекунды вместо минут).\n\n" +
      "Имитация внешних систем (1С, MinIO):\n" +
      "• Вместо вызовов к боевому серверу 1С используется легковесный мок-сервер API.\n" +
      "• Пакет AWS SDK S3 настраивается на локальную заглушку, которая не загружает файлы в облако, а симулирует сохранение в оперативной памяти.",
      {
        x: MX + 0.18, y: CY + 0.65, w: CW - 0.36, h: CH - 0.9,
        color: C.DARK, fontSize: 18, fontFace: "Times New Roman", align: "left", valign: "top"
      }
    );
  }

  // Slide 7: Поддерживаемость: строгая типизация TypeScript (увеличен шрифт)
  {
    const s = cs(pres, "Поддерживаемость: типизация TypeScript");
    card(s, pres, MX, CY, 3.8, CH, C.ICE);
    s.addText("Преимущества типизации", { x: MX + 0.15, y: CY + 0.12, w: 3.5, h: 0.35,
      color: C.NAVY, fontSize: 14, bold: true, fontFace: "Cambria" });
    s.addText("• Обнаружение 90% глупых ошибок опечаток на этапе компиляции.\n• Удобное автодополнение (IntelliSense) в редакторах.\n• Безопасный рефакторинг: при изменении структуры полей компилятор сразу подсветит все ошибочные места.", {
      x: MX + 0.15, y: CY + 0.55, w: 3.5, h: CH - 0.8, color: C.DARK, fontSize: 14, fontFace: "Times New Roman", align: "left", valign: "top" });

    codeBox(s, pres, MX + 4.1, CY, 5.06, CH,
      "export interface ITicket {\n  id: string;\n  title: string;\n  description: string;\n  status: 'new' | 'active' | 'closed';\n  client_id: string;\n  version: number;\n  created_at: Date;\n}\n\nexport interface IMessage {\n  id: string;\n  ticket_id: string;\n  sender_id: string;\n  text: string;\n  sync_status: 'pending' | 'synced';\n}", 10);
  }

  // Slide 8: Поддерживаемость: Zod-валидация схем (увеличен шрифт)
  {
    const s = cs(pres, "Схемы валидации данных (Zod)");
    card(s, pres, MX, CY, 3.8, CH, C.ICE);
    s.addText("Безопасный парсинг данных", { x: MX + 0.15, y: CY + 0.12, w: 3.5, h: 0.35,
      color: C.NAVY, fontSize: 14, bold: true, fontFace: "Cambria" });
    s.addText("• Zod проверяет входящие HTTP-запросы (body, query, params) до выполнения логики.\n• Автоматически отсекает лишние поля (защита от mass assignment).\n• Преобразует строковые типы в числа/даты.\n• Из схем Zod автоматически выводятся типы TS (`z.infer<T>`).", {
      x: MX + 0.15, y: CY + 0.55, w: 3.5, h: CH - 0.8, color: C.DARK, fontSize: 14, fontFace: "Times New Roman", align: "left", valign: "top" });

    codeBox(s, pres, MX + 4.1, CY, 5.06, CH,
      "import { z } from 'zod';\n\nexport const CreateTicketSchema = z.object({\n  title: z.string().min(3).max(100),\n  description: z.string().min(10),\n  category: z.enum(['1C_ERP', '1C_Accounting', 'Other']),\n  attachments: z.array(z.string().uuid()).optional(),\n});\n\ntype CreateTicketDto = z.infer<typeof CreateTicketSchema>;", 10);
  }

  // Slide 9: Расширяемость: паттерны проектирования (было две колонки -> одна)
  {
    const s = cs(pres, "Расширяемость: плагины и паттерны");
    card(s, pres, MX, CY, CW, CH, C.ICE);
    s.addText("Паттерн Стратегия и слабая связанность хранилищ", {
      x: MX + 0.18, y: CY + 0.12, w: CW - 0.36, h: 0.45,
      color: C.NAVY, fontSize: 14, bold: true, fontFace: "Cambria"
    });
    s.addText(
      "Паттерн Стратегия (Strategy):\n" +
      "Для отправки уведомлений используется паттерн 'Стратегия'. Это позволяет легко добавить новый канал (например, Telegram, E-mail, Push) без изменения логики создания тикета. Достаточно зарегистрировать класс, реализующий интерфейс `INotificationProvider`.\n\n" +
      "Слабая связанность хранилищ файлов:\n" +
      "Интеграция с S3 скрыта за абстракцией `IFileStorage`. В процессе разработки мы используем локальный MinIO, но при развертывании в облаке можем переключиться на AWS S3 или Yandex Object Storage простым изменением переменной среды в `.env`.",
      {
        x: MX + 0.18, y: CY + 0.65, w: CW - 0.36, h: CH - 0.9,
        color: C.DARK, fontSize: 18, fontFace: "Times New Roman", align: "left", valign: "top"
      }
    );
  }

  // Slide 10: Безопасность: авторизация JWT + SMS OTP (было две колонки -> одна)
  {
    const s = cs(pres, "Безопасность: авторизация JWT + SMS OTP");
    card(s, pres, MX, CY, CW, CH, C.ICE);
    s.addText("Двухфакторный вход и Bearer JWT", {
      x: MX + 0.18, y: CY + 0.12, w: CW - 0.36, h: 0.45,
      color: C.NAVY, fontSize: 14, bold: true, fontFace: "Cambria", align: "left", valign: "top"
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
        color: C.DARK, fontSize: 18, fontFace: "Times New Roman", align: "left", valign: "top"
      }
    );
  }

  // Slide 11: Безопасность: защита от сетевых атак (было две колонки -> одна)
  {
    const s = cs(pres, "Безопасность: защита от сетевых атак");
    card(s, pres, MX, CY, CW, CH, C.ICE);
    s.addText("Защита данных и валидация трафика", {
      x: MX + 0.18, y: CY + 0.12, w: CW - 0.36, h: 0.45,
      color: C.NAVY, fontSize: 14, bold: true, fontFace: "Cambria", align: "left", valign: "top"
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
        color: C.DARK, fontSize: 18, fontFace: "Times New Roman", align: "left", valign: "top"
      }
    );
  }

  // Slide 12: Оптимистичная блокировка (было две колонки -> одна)
  {
    const s = cs(pres, "Многопользовательский доступ: Optimistic Locking");
    card(s, pres, MX, CY, CW, CH, C.ICE);
    s.addText("Зачем нужна блокировка и механизм версии", {
      x: MX + 0.18, y: CY + 0.12, w: CW - 0.36, h: 0.45,
      color: C.NAVY, fontSize: 14, bold: true, fontFace: "Cambria", align: "left", valign: "top"
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
        color: C.DARK, fontSize: 18, fontFace: "Times New Roman", align: "left", valign: "top"
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
      fontSize: 13, fontFace: "Times New Roman", align: "left", valign: "top",
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

/////////


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
      color: C.NAVY, fontSize: 14, bold: true, fontFace: "Cambria"
    });
    s.addText(
      "• Обеспечить стабильное взаимодействие Frontend, Backend, двух баз PostgreSQL, MinIO и внешней системы 1С.\n\n" +
      "Конкретная задача моделирования:\n" +
      "• Описать интерфейсы (контракты) между всеми подсистемами для достижения слабой связанности, масштабируемости и отказоустойчивости.",
      {
        x: MX + 0.18, y: CY + 0.65, w: CW - 0.36, h: CH - 0.9,
        color: C.DARK, fontSize: 18, fontFace: "Times New Roman", align: "left", valign: "top"
      }
    );
  }

  // Slide 2: Что такое интерфейс подсистемы? (было две колонки -> одна)
  {
    const s = cs(pres, "Что такое интерфейс подсистемы?");
    card(s, pres, MX, CY, CW, CH, C.ICE);
    s.addText("Понятие интерфейса-контракта и зачем его проектировать", {
      x: MX + 0.18, y: CY + 0.12, w: CW - 0.36, h: 0.45,
      color: C.NAVY, fontSize: 14, bold: true, fontFace: "Cambria"
    });
    s.addText(
      "Интерфейс — это четко определенная граница взаимодействия (стык) между независимыми частями системы. Он выступает в роли контракта: одна сторона обязуется предоставить данные строго определенного формата, а вторая — принять их.\n\n" +
      "Зачем проектировать интерфейсы?\n" +
      "• Полная инкапсуляция: скрытие деталей реализации подсистемы.\n" +
      "• Слабая связанность: замена бэкенда не ломает верстку фронтенда.\n" +
      "• Параллельная разработка команд по заранее согласованным мокам.",
      {
        x: MX + 0.18, y: CY + 0.65, w: CW - 0.36, h: CH - 0.9,
        color: C.DARK, fontSize: 18, fontFace: "Times New Roman", align: "left", valign: "top"
      }
    );
  }

  // Slide 3: Подсистемы в нашем проекте (изменен порядок нумерации и цвета)
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
    // Меняем порядок: сначала левый столбец (индексы 0,2,4), потом правый (1,3,5)
    const order = [0, 2, 4, 1, 3, 5]; // чтобы нумерация шла сверху вниз
    order.forEach((idx, i) => {
      const col = Math.floor(i / 3); // 0 для первых трех, 1 для следующих трех
      const row = i % 3;
      const x = MX + col * (cw + 0.2);
      const y = CY + row * (rh + 0.1);
      const fill = i % 2 === 0 ? C.ICE : C.GRNL; // чередование цветов
      card(s, pres, x, y, cw, rh, fill);
      s.addText(subs[idx].n, { x: x + 0.15, y: y + 0.08, w: cw - 0.3, h: 0.32,
        color: C.NAVY, fontSize: 14, bold: true, fontFace: "Cambria" });
      s.addText(subs[idx].d, { x: x + 0.15, y: y + 0.42, w: cw - 0.3, h: rh - 0.5,
        color: C.DARK, fontSize: 14, fontFace: "Times New Roman", align: "left", valign: "top" });
    });
  }

  // Остальные слайды без изменений (со старым кодом, только шрифты увеличены)
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
      fontSize: 13, fontFace: "Times New Roman", align: "left", valign: "top",
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
        color: C.NAVY, fontSize: 13, bold: true, align: "center", valign: "middle" });
    });
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
      fontSize: 13, fontFace: "Times New Roman", align: "left", valign: "top",
      border: { pt: 0.5, color: C.ICE2 },
      colW: [1.3, 2.2, 1.8, 3.86], rowH: 0.7 });
  }

  // Slide 7: Безопасность и проверка прав в REST API (было две колонки -> одна)
  {
    const s = cs(pres, "REST API: Безопасность и Middleware");
    card(s, pres, MX, CY, CW, CH, C.ICE);
    s.addText("Аутентификация, RBAC и защита API", {
      x: MX + 0.18, y: CY + 0.12, w: CW - 0.36, h: 0.45,
      color: C.NAVY, fontSize: 14, bold: true, fontFace: "Cambria"
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
        color: C.DARK, fontSize: 18, fontFace: "Times New Roman", align: "left", valign: "top"
      }
    );
  }

  // Slide 8: Интерфейс реального времени: WebSocket (было две колонки -> одна)
  {
    const s = cs(pres, "Интерфейс реального времени: WebSocket");
    card(s, pres, MX, CY, CW, CH, C.ICE);
    s.addText("Протокол, подключение и события WebSocket", {
      x: MX + 0.18, y: CY + 0.12, w: CW - 0.36, h: 0.45,
      color: C.NAVY, fontSize: 14, bold: true, fontFace: "Cambria", align: "left", valign: "top"
    });
    s.addText(
      "WebSocket обеспечивает постоянный двусторонний обмен данными без оверхеда HTTP-заголовков. При открытии карточки тикета клиент подключается к сокет-серверу и подписывается на комнату `ticket:<ticketId>`, отправляя событие `join`.\n\n" +
      "События WebSocket-сервиса:\n" +
      "• `message:send` — отправка нового сообщения в чат тикета.\n" +
      "• `message:receive` — получение сообщения от собеседника в реальном времени.\n" +
      "• `ticket:status_changed` — push-оповещение клиента о смене статуса обращения менеджером или базой 1С.",
      {
        x: MX + 0.18, y: CY + 0.65, w: CW - 0.36, h: CH - 0.9,
        color: C.DARK, fontSize: 18, fontFace: "Times New Roman", align: "left", valign: "top"
      }
    );
  }

  // Slide 9: Интерфейс хранилища файлов: S3 Presigned URLs (было две колонки -> одна)
  {
    const s = cs(pres, "Интерфейс хранилища файлов: S3 Presigned URLs");
    card(s, pres, MX, CY, CW, CH, C.ICE);
    s.addText("Проблема классического подхода и решение через presigned URLs", {
      x: MX + 0.18, y: CY + 0.12, w: CW - 0.36, h: 0.45,
      color: C.NAVY, fontSize: 14, bold: true, fontFace: "Cambria", align: "left", valign: "top"
    });
    s.addText(
      "Обычно файлы загружают на бэкенд API-сервера, а тот перекладывает их в хранилище. Это забивает дисковый кэш, перегружает оперативную память Node.js бинарным буфером данных и блокирует поток событий (Event Loop) при загрузке тяжелых логов или баз 1С.\n\n" +
      "Решение: Временные ссылки S3\n" +
      "1. Фронтенд шлет запрос на `/api/files/presigned-put`.\n" +
      "2. Бэкенд за миллисекунду генерирует криптографически подписанный URL с лимитом жизни 15 минут.\n" +
      "3. Фронтенд шлет бинарный файл напрямую в корзину MinIO. Бэкенд не нагружается.",
      {
        x: MX + 0.18, y: CY + 0.65, w: CW - 0.36, h: CH - 0.9,
        color: C.DARK, fontSize: 18, fontFace: "Times New Roman", align: "left", valign: "top"
      }
    );
  }

  // Slide 10: Интерфейс базы данных PostgreSQL (SQL/Drizzle) (было две колонки -> одна)
  {
    const s = cs(pres, "Интерфейс СУБД: Drizzle ORM + Пул соединений");
    card(s, pres, MX, CY, CW, CH, C.ICE);
    s.addText("Пул соединений и преимущества Drizzle ORM", {
      x: MX + 0.18, y: CY + 0.12, w: CW - 0.36, h: 0.45,
      color: C.NAVY, fontSize: 14, bold: true, fontFace: "Cambria"
    });
    s.addText(
      "Создание TCP-соединения с Postgres на каждый запрос — дорогая операция. Бэкенд инициализирует пул соединений `node-postgres` с лимитом от 10 до 20 активных сессий. Это позволяет мгновенно выполнять SQL-запросы за счет повторного использования открытых сокетов.\n\n" +
      "Преимущества Drizzle ORM:\n" +
      "• Полная типобезопасность возвращаемых строк.\n" +
      "• Отсутствие оверхеда традиционных тяжелых ORM (код Drizzle компилируется в эффективные нативные сырые SQL-запросы).\n" +
      "• Автоматическое управление миграциями и версионированием таблиц.",
      {
        x: MX + 0.18, y: CY + 0.65, w: CW - 0.36, h: CH - 0.9,
        color: C.DARK, fontSize: 18, fontFace: "Times New Roman", align: "left", valign: "top"
      }
    );
  }

  // Slide 11: 1С Интеграция: Outbox-паттерн (было две колонки -> одна)
  {
    const s = cs(pres, "Интеграция с 1С: Асинхронный Outbox Pattern");
    card(s, pres, MX, CY, CW, CH, C.ICE);
    s.addText("Проблема синхронной интеграции и решение Outbox", {
      x: MX + 0.18, y: CY + 0.12, w: CW - 0.36, h: 0.45,
      color: C.NAVY, fontSize: 14, bold: true, fontFace: "Cambria"
    });
    s.addText(
      "Если при нажатии кнопки 'Создать тикет' слать запрос напрямую в 1С по HTTP REST: при сбое связи, перегрузке или плановом перезапуске 1С клиент получит ошибку 500, а тикет будет потерян. Это недопустимо для бизнес-системы.\n\n" +
      "Асинхронное решение Outbox:\n" +
      "1. Тикет и событие в таблицу `outbox` пишутся в локальный Postgres в рамках одной ACID транзакции.\n" +
      "2. Фоновый воркер Node.js раз в 5с шлет события в симулятор 1С.\n" +
      "3. При успехе ставит статус `processed`. При сбое повторяет попытку с задержкой.",
      {
        x: MX + 0.18, y: CY + 0.65, w: CW - 0.36, h: CH - 0.9,
        color: C.DARK, fontSize: 18, fontFace: "Times New Roman", align: "left", valign: "top"
      }
    );
  }

  // Slide 12: Защита интерфейсов: CORS и Rate Limiting (было две колонки -> одна)
  {
    const s = cs(pres, "Защита стыков: CORS, Rate Limiting и Валидация");
    card(s, pres, MX, CY, CW, CH, C.ICE);
    s.addText("Ограничение запросов и контроль источников", {
      x: MX + 0.18, y: CY + 0.12, w: CW - 0.36, h: 0.45,
      color: C.NAVY, fontSize: 14, bold: true, fontFace: "Cambria"
    });
    s.addText(
      "Rate Limiting (Защита от DOS):\n" +
      "Чтобы злоумышленники не завалили базу запросами и не перегрузили СУБД, на бэкенде включен `express-rate-limit`. Ограничение: максимум 150 запросов в 1 минуту с одного IP-адреса. Для роутов отправки SMS-кодов лимит еще жестче: 3 запроса в минуту.\n\n" +
      "Cross-Origin Resource Sharing (CORS):\n" +
      "Бэкенд принимает запросы только со строго разрешенного списка доменов (White List), прописанных в переменной `CORS_ALLOWED_ORIGINS`. Попытки отправки AJAX-запросов со сторонних вредоносных фишинговых сайтов блокируются на уровне браузера.",
      {
        x: MX + 0.18, y: CY + 0.65, w: CW - 0.36, h: CH - 0.9,
        color: C.DARK, fontSize: 18, fontFace: "Times New Roman", align: "left", valign: "top"
      }
    );
  }

  // Slide 13: Заменяемость и масштабирование интерфейсов (было две колонки -> одна)
  {
    const s = cs(pres, "Гибкость и заменяемость интерфейсов");
    card(s, pres, MX, CY, CW, CH, C.ICE);
    s.addText("Замена S3-провайдера и масштабирование бэкенда", {
      x: MX + 0.18, y: CY + 0.12, w: CW - 0.36, h: 0.45,
      color: C.NAVY, fontSize: 14, bold: true, fontFace: "Cambria", align: "left", valign: "top"
    });
    s.addText(
      "Замена S3-провайдера за 1 минуту:\n" +
      "Поскольку загрузка файлов спроектирована по стандартному протоколу AWS S3 API, мы можем заменить локальный контейнер MinIO на коммерческое Яндекс.Облако (Yandex Object Storage) без изменения единой строчки кода бэкенда — просто изменив `S3_ENDPOINT` в `.env`.\n\n" +
      "Масштабирование бэкенда:\n" +
      "Так как бэкенд спроектирован по принципу 'Stateless' (состояние сессии не хранится в памяти Node.js, а пишется в СУБД Postgres), мы можем запустить 5 параллельных контейнеров Express за балансировщиком Nginx для распределения нагрузки.",
      {
        x: MX + 0.18, y: CY + 0.65, w: CW - 0.36, h: CH - 0.9,
        color: C.DARK, fontSize: 18, fontFace: "Times New Roman", align: "left", valign: "top"
      }
    );
  }

  // Slide 13.5: Отказоустойчивость интерфейсов и сбои (было две колонки -> одна)
  {
    const s = cs(pres, "Отказоустойчивость интерфейсов и сбои");
    card(s, pres, MX, CY, CW, CH, C.ICE);
    s.addText("Сбои сети и конфликты API", {
      x: MX + 0.18, y: CY + 0.12, w: CW - 0.36, h: 0.45,
      color: C.NAVY, fontSize: 14, bold: true, fontFace: "Cambria"
    });
    s.addText(
      "Сбои сетевого подключения (Offline-First WS):\n" +
      "При отсутствии интернета во время отправки сообщений по WebSocket, чат-клиент временно сохраняет сообщение в LocalStorage и включает статус 'Ожидание сети'. После реконнекта сокета сообщения отправляются автоматически с сохранением исходного порядка.\n\n" +
      "Конфликты API (Optimistic Locking):\n" +
      "Если клиент и менеджер редактируют одно обращение через REST-интерфейс одновременно, бэкенд сверяет поле 'version'. Первая транзакция успешно фиксируется, а второй возвращается код ошибки 409 Conflict с предложением обновить форму.",
      {
        x: MX + 0.18, y: CY + 0.65, w: CW - 0.36, h: CH - 0.9,
        color: C.DARK, fontSize: 18, fontFace: "Times New Roman", align: "left", valign: "top"
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



////


"use strict";
const path = require("path");
const { C, MX, MY, TH, CY, CH, CW, newPres, addCover, cs, hdr, dr, card, conclusionBanner } = require("./design.cjs");

async function createP4(outDir) {
  const pres = newPres("P4 — Языки моделирования");

  // Slide 1: Cover
  addCover(pres, "Тема 4", "Языки моделирования\nModeling Languages");

  // === Новый слайд: Постановка задачи ===
  {
    const s = cs(pres, "Постановка задачи моделирования");
    card(s, pres, MX, CY, CW, CH, C.ICE);
    s.addText("Постановка практической задачи", {
      x: MX + 0.18, y: CY + 0.12, w: CW - 0.36, h: 0.45,
      color: C.NAVY, fontSize: 12, bold: true, fontFace: "Cambria"
    });
    s.addText(
      "• Необходимо формализовать требования и архитектуру до начала активной разработки.\n\n" +
      "Конкретная задача моделирования:\n" +
      "• Выбрать и применить подходящие языки и нотации моделирования (прежде всего UML) для создания трассируемых моделей от требований до кода в проекте TPPO.",
      {
        x: MX + 0.18, y: CY + 0.65, w: CW - 0.36, h: CH - 0.9,
        color: C.DARK, fontSize: 16, fontFace: "Times New Roman", align: "left", valign: "top"
      }
    );
  }

  // Slide 2: Что такое язык моделирования? (было две колонки -> одна)
  {
    const s = cs(pres, "Что такое язык моделирования?");
    card(s, pres, MX, CY, CW, CH, C.ICE);
    s.addText("Сущность моделирования и цели абстрагирования", {
      x: MX + 0.18, y: CY + 0.12, w: CW - 0.36, h: 0.45,
      color: C.NAVY, fontSize: 12, bold: true, fontFace: "Cambria"
    });
    s.addText(
      "Язык моделирования — это искусственная графическая или текстовая система обозначений, предназначенная для описания структуры, поведения и процессов сложных программных и организационных систем.\n\n" +
      "Основным промышленным стандартом в ИТ является UML (Unified Modeling Language).\n\n" +
      "Зачем абстрагировать систему?\n" +
      "• Абстрагирование от низкоуровневого JS/TS кода.\n" +
      "• Создание единой ментальной карты (карта архитектуры) проекта.\n" +
      "• Ускорение адаптации новых разработчиков в команду.",
      {
        x: MX + 0.18, y: CY + 0.65, w: CW - 0.36, h: CH - 0.9,
        color: C.DARK, fontSize: 16, fontFace: "Times New Roman", align: "left", valign: "top"
      }
    );
  }

  // Slide 3: Использование UML в ТППО (было две колонки -> одна)
  {
    const s = cs(pres, "Моделирование в курсе ТППО");
    card(s, pres, MX, CY, CW, CH, C.ICE);
    s.addText("Цели применения в проекте и преимущества", {
      x: MX + 0.18, y: CY + 0.12, w: CW - 0.36, h: 0.45,
      color: C.NAVY, fontSize: 12, bold: true, fontFace: "Cambria"
    });
    s.addText(
      "Цели применения в проекте:\n" +
      "В процессе проектирования «Личного кабинета» для клиентов компании ООО «Неосистемы Северо-Запад» моделирование использовалось для формализации требований перед кодингом. Это позволило избежать архитектурных тупиков при сопряжении баз данных (PostgreSQL и 1С) и файлов MinIO.\n\n" +
      "Что дает проектирование до кода?\n" +
      "• 95% ошибок проектирования выявляются 'на бумаге'.\n" +
      "• Стоимость исправления модели в 100 раз дешевле переписывания кода.\n" +
      "• Четко зафиксированные JSON-контракты интеграции.",
      {
        x: MX + 0.18, y: CY + 0.65, w: CW - 0.36, h: CH - 0.9,
        color: C.DARK, fontSize: 16, fontFace: "Times New Roman", align: "left", valign: "top"
      }
    );
  }

  // Slide 4: Таблица используемых диаграмм (не меняем)
  {
    const s = cs(pres, "Матрица UML диаграмм в проекте");
    const matrix = [
      ["Тип диаграммы", "Аспект моделирования", "Что описано в client-portal"],
      ["Диаграмма прецедентов", "Функциональные требования", "Роли Клиента и Менеджера, 10 ключевых Use Cases"],
      ["Диаграмма компонентов", "Статическая архитектура", "Стыковка Backend, React Frontend, Postgres, S3 MinIO"],
      ["Диаграмма классов", "Статическая структура кода", "Сущности БД: User, Ticket, Message, File и связи"],
      ["Диаграмма последовательности", "Динамическое поведение", "Сценарий синхронизации тикета с СУБД 1С во времени"],
    ];
    s.addTable([
      hdr(matrix[0]),
      ...matrix.slice(1).map((row, i) => dr(row, i % 2 === 0)),
    ], { x: MX, y: CY, w: CW, h: CH,
      fontSize: 12, fontFace: "Times New Roman", align: "left", valign: "top",
      border: { pt: 0.5, color: C.ICE2 },
      colW: [2.5, 2.5, 4.16], rowH: 0.7 });
  }

  // Slide 5: UML Use Case Diagram (было две колонки -> одна)
  {
    const s = cs(pres, "UML Use Case Diagram: Моделирование требований");
    card(s, pres, MX, CY, CW, CH, C.ICE);
    s.addText("Характеристики Use Case моделей и основные сценарии", {
      x: MX + 0.18, y: CY + 0.12, w: CW - 0.36, h: 0.45,
      color: C.NAVY, fontSize: 12, bold: true, fontFace: "Cambria"
    });
    s.addText(
      "Диаграмма прецедентов фиксирует требования со стороны внешнего мира. Она определяет, КТО (акторы) и ЧТО (прецеденты) делает в системе.\n\n" +
      "Наши акторы:\n" +
      "• Представитель клиента (Клиент)\n" +
      "• Специалист поддержки (Менеджер)\n" +
      "• Утверждающий (client_approver)\n" +
      "• Диспетчер (dispatcher)\n" +
      "• Администратор (admin)\n\n" +
      "Основные сценарии в фокусе:\n" +
      "• Двухэтапная аутентификация (пароль + SMS OTP).\n" +
      "• Создание тикета техподдержки с файлами ошибок.\n" +
      "• Мгновенное общение через веб-чат WebSockets.\n" +
      "• Синхронизация карточек обращений с репликой 1С.",
      {
        x: MX + 0.18, y: CY + 0.65, w: CW - 0.36, h: CH - 0.9,
        color: C.DARK, fontSize: 16, fontFace: "Times New Roman", align: "left", valign: "top"
      }
    );
  }

  // Slide 6: UML Component Diagram (было две колонки -> одна)
  {
    const s = cs(pres, "UML Component Diagram: Модульная архитектура");
    card(s, pres, MX, CY, CW, CH, C.ICE);
    s.addText("Назначение диаграммы компонентов и список компонентов", {
      x: MX + 0.18, y: CY + 0.12, w: CW - 0.36, h: 0.45,
      color: C.NAVY, fontSize: 12, bold: true, fontFace: "Cambria"
    });
    s.addText(
      "Диаграмма показывает разделение кодовой базы на физические сборочные единицы (компоненты) и их интерфейсные стыки.\n\n" +
      "Предоставляемые интерфейсы (кружки 'lollipop') скрывают детали СУБД, а требуемые интерфейсы (полукружки) заставляют фронтенд соблюдать REST-контракты.\n\n" +
      "Компоненты client-portal:\n" +
      "• React Frontend — браузерный SPA-бандл.\n" +
      "• Node.js Express Backend — API сервер.\n" +
      "• PostgreSQL Database — внутреннее хранилище.\n" +
      "• MinIO S3 Storage — файловый архив.\n" +
      "• 1C Simulator — имитация ERP учетной системы.",
      {
        x: MX + 0.18, y: CY + 0.65, w: CW - 0.36, h: CH - 0.9,
        color: C.DARK, fontSize: 16, fontFace: "Times New Roman", align: "left", valign: "top"
      }
    );
  }

  // Slide 7: UML Class Diagram (графика, не меняем)
  {
    const s = cs(pres, "UML Class Diagram (с отображением структуры данных)");
    // visual classes using simple rectangle cards
    const classes = [
      { x: 0.5, y: CY + 0.3, w: 2.0, h: 1.8, name: "User (Пользователь)", attrs: "+ id: UUID\n+ phone: string\n+ name: string\n+ role: enum", meth: "+ login()\n+ updateProfile()" },
      { x: 3.2, y: CY + 0.3, w: 2.2, h: 1.8, name: "Ticket (Обращение)", attrs: "+ id: UUID\n+ title: string\n+ status: string\n+ version: integer", meth: "+ create()\n+ updateStatus()" },
      { x: 6.1, y: CY + 0.3, w: 2.2, h: 1.8, name: "Message (Сообщение)", attrs: "+ id: UUID\n+ text: string\n+ sent_at: timestamp\n+ sync_status: enum", meth: "+ sendMessage()" },
      { x: 8.5, y: CY + 0.3, w: 1.8, h: 1.8, name: "File (Файл)", attrs: "+ id: UUID\n+ mime_type: string\n+ storage_path: string", meth: "+ requestUpload()\n+ confirm()" },
    ];
    classes.forEach(c => {
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: c.x, y: c.y, w: c.w, h: c.h,
        fill: { color: C.ICE }, line: { color: C.NAVY, pt: 1 }, rectRadius: 0.08 });
      s.addText(c.name, { x: c.x, y: c.y, w: c.w, h: 0.35,
        color: C.WHITE, fill: { color: C.NAVY }, fontSize: 10, bold: true, align: "center", valign: "middle" });
      s.addText(c.attrs, { x: c.x + 0.1, y: c.y + 0.4, w: c.w - 0.2, h: 0.9,
        color: C.DARK, fontSize: 8.5, fontFace: "Courier New", align: "left", valign: "top" });
      s.addText(c.meth, { x: c.x + 0.1, y: c.y + 1.35, w: c.w - 0.2, h: 0.4,
        color: C.TEAL, fontSize: 8.5, fontFace: "Courier New", align: "left", valign: "top" });
    });
    // lines with arrowheads and multiplicities
    // User ↔ Ticket association
    s.addShape(pres.shapes.LINE, { x: 2.5, y: CY + 1.2, w: 0.7, h: 0, line: { color: C.NAVY, pt: 1.5, endArrowType: "triangle" } });
    s.addText("1", { x: 2.55, y: CY + 0.95, w: 0.2, h: 0.2, color: C.MUTED, fontSize: 8, bold: true });
    s.addText("0..*", { x: 2.95, y: CY + 0.95, w: 0.3, h: 0.2, color: C.MUTED, fontSize: 8, bold: true });
    s.addText("создает", { x: 2.5, y: CY + 1.25, w: 0.7, h: 0.2, color: C.TEAL, fontSize: 7.5, bold: true, align: "center" });

    // Ticket ↔ Message association
    s.addShape(pres.shapes.LINE, { x: 5.4, y: CY + 1.2, w: 0.7, h: 0, line: { color: C.NAVY, pt: 1.5, endArrowType: "triangle" } });
    s.addText("1", { x: 5.45, y: CY + 0.95, w: 0.2, h: 0.2, color: C.MUTED, fontSize: 8, bold: true });
    s.addText("0..*", { x: 5.85, y: CY + 0.95, w: 0.3, h: 0.2, color: C.MUTED, fontSize: 8, bold: true });
    s.addText("содержит", { x: 5.4, y: CY + 1.25, w: 0.7, h: 0.2, color: C.TEAL, fontSize: 7.5, bold: true, align: "center" });

    // Message ↔ File association
    s.addShape(pres.shapes.LINE, { x: 8.3, y: CY + 1.2, w: 0.2, h: 0, line: { color: C.NAVY, pt: 1.5, endArrowType: "triangle" } });
    s.addText("1", { x: 8.32, y: CY + 0.95, w: 0.1, h: 0.2, color: C.MUTED, fontSize: 8, bold: true });
    s.addText("0..*", { x: 8.42, y: CY + 0.95, w: 0.1, h: 0.2, color: C.MUTED, fontSize: 8, bold: true });
    s.addText("имеет", { x: 8.25, y: CY + 1.25, w: 0.3, h: 0.2, color: C.TEAL, fontSize: 7, bold: true, align: "center" });
  }

  // Slide 8: UML Sequence Diagram (было две колонки -> одна)
  {
    const s = cs(pres, "UML Sequence Diagram: Динамика синхронизации");
    card(s, pres, MX, CY, CW, CH, C.ICE);
    s.addText("Поток событий (Sequence) и его важность", {
      x: MX + 0.18, y: CY + 0.12, w: CW - 0.36, h: 0.45,
      color: C.NAVY, fontSize: 12, bold: true, fontFace: "Cambria"
    });
    s.addText(
      "Диаграмма последовательности показывает жизненный цикл во времени:\n\n" +
      "1. Клиент нажимает кнопку 'Отправить'.\n" +
      "2. Фронтенд отправляет POST-запрос на Бэкенд.\n" +
      "3. Бэкенд пишет тикет в PostgreSQL.\n" +
      "4. Бэкенд пишет транзакцию в Outbox.\n" +
      "5. Фоновый воркер асинхронно передает данные в 1С.\n\n" +
      "Почему важен этот сценарий?\n" +
      "• Визуализирует временные задержки и асинхронные границы.\n" +
      "• Четко разделяет синхронный клиентский шаг и асинхронный фоновый шаг синхронизации с 1С.\n" +
      "• Позволяет легко выявить потенциальные места зависаний (timeouts) и сетевых сбоев.",
      {
        x: MX + 0.18, y: CY + 0.65, w: CW - 0.36, h: CH - 0.9,
        color: C.DARK, fontSize: 16, fontFace: "Times New Roman", align: "left", valign: "top"
      }
    );
  }

  // Slide 9: ERD (Entity-Relationship Diagram) (было две колонки -> одна)
  {
    const s = cs(pres, "ERD: Реляционная схема базы данных");
    card(s, pres, MX, CY, CW, CH, C.ICE);
    s.addText("ER-моделирование данных и ключевые сущности", {
      x: MX + 0.18, y: CY + 0.12, w: CW - 0.36, h: 0.45,
      color: C.NAVY, fontSize: 12, bold: true, fontFace: "Cambria"
    });
    s.addText(
      "В отличие от абстрактной диаграммы классов UML, ERD описывает физическую структуру таблиц СУБД PostgreSQL.\n\n" +
      "Здесь четко фиксируются первичные ключи (Primary Keys, UUID), внешние ключи (Foreign Keys) и индексы для оптимизации запросов поиска.\n\n" +
      "Ключевые сущности (Таблицы БД):\n" +
      "• users — данные пользователей (телефон, имя, роль).\n" +
      "• tickets — обращения клиентов (id, статус, version).\n" +
      "• messages — сообщения чата (id, текст, timestamp).\n" +
      "• attachments — файлы из S3 (id, mime, path).\n" +
      "• outbox — транзакционная очередь отправки в 1С.",
      {
        x: MX + 0.18, y: CY + 0.65, w: CW - 0.36, h: CH - 0.9,
        color: C.DARK, fontSize: 16, fontFace: "Times New Roman", align: "left", valign: "top"
      }
    );
  }

  // Slide 10: BPMN (Business Process Model and Notation) (было две колонки -> одна)
  {
    const s = cs(pres, "BPMN: Жизненный цикл обращения клиента");
    card(s, pres, MX, CY, CW, CH, C.ICE);
    s.addText("Зачем использовать BPMN и событийные статусы заявки", {
      x: MX + 0.18, y: CY + 0.12, w: CW - 0.36, h: 0.45,
      color: C.NAVY, fontSize: 12, bold: true, fontFace: "Cambria"
    });
    s.addText(
      "UML не очень хорошо подходит для бизнес-процессов. Нотация BPMN 2.0 использовалась нами для описания сквозного workflow прохождения заявки.\n\n" +
      "Это позволяет согласовать регламенты работы службы техподдержки с алгоритмами переключения статусов в базе данных.\n\n" +
      "Событийные статусы заявки:\n" +
      "• Создано (New) — клиент отправил заявку.\n" +
      "• В работе (Active) — менеджер назначил специалиста.\n" +
      "• Ожидание оценки — специалист оценивает часы.\n" +
      "• Выполнено (Closed) — работа завершена.\n" +
      "• Переоткрыто (Reopened) — проблема клиента осталась.",
      {
        x: MX + 0.18, y: CY + 0.65, w: CW - 0.36, h: CH - 0.9,
        color: C.DARK, fontSize: 16, fontFace: "Times New Roman", align: "left", valign: "top"
      }
    );
  }

  // Slide 11: Diagrams as Code: PlantUML & Mermaid (card + codeBox, не меняем)
  {
    const s = cs(pres, "Diagrams as Code: PlantUML & Mermaid.js");
    card(s, pres, MX, CY, 4.4, CH, C.ICE);
    s.addText("Сущность подхода", { x: MX + 0.18, y: CY + 0.12, w: 4.04, h: 0.40,
      color: C.NAVY, fontSize: 12, bold: true, fontFace: "Cambria" });
    s.addText("Вместо рисования мышкой в тяжелых редакторах, мы описываем архитектуру текстом (кодом). Специальные движки PlantUML или Mermaid автоматически генерируют красивую векторную SVG/PNG диаграмму.\n\nКод диаграмм хранится прямо в Git-репозитории проекта.", { x: MX + 0.18, y: CY + 0.62, w: 4.04, h: 3.2,
      color: C.DARK, fontSize: 16, fontFace: "Times New Roman", align: "left", valign: "top" });

    const { codeBox } = require("./design.cjs");
    codeBox(s, pres, MX + 4.7, CY, 4.46, CH,
      "@startuml\n" +
      "class User {\n" +
      "  + id: UUID\n" +
      "  + phone: string\n" +
      "}\n" +
      "class Ticket {\n" +
      "  + id: UUID\n" +
      "  + title: string\n" +
      "}\n" +
      "class Message {\n" +
      "  + id: UUID\n" +
      "  + text: string\n" +
      "}\n" +
      "User \"1\" *-- \"0..*\" Ticket : создаёт\n" +
      "Ticket \"1\" *-- \"0..*\" Message : содержит\n" +
      "@endum", 10.5);
  }

  // Slide 12: Сравнение инструментов и подходов (таблица, не меняем)
  {
    const s = cs(pres, "Сравнение инструментов моделирования");
    const matrix = [
      ["Критерий", "Визуальные (Draw.io, Miro)", "Кодовые (PlantUML, Mermaid)"],
      ["Скорость старта", "Быстро (drag & drop)", "Требуется изучение синтаксиса"],
      ["Командная работа", "Сложно мержить XML-файлы", "Просто (стандартные текстовые коммиты)"],
      ["Сопровождение", "Трудно перерисовывать при росте", "Мгновенно (автоматическая перекомпоновка)"],
      ["Интеграция в CI/CD", "Невозможна", "Простая (автогенерация схем в пайплайне)"],
      ["Версионирование", "Бинарные или тяжелые XML", "Легковесный Markdown/PUML код"],
    ];
    s.addTable([
      hdr(matrix[0]),
      ...matrix.slice(1).map((row, i) => dr(row, i % 2 === 0)),
    ], { x: MX, y: CY, w: CW, h: CH,
      fontSize: 11, fontFace: "Times New Roman", align: "left", valign: "top",
      border: { pt: 0.5, color: C.ICE2 },
      colW: [2.5, 3.3, 3.36], rowH: 0.65 });
  }

  // Slide 13: Трассировка моделей на физический код (было две колонки -> одна)
  {
    const s = cs(pres, "Трассировка моделей на физический код");
    card(s, pres, MX, CY, CW, CH, C.ICE);
    s.addText("UML Class → Drizzle ORM Schema и UML Component → Docker-контейнеры", {
      x: MX + 0.18, y: CY + 0.12, w: CW - 0.36, h: 0.45,
      color: C.NAVY, fontSize: 12, bold: true, fontFace: "Cambria"
    });
    s.addText(
      "UML Class → Drizzle ORM Schema:\n" +
      "Связи 1-ко-многим между сущностями `User`, `Ticket` и `Message` на диаграмме классов UML преобразуются в реальные связи `foreign key` в файле описания схемы БД `/db/schema.ts`.\n\n" +
      "Каждому атрибуту класса сопоставляется строгий тип поля (UUID, text, integer, timestamp).\n\n" +
      "UML Component → Docker-контейнеры:\n" +
      "Каждый отдельный прямоугольник-компонент на нашей UML Component Diagram запускается как изолированный процесс в своем собственном контейнере Docker. Сборка и сетевые мосты (bridges) между ними описываются в конфигурационном манифесте `docker-compose.yml`.",
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
      "Использование стандартизованных языков моделирования (UML, ERD, BPMN) совместно с концепцией Diagrams as Code " +
      "позволило спроектировать Личный кабинет структурированным, масштабируемым и поддерживаемым. " +
      "Модели предметной области послужили прямым техническим заданием для создания реляционной схемы в PostgreSQL, " +
      "диаграмма компонентов определила чистую топологию контейнеров Docker, а BPMN-схема гарантировала корректность бизнес-логики.");
  }

  const outFile = path.join(outDir, "P4_Языки_моделирования.pptx");
  await pres.writeFile({ fileName: outFile });
  console.log("✓ P4:", outFile);
}

module.exports = { createP4 };


///

"use strict";
const path = require("path");
const { C, MX, MY, TH, CY, CH, CW, newPres, addCover, cs, hdr, dr, card, conclusionBanner } = require("./design.cjs");

async function createP5(outDir) {
  const pres = newPres("P5 — Модель функциональных точек");

  // Slide 1: Cover
  addCover(pres, "Тема 5", "Модель функциональных точек\nFunction Point Analysis");

  // === Новый слайд: Постановка задачи ===
  {
    const s = cs(pres, "Постановка задачи моделирования");
    card(s, pres, MX, CY, CW, CH, C.ICE);
    s.addText("Постановка практической задачи", {
      x: MX + 0.18, y: CY + 0.12, w: CW - 0.36, h: 0.45,
      color: C.NAVY, fontSize: 14, bold: true, fontFace: "Cambria"
    });
    s.addText(
      "• Оценить трудоёмкость и сроки разработки клиентского портала.\n\n" +
      "Конкретная задача моделирования:\n" +
      "• Применить метод функциональных точек (FPA) к реальным функциям проекта TPPO и получить обоснованную оценку объёма работ.",
      {
        x: MX + 0.18, y: CY + 0.65, w: CW - 0.36, h: CH - 0.9,
        color: C.DARK, fontSize: 18, fontFace: "Times New Roman", align: "left", valign: "top"
      }
    );
  }

  // Slide 2: Что такое функциональные точки? (было две колонки -> одна)
  {
    const s = cs(pres, "Что такое функциональные точки?");
    card(s, pres, MX, CY, CW, CH, C.ICE);
    s.addText("Сущность метода FPA и его применение", {
      x: MX + 0.18, y: CY + 0.12, w: CW - 0.36, h: 0.45,
      color: C.NAVY, fontSize: 14, bold: true, fontFace: "Cambria"
    });
    s.addText(
      "Метод функциональных точек (Function Point Analysis, FPA) по стандарту IFPUG — это методика измерения размера ПО с точки зрения логических функций, предоставляемых конечному пользователю.\n\n" +
      "В отличие от оценки в LOC (строках кода), FPA не зависит от языка программирования, фреймворков и опыта программистов.\n\n" +
      "Для чего применяется оценка?\n" +
      "• Объективная оценка объема работ на стадии ТЗ.\n" +
      "• Планирование бюджетов, сроков и численности команды.\n" +
      "• Сравнение производительности разных команд в компании.",
      {
        x: MX + 0.18, y: CY + 0.65, w: CW - 0.36, h: CH - 0.9,
        color: C.DARK, fontSize: 18, fontFace: "Times New Roman", align: "left", valign: "top"
      }
    );
  }

  // Slide 3: Пять типов компонентов (IFPUG) (было две колонки -> одна)
  {
    const s = cs(pres, "Пять типов компонентов (IFPUG)");
    card(s, pres, MX, CY, CW, CH, C.ICE);
    s.addText("Функции транзакций и функции данных", {
      x: MX + 0.18, y: CY + 0.12, w: CW - 0.36, h: 0.45,
      color: C.NAVY, fontSize: 14, bold: true, fontFace: "Cambria"
    });
    s.addText(
      "Функции транзакций:\n" +
      "• EI (External Inputs) — входящие транзакции: ввод или изменение данных пользователем.\n" +
      "• EO (External Outputs) — выходящие транзакции: выдача данных с расчетом, обработкой или уведомлениями.\n" +
      "• EQ (External Queries) — внешние запросы: просмотр и поиск без изменения базы данных.\n\n" +
      "Функции данных:\n" +
      "• ILF (Internal Logical Files) — внутренние логические группы данных, полностью управляемые нашей системой (таблицы СУБД).\n" +
      "• EIF (External Interface Files) — внешние логические файлы, читаемые из сторонних систем (интеграционная реплика базы данных 1С).",
      {
        x: MX + 0.18, y: CY + 0.65, w: CW - 0.36, h: CH - 0.9,
        color: C.DARK, fontSize: 18, fontFace: "Times New Roman", align: "left", valign: "top"
      }
    );
  }

  // Slide 4: EI (External Inputs) в проекте (было две колонки -> одна)
  {
    const s = cs(pres, "EI (External Inputs): Вводы данных");
    card(s, pres, MX, CY, CW, CH, C.ICE);
    s.addText("Определение EI и примеры в client-portal", {
      x: MX + 0.18, y: CY + 0.12, w: CW - 0.36, h: 0.45,
      color: C.NAVY, fontSize: 14, bold: true, fontFace: "Cambria"
    });
    s.addText(
      "Внешний ввод — это элементарный процесс, в котором данные пересекают границу системы извне для добавления, изменения или удаления записей в логических файлах ILF.\n\n" +
      "Примеры в client-portal:\n" +
      "• Форма создания нового обращения клиентом (POST /api/tickets).\n" +
      "• Форма верификации SMS-кода OTP при входе.\n" +
      "• Отправка нового сообщения в чат тикета (POST /api/messages).\n" +
      "• Изменение личных данных пользователя в настройках профиля.",
      {
        x: MX + 0.18, y: CY + 0.65, w: CW - 0.36, h: CH - 0.9,
        color: C.DARK, fontSize: 18, fontFace: "Times New Roman", align: "left", valign: "top"
      }
    );
  }

  // Slide 5: EO (External Outputs) в проекте (было две колонки -> одна)
  {
    const s = cs(pres, "EO (External Outputs): Выводы данных");
    card(s, pres, MX, CY, CW, CH, C.ICE);
    s.addText("Определение EO и примеры в client-portal", {
      x: MX + 0.18, y: CY + 0.12, w: CW - 0.36, h: 0.45,
      color: C.NAVY, fontSize: 14, bold: true, fontFace: "Cambria"
    });
    s.addText(
      "Внешний вывод — это процесс, отправляющий результаты расчетов или подготовленные данные за пределы системы. Логика обязательно должна содержать математические расчеты или изменение состояний.\n\n" +
      "Примеры в client-portal:\n" +
      "• Мгновенные оповещения в браузере о смене статусов обращений через WebSocket.\n" +
      "• Формирование сводного PDF-отчета по затраченному времени на техподдержку.\n" +
      "• Автоматическая отправка уведомления клиенту о назначенном специалисте.",
      {
        x: MX + 0.18, y: CY + 0.65, w: CW - 0.36, h: CH - 0.9,
        color: C.DARK, fontSize: 18, fontFace: "Times New Roman", align: "left", valign: "top"
      }
    );
  }

  // Slide 6: EQ (External Queries) в проекте (было две колонки -> одна)
  {
    const s = cs(pres, "EQ (External Queries): Внешние запросы");
    card(s, pres, MX, CY, CW, CH, C.ICE);
    s.addText("Определение EQ и примеры в client-portal", {
      x: MX + 0.18, y: CY + 0.12, w: CW - 0.36, h: 0.45,
      color: C.NAVY, fontSize: 14, bold: true, fontFace: "Cambria"
    });
    s.addText(
      "Внешний запрос — это процесс вывода данных, который считывает записи из ILF/EIF, но не выполняет никаких математических расчетов, формул или изменений состояния.\n\n" +
      "Примеры в client-portal:\n" +
      "• Просмотр постраничного списка своих обращений с фильтрацией (GET /api/tickets).\n" +
      "• Отображение карточки конкретного тикета с историей переписки.\n" +
      "• Чтение настроек профиля и каналов уведомлений.\n" +
      "• Поиск по ключевым словам в справочнике конфигураций 1С.",
      {
        x: MX + 0.18, y: CY + 0.65, w: CW - 0.36, h: CH - 0.9,
        color: C.DARK, fontSize: 18, fontFace: "Times New Roman", align: "left", valign: "top"
      }
    );
  }

  // Slide 7: ILF (Internal Logical Files) в проекте (было две колонки -> одна)
  {
    const s = cs(pres, "ILF (Internal Logical Files): Внутренние файлы");
    card(s, pres, MX, CY, CW, CH, C.ICE);
    s.addText("Определение ILF и примеры в client-portal", {
      x: MX + 0.18, y: CY + 0.12, w: CW - 0.36, h: 0.45,
      color: C.NAVY, fontSize: 14, bold: true, fontFace: "Cambria"
    });
    s.addText(
      "Внутренний логический файл — это логически связанная группа данных, хранящаяся и изменяемая внутри нашей системы с помощью транзакций EI.\n\n" +
      "Примеры в client-portal (Таблицы Postgres):\n" +
      "• Таблица `users` — учетные записи и роли.\n" +
      "• Таблица `tickets` — обращения, статусы, версии.\n" +
      "• Таблица `messages` — история чатов.\n" +
      "• Таблица `attachments` — метаданные файлов в MinIO.\n" +
      "• Таблица `outbox` — очередь интеграционных событий для 1С.",
      {
        x: MX + 0.18, y: CY + 0.65, w: CW - 0.36, h: CH - 0.9,
        color: C.DARK, fontSize: 18, fontFace: "Times New Roman", align: "left", valign: "top"
      }
    );
  }

  // Slide 8: EIF (External Interface Files) в проекте (было две колонки -> одна)
  {
    const s = cs(pres, "EIF (External Interface Files): Внешние файлы");
    card(s, pres, MX, CY, CW, CH, C.ICE);
    s.addText("Определение EIF и примеры в client-portal", {
      x: MX + 0.18, y: CY + 0.12, w: CW - 0.36, h: 0.45,
      color: C.NAVY, fontSize: 14, bold: true, fontFace: "Cambria"
    });
    s.addText(
      "Внешний интерфейсный файл — это логически связанная группа данных, используемая нашей системой для ссылок и запросов, но полностью управляемая и изменяемая другой внешней системой.\n\n" +
      "Примеры в client-portal:\n" +
      "• Внешняя база реплики 1С (`neo_1c_replica`), которая хранит справочники официальных продуктов 1С и договоров на обслуживание клиентов.\n" +
      "• Наш портал лишь читает эти данные по мере синхронизации, но изменять договоры внутри портала категорически запрещено.",
      {
        x: MX + 0.18, y: CY + 0.65, w: CW - 0.36, h: CH - 0.9,
        color: C.DARK, fontSize: 18, fontFace: "Times New Roman", align: "left", valign: "top"
      }
    );
  }

  // Slide 9: Расчётная таблица UFP (таблица, не меняем)
  {
    const s = cs(pres, "Расчет невыровненных функциональных точек (UFP)");
    const rows = [
      ["Тип компонента", "Описание элемента", "Сложность", "Количество", "Вес", "UFP"],
      ["EI (Вводы)", "Формы создания обращений, звонков, чаты, OTP вход", "Средняя", "5", "4", "20"],
      ["EO (Выводы)", "WebSocket push-оповещения, выгрузка отчетов PDF", "Средняя", "2", "5", "10"],
      ["EQ (Запросы)", "Список обращений, карточка деталей, настройки", "Средняя", "4", "4", "16"],
      ["ILF (Локальные файлы)", "Таблицы users, tickets, messages, files, outbox", "Средняя", "5", "10", "50"],
      ["EIF (Внешние файлы)", "Внешняя база справочников реплики 1С", "Низкая", "1", "5", "5"],
      ["Итого UFP", "Невыровненный функциональный объем", "—", "—", "—", "101 FP"],
    ];
    s.addTable([
      hdr(rows[0]),
      ...rows.slice(1, 6).map((row, i) => dr(row, i % 2 === 0)),
      [
        { text: rows[6][0], options: { fill: { color: C.NAVY }, color: C.WHITE, bold: true, align: "left", fontFace: "Times New Roman" } },
        { text: rows[6][1], options: { fill: { color: C.NAVY }, color: C.WHITE, align: "left", fontFace: "Times New Roman" } },
        { text: rows[6][2], options: { fill: { color: C.NAVY }, color: C.WHITE, align: "center", fontFace: "Times New Roman" } },
        { text: rows[6][3], options: { fill: { color: C.NAVY }, color: C.WHITE, align: "center", fontFace: "Times New Roman" } },
        { text: rows[0][3], options: { fill: { color: C.NAVY }, color: C.WHITE, align: "center", fontFace: "Times New Roman" } },
        { text: rows[6][5], options: { fill: { color: C.NAVY }, color: C.WHITE, bold: true, align: "center", fontFace: "Times New Roman" } },
      ]
    ], { x: MX, y: CY, w: CW, h: CH,
      fontSize: 13, fontFace: "Times New Roman", align: "left", valign: "top",
      border: { pt: 0.5, color: C.ICE2 },
      colW: [2.2, 3.2, 1.2, 0.9, 0.8, 0.86], rowH: 0.52 });
  }

  // Slide 10: 14 характеристик системы (GSC) (было две колонки -> одна)
  {
    const s = cs(pres, "Нефункциональные поправки: 14 характеристик (GSC)");
    card(s, pres, MX, CY, CW, CH, C.ICE);
    s.addText("Назначение поправок (VAF) и шкала оценок", {
      x: MX + 0.18, y: CY + 0.12, w: CW - 0.36, h: 0.45,
      color: C.NAVY, fontSize: 14, bold: true, fontFace: "Cambria"
    });
    s.addText(
      "Невыровненные функциональные точки UFP оценивают только объем данных. Но сложность написания кода зависит еще от нефункциональных параметров: производительности, распределенности, надежности и т.д.\n\n" +
      "Для этого IFPUG вводит коэффициент VAF на основе оценки 14 системных характеристик от 0 до 5.\n\n" +
      "Шкала оценок характеристик:\n" +
      "• 0 — Отсутствует или не имеет влияния.\n" +
      "• 1 — Минимальное влияние.\n" +
      "• 2 — Умеренное влияние.\n" +
      "• 3 — Среднее влияние.\n" +
      "• 4 — Сильное влияние.\n" +
      "• 5 — Критическое влияние на всех уровнях.",
      {
        x: MX + 0.18, y: CY + 0.65, w: CW - 0.36, h: CH - 0.9,
        color: C.DARK, fontSize: 18, fontFace: "Times New Roman", align: "left", valign: "top"
      }
    );
  }

  // Slide 11: Оценка GSC параметров (Таблица, не меняем)
  {
    const s = cs(pres, "Оценка GSC параметров для client-portal");
    const header = ["№", "Характеристика GSC", "Балл", "Обоснование для client-portal"];
    const rows = [
      ["1", "Передача данных", "4", "Интенсивный обмен данными через REST API и WebSocket"],
      ["2", "Распределенная обработка", "3", "Клиент-серверная архитектура (React SPA, Node.js, Postgres)"],
      ["3", "Производительность", "3", "Требование времени отклика API <150 мс для поддержки чата"],
      ["4", "Конфигурационная нагрузка", "2", "Настройка окружения через .env переменные среды"],
      ["5", "Частота транзакций", "4", "Высокая частота обращений к БД и чату в пиковые часы"],
      ["6", "Interactive Input (Ввод)", "4", "Множество интерактивных форм (создание тикета, чаты)"],
      ["7", "Удобство пользователя", "4", "Оптимизированный UI/UX, автодополнение, валидация полей"],
      ["8", "Оперативное обновление", "4", "Мгновенное обновление статусов сообщений через WebSockets"],
      ["9", "Сложность обработки", "3", "Оптимистичная блокировка, транзакционный Outbox, JWT"],
      ["10", "Повторное использование", "3", "Модульные сервисы, общие компоненты React UI, типы TS"],
      ["11", "Легкость инсталляции", "3", "Контейнеризация через Docker Compose, миграции Drizzle"],
      ["12", "Простота эксплуатации", "3", "Автоматический перезапуск контейнеров, стандартные логи"],
      ["13", "Множественность площадок", "2", "Развертывание на одной облачной платформе Cloud Run"],
      ["14", "Легкость изменений", "4", "Гибкость за счет слоистой архитектуры и ORM Drizzle"]
    ];

    s.addTable([
      hdr(header),
      ...rows.map((row, i) => dr(row, i % 2 === 0)),
    ], { x: MX, y: CY, w: CW, h: CH - 0.45,
      fontSize: 13, fontFace: "Times New Roman", align: "left", valign: "top",
      border: { pt: 0.3, color: C.ICE2 },
      colW: [0.4, 2.8, 0.6, 5.4], rowH: 0.28 });

    const sum = 46; 
    const vaf = 0.65 + sum * 0.01;
    s.addText(`Итого сумма баллов (DI) = 46 (арифметически точно!)  →  VAF = 0.65 + 46 * 0.01 = ${vaf.toFixed(2)}`, {
      x: MX, y: CY + CH - 0.32, w: CW, h: 0.3, color: C.NAVY, fontSize: 13, bold: true, fontFace: "Cambria", align: "left" });
  }

  // Slide 12: Итоговый расчет FP (было две колонки -> одна)
  {
    const s = cs(pres, "Итоговый расчет функциональных точек");
    card(s, pres, MX, CY, CW, CH, C.ICE);
    s.addText("Математический расчет и значение для менеджмента", {
      x: MX + 0.18, y: CY + 0.12, w: CW - 0.36, h: 0.45,
      color: C.NAVY, fontSize: 14, bold: true, fontFace: "Cambria"
    });
    s.addText(
      "Формула расчета выровненных функциональных точек:\n" +
      "  FP = UFP * VAF\n\n" +
      "Подставляем значения нашего проекта:\n" +
      "  UFP = 101\n" +
      "  VAF = 1.11\n\n" +
      "Итоговый объем:\n" +
      "  FP = 101 * 1.11 ≈ 112 точек\n\n" +
      "Значение для менеджмента:\n" +
      "• 112 функциональных точек характеризуют систему как проект средней сложности.\n" +
      "• Это число позволяет объективно обосновать перед руководством трудоемкость в человеко-часах без использования субъективного метода экспертных оценок.\n" +
      "• Прекрасная база для расчета плотности багов.",
      {
        x: MX + 0.18, y: CY + 0.65, w: CW - 0.36, h: CH - 0.9,
        color: C.DARK, fontSize: 18, fontFace: "Times New Roman", align: "left", valign: "top"
      }
    );
  }

  // Slide 13: Перевод в KLOC и оценку трудоемкости по COCOMO II (было две колонки -> одна)
  {
    const s = cs(pres, "KLOC и трудоемкость по модели COCOMO II");
    card(s, pres, MX, CY, CW, CH, C.ICE);
    s.addText("Перевод FP в строки кода и трудоемкость по COCOMO II", {
      x: MX + 0.18, y: CY + 0.12, w: CW - 0.36, h: 0.45,
      color: C.NAVY, fontSize: 14, bold: true, fontFace: "Cambria"
    });
    s.addText(
      "Согласно средним таблицам перевода QSM:\n" +
      "• 1 FP ≈ 53 строк кода (TypeScript/HTML)\n" +
      "• 112 FP ≈ 5 936 строк кода (5.94 KLOC)\n\n" +
      "Следовательно, размер кодовой базы Личного кабинета составит около 5.9 KLOC.\n\n" +
      "Трудоемкость по COCOMO II:\n" +
      "Формула базовой модели COCOMO II (органический тип):\n" +
      "  Effort = 2.4 * (KLOC)^1.05 = 2.4 * (5.94)^1.05 ≈ 15.5 чел.-месяцев\n\n" +
      "Срок разработки по формуле (TDEV):\n" +
      "  TDEV = 2.5 * (Effort)^0.38 = 2.5 * (15.5)^0.38 ≈ 7.1 месяцев\n\n" +
      "Закон Брукса и честный расчет:\n" +
      "• Срок TDEV (7.1 мес.) не делится линейно на 2 программистов.\n" +
      "• Требуемая численность: Effort / TDEV = 15.5 / 7.1 ≈ 2.2 человек.\n" +
      "• Вывод: команда из 2 разработчиков выполнит проект за ~7.8 месяцев реального времени (или 15.5 чел.-мес) с учетом коэффициента распределения.",
      {
        x: MX + 0.18, y: CY + 0.65, w: CW - 0.36, h: CH - 0.9,
        color: C.DARK, fontSize: 18, fontFace: "Times New Roman", align: "left", valign: "top"
      }
    );
  }

  // === НОВЫЙ СЛАЙД 14: Сравнение ожидаемых и фактических результатов ===
  {
    const s = cs(pres, "Сравнение ожидаемых и фактических результатов");
    card(s, pres, MX, CY, CW, CH, C.ICE);
    s.addText("Сопоставление плановых показателей (из FP и COCOMO) с реальными данными проекта", {
      x: MX + 0.18, y: CY + 0.12, w: CW - 0.36, h: 0.45,
      color: C.NAVY, fontSize: 14, bold: true, fontFace: "Cambria"
    });

    // Данные для таблицы
    const metrics = [
      ["Показатель", "Плановое значение", "Фактическое значение", "Отклонение"],
      ["Функциональные точки (FP)", "112", "112", "0%"],
      ["Размер кода (KLOC)", "5.94", "8.93", "+50.3%"],
      ["Трудоёмкость (чел.-мес)", "15.5", "3.94", "-74.6%"], // 629.6 ч / 160 = 3.935
      ["Производительность кода (строк/час)", "~50 (среднее по отрасли)", "146.4", "+192.8%"],
      ["Производительность документации (слов/час)", "~100 (среднее)", "115.0", "+15.0%"],
    ];
    const data = [
      hdr(metrics[0]),
      ...metrics.slice(1).map((row, i) => dr(row, i % 2 === 0))
    ];
    s.addTable(data, {
      x: MX + 0.1, y: CY + 0.65, w: CW - 0.2, h: CH - 0.8,
      fontSize: 14, fontFace: "Times New Roman", align: "left", valign: "top",
      border: { pt: 0.5, color: C.ICE2 },
      colW: [2.5, 2.0, 2.0, 2.0], rowH: 0.65
    });

    // Дополнительный краткий вывод (под таблицей, если есть место, или отдельно)
    s.addText(
      "Вывод: Фактический объём кода оказался на 50% больше оценённого по FP, однако трудоёмкость оказалась почти в 4 раза меньше за счёт высокой производительности команды (146 строк/час против средних 50). Документация также написана с производительностью выше средней.",
      {
        x: MX + 0.18, y: CY + CH - 0.4, w: CW - 0.36, h: 0.35,
        color: C.DARK, fontSize: 14, fontFace: "Times New Roman", align: "left", valign: "top"
      }
    );
  }

  // Slide 15: Заключение
  {
    const s = cs(pres, "Выводы по теме");
    conclusionBanner(s, pres,
      "Использование модели функциональных точек (Function Point Analysis) и формул COCOMO II " +
      "предоставило нашей команде научно обоснованный способ оценки масштаба и сроков проекта. " +
      "Логический объем Личного кабинета составил 112 FP (что эквивалентно 5.9 KLOC). Расчеты трудоемкости " +
      "доказали реализуемость проекта силами команды из 2 разработчиков за 7.8 месяцев реального времени, " +
      "что полностью подтверждает взвешенный план-график проекта без допущения ошибок линейного деления.");
  }

  const outFile = path.join(outDir, "P5_Функциональные_точки.pptx");
  await pres.writeFile({ fileName: outFile });
  console.log("✓ P5:", outFile);
}

module.exports = { createP5 };



///

"use strict";
const path = require("path");
const { C, MX, MY, TH, CY, CH, CW, newPres, addCover, cs, hdr, dr, card, conclusionBanner, codeBox } = require("./design.cjs");

async function createP6(outDir) {
  const pres = newPres("P6 — Тестирование ПО");

  // Slide 1: Cover
  addCover(pres, "Тема 6", "Тестирование ПО\nSoftware Testing and QA");

  // === Новый слайд: Постановка задачи ===
  {
    const s = cs(pres, "Постановка задачи моделирования");
    card(s, pres, MX, CY, CW, CH, C.ICE);
    s.addText("Постановка практической задачи", {
      x: MX + 0.18, y: CY + 0.12, w: CW - 0.36, h: 0.45,
      color: C.NAVY, fontSize: 12, bold: true, fontFace: "Cambria"
    });
    s.addText(
      "• Обеспечить высокое качество и стабильность работы портала перед вводом в эксплуатацию.\n\n" +
      "Конкретная задача моделирования:\n" +
      "• Построить систему тестирования (пирамиду тестов), охватывающую все уровни — от юнит-тестов до сквозных E2E-сценариев.",
      {
        x: MX + 0.18, y: CY + 0.65, w: CW - 0.36, h: CH - 0.9,
        color: C.DARK, fontSize: 16, fontFace: "Times New Roman", align: "left", valign: "top"
      }
    );
  }

  // Slide 2: Роль обеспечения качества (QA) (было две колонки -> одна)
  {
    const s = cs(pres, "Роль обеспечения качества (QA)");
    card(s, pres, MX, CY, CW, CH, C.ICE);
    s.addText("Верификация vs Валидация и преимущества автоматизации", {
      x: MX + 0.18, y: CY + 0.12, w: CW - 0.36, h: 0.45,
      color: C.NAVY, fontSize: 12, bold: true, fontFace: "Cambria"
    });
    s.addText(
      "Verification (Верификация): 'Создаем ли мы продукт правильно?' Сверка со спецификацией, стандартами и ТЗ.\n" +
      "Validation (Валидация): 'Создаем ли мы ПРАВИЛЬНЫЙ продукт?' Соответствует ли система потребностям реального пользователя.\n\n" +
      "Преимущества автоматизации:\n" +
      "• Быстрый регресс: тесты запускаются за секунды на каждый коммит.\n" +
      "• Стабильность: предотвращение старых багов при добавлении фич.\n" +
      "• Живая документация: тесты описывают реальное поведение API.",
      {
        x: MX + 0.18, y: CY + 0.65, w: CW - 0.36, h: CH - 0.9,
        color: C.DARK, fontSize: 16, fontFace: "Times New Roman", align: "left", valign: "top"
      }
    );
  }

  // Slide 3: Пирамида тестирования (сетка из 3 карточек, не меняем)
  {
    const s = cs(pres, "Пирамида тестирования в client-portal");
    const levels = [
      { n: "1. Unit Tests (Юнит-тесты)", d: "Нижний уровень пирамиды. Изолированное тестирование чистых функций, валидаторов схем Zod, утилит форматирования данных. Пишутся на Jest. Скорость выполнения — максимальная." },
      { n: "2. Integration Tests", d: "Средний уровень. Тестирование взаимодействия Express-контроллеров, репозиториев Drizzle и базы PostgreSQL. Проверяется правильность транзакций, каскадного удаления и триггеров." },
      { n: "3. E2E / Acceptance Tests", d: "Верхний уровень. Полная эмуляция реальных действий пользователя в браузере с помощью Playwright. Проверяются сквозные бизнес-цепочки от логина до закрытия заявки." },
    ];
    const cw = (CW - 0.2) / 3;
    levels.forEach((lvl, i) => {
      const x = MX + i * (cw + 0.1);
      card(s, pres, x, CY, cw, CH, i % 2 === 0 ? C.ICE : C.GRNL);
      s.addText(lvl.n, { x: x + 0.15, y: CY + 0.12, w: cw - 0.3, h: 0.35,
        color: C.NAVY, fontSize: 12, bold: true, fontFace: "Cambria" });
      s.addText(lvl.d, { x: x + 0.15, y: CY + 0.55, w: cw - 0.3, h: CH - 0.7,
        color: C.DARK, fontSize: 12, fontFace: "Times New Roman", align: "left", valign: "top" });
    });
  }

  // Slide 4: Модульное тестирование (Unit Testing) (card + codeBox, не меняем)
  {
    const s = cs(pres, "Unit Testing: Модульные тесты с Jest");
    card(s, pres, MX, CY, 3.8, CH, C.ICE);
    s.addText("Сущность юнит-тестов", { x: MX + 0.15, y: CY + 0.12, w: 3.5, h: 0.35,
      color: C.NAVY, fontSize: 12, bold: true, fontFace: "Cambria" });
    s.addText("• Тестируют код без сетевых вызовов и обращений к дискам.\n• Проверяют граничные условия валидации Zod-схем.\n• Позволяют моментально проверить регулярные выражения для валидации номеров телефонов.\n• Базируются на фреймворке Jest и TS-Jest.", {
      x: MX + 0.15, y: CY + 0.55, w: 3.5, h: CH - 0.8, color: C.DARK, fontSize: 11, fontFace: "Times New Roman", align: "left", valign: "top" });

    codeBox(s, pres, MX + 4.1, CY, 5.06, CH,
      "import { CreateTicketSchema } from './validation';\n\ndescribe('CreateTicketSchema Unit Tests', () => {\n  it('should accept valid ticket details', () => {\n    const data = { title: '1C ERP crash', description: 'DB error 109' };\n    expect(CreateTicketSchema.safeParse(data).success).toBe(true);\n  });\n\n  it('should reject short descriptions', () => {\n    const data = { title: '1C ERP crash', description: 'short' };\n    expect(CreateTicketSchema.safeParse(data).success).toBe(false);\n  });\n});", 10.5);
  }

  // Slide 5: Интеграционное тестирование (Integration Testing) (card + codeBox, не меняем)
  {
    const s = cs(pres, "Integration Testing: Интеграционные тесты");
    card(s, pres, MX, CY, 3.8, CH, C.ICE);
    s.addText("Сущность интеграции", { x: MX + 0.15, y: CY + 0.12, w: 3.5, h: 0.35,
      color: C.NAVY, fontSize: 12, bold: true, fontFace: "Cambria" });
    s.addText("• Проверяют корректность склейки роутеров, middleware и контроллеров.\n• Тестируют реальный обмен данными с тестовой PostgreSQL СУБД.\n• Эмулируют HTTP-запросы с помощью Supertest.\n• Гарантируют работоспособность роутов безопасности.", {
      x: MX + 0.15, y: CY + 0.55, w: 3.5, h: CH - 0.8, color: C.DARK, fontSize: 11, fontFace: "Times New Roman", align: "left", valign: "top" });

    codeBox(s, pres, MX + 4.1, CY, 5.06, CH,
      "import request from 'supertest';\nimport app from './app';\n\ndescribe('GET /api/tickets Integration', () => {\n  it('should fail if user is unauthorized', async () => {\n    const res = await request(app)\n      .get('/api/tickets')\n      .expect(401);\n    expect(res.body.error).toBe('Unauthorized');\n  });\n});", 11);
  }

  // Slide 6: Сквозное тестирование (E2E / Acceptance) (было две колонки -> одна)
  {
    const s = cs(pres, "E2E: Сквозное приёмочное тестирование");
    card(s, pres, MX, CY, CW, CH, C.ICE);
    s.addText("Проектируемые E2E сценарии и шаблон в Playwright", {
      x: MX + 0.18, y: CY + 0.12, w: CW - 0.36, h: 0.45,
      color: C.NAVY, fontSize: 12, bold: true, fontFace: "Cambria"
    });
    s.addText(
      "Для проекта разработан и настроен шаблон сквозного E2E-тестирования в Playwright. Ввиду раздельного развертывания подсистем фронтенда и бэкенда, сквозные приемочные тесты будут полноценно активированы в CI/CD в фазе финальной сборки. На текущем этапе качество гарантировано модульными и API-тестами.\n\n" +
      "Шаблон сценария в Playwright:\n" +
      "1. Шаблон запускает браузер и открывает `/login`.\n" +
      "2. Эмулирует ввод телефона и SMS OTP (мок-код 111111).\n" +
      "3. Переходит в раздел 'Создать обращение'.\n" +
      "4. Описывает проблему техподдержки 1С, нажимает кнопку 'Отправить'.\n" +
      "5. Сверяет статус создания в интерфейсе и СУБД.\n" +
      "• Готов к полному запуску при интеграции фронтенда.",
      {
        x: MX + 0.18, y: CY + 0.65, w: CW - 0.36, h: CH - 0.9,
        color: C.DARK, fontSize: 16, fontFace: "Times New Roman", align: "left", valign: "top"
      }
    );
  }

  // Slide 7: Нагрузочное тестирование (Performance Testing) (card + codeBox, не меняем)
  {
    const s = cs(pres, "Нагрузочное тестирование: Сценарии Artillery");
    card(s, pres, MX, CY, 3.8, CH, C.ICE);
    s.addText("Проектирование нагрузки", { x: MX + 0.15, y: CY + 0.12, w: 3.5, h: 0.35,
      color: C.NAVY, fontSize: 12, bold: true, fontFace: "Cambria" });
    s.addText("• Инструмент Artillery позволяет генерировать сотни запросов в секунду (RPS).\n• Мы эмулируем реальное поведение 100 одновременных клиентов техподдержки.\n• Измеряются задержки ответов (Latency: p95, p99).\n• Верифицируется отсутствие ошибок 502/504.", {
      x: MX + 0.15, y: CY + 0.55, w: 3.5, h: CH - 0.8, color: C.DARK, fontSize: 11, fontFace: "Times New Roman", align: "left", valign: "top" });

    codeBox(s, pres, MX + 4.1, CY, 5.06, CH,
      "config:\n  target: 'http://localhost:3000'\n  phases:\n    - duration: 60\n      arrivalRate: 5\n      rampTo: 50\n      name: 'Ramping load'\nscenarios:\n  - name: 'Check tickets and chat'\n    flow:\n      - get: { url: '/api/tickets' }\n      - post:\n          url: '/api/messages'\n          json: { text: 'Performance test message' }", 10.5);
  }

  // Slide 8: Тестирование безопасности (Security Testing) (было две колонки -> одна)
  {
    const s = cs(pres, "Тестирование безопасности: Аудит уязвимостей");
    card(s, pres, MX, CY, CW, CH, C.ICE);
    s.addText("Основные векторы по OWASP Top 10 и защита файлов", {
      x: MX + 0.18, y: CY + 0.12, w: CW - 0.36, h: 0.45,
      color: C.NAVY, fontSize: 12, bold: true, fontFace: "Cambria"
    });
    s.addText(
      "Основные векторы по OWASP Top 10:\n" +
      "• SQL Injection: автоматические тесты шлют в API кавычки и специальные конструкции вроде `' OR 1=1 --`. Использование Drizzle параметризации гарантирует 100% защиту.\n" +
      "• Broken Authentication: проверка блокировки сессий при передаче истекших или сломанных JWT-токенов.\n\n" +
      "Защита файлов и утечек:\n" +
      "• Приватность вложений: тесты проверяют, что клиент Б не сможет прочитать вложения клиента А по прямой ссылке, так как S3 presigned-ссылки привязаны к сессиям конкретного пользователя.\n" +
      "• Маскирование паролей и логов: автоматический тест проверяет, что в логи NodeJS не улетают хэши и токены.",
      {
        x: MX + 0.18, y: CY + 0.65, w: CW - 0.36, h: CH - 0.9,
        color: C.DARK, fontSize: 16, fontFace: "Times New Roman", align: "left", valign: "top"
      }
    );
  }

  // Slide 9: Отказоустойчивость: тестирование синка 1С (было две колонки -> одна)
  {
    const s = cs(pres, "Отказоустойчивость: тестирование синка 1С");
    card(s, pres, MX, CY, CW, CH, C.ICE);
    s.addText("Проверка сценариев разрыва сети и целостности очереди", {
      x: MX + 0.18, y: CY + 0.12, w: CW - 0.36, h: 0.45,
      color: C.NAVY, fontSize: 12, bold: true, fontFace: "Cambria"
    });
    s.addText(
      "Специальный интеграционный тест эмулирует временное отключение симулятора 1С (имитация сбоя связи в ООО 'Неосистемы'). Воркер outbox должен зафиксировать сбой связи, перевести событие в статус `failed` и запустить таймер повторных отложенных попыток.\n\n" +
      "Проверка целостности очереди:\n" +
      "• Тест гарантирует, что ни один тикет не продублируется в 1С дважды при повторных синк-попытках (проверка идемпотентности).\n" +
      "• Контроль порядка: тесты проверяют, что сообщения чата приходят в 1С в хронологическом порядке, даже если отправка зависала из-за разрывов связи.",
      {
        x: MX + 0.18, y: CY + 0.65, w: CW - 0.36, h: CH - 0.9,
        color: C.DARK, fontSize: 16, fontFace: "Times New Roman", align: "left", valign: "top"
      }
    );
  }

  // Slide 10: Мокирование внешних сервисов (S3, 1С) (было две колонки -> одна)
  {
    const s = cs(pres, "Мокирование внешних систем в тестах");
    card(s, pres, MX, CY, CW, CH, C.ICE);
    s.addText("Мок-клиент для MinIO S3 и мок симулятора 1С", {
      x: MX + 0.18, y: CY + 0.12, w: CW - 0.36, h: 0.45,
      color: C.NAVY, fontSize: 12, bold: true, fontFace: "Cambria"
    });
    s.addText(
      "Мок-клиент для MinIO S3:\n" +
      "Тесты запускаются в среде, где реальное облачное хранилище недоступно. Мы используем библиотеку `mock-aws-s3`. Все методы `putObject` и `getSignedUrl` перехватываются, сохраняя файлы во временной оперативной памяти NodeJS, что ускоряет тесты и экономит трафик.\n\n" +
      "Мок симулятора 1С:\n" +
      "• Вместо запуска тяжелой базы 1С в Docker, тесты шлют запросы на легковесную Express-заглушку (mock-server).\n" +
      "• Заглушка настроена на генерацию детерминированных ответов: успех (200 OK), задержка (504 Timeout) или сбой данных (400 Bad Request) по требованию тест-кейса.",
      {
        x: MX + 0.18, y: CY + 0.65, w: CW - 0.36, h: CH - 0.9,
        color: C.DARK, fontSize: 16, fontFace: "Times New Roman", align: "left", valign: "top"
      }
    );
  }

  // Slide 11: Анализ покрытия тестами (Coverage Metrics) (было две колонки -> одна)
  {
    const s = cs(pres, "Метрики качества: Анализ покрытия (Coverage)");
    card(s, pres, MX, CY, CW, CH, C.ICE);
    s.addText("Что измеряет Jest Coverage и целевые показатели", {
      x: MX + 0.18, y: CY + 0.12, w: CW - 0.36, h: 0.45,
      color: C.NAVY, fontSize: 12, bold: true, fontFace: "Cambria"
    });
    s.addText(
      "Что измеряет утилита Jest Coverage?\n" +
      "• Statement Coverage — какой процент строк кода был исполнен.\n" +
      "• Branch Coverage — пройдены ли все условия ветвления (`if-else` блоки).\n" +
      "• Function Coverage — вызваны ли все объявленные функции.\n" +
      "• Line Coverage — количество выполненных физических строк кода.\n\n" +
      "Целевые показатели качества:\n" +
      "• Общее покрытие операторов (statements) во всём проекте установлено на уровне не менее 80%.\n" +
      "• Покрытие критических модулей бизнес-логики (TicketService, MessageService) — не менее 90%.\n" +
      "• При падении суммарного покрытия ниже 80% сборка проекта в CI/CD автоматически ломается, предотвращая выкат непроверенного кода в прод.",
      {
        x: MX + 0.18, y: CY + 0.65, w: CW - 0.36, h: CH - 0.9,
        color: C.DARK, fontSize: 16, fontFace: "Times New Roman", align: "left", valign: "top"
      }
    );
  }

  // Slide 12: Автоматизация тестирования в CI/CD (card + codeBox, не меняем)
  {
    const s = cs(pres, "Автоматизация: CI/CD пайплайн в GitHub Actions");
    card(s, pres, MX, CY, 3.8, CH, C.ICE);
    s.addText("Непрерывная интеграция (CI)", { x: MX + 0.15, y: CY + 0.12, w: 3.5, h: 0.35,
      color: C.NAVY, fontSize: 12, bold: true, fontFace: "Cambria" });
    s.addText("• Разработчики не могут залить код в ветку `main` без прохождения тестов.\n• GitHub Actions автоматически разворачивает чистую среду Node.js.\n• Устанавливает зависимости из lock-файла.\n• Запускает линтер ESLint, сборщик и прогоняет модульные и интеграционные тесты Jest.", {
      x: MX + 0.15, y: CY + 0.55, w: 3.5, h: CH - 0.8, color: C.DARK, fontSize: 11, fontFace: "Times New Roman", align: "left", valign: "top" });

    codeBox(s, pres, MX + 4.1, CY, 5.06, CH,
      "name: Continuous Integration\non:\n  pull_request:\n    branches: [ main ]\njobs:\n  test:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v3\n      - uses: actions/setup-node@v3\n      - run: npm ci\n      - run: npm run lint\n      - run: npm run test:coverage\n      - run: npm run build", 10.5);
  }

  // Slide 13: Локальная тестовая песочница Docker Compose (было две колонки -> одна)
  {
    const s = cs(pres, "Локальная тестовая песочница Docker Compose");
    card(s, pres, MX, CY, CW, CH, C.ICE);
    s.addText("Оркестрация тестовой среды и тестовые контейнеры", {
      x: MX + 0.18, y: CY + 0.12, w: CW - 0.36, h: 0.45,
      color: C.NAVY, fontSize: 12, bold: true, fontFace: "Cambria"
    });
    s.addText(
      "Для запуска полноценных интеграционных и E2E тестов разработчику не нужно вручную настраивать базы данных на компьютере. Вся инфраструктура разворачивается одной командой `docker-compose -f docker-compose.test.yml up -d`.\n\n" +
      "Тестовые контейнеры:\n" +
      "• `test-db` — СУБД PostgreSQL с автоматически накатаными тестовыми схемами.\n" +
      "• `test-s3` — легковесный MinIO для бинарных файлов.\n" +
      "• `mock-1c` — симулятор учетной системы компании.\n" +
      "• Контейнеры полностью изолированы от боевой среды и автоматически очищаются после прогона тестов.",
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
      "Автоматизированное тестирование в проекте «Личный кабинет» — это не просто поиск багов, " +
      "а ключевое условие стабильности бизнес-процессов компании ООО «Неосистемы Северо-Запад». " +
      "Внедрение пирамиды тестов (юнит, интеграция, сквозной Playwright, нагрузочный Artillery) " +
      "и строгого контроля покрытия в CI/CD гарантирует бесперебойную работу личного кабинета, " +
      "безопасность персональных данных клиентов и надежность синхронизации с базой 1С.");
  }

  const outFile = path.join(outDir, "P6_Тестирование.pptx");
  await pres.writeFile({ fileName: outFile });
  console.log("✓ P6:", outFile);
}

module.exports = { createP6 };


///


"use strict";
const pptxgen = require("pptxgenjs");

// ═══════ НОВАЯ ПАЛИТРА (элегантная, без нейросетевых клише) ═══════
const C = {
  NAVY:   "1A1A2E",      // глубокий фиолетово-синий
  NAVY2:  "0D0D1A",
  TEAL:   "E94560",      // яркий розово-коралловый акцент
  TEAL2:  "C73652",
  ICE:    "F8F4F0",      // тёплый светлый бежевый
  ICE2:   "EFEAE3",
  WHITE:  "FFFFFF",
  DARK:   "2D2D3A",
  MUTED:  "6B6B7A",
  BG:     "F8F4F0",
  GREEN:  "2D9C7C",
  GRNL:   "D4EDDA",
  AMBER:  "F5A623",
  AMBL:   "FFF3CD",
  RED:    "E94560",
  REDL:   "FDD9DF",
  GRAY:   "A0A0B0",
  GRAY2:  "E8E5E0",
  PURP:   "6C5B7B",
  PURPL:  "E8D9F0",
  CODE_BG: "1A1A2E",
  CODE_FG: "F8F4F0",
};

// ═══════ LAYOUT ═══════
const W = 10, H = 5.625;
const MX = 0.42, MY = 0.18;
const TH = 0.60;
const CY = MY + TH + 0.12;
const CH = H - CY - 0.22;
const CW = W - 2 * MX;

// Тени – мягче
const mkSh = () => ({
  type: "outer",
  color: "000000",
  blur: 12,
  offset: 3,
  angle: 45,
  opacity: 0.12,
});

// ═══════ FACTORIES ═══════
function newPres(title) {
  const p = new pptxgen();
  p.layout = "LAYOUT_16x9";
  p.title = title;
  p.author = "Ломазина Александра, гр 22307";
  return p;
}

// Обложка – только безопасные фигуры (овалы и линии)
function addCover(pres, code, title) {
  const s = pres.addSlide();

  // Градиентный фон (угольно-фиолетовый)
  s.background = { fill: "solid", color: C.NAVY };

  // Декоративный большой овал (золотистый полупрозрачный)
  s.addShape(pres.shapes.OVAL, {
    x: 6.8, y: -1.0, w: 4.0, h: 4.0,
    fill: { color: C.AMBER, transparency: 70 },
    line: { color: C.AMBER, transparency: 70 },
  });

  // Маленький овал (розовый акцент)
  s.addShape(pres.shapes.OVAL, {
    x: -0.6, y: 3.8, w: 2.2, h: 2.2,
    fill: { color: C.TEAL, transparency: 60 },
    line: { color: C.TEAL, transparency: 60 },
  });

  // Акцентная полоса с кодом темы
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.5, y: 0.82, w: 3.0, h: 0.40,
    fill: { color: C.TEAL },
    line: { color: C.TEAL },
    rectRadius: 0.08,
  });
  s.addText(code, {
    x: 0.5, y: 0.82, w: 3.0, h: 0.40,
    color: C.WHITE,
    fontSize: 12,
    bold: true,
    align: "center",
    valign: "middle",
    margin: 0,
    fontFace: "Times New Roman",
  });

  // Заголовок – Georgia
  s.addText(title, {
    x: 0.5, y: 1.38, w: 8.8, h: 2.1,
    color: C.WHITE,
    fontSize: 26,
    bold: true,
    align: "left",
    valign: "middle",
    fontFace: "Georgia",
  });

  // Подзаголовок
  s.addText("Проект ТППО: «Личный кабинет для клиентов компании»", {
    x: 0.5, y: 3.68, w: 8.5, h: 0.40,
    color: C.ICE,
    fontSize: 12,
    fontFace: "Times New Roman",
  });

  // Нижний колонтитул
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 4.88, w: 10, h: 0.745,
    fill: { color: C.NAVY2 },
    line: { color: C.NAVY2 },
  });
  s.addText(
    "Выполнила: Ломазина Александра, гр 22307   |   Руководитель: Корзун Дмитрий Жоржевич   |   ИМИТ ПетрГУ, 2026",
    {
      x: 0.5, y: 4.88, w: 9, h: 0.745,
      color: "B8B0C0",
      fontSize: 11,
      fontFace: "Times New Roman",
      align: "left",
      valign: "middle",
    }
  );

  return s;
}

// Слайд с заголовком (шрифт Georgia)
function cs(pres, title) {
  const s = pres.addSlide();
  s.background = { color: C.WHITE };
  s.addText(title, {
    x: MX, y: MY, w: CW, h: TH,
    color: C.NAVY,
    fontSize: 16,
    bold: true,
    align: "left",
    valign: "bottom",
    fontFace: "Georgia",
  });
  return s;
}

function csg(pres, title) {
  const s = pres.addSlide();
  s.background = { color: C.BG };
  s.addText(title, {
    x: MX, y: MY, w: CW, h: TH,
    color: C.NAVY,
    fontSize: 16,
    bold: true,
    align: "left",
    valign: "bottom",
    fontFace: "Georgia",
  });
  return s;
}

function codeBox(s, pres, x, y, w, h, code, fs) {
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x, y, w, h,
    fill: { color: C.CODE_BG },
    line: { color: "2A2A4A", pt: 1.2 },
    rectRadius: 0.08,
  });
  s.addText(code, {
    x: x + 0.15, y: y + 0.09, w: w - 0.30, h: h - 0.18,
    color: C.CODE_FG,
    fontSize: fs || 9.5,
    align: "left",
    valign: "top",
    fontFace: "Courier New",
  });
}

function hdr(cells) {
  return cells.map((t) => ({
    text: t,
    options: {
      fill: { color: C.NAVY },
      color: C.WHITE,
      bold: true,
      align: "center",
      valign: "middle",
      fontFace: "Times New Roman",
    },
  }));
}

function dr(cells, alt) {
  return cells.map((t) => ({
    text: t,
    options: {
      fill: { color: alt ? C.ICE : C.WHITE },
      color: C.DARK,
      align: "left",
      valign: "middle",
      fontFace: "Times New Roman",
    },
  }));
}

function drc(cells, alt) {
  return cells.map((t) => ({
    text: t,
    options: {
      fill: { color: alt ? C.ICE : C.WHITE },
      color: C.DARK,
      align: "center",
      valign: "middle",
      fontFace: "Times New Roman",
    },
  }));
}

function card(s, pres, x, y, w, h, fill) {
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x, y, w, h,
    fill: { color: fill || C.ICE },
    line: { color: C.ICE2, pt: 0.8 },
    rectRadius: 0.10,
    shadow: mkSh(),
  });
}

// Старая версия баннера 
// function conclusionBanner(s, pres, text, y) {
//   const by = y || (CY + CH - 1.15);
//   s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
//     x: MX, y: by, w: CW, h: 1.05,
//     fill: { color: C.WHITE },
//     line: { color: C.ICE2, pt: 1 },
//     rectRadius: 0.10,
//     shadow: { type: "outer", color: "000000", blur: 8, offset: 2, angle: 45, opacity: 0.08 },
//   });
//   s.addShape(pres.shapes.RECTANGLE, {
//     x: MX, y: by + 0.1, w: 0.12, h: 0.85,
//     fill: { color: C.TEAL },
//     line: { color: C.TEAL },
//     rectRadius: 0.05,
//   });
//   s.addText("Выводы", {
//     x: MX + 0.25, y: by + 0.05, w: 1.5, h: 0.35,
//     color: C.NAVY, fontSize: 11, bold: true, fontFace: "Georgia",
//     align: "left", valign: "middle",
//   });
//   s.addText(text, {
//     x: MX + 0.25, y: by + 0.35, w: CW - 0.45, h: 0.65,
//     color: C.DARK, fontSize: 11, fontFace: "Times New Roman",
//     align: "left", valign: "top",
//   });
// }

// Новая функция – текст прижат к левому верхнему углу, крупный шрифт, перенос целыми словами
function conclusionBanner(s, pres, text, y) {
  const left = MX + 0.1;        // минимальный отступ слева
  const top = CY + 0.05;        // почти вплотную к заголовку
  const width = CW - 0.2;       // почти на всю ширину
  const height = CH - 0.1;      // почти на всю высоту

  s.addText(text, {
    x: left, y: top, w: width, h: height,
    color: C.DARK,
    fontSize: 18,               // крупный шрифт – можно увеличить до 20
    fontFace: "Times New Roman",
    align: "left",
    valign: "top",
    wrap: true,                 // перенос по словам (не разрывает слова)
    autoFit: false,             // не сжимает текст, если не влезает – переносит
    lineSpacing: 32,            // межстрочный интервал
    paraSpace: 14,              // отступ между абзацами
  });
}

module.exports = {
  C,
  W,
  H,
  MX,
  MY,
  TH,
  CY,
  CH,
  CW,
  mkSh,
  newPres,
  addCover,
  cs,
  csg,
  codeBox,
  hdr,
  dr,
  drc,
  card,
  conclusionBanner,
};


////