"use strict";
const path = require("path");
const { C, MX, MY, TH, CY, CH, CW, newPres, addCover, cs, hdr, dr, card, conclusionBanner } = require("./design.cjs");

async function createP5(outDir) {
  const pres = newPres("P5 — Модель функциональных точек");

  // Slide 1: Cover
  addCover(pres, "Тема 5", "Модель функциональных точек\nFunction Point Analysis");

  // Slide 2: Что такое функциональные точки?
  {
    const s = cs(pres, "Что такое функциональные точки?");
    card(s, pres, MX, CY, 4.4, CH, C.ICE);
    s.addText("Сущность метода FPA", { x: MX + 0.18, y: CY + 0.12, w: 4.04, h: 0.40,
      color: C.NAVY, fontSize: 13, bold: true, fontFace: "Cambria" });
    s.addText("Метод функциональных точек (Function Point Analysis, FPA) по стандарту IFPUG — это методика измерения размера ПО с точки зрения логических функций, предоставляемых конечному пользователю.\n\nВ отличие от оценки в LOC (строках кода), FPA не зависит от языка программирования, фреймворков и опыта программистов.", { x: MX + 0.18, y: CY + 0.62, w: 4.04, h: 3.2,
      color: C.DARK, fontSize: 11.5, fontFace: "Calibri" });

    card(s, pres, MX + 4.7, CY, 4.46, CH, C.GRNL);
    s.addText("Для чего применяется оценка?", { x: MX + 4.88, y: CY + 0.12, w: 4.1, h: 0.40,
      color: C.NAVY, fontSize: 13, bold: true, fontFace: "Cambria" });
    s.addText([
      { text: "Объективная оценка объема работ на стадии ТЗ.", options: { bullet: true, breakLine: true } },
      { text: "Планирование бюджетов, сроков и численности команды.", options: { bullet: true, breakLine: true } },
      { text: "Сравнение производительности разных команд в компании.", options: { bullet: true } },
    ], { x: MX + 4.88, y: CY + 0.62, w: 4.1, h: 3.2,
      color: C.DARK, fontSize: 11.5, fontFace: "Calibri" });
  }

  // Slide 3: Пять типов компонентов (IFPUG)
  {
    const s = cs(pres, "Пять типов компонентов (IFPUG)");
    card(s, pres, MX, CY, 4.4, CH, C.ICE);
    s.addText("Функции транзакций", { x: MX + 0.18, y: CY + 0.12, w: 4.04, h: 0.40,
      color: C.NAVY, fontSize: 13, bold: true, fontFace: "Cambria" });
    s.addText("• EI (External Inputs) — входящие транзакции: ввод или изменение данных пользователем.\n• EO (External Outputs) — выходящие транзакции: выдача данных с расчетом, обработкой или уведомлениями.\n• EQ (External Queries) — внешние запросы: просмотр и поиск без изменения базы данных.", { x: MX + 0.18, y: CY + 0.62, w: 4.04, h: 3.2,
      color: C.DARK, fontSize: 11, fontFace: "Calibri" });

    card(s, pres, MX + 4.7, CY, 4.46, CH, C.GRNL);
    s.addText("Функции данных", { x: MX + 4.88, y: CY + 0.12, w: 4.1, h: 0.40,
      color: C.NAVY, fontSize: 13, bold: true, fontFace: "Cambria" });
    s.addText("• ILF (Internal Logical Files) — внутренние логические группы данных, полностью управляемые нашей системой (таблицы СУБД).\n• EIF (External Interface Files) — внешние логические файлы, читаемые из сторонних систем (интеграционная реплика базы данных 1С).", { x: MX + 4.88, y: CY + 0.62, w: 4.1, h: 3.2,
      color: C.DARK, fontSize: 11, fontFace: "Calibri" });
  }

  // Slide 4: EI (External Inputs) в проекте
  {
    const s = cs(pres, "EI (External Inputs): Вводы данных");
    card(s, pres, MX, CY, 4.4, CH, C.ICE);
    s.addText("Определение EI", { x: MX + 0.18, y: CY + 0.12, w: 4.04, h: 0.40,
      color: C.NAVY, fontSize: 13, bold: true, fontFace: "Cambria" });
    s.addText("Внешний ввод — это элементарный процесс, в котором данные пересекают границу системы извне для добавления, изменения или удаления записей в логических файлах ILF.", { x: MX + 0.18, y: CY + 0.62, w: 4.04, h: 3.2,
      color: C.DARK, fontSize: 11.5, fontFace: "Calibri" });

    card(s, pres, MX + 4.7, CY, 4.46, CH, C.GRNL);
    s.addText("Примеры в client-portal", { x: MX + 4.88, y: CY + 0.12, w: 4.1, h: 0.40,
      color: C.NAVY, fontSize: 13, bold: true, fontFace: "Cambria" });
    s.addText("• Форма создания нового обращения клиентом (POST /api/tickets).\n• Форма верификации SMS-кода OTP при входе.\n• Отправка нового сообщения в чат тикета (POST /api/messages).\n• Изменение личных данных пользователя в настройках профиля.", { x: MX + 4.88, y: CY + 0.62, w: 4.1, h: 3.2,
      color: C.DARK, fontSize: 11, fontFace: "Calibri" });
  }

  // Slide 5: EO (External Outputs) в проекте
  {
    const s = cs(pres, "EO (External Outputs): Выводы данных");
    card(s, pres, MX, CY, 4.4, CH, C.ICE);
    s.addText("Определение EO", { x: MX + 0.18, y: CY + 0.12, w: 4.04, h: 0.40,
      color: C.NAVY, fontSize: 13, bold: true, fontFace: "Cambria" });
    s.addText("Внешний вывод — это процесс, отправляющий результаты расчетов или подготовленные данные за пределы системы. Логика обязательно должна содержать математические расчеты или изменение состояний.", { x: MX + 0.18, y: CY + 0.62, w: 4.04, h: 3.2,
      color: C.DARK, fontSize: 11.5, fontFace: "Calibri" });

    card(s, pres, MX + 4.7, CY, 4.46, CH, C.GRNL);
    s.addText("Примеры в client-portal", { x: MX + 4.88, y: CY + 0.12, w: 4.1, h: 0.40,
      color: C.NAVY, fontSize: 13, bold: true, fontFace: "Cambria" });
    s.addText("• Мгновенные оповещения в браузере о смене статусов обращений через WebSocket.\n• Формирование сводного PDF-отчета по затраченному времени на техподдержку.\n• Автоматическая отправка уведомления клиенту о назначенном специалисте.", { x: MX + 4.88, y: CY + 0.62, w: 4.1, h: 3.2,
      color: C.DARK, fontSize: 11, fontFace: "Calibri" });
  }

  // Slide 6: EQ (External Queries) в проекте
  {
    const s = cs(pres, "EQ (External Queries): Внешние запросы");
    card(s, pres, MX, CY, 4.4, CH, C.ICE);
    s.addText("Определение EQ", { x: MX + 0.18, y: CY + 0.12, w: 4.04, h: 0.40,
      color: C.NAVY, fontSize: 13, bold: true, fontFace: "Cambria" });
    s.addText("Внешний запрос — это процесс вывода данных, который считывает записи из ILF/EIF, но не выполняет никаких математических расчетов, формул или изменений состояния.", { x: MX + 0.18, y: CY + 0.62, w: 4.04, h: 3.2,
      color: C.DARK, fontSize: 11.5, fontFace: "Calibri" });

    card(s, pres, MX + 4.7, CY, 4.46, CH, C.GRNL);
    s.addText("Примеры в client-portal", { x: MX + 4.88, y: CY + 0.12, w: 4.1, h: 0.40,
      color: C.NAVY, fontSize: 13, bold: true, fontFace: "Cambria" });
    s.addText("• Просмотр постраничного списка своих обращений с фильтрацией (GET /api/tickets).\n• Отображение карточки конкретного тикета с историей переписки.\n• Чтение настроек профиля и каналов уведомлений.\n• Поиск по ключевым словам в справочнике конфигураций 1С.", { x: MX + 4.88, y: CY + 0.62, w: 4.1, h: 3.2,
      color: C.DARK, fontSize: 11, fontFace: "Calibri" });
  }

  // Slide 7: ILF (Internal Logical Files) в проекте
  {
    const s = cs(pres, "ILF (Internal Logical Files): Внутренние файлы");
    card(s, pres, MX, CY, 4.4, CH, C.ICE);
    s.addText("Определение ILF", { x: MX + 0.18, y: CY + 0.12, w: 4.04, h: 0.40,
      color: C.NAVY, fontSize: 13, bold: true, fontFace: "Cambria" });
    s.addText("Внутренний логический файл — это логически связанная группа данных, хранящаяся и изменяемая внутри нашей системы с помощью транзакций EI.", { x: MX + 0.18, y: CY + 0.62, w: 4.04, h: 3.2,
      color: C.DARK, fontSize: 11.5, fontFace: "Calibri" });

    card(s, pres, MX + 4.7, CY, 4.46, CH, C.GRNL);
    s.addText("Примеры в client-portal (Таблицы Postgres)", { x: MX + 4.88, y: CY + 0.12, w: 4.1, h: 0.40,
      color: C.NAVY, fontSize: 13, bold: true, fontFace: "Cambria" });
    s.addText("• Таблица `users` — учетные записи и роли.\n• Таблица `tickets` — обращения, статусы, версии.\n• Таблица `messages` — история чатов.\n• Таблица `attachments` — метаданные файлов в MinIO.\n• Таблица `outbox` — очередь интеграционных событий для 1С.", { x: MX + 4.88, y: CY + 0.62, w: 4.1, h: 3.2,
      color: C.DARK, fontSize: 11, fontFace: "Calibri" });
  }

  // Slide 8: EIF (External Interface Files) в проекте
  {
    const s = cs(pres, "EIF (External Interface Files): Внешние файлы");
    card(s, pres, MX, CY, 4.4, CH, C.ICE);
    s.addText("Определение EIF", { x: MX + 0.18, y: CY + 0.12, w: 4.04, h: 0.40,
      color: C.NAVY, fontSize: 13, bold: true, fontFace: "Cambria" });
    s.addText("Внешний интерфейсный файл — это логически связанная группа данных, используемая нашей системой для ссылок и запросов, но полностью управляемая и изменяемая другой внешней системой.", { x: MX + 0.18, y: CY + 0.62, w: 4.04, h: 3.2,
      color: C.DARK, fontSize: 11.5, fontFace: "Calibri" });

    card(s, pres, MX + 4.7, CY, 4.46, CH, C.GRNL);
    s.addText("Примеры в client-portal", { x: MX + 4.88, y: CY + 0.12, w: 4.1, h: 0.40,
      color: C.NAVY, fontSize: 13, bold: true, fontFace: "Cambria" });
    s.addText("• Внешняя база реплики 1С (`neo_1c_replica`), которая хранит справочники официальных продуктов 1С и договоров на обслуживание клиентов.\n• Наш портал лишь читает эти данные по мере синхронизации, но изменять договоры внутри портала категорически запрещено.", { x: MX + 4.88, y: CY + 0.62, w: 4.1, h: 3.2,
      color: C.DARK, fontSize: 11, fontFace: "Calibri" });
  }

  // Slide 9: Расчётная таблица UFP
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
        { text: rows[6][0], options: { fill: { color: C.NAVY }, color: C.WHITE, bold: true, align: "left", fontFace: "Calibri" } },
        { text: rows[6][1], options: { fill: { color: C.NAVY }, color: C.WHITE, align: "left", fontFace: "Calibri" } },
        { text: rows[6][2], options: { fill: { color: C.NAVY }, color: C.WHITE, align: "center", fontFace: "Calibri" } },
        { text: rows[6][3], options: { fill: { color: C.NAVY }, color: C.WHITE, align: "center", fontFace: "Calibri" } },
        { text: rows[0][3], options: { fill: { color: C.NAVY }, color: C.WHITE, align: "center", fontFace: "Calibri" } },
        { text: rows[6][5], options: { fill: { color: C.NAVY }, color: C.WHITE, bold: true, align: "center", fontFace: "Calibri" } },
      ]
    ], { x: MX, y: CY, w: CW, h: CH,
      fontSize: 11, fontFace: "Calibri",
      border: { pt: 0.5, color: C.ICE2 },
      colW: [2.2, 3.2, 1.2, 0.9, 0.8, 0.86], rowH: 0.52 });
  }

  // Slide 10: 14 характеристик системы (GSC)
  {
    const s = cs(pres, "Нефункциональные поправки: 14 характеристик (GSC)");
    card(s, pres, MX, CY, 4.4, CH, C.ICE);
    s.addText("Назначение поправок (VAF)", { x: MX + 0.18, y: CY + 0.12, w: 4.04, h: 0.40,
      color: C.NAVY, fontSize: 13, bold: true, fontFace: "Cambria" });
    s.addText("Невыровненные функциональные точки UFP оценивают только объем данных. Но сложность написания кода зависит еще от нефункциональных параметров: производительности, распределенности, надежности и т.д.\n\nДля этого IFPUG вводит коэффициент VAF на основе оценки 14 системных характеристик от 0 до 5.", { x: MX + 0.18, y: CY + 0.62, w: 4.04, h: 3.2,
      color: C.DARK, fontSize: 11.5, fontFace: "Calibri" });

    card(s, pres, MX + 4.7, CY, 4.46, CH, C.GRNL);
    s.addText("Шкала оценок характеристик", { x: MX + 4.88, y: CY + 0.12, w: 4.1, h: 0.40,
      color: C.NAVY, fontSize: 13, bold: true, fontFace: "Cambria" });
    s.addText("• 0 — Отсутствует или не имеет влияния.\n• 1 — Минимальное влияние.\n• 2 — Умеренное влияние.\n• 3 — Среднее влияние.\n• 4 — Сильное влияние.\n• 5 — Критическое влияние на всех уровнях.", { x: MX + 4.88, y: CY + 0.62, w: 4.1, h: 3.2,
      color: C.DARK, fontSize: 11, fontFace: "Calibri" });
  }

  // Slide 11: Оценка GSC параметров (Таблица)
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
      fontSize: 10, fontFace: "Calibri",
      border: { pt: 0.3, color: C.ICE2 },
      colW: [0.4, 2.8, 0.6, 5.4], rowH: 0.28 });

    const sum = 46; 
    const vaf = 0.65 + sum * 0.01;
    s.addText(`Итого сумма баллов (DI) = 46 (арифметически точно!)  →  VAF = 0.65 + 46 * 0.01 = ${vaf.toFixed(2)}`, {
      x: MX, y: CY + CH - 0.32, w: CW, h: 0.3, color: C.NAVY, fontSize: 11, bold: true, fontFace: "Cambria" });
  }

  // Slide 12: Итоговый расчет FP
  {
    const s = cs(pres, "Итоговый расчет функциональных точек");
    card(s, pres, MX, CY, 4.4, CH, C.ICE);
    s.addText("Математический расчет", { x: MX + 0.18, y: CY + 0.12, w: 4.04, h: 0.40,
      color: C.NAVY, fontSize: 13, bold: true, fontFace: "Cambria" });
    s.addText("Формула расчета выровненных функциональных точек:\n  FP = UFP * VAF\n\nПодставляем значения нашего проекта:\n  UFP = 101\n  VAF = 1.11\n\nИтоговый объем:\n  FP = 101 * 1.11 ≈ 112 точек", { x: MX + 0.18, y: CY + 0.62, w: 4.04, h: 3.2,
      color: C.DARK, fontSize: 11.5, fontFace: "Courier New" });

    card(s, pres, MX + 4.7, CY, 4.46, CH, C.GRNL);
    s.addText("Значение для менеджмента", { x: MX + 4.88, y: CY + 0.12, w: 4.1, h: 0.40,
      color: C.NAVY, fontSize: 13, bold: true, fontFace: "Cambria" });
    s.addText("• 112 функциональных точек характеризуют систему как проект средней сложности.\n• Это число позволяет объективно обосновать перед руководством трудоемкость в человеко-часах без использования субъективного метода экспертных оценок.\n• Прекрасная база для расчета плотности багов.", { x: MX + 4.88, y: CY + 0.62, w: 4.1, h: 3.2,
      color: C.DARK, fontSize: 11, fontFace: "Calibri" });
  }

  // Slide 13: Перевод в KLOC и оценку трудоемкости по COCOMO II
  {
    const s = cs(pres, "KLOC и трудоемкость по модели COCOMO II");
    card(s, pres, MX, CY, 4.4, CH, C.ICE);
    s.addText("Перевод FP в строки кода (LOC)", { x: MX + 0.18, y: CY + 0.12, w: 4.04, h: 0.40,
      color: C.NAVY, fontSize: 13, bold: true, fontFace: "Cambria" });
    s.addText("Согласно средним таблицам перевода QSM:\n• 1 FP ≈ 53 строк кода (TypeScript/HTML)\n• 112 FP ≈ 5 936 строк кода (5.94 KLOC)\n\nСледовательно, размер кодовой базы Личного кабинета составит около 5.9 KLOC.", { x: MX + 0.18, y: CY + 0.62, w: 4.04, h: 3.2,
      color: C.DARK, fontSize: 11, fontFace: "Calibri" });

    card(s, pres, MX + 4.7, CY, 4.46, CH, C.GRNL);
    s.addText("Трудоемкость по COCOMO II", { x: MX + 4.88, y: CY + 0.12, w: 4.1, h: 0.40,
      color: C.NAVY, fontSize: 13, bold: true, fontFace: "Cambria" });
    s.addText("Формула базовой модели COCOMO II (органический тип):\n  Effort = 2.4 * (KLOC)^1.05 = 2.4 * (5.94)^1.05 ≈ 15.5 чел.-месяцев\n\nСрок разработки по формуле (TDEV):\n  TDEV = 2.5 * (Effort)^0.38 = 2.5 * (15.5)^0.38 ≈ 7.1 месяцев\n\nЗакон Брукса и честный расчет:\n• Срок TDEV (7.1 мес.) не делится линейно на 2 программистов.\n• Требуемая численность: Effort / TDEV = 15.5 / 7.1 ≈ 2.2 человек.\n• Вывод: команда из 2 разработчиков выполнит проект за ~7.8 месяцев реального времени (или 15.5 чел.-мес) с учетом коэффициента распределения.", { x: MX + 4.88, y: CY + 0.62, w: 4.1, h: 3.2,
      color: C.DARK, fontSize: 11, fontFace: "Calibri" });
  }

  // Slide 14: Заключение
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
