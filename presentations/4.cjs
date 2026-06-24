"use strict";
const path = require("path");
const { C, MX, MY, TH, CY, CH, CW, newPres, addCover, cs, hdr, dr, card, conclusionBanner } = require("./design.cjs");

async function createP4(outDir) {
  const pres = newPres("P4 — Языки моделирования");

  // Slide 1: Cover
  addCover(pres, "Тема 4", "Языки моделирования\nModeling Languages");

  // Slide 2: Что такое язык моделирования?
  {
    const s = cs(pres, "Что такое язык моделирования?");
    card(s, pres, MX, CY, 4.4, CH, C.ICE);
    s.addText("Сущность моделирования", { x: MX + 0.18, y: CY + 0.12, w: 4.04, h: 0.40,
      color: C.NAVY, fontSize: 13, bold: true, fontFace: "Cambria" });
    s.addText("Язык моделирования — это искусственная графическая или текстовая система обозначений, предназначенная для описания структуры, поведения и процессов сложных программных и организационных систем.\n\nОсновным промышленным стандартом в ИТ является UML (Unified Modeling Language).", { x: MX + 0.18, y: CY + 0.62, w: 4.04, h: 3.2,
      color: C.DARK, fontSize: 11.5, fontFace: "Calibri" });

    card(s, pres, MX + 4.7, CY, 4.46, CH, C.GRNL);
    s.addText("Зачем абстрагировать систему?", { x: MX + 4.88, y: CY + 0.12, w: 4.1, h: 0.40,
      color: C.NAVY, fontSize: 13, bold: true, fontFace: "Cambria" });
    s.addText([
      { text: "Абстрагирование от низкоуровневого JS/TS кода.", options: { bullet: true, breakLine: true } },
      { text: "Создание единой ментальной карты (карта архитектуры) проекта.", options: { bullet: true, breakLine: true } },
      { text: "Ускорение адаптации новых разработчиков в команду.", options: { bullet: true } },
    ], { x: MX + 4.88, y: CY + 0.62, w: 4.1, h: 3.2,
      color: C.DARK, fontSize: 11.5, fontFace: "Calibri" });
  }

  // Slide 3: Использование UML в ТППО
  {
    const s = cs(pres, "Моделирование в курсе ТППО");
    card(s, pres, MX, CY, 4.4, CH, C.ICE);
    s.addText("Цели применения в проекте", { x: MX + 0.18, y: CY + 0.12, w: 4.04, h: 0.40,
      color: C.NAVY, fontSize: 13, bold: true, fontFace: "Cambria" });
    s.addText("В процессе проектирования «Личного кабинета» для клиентов компании ООО «Неосистемы Северо-Запад» моделирование использовалось для формализации требований перед кодингом. Это позволило избежать архитектурных тупиков при сопряжении баз данных (PostgreSQL и 1С) и файлов MinIO.", { x: MX + 0.18, y: CY + 0.62, w: 4.04, h: 3.2,
      color: C.DARK, fontSize: 11.5, fontFace: "Calibri" });

    card(s, pres, MX + 4.7, CY, 4.46, CH, C.GRNL);
    s.addText("Что дает проектирование до кода?", { x: MX + 4.88, y: CY + 0.12, w: 4.1, h: 0.40,
      color: C.NAVY, fontSize: 13, bold: true, fontFace: "Cambria" });
    s.addText([
      { text: "95% ошибок проектирования выявляются 'на бумаге'.", options: { bullet: true, breakLine: true } },
      { text: "Стоимость исправления модели в 100 раз дешевле переписывания кода.", options: { bullet: true, breakLine: true } },
      { text: "Четко зафиксированные JSON-контракты интеграции.", options: { bullet: true } },
    ], { x: MX + 4.88, y: CY + 0.62, w: 4.1, h: 3.2,
      color: C.DARK, fontSize: 11.5, fontFace: "Calibri" });
  }

  // Slide 4: Таблица используемых диаграмм
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
      fontSize: 10.5, fontFace: "Calibri",
      border: { pt: 0.5, color: C.ICE2 },
      colW: [2.5, 2.5, 4.16], rowH: 0.7 });
  }

  // Slide 5: UML Use Case Diagram
  {
    const s = cs(pres, "UML Use Case Diagram: Моделирование требований");
    card(s, pres, MX, CY, 4.4, CH, C.ICE);
    s.addText("Характеристики Use Case моделей", { x: MX + 0.18, y: CY + 0.12, w: 4.04, h: 0.40,
      color: C.NAVY, fontSize: 13, bold: true, fontFace: "Cambria" });
    s.addText("Диаграмма прецедентов фиксирует требования со стороны внешнего мира. Она определяет, КТО (акторы) и ЧТО (прецеденты) делает в системе.\n\nНаши акторы:\n• Представитель клиента (Клиент)\n• Специалист поддержки (Менеджер)\n• Утверждающий (client_approver)\n• Диспетчер (dispatcher)\n• Администратор (admin)", { x: MX + 0.18, y: CY + 0.62, w: 4.04, h: 3.2,
      color: C.DARK, fontSize: 11.5, fontFace: "Calibri" });

    card(s, pres, MX + 4.7, CY, 4.46, CH, C.GRNL);
    s.addText("Основные сценарии в фокусе", { x: MX + 4.88, y: CY + 0.12, w: 4.1, h: 0.40,
      color: C.NAVY, fontSize: 13, bold: true, fontFace: "Cambria" });
    s.addText([
      { text: "Двухэтапная аутентификация (пароль + SMS OTP).", options: { bullet: true, breakLine: true } },
      { text: "Создание тикета техподдержки с файлами ошибок.", options: { bullet: true, breakLine: true } },
      { text: "Мгновенное общение через веб-чат WebSockets.", options: { bullet: true, breakLine: true } },
      { text: "Синхронизация карточек обращений с репликой 1С.", options: { bullet: true } },
    ], { x: MX + 4.88, y: CY + 0.62, w: 4.1, h: 3.2,
      color: C.DARK, fontSize: 11.5, fontFace: "Calibri" });
  }

  // Slide 6: UML Component Diagram
  {
    const s = cs(pres, "UML Component Diagram: Модульная архитектура");
    card(s, pres, MX, CY, 4.4, CH, C.ICE);
    s.addText("Назначение диаграммы компонентов", { x: MX + 0.18, y: CY + 0.12, w: 4.04, h: 0.40,
      color: C.NAVY, fontSize: 13, bold: true, fontFace: "Cambria" });
    s.addText("Диаграмма показывает разделение кодовой базы на физические сборочные единицы (компоненты) и их интерфейсные стыки.\n\nПредоставляемые интерфейсы (кружки 'lollipop') скрывают детали СУБД, а требуемые интерфейсы (полукружки) заставляют фронтенд соблюдать REST-контракты.", { x: MX + 0.18, y: CY + 0.62, w: 4.04, h: 3.2,
      color: C.DARK, fontSize: 11.5, fontFace: "Calibri" });

    card(s, pres, MX + 4.7, CY, 4.46, CH, C.GRNL);
    s.addText("Компоненты client-portal", { x: MX + 4.88, y: CY + 0.12, w: 4.1, h: 0.40,
      color: C.NAVY, fontSize: 13, bold: true, fontFace: "Cambria" });
    s.addText([
      { text: "React Frontend — браузерный SPA-бандл.", options: { bullet: true, breakLine: true } },
      { text: "Node.js Express Backend — API сервер.", options: { bullet: true, breakLine: true } },
      { text: "PostgreSQL Database — внутреннее хранилище.", options: { bullet: true, breakLine: true } },
      { text: "MinIO S3 Storage — файловый архив.", options: { bullet: true, breakLine: true } },
      { text: "1C Simulator — имитация ERP учетной системы.", options: { bullet: true } },
    ], { x: MX + 4.88, y: CY + 0.62, w: 4.1, h: 3.2,
      color: C.DARK, fontSize: 11.5, fontFace: "Calibri" });
  }

  // Slide 7: UML Class Diagram
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

  // Slide 8: UML Sequence Diagram
  {
    const s = cs(pres, "UML Sequence Diagram: Динамика синхронизации");
    card(s, pres, MX, CY, 4.4, CH, C.ICE);
    s.addText("Поток событий (Sequence)", { x: MX + 0.18, y: CY + 0.12, w: 4.04, h: 0.40,
      color: C.NAVY, fontSize: 13, bold: true, fontFace: "Cambria" });
    s.addText("Диаграмма последовательности показывает жизненный цикл во времени:\n\n1. Клиент нажимает кнопку 'Отправить'.\n2. Фронтенд отправляет POST-запрос на Бэкенд.\n3. Бэкенд пишет тикет в PostgreSQL.\n4. Бэкенд пишет транзакцию в Outbox.\n5. Фоновый воркер асинхронно передает данные в 1С.", { x: MX + 0.18, y: CY + 0.62, w: 4.04, h: 3.2,
      color: C.DARK, fontSize: 11, fontFace: "Calibri" });

    card(s, pres, MX + 4.7, CY, 4.46, CH, C.GRNL);
    s.addText("Почему важен этот сценарий?", { x: MX + 4.88, y: CY + 0.12, w: 4.1, h: 0.40,
      color: C.NAVY, fontSize: 13, bold: true, fontFace: "Cambria" });
    s.addText("• Визуализирует временные задержки и асинхронные границы.\n• Четко разделяет синхронный клиентский шаг и асинхронный фоновый шаг синхронизации с 1С.\n• Позволяет легко выявить потенциальные места зависаний (timeouts) и сетевых сбоев.", { x: MX + 4.88, y: CY + 0.62, w: 4.1, h: 3.2,
      color: C.DARK, fontSize: 11, fontFace: "Calibri" });
  }

  // Slide 9: ERD (Entity-Relationship Diagram)
  {
    const s = cs(pres, "ERD: Реляционная схема базы данных");
    card(s, pres, MX, CY, 4.4, CH, C.ICE);
    s.addText("ER-моделирование данных", { x: MX + 0.18, y: CY + 0.12, w: 4.04, h: 0.40,
      color: C.NAVY, fontSize: 13, bold: true, fontFace: "Cambria" });
    s.addText("В отличие от абстрактной диаграммы классов UML, ERD описывает физическую структуру таблиц СУБД PostgreSQL.\n\nЗдесь четко фиксируются первичные ключи (Primary Keys, UUID), внешние ключи (Foreign Keys) и индексы для оптимизации запросов поиска.", { x: MX + 0.18, y: CY + 0.62, w: 4.04, h: 3.2,
      color: C.DARK, fontSize: 11.5, fontFace: "Calibri" });

    card(s, pres, MX + 4.7, CY, 4.46, CH, C.GRNL);
    s.addText("Ключевые сущности (Таблицы БД)", { x: MX + 4.88, y: CY + 0.12, w: 4.1, h: 0.40,
      color: C.NAVY, fontSize: 13, bold: true, fontFace: "Cambria" });
    s.addText([
      { text: "users — данные пользователей (телефон, имя, роль).", options: { bullet: true, breakLine: true } },
      { text: "tickets — обращения клиентов (id, статус, version).", options: { bullet: true, breakLine: true } },
      { text: "messages — сообщения чата (id, текст, timestamp).", options: { bullet: true, breakLine: true } },
      { text: "attachments — файлы из S3 (id, mime, path).", options: { bullet: true, breakLine: true } },
      { text: "outbox — транзакционная очередь отправки в 1С.", options: { bullet: true } },
    ], { x: MX + 4.88, y: CY + 0.62, w: 4.1, h: 3.2,
      color: C.DARK, fontSize: 11, fontFace: "Calibri" });
  }

  // Slide 10: BPMN (Business Process Model and Notation)
  {
    const s = cs(pres, "BPMN: Жизненный цикл обращения клиента");
    card(s, pres, MX, CY, 4.4, CH, C.ICE);
    s.addText("Зачем использовать BPMN?", { x: MX + 0.18, y: CY + 0.12, w: 4.04, h: 0.40,
      color: C.NAVY, fontSize: 13, bold: true, fontFace: "Cambria" });
    s.addText("UML не очень хорошо подходит для бизнес-процессов. Нотация BPMN 2.0 использовалась нами для описания сквозного workflow прохождения заявки.\n\nЭто позволяет согласовать регламенты работы службы техподдержки с алгоритмами переключения статусов в базе данных.", { x: MX + 0.18, y: CY + 0.62, w: 4.04, h: 3.2,
      color: C.DARK, fontSize: 11.5, fontFace: "Calibri" });

    card(s, pres, MX + 4.7, CY, 4.46, CH, C.GRNL);
    s.addText("Событийные статусы заявки", { x: MX + 4.88, y: CY + 0.12, w: 4.1, h: 0.40,
      color: C.NAVY, fontSize: 13, bold: true, fontFace: "Cambria" });
    s.addText("• Создано (New) — клиент отправил заявку.\n• В работе (Active) — менеджер назначил специалиста.\n• Ожидание оценки — специалист оценивает часы.\n• Выполнено (Closed) — работа завершена.\n• Переоткрыто (Reopened) — проблема клиента осталась.", { x: MX + 4.88, y: CY + 0.62, w: 4.1, h: 3.2,
      color: C.DARK, fontSize: 11, fontFace: "Calibri" });
  }

  // Slide 11: Diagrams as Code: PlantUML & Mermaid
  {
    const s = cs(pres, "Diagrams as Code: PlantUML & Mermaid.js");
    card(s, pres, MX, CY, 4.4, CH, C.ICE);
    s.addText("Сущность подхода", { x: MX + 0.18, y: CY + 0.12, w: 4.04, h: 0.40,
      color: C.NAVY, fontSize: 13, bold: true, fontFace: "Cambria" });
    s.addText("Вместо рисования мышкой в тяжелых редакторах, мы описываем архитектуру текстом (кодом). Специальные движки PlantUML или Mermaid автоматически генерируют красивую векторную SVG/PNG диаграмму.\n\nКод диаграмм хранится прямо в Git-репозитории проекта.", { x: MX + 0.18, y: CY + 0.62, w: 4.04, h: 3.2,
      color: C.DARK, fontSize: 11.5, fontFace: "Calibri" });

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

  // Slide 12: Сравнение инструментов и подходов
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
      fontSize: 11, fontFace: "Calibri",
      border: { pt: 0.5, color: C.ICE2 },
      colW: [2.5, 3.3, 3.36], rowH: 0.65 });
  }

  // Slide 13: Трассировка моделей на физический код
  {
    const s = cs(pres, "Трассировка моделей на физический код");
    card(s, pres, MX, CY, 4.4, CH, C.ICE);
    s.addText("UML Class → Drizzle ORM Schema", { x: MX + 0.18, y: CY + 0.12, w: 4.04, h: 0.40,
      color: C.NAVY, fontSize: 13, bold: true, fontFace: "Cambria" });
    s.addText("Связи 1-ко-многим между сущностями `User`, `Ticket` и `Message` на диаграмме классов UML преобразуются в реальные связи `foreign key` в файле описания схемы БД `/db/schema.ts`.\n\nКаждому атрибуту класса сопоставляется строгий тип поля (UUID, text, integer, timestamp).", { x: MX + 0.18, y: CY + 0.62, w: 4.04, h: 3.2,
      color: C.DARK, fontSize: 11, fontFace: "Calibri" });

    card(s, pres, MX + 4.7, CY, 4.46, CH, C.GRNL);
    s.addText("UML Component → Docker-контейнеры", { x: MX + 4.88, y: CY + 0.12, w: 4.1, h: 0.40,
      color: C.NAVY, fontSize: 13, bold: true, fontFace: "Cambria" });
    s.addText("Каждый отдельный прямоугольник-компонент на нашей UML Component Diagram запускается как изолированный процесс в своем собственном контейнере Docker. Сборка и сетевые мосты (bridges) между ними описываются в конфигурационном манифесте `docker-compose.yml`.", { x: MX + 4.88, y: CY + 0.62, w: 4.1, h: 3.2,
      color: C.DARK, fontSize: 11, fontFace: "Calibri" });
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
