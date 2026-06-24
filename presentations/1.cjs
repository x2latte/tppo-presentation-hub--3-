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
