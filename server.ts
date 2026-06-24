import express from "express";
import path from "path";
import fs from "fs";
import { exec } from "child_process";
import { createServer as createViteServer } from "vite";

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Presentation metadata to drive a rich, interactive presentation hub
const PRESENTATIONS_METADATA = [
  {
    id: 1,
    file: "P1_Диаграмма_прецедентов.pptx",
    title: "Диаграмма прецедентов (Use Case Diagram)",
    topic: "Тема 1",
    description: "Анализ функциональных требований к Личному кабинету. Описание ролей Клиента и Поддержки, ключевых сценариев взаимодействия и трассировка на API-маршруты и автотесты.",
    slidesCount: 14,
    slides: [
      { num: 1, title: "Титульный слайд", summary: "Тема 1. Диаграмма прецедентов (Use Case Diagram)." },
      { num: 2, title: "Назначение диаграммы прецедентов", summary: "Назначение UML Use Case, сущность и границы системы." },
      { num: 3, title: "Контекст проекта client-portal", summary: "Бизнес-цели Личного кабинета ООО «Неосистемы Северо-Запад», интеграционные стыки (Postgres, S3, 1С)." },
      { num: 4, title: "Акторы (Actors) системы", summary: "Действующие лица: Представитель клиента (Клиент) и Сотрудник поддержки (Менеджер)." },
      { num: 5, title: "Основные прецеденты (Use Cases)", summary: "Таблица прецедентов с описаниями сценариев взаимодействия." },
      { num: 6, title: "Диаграмма прецедентов UML", summary: "Визуальная нотация отношений между акторами и прецедентами в границах client-portal." },
      { num: 7, title: "Спецификация UC-01: Создание обращения", summary: "Детальный пошаговый разбор условий и основного потока создания заявки." },
      { num: 8, title: "Спецификация UC-02: Чат в реальном времени", summary: "Детальный разбор WebSocket чата поддержки и гарантий доставки сообщений." },
      { num: 9, title: "Спецификация UC-03: Загрузка файлов в S3", summary: "Сценарий прямой загрузки в MinIO по presigned URLs." },
      { num: 10, title: "Спецификация UC-04: Синхронизация с 1С", summary: "Асинхронная выгрузка обращений из outbox-очереди PostgreSQL в 1С." },
      { num: 11, title: "Трассировка прецедентов на API-роуты", summary: "Связь Use Cases с HTTP методами и классами-валидаторами Zod." },
      { num: 12, title: "Покрытие прецедентов автотестами", summary: "Сценарии Playwright/Cypress для сквозной проверки требований." },
      { num: 13, title: "Управление сбоями и исключениями", summary: "Обработка разрывов связи, retry logic и конфликтов версий." },
      { num: 14, title: "Выводы по теме", summary: "Роль диаграммы прецедентов в успешной реализации требований Личного кабинета." }
    ]
  },
  {
    id: 2,
    file: "P2_Атрибуты_качества.pptx",
    title: "Атрибуты качества для разработчиков (Internal Quality)",
    topic: "Тема 2",
    description: "Исследование внутренних характеристик качества (модульность, тестируемость, расширяемость, поддерживаемость, безопасность), метрик их оценки и реализации в архитектуре бэкенда.",
    slidesCount: 14,
    slides: [
      { num: 1, title: "Титульный слайд", summary: "Тема 2. Атрибуты качества для разработчиков (Internal Quality)." },
      { num: 2, title: "Пользователь vs разработчик", summary: "Разница между внешним качеством (UI/UX) и внутренним качеством кода." },
      { num: 3, title: "Ключевые атрибуты в проекте", summary: "Модульность, тестируемость, расширяемость, поддерживаемость, безопасность в client-portal." },
      { num: 4, title: "Модульность: структура директорий", summary: "Изолированная структура слоев бэкенда (routes, services, db)." },
      { num: 5, title: "Изолированность слоев архитектуры", summary: "Преимущества слабого зацепления против смешивания кода." },
      { num: 6, title: "Тестируемость: стратегии мокирования", summary: "Имитация СУБД Postgres, S3 MinIO и СУБД 1С." },
      { num: 7, title: "Поддерживаемость: типы TypeScript", summary: "Интерфейсы данных для полной типобезопасности компиляции." },
      { num: 8, title: "Поддерживаемость: Zod-валидация", summary: "Парсинг и фильтрация HTTP запросов по строгим схемам." },
      { num: 9, title: "Расширяемость: паттерны проектирования", summary: "Применение паттерна Стратегия для каналов нотификаций." },
      { num: 10, title: "Безопасность: авторизация JWT", summary: "Двухфакторный вход по SMS OTP и пара Access/Refresh токенов." },
      { num: 11, title: "Безопасность: защита от сетевых атак", summary: "CORS, Rate Limiter и экранирование параметров SQL инъекций." },
      { num: 12, title: "Оптимистичная блокировка", summary: "Решение конкурентного доступа через версионирование (version)." },
      { num: 13, title: "Инструменты контроля качества", summary: "Линтеры ESLint, TypeScript компилятор, Jest и Artillery." },
      { num: 14, title: "Выводы по теме", summary: "Вклад внутреннего качества в снижение стоимости сопровождения ПО." }
    ]
  },
  {
    id: 3,
    file: "P3_Интерфейс_подсистем.pptx",
    title: "Интерфейс подсистем (Subsystem Interfaces)",
    topic: "Тема 3",
    description: "Проектирование архитектурных стыков, интеграций и контрактов. Детальная REST-спецификация, WebSocket real-time события, S3-интеграция и асинхронный Outbox-паттерн.",
    slidesCount: 14,
    slides: [
      { num: 1, title: "Титульный слайд", summary: "Тема 3. Интерфейс подсистем (Subsystem Interfaces)." },
      { num: 2, title: "Что такое интерфейс подсистемы?", summary: "Интерфейс как контракт взаимодействия и инкапсуляция." },
      { num: 3, title: "Подсистемы в проекте", summary: "Определение 6 подсистем: Фронтенд, Бэкенд, Postgres, MinIO, WS, 1С." },
      { num: 4, title: "Спецификация стыковки подсистем", summary: "Таблица протоколов взаимодействия (REST, WS, S3 API, outbox)." },
      { num: 5, title: "Диаграмма компонентов UML", summary: "Визуальная нотация UML диаграммы компонентов." },
      { num: 6, title: "Спецификация REST API", summary: "Таблица роутов и методов для контроллера /api/tickets." },
      { num: 7, title: "Безопасность и Middleware в API", summary: "Проверка JWT токенов и разграничение ролей (RBAC)." },
      { num: 8, title: "Интерфейс реального времени", summary: "WebSocket соединения, комнаты и тикет-подписки." },
      { num: 9, title: "Интерфейс хранилища файлов S3", summary: "Решение проблемы Event Loop через presigned URL загрузку." },
      { num: 10, title: "Интерфейс базы данных PostgreSQL", summary: "Пул TCP-соединений СУБД и быстродействие Drizzle ORM." },
      { num: 11, title: "Интеграция с 1С: Outbox Pattern", summary: "Асинхронная транзакционная очередь отправки обращений." },
      { num: 12, title: "Защита стыков подсистем", summary: "Rate limiting, CORS белый список и лимиты Zod." },
      { num: 13, title: "Гибкость и заменяемость стыков", summary: "Безболезненная замена S3 хранилища и масштабирование Express." },
      { num: 14, title: "Выводы по теме", summary: "Снижение связанности систем благодаря стандартизации контрактов." }
    ]
  },
  {
    id: 4,
    file: "P4_Языки_моделирования.pptx",
    title: "Языки моделирования (Modeling Languages)",
    topic: "Тема 4",
    description: "Обоснование использования UML в проекте. Сравнение диаграмм классов, прецедентов, компонентов и последовательностей, а также смежных стандартов ERD (БД) и BPMN (Процессы).",
    slidesCount: 14,
    slides: [
      { num: 1, title: "Титульный слайд", summary: "Тема 4. Языки моделирования (Modeling Languages)." },
      { num: 2, title: "Что такое язык моделирования?", summary: "Стандарт UML как инструмент абстракции сложных ИТ систем." },
      { num: 3, title: "Моделирование в курсе ТППО", summary: "Формализация требований до написания кода." },
      { num: 4, title: "Матрица UML диаграмм в проекте", summary: "Применение Use Case, Component, Class и Sequence диаграмм." },
      { num: 5, title: "UML Use Case Diagram", summary: "Фиксация требований, акторов и их целей на портале." },
      { num: 6, title: "UML Component Diagram", summary: "Сборочные единицы и их интерфейсы в Личном кабинете." },
      { num: 7, title: "UML Class Diagram", summary: "Классы сущностей базы данных (User, Ticket, Message, File) и связи." },
      { num: 8, title: "UML Sequence Diagram", summary: "Динамика и последовательность взаимодействия подсистем во времени." },
      { num: 9, title: "ERD (Entity-Relationship)", summary: "Физическое проектирование таблиц, ключей и индексов в Postgres." },
      { num: 10, title: "BPMN 2.0", summary: "Проектирование workflow жизненного цикла обращений." },
      { num: 11, title: "Diagrams as Code", summary: "Текстовое описание схем в PlantUML и Mermaid.js." },
      { num: 12, title: "Сравнение визуального и кодового", summary: "Таблица преимуществ PlantUML перед классическими draw.io/Miro." },
      { num: 13, title: "Трассировка моделей в код", summary: "Сопоставление классов схеме Drizzle и компонентов контейнерам Docker." },
      { num: 14, title: "Выводы по теме", summary: "Проектирование от моделей как защита от накопления архитектурного долга." }
    ]
  },
  {
    id: 5,
    file: "P5_Функциональные_точки.pptx",
    title: "Модель функциональных точек (Function Points)",
    topic: "Тема 5",
    description: "Математический расчет объема системы по методике IFPUG. Оценка Unadjusted Function Points, Value Adjustment Factor (VAF), KLOC и перевод в трудоемкость по COCOMO II.",
    slidesCount: 14,
    slides: [
      { num: 1, title: "Титульный слайд", summary: "Тема 5. Модель функциональных точек (Function Point Analysis)." },
      { num: 2, title: "Что такое функциональные точки?", summary: "Преимущества FPA. Пять типов компонентов: EI, EO, EQ, ILF, EIF." },
      { num: 3, title: "Пять типов компонентов с примерами", summary: "Примеры из client-portal: вводы (создание обращения), выводы (WebSocket), запросы, файлы БД." },
      { num: 4, title: "EI (External Inputs) в проекте", summary: "Примеры ввода данных: формы создания обращений, SMS верификация." },
      { num: 5, title: "EO (External Outputs) в проекте", summary: "Примеры выводов: WebSocket push уведомления, PDF отчеты." },
      { num: 6, title: "EQ (External Queries) в проекте", summary: "Примеры запросов без изменения состояния: списки, карточки." },
      { num: 7, title: "ILF (Internal Logical Files)", summary: "Внутренние файлы данных: таблицы users, tickets, messages, outbox." },
      { num: 8, title: "EIF (External Interface Files)", summary: "Внешние справочники договоров и продуктов в реплике 1С." },
      { num: 9, title: "Расчётная таблица UFP", summary: "Матрица невыровненных функциональных точек с весами сложности (101 UFP)." },
      { num: 10, title: "Нефункциональные поправки (VAF)", summary: "Методика оценки 14 системных характеристик GSC." },
      { num: 11, title: "Оценка GSC параметров", summary: "Балльная оценка факторов производительности, транзакций и VAF = 1.07." },
      { num: 12, title: "Итоговый расчет FP", summary: "Формула FP = UFP * VAF = 101 * 1.07 = 108 функциональных точек." },
      { num: 13, title: "Оценка KLOC и COCOMO II", summary: "Перевод FP в строки кода (5.7 KLOC) и расчет трудоемкости (14.8 чел.-мес.)" },
      { num: 14, title: "Выводы по теме", summary: "Объективная математическая основа планирования ИТ бюджетов и сроков." }
    ]
  },
  {
    id: 6,
    file: "P6_Тестирование.pptx",
    title: "Тестирование ПО (Testing and QA)",
    topic: "Тема 6",
    description: "Стратегия многоуровневого тестирования клиентского портала. Примеры модульных тестов (Zod), интеграционных тестов API (Supertest) и нагрузочных испытаний (Artillery).",
    slidesCount: 14,
    slides: [
      { num: 1, title: "Титульный слайд", summary: "Тема 6. Тестирование ПО (Testing and QA)." },
      { num: 2, title: "Роль обеспечения качества (QA)", summary: "Различия верификации требований и валидации продукта." },
      { num: 3, title: "Пирамида тестирования в проекте", summary: "Уровни тестов: Unit, Integration, E2E, Performance, Security." },
      { num: 4, title: "Модульное тестирование (Unit)", summary: "Код Jest теста валидатора схем Zod для безопасного API." },
      { num: 5, title: "Интеграционное тестирование", summary: "Код интеграционного HTTP теста роутов API через Supertest." },
      { num: 6, title: "Сквозное тестирование (E2E)", summary: "Роботизированная проверка интерфейса браузера через Playwright." },
      { num: 7, title: "Нагрузочное тестирование", summary: "YAML конфигурация нагрузочного сценария Artillery для СУБД." },
      { num: 8, title: "Тестирование безопасности", summary: "Проверка уязвимостей SQLi, XSS и приватности вложений S3." },
      { num: 9, title: "Тестирование отказоустойчивости", summary: "Имитация падения СУБД 1С и проверка outbox-очереди." },
      { num: 10, title: "Мокирование внешних систем", summary: "Применение AWS S3 mock заглушек и симулятора ответов 1С." },
      { num: 11, title: "Анализ покрытия (Coverage)", summary: "Метрики Statement, Branch, Line и целевая планка >80%." },
      { num: 12, title: "Автоматизация тестов в CI/CD", summary: "YAML скрипт пайплайна непрерывной интеграции в GitHub Actions." },
      { num: 13, title: "Локальная песочница Docker", summary: "Конфигурирование тестового окружения в docker-compose.test.yml." },
      { num: 14, title: "Выводы по теме", summary: "Автотесты как залог надежности и бесперебойной интеграции с 1С." }
    ]
  }
];

// API Endpoints
app.get("/api/presentations", (req, res) => {
  const outputDir = path.join(process.cwd(), "presentations", "output");
  const data = PRESENTATIONS_METADATA.map((p) => {
    const filePath = path.join(outputDir, p.file);
    let generated = false;
    let size = 0;
    let generatedAt = null;

    if (fs.existsSync(filePath)) {
      generated = true;
      const stat = fs.statSync(filePath);
      size = stat.size;
      generatedAt = stat.mtime;
    }

    return {
      ...p,
      generated,
      size: generated ? `${(size / 1024).toFixed(1)} КБ` : "—",
      slidesCount: p.slidesCount || 8,
      slides: p.slides || []
    };
  });

  res.json({ success: true, presentations: data });
});

app.post("/api/generate", (req, res) => {
  console.log("Starting presentation generation script...");
  const scriptPath = path.join(process.cwd(), "presentations", "run.cjs");
  
  exec(`npx tsx "${scriptPath}"`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Generation error: ${error.message}`);
      return res.status(500).json({
        success: false,
        error: error.message,
        details: stderr,
      });
    }
    
    console.log(`Generation stdout: ${stdout}`);
    res.json({
      success: true,
      message: "Презентации успешно перегенерированы!",
      output: stdout
    });
  });
});

app.get("/api/download/:file", (req, res) => {
  const fileName = req.params.file;
  
  // Security check to prevent directory traversal
  if (!fileName || fileName.includes("/") || fileName.includes("\\") || !fileName.endsWith(".pptx")) {
    return res.status(400).json({ success: false, error: "Неверное имя файла" });
  }

  const filePath = path.join(process.cwd(), "presentations", "output", fileName);
  
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ success: false, error: "Файл не найден. Пожалуйста, сгенерируйте презентации." });
  }

  res.download(filePath, fileName, (err) => {
    if (err) {
      console.error(`Download error: ${err.message}`);
    }
  });
});

// Vite Middleware & Static Serving Setup
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
