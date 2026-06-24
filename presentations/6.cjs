"use strict";
const path = require("path");
const { C, MX, MY, TH, CY, CH, CW, newPres, addCover, cs, hdr, dr, card, conclusionBanner, codeBox } = require("./design.cjs");

async function createP6(outDir) {
  const pres = newPres("P6 — Тестирование ПО");

  // Slide 1: Cover
  addCover(pres, "Тема 6", "Тестирование ПО\nSoftware Testing and QA");

  // Slide 2: Роль обеспечения качества (QA)
  {
    const s = cs(pres, "Роль обеспечения качества (QA)");
    card(s, pres, MX, CY, 4.4, CH, C.ICE);
    s.addText("Верификация vs Валидация", { x: MX + 0.18, y: CY + 0.12, w: 4.04, h: 0.40,
      color: C.NAVY, fontSize: 13, bold: true, fontFace: "Cambria" });
    s.addText([
      { text: "Verification (Верификация): 'Создаем ли мы продукт правильно?' Сверка со спецификацией, стандартами и ТЗ.", options: { bullet: true, breakLine: true } },
      { text: "Validation (Валидация): 'Создаем ли мы ПРАВИЛЬНЫЙ продукт?' Соответствует ли система потребностям реального пользователя.", options: { bullet: true } },
    ], { x: MX + 0.18, y: CY + 0.62, w: 4.04, h: 3.2,
      color: C.DARK, fontSize: 11.5, fontFace: "Calibri" });

    card(s, pres, MX + 4.7, CY, 4.46, CH, C.GRNL);
    s.addText("Преимущества автоматизации", { x: MX + 4.88, y: CY + 0.12, w: 4.1, h: 0.40,
      color: C.NAVY, fontSize: 13, bold: true, fontFace: "Cambria" });
    s.addText([
      { text: "Быстрый регресс: тесты запускаются за секунды на каждый коммит.", options: { bullet: true, breakLine: true } },
      { text: "Стабильность: предотвращение старых багов при добавлении фич.", options: { bullet: true, breakLine: true } },
      { text: "Живая документация: тесты описывают реальное поведение API.", options: { bullet: true } },
    ], { x: MX + 4.88, y: CY + 0.62, w: 4.1, h: 3.2,
      color: C.DARK, fontSize: 11.5, fontFace: "Calibri" });
  }

  // Slide 3: Пирамида тестирования
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
        color: C.DARK, fontSize: 10.5, fontFace: "Calibri" });
    });
  }

  // Slide 4: Модульное тестирование (Unit Testing)
  {
    const s = cs(pres, "Unit Testing: Модульные тесты с Jest");
    card(s, pres, MX, CY, 3.8, CH, C.ICE);
    s.addText("Сущность юнит-тестов", { x: MX + 0.15, y: CY + 0.12, w: 3.5, h: 0.35,
      color: C.NAVY, fontSize: 13, bold: true, fontFace: "Cambria" });
    s.addText("• Тестируют код без сетевых вызовов и обращений к дискам.\n• Проверяют граничные условия валидации Zod-схем.\n• Позволяют моментально проверить регулярные выражения для валидации номеров телефонов.\n• Базируются на фреймворке Jest и TS-Jest.", {
      x: MX + 0.15, y: CY + 0.55, w: 3.5, h: CH - 0.8, color: C.DARK, fontSize: 11, fontFace: "Calibri" });

    codeBox(s, pres, MX + 4.1, CY, 5.06, CH,
      "import { CreateTicketSchema } from './validation';\n\ndescribe('CreateTicketSchema Unit Tests', () => {\n  it('should accept valid ticket details', () => {\n    const data = { title: '1C ERP crash', description: 'DB error 109' };\n    expect(CreateTicketSchema.safeParse(data).success).toBe(true);\n  });\n\n  it('should reject short descriptions', () => {\n    const data = { title: '1C ERP crash', description: 'short' };\n    expect(CreateTicketSchema.safeParse(data).success).toBe(false);\n  });\n});", 10.5);
  }

  // Slide 5: Интеграционное тестирование (Integration Testing)
  {
    const s = cs(pres, "Integration Testing: Интеграционные тесты");
    card(s, pres, MX, CY, 3.8, CH, C.ICE);
    s.addText("Сущность интеграции", { x: MX + 0.15, y: CY + 0.12, w: 3.5, h: 0.35,
      color: C.NAVY, fontSize: 13, bold: true, fontFace: "Cambria" });
    s.addText("• Проверяют корректность склейки роутеров, middleware и контроллеров.\n• Тестируют реальный обмен данными с тестовой PostgreSQL СУБД.\n• Эмулируют HTTP-запросы с помощью Supertest.\n• Гарантируют работоспособность роутов безопасности.", {
      x: MX + 0.15, y: CY + 0.55, w: 3.5, h: CH - 0.8, color: C.DARK, fontSize: 11, fontFace: "Calibri" });

    codeBox(s, pres, MX + 4.1, CY, 5.06, CH,
      "import request from 'supertest';\nimport app from './app';\n\ndescribe('GET /api/tickets Integration', () => {\n  it('should fail if user is unauthorized', async () => {\n    const res = await request(app)\n      .get('/api/tickets')\n      .expect(401);\n    expect(res.body.error).toBe('Unauthorized');\n  });\n});", 11);
  }

  // Slide 6: Сквозное тестирование (E2E / Acceptance)
  {
    const s = cs(pres, "E2E: Сквозное приёмочное тестирование");
    card(s, pres, MX, CY, 4.4, CH, C.ICE);
    s.addText("Проектируемые E2E сценарии", { x: MX + 0.18, y: CY + 0.12, w: 4.04, h: 0.40,
      color: C.NAVY, fontSize: 13, bold: true, fontFace: "Cambria" });
    s.addText("Для проекта разработан и настроен шаблон сквозного E2E-тестирования в Playwright. Ввиду раздельного развертывания подсистем фронтенда и бэкенда, сквозные приемочные тесты будут полноценно активированы в CI/CD в фазе финальной сборки. На текущем этапе качество гарантировано модульными и API-тестами.", { x: MX + 0.18, y: CY + 0.62, w: 4.04, h: 3.2,
      color: C.DARK, fontSize: 11.5, fontFace: "Calibri" });

    card(s, pres, MX + 4.7, CY, 4.46, CH, C.GRNL);
    s.addText("Шаблон сценария в Playwright", { x: MX + 4.88, y: CY + 0.12, w: 4.1, h: 0.40,
      color: C.NAVY, fontSize: 13, bold: true, fontFace: "Cambria" });
    s.addText("1. Шаблон запускает браузер и открывает `/login`.\n2. Эмулирует ввод телефона и SMS OTP (мок-код 111111).\n3. Переходит в раздел 'Создать обращение'.\n4. Описывает проблему техподдержки 1С, нажимает кнопку 'Отправить'.\n5. Сверяет статус создания в интерфейсе и СУБД.\n• Готов к полному запуску при интеграции фронтенда.", { x: MX + 4.88, y: CY + 0.62, w: 4.1, h: 3.2,
      color: C.DARK, fontSize: 11, fontFace: "Calibri" });
  }

  // Slide 7: Нагрузочное тестирование (Performance Testing)
  {
    const s = cs(pres, "Нагрузочное тестирование: Сценарии Artillery");
    card(s, pres, MX, CY, 3.8, CH, C.ICE);
    s.addText("Проектирование нагрузки", { x: MX + 0.15, y: CY + 0.12, w: 3.5, h: 0.35,
      color: C.NAVY, fontSize: 13, bold: true, fontFace: "Cambria" });
    s.addText("• Инструмент Artillery позволяет генерировать сотни запросов в секунду (RPS).\n• Мы эмулируем реальное поведение 100 одновременных клиентов техподдержки.\n• Измеряются задержки ответов (Latency: p95, p99).\n• Верифицируется отсутствие ошибок 502/504.", {
      x: MX + 0.15, y: CY + 0.55, w: 3.5, h: CH - 0.8, color: C.DARK, fontSize: 11, fontFace: "Calibri" });

    codeBox(s, pres, MX + 4.1, CY, 5.06, CH,
      "config:\n  target: 'http://localhost:3000'\n  phases:\n    - duration: 60\n      arrivalRate: 5\n      rampTo: 50\n      name: 'Ramping load'\nscenarios:\n  - name: 'Check tickets and chat'\n    flow:\n      - get: { url: '/api/tickets' }\n      - post:\n          url: '/api/messages'\n          json: { text: 'Performance test message' }", 10.5);
  }

  // Slide 8: Тестирование безопасности (Security Testing)
  {
    const s = cs(pres, "Тестирование безопасности: Аудит уязвимостей");
    card(s, pres, MX, CY, 4.4, CH, C.ICE);
    s.addText("Основные векторы по OWASP Top 10", { x: MX + 0.18, y: CY + 0.12, w: 4.04, h: 0.40,
      color: C.NAVY, fontSize: 13, bold: true, fontFace: "Cambria" });
    s.addText("• SQL Injection: автоматические тесты шлют в API кавычки и специальные конструкции вроде `' OR 1=1 --`. Использование Drizzle параметризации гарантирует 100% защиту.\n• Broken Authentication: проверка блокировки сессий при передаче истекших или сломанных JWT-токенов.", { x: MX + 0.18, y: CY + 0.62, w: 4.04, h: 3.2,
      color: C.DARK, fontSize: 11, fontFace: "Calibri" });

    card(s, pres, MX + 4.7, CY, 4.46, CH, C.GRNL);
    s.addText("Защита файлов и утечек", { x: MX + 4.88, y: CY + 0.12, w: 4.1, h: 0.40,
      color: C.NAVY, fontSize: 13, bold: true, fontFace: "Cambria" });
    s.addText("• Приватность вложений: тесты проверяют, что клиент Б не сможет прочитать вложения клиента А по прямой ссылке, так как S3 presigned-ссылки привязаны к сессиям конкретного пользователя.\n• Маскирование паролей и логов: автоматический тест проверяет, что в логи NodeJS не улетают хэши и токены.", { x: MX + 4.88, y: CY + 0.62, w: 4.1, h: 3.2,
      color: C.DARK, fontSize: 11, fontFace: "Calibri" });
  }

  // Slide 9: Тестирование отказоустойчивости интеграции 1С
  {
    const s = cs(pres, "Отказоустойчивость: тестирование синка 1С");
    card(s, pres, MX, CY, 4.4, CH, C.ICE);
    s.addText("Проверка сценариев разрыва сети", { x: MX + 0.18, y: CY + 0.12, w: 4.04, h: 0.40,
      color: C.NAVY, fontSize: 13, bold: true, fontFace: "Cambria" });
    s.addText("Специальный интеграционный тест эмулирует временное отключение симулятора 1С (имитация сбоя связи в ООО 'Неосистемы'). Воркер outbox должен зафиксировать сбой связи, перевести событие в статус `failed` и запустить таймер повторных отложенных попыток.", { x: MX + 0.18, y: CY + 0.62, w: 4.04, h: 3.2,
      color: C.DARK, fontSize: 11.5, fontFace: "Calibri" });

    card(s, pres, MX + 4.7, CY, 4.46, CH, C.GRNL);
    s.addText("Проверка целостности очереди", { x: MX + 4.88, y: CY + 0.12, w: 4.1, h: 0.40,
      color: C.NAVY, fontSize: 13, bold: true, fontFace: "Cambria" });
    s.addText("• Тест гарантирует, что ни один тикет не продублируется в 1С дважды при повторных синк-попытках (проверка идемпотентности).\n• Контроль порядка: тесты проверяют, что сообщения чата приходят в 1С в хронологическом порядке, даже если отправка зависала из-за разрывов связи.", { x: MX + 4.88, y: CY + 0.62, w: 4.1, h: 3.2,
      color: C.DARK, fontSize: 11, fontFace: "Calibri" });
  }

  // Slide 10: Мокирование внешних сервисов (S3, 1С)
  {
    const s = cs(pres, "Мокирование внешних систем в тестах");
    card(s, pres, MX, CY, 4.4, CH, C.ICE);
    s.addText("Мок-клиент для MinIO S3", { x: MX + 0.18, y: CY + 0.12, w: 4.04, h: 0.40,
      color: C.NAVY, fontSize: 13, bold: true, fontFace: "Cambria" });
    s.addText("Тесты запускаются в среде, где реальное облачное хранилище недоступно. Мы используем библиотеку `mock-aws-s3`. Все методы `putObject` и `getSignedUrl` перехватываются, сохраняя файлы во временной оперативной памяти NodeJS, что ускоряет тесты и экономит трафик.", { x: MX + 0.18, y: CY + 0.62, w: 4.04, h: 3.2,
      color: C.DARK, fontSize: 11.5, fontFace: "Calibri" });

    card(s, pres, MX + 4.7, CY, 4.46, CH, C.GRNL);
    s.addText("Мок симулятора 1С", { x: MX + 4.88, y: CY + 0.12, w: 4.1, h: 0.40,
      color: C.NAVY, fontSize: 13, bold: true, fontFace: "Cambria" });
    s.addText("• Вместо запуска тяжелой базы 1С в Docker, тесты шлют запросы на легковесную Express-заглушку (mock-server).\n• Заглушка настроена на генерацию детерминированных ответов: успех (200 OK), задержка (504 Timeout) или сбой данных (400 Bad Request) по требованию тест-кейса.", { x: MX + 4.88, y: CY + 0.62, w: 4.1, h: 3.2,
      color: C.DARK, fontSize: 11, fontFace: "Calibri" });
  }

  // Slide 11: Анализ покрытия тестами (Coverage Metrics)
  {
    const s = cs(pres, "Метрики качества: Анализ покрытия (Coverage)");
    card(s, pres, MX, CY, 4.4, CH, C.ICE);
    s.addText("Что измеряет утилита Jest Coverage?", { x: MX + 0.18, y: CY + 0.12, w: 4.04, h: 0.40,
      color: C.NAVY, fontSize: 13, bold: true, fontFace: "Cambria" });
    s.addText("• Statement Coverage — какой процент строк кода был исполнен.\n• Branch Coverage — пройдены ли все условия ветвления (`if-else` блоки).\n• Function Coverage — вызваны ли все объявленные функции.\n• Line Coverage — количество выполненных физических строк кода.", { x: MX + 0.18, y: CY + 0.62, w: 4.04, h: 3.2,
      color: C.DARK, fontSize: 11, fontFace: "Calibri" });

    card(s, pres, MX + 4.7, CY, 4.46, CH, C.GRNL);
    s.addText("Целевые показатели качества", { x: MX + 4.88, y: CY + 0.12, w: 4.1, h: 0.40,
      color: C.NAVY, fontSize: 13, bold: true, fontFace: "Cambria" });
    s.addText("• Общее покрытие операторов (statements) во всём проекте установлено на уровне не менее 80%.\n• Покрытие критических модулей бизнес-логики (TicketService, MessageService) — не менее 90%.\n• При падении суммарного покрытия ниже 80% сборка проекта в CI/CD автоматически ломается, предотвращая выкат непроверенного кода в прод.", { x: MX + 4.88, y: CY + 0.62, w: 4.1, h: 3.2,
      color: C.DARK, fontSize: 11, fontFace: "Calibri" });
  }

  // Slide 12: Автоматизация тестирования в CI/CD
  {
    const s = cs(pres, "Автоматизация: CI/CD пайплайн в GitHub Actions");
    card(s, pres, MX, CY, 3.8, CH, C.ICE);
    s.addText("Непрерывная интеграция (CI)", { x: MX + 0.15, y: CY + 0.12, w: 3.5, h: 0.35,
      color: C.NAVY, fontSize: 13, bold: true, fontFace: "Cambria" });
    s.addText("• Разработчики не могут залить код в ветку `main` без прохождения тестов.\n• GitHub Actions автоматически разворачивает чистую среду Node.js.\n• Устанавливает зависимости из lock-файла.\n• Запускает линтер ESLint, сборщик и прогоняет модульные и интеграционные тесты Jest.", {
      x: MX + 0.15, y: CY + 0.55, w: 3.5, h: CH - 0.8, color: C.DARK, fontSize: 11, fontFace: "Calibri" });

    codeBox(s, pres, MX + 4.1, CY, 5.06, CH,
      "name: Continuous Integration\non:\n  pull_request:\n    branches: [ main ]\njobs:\n  test:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v3\n      - uses: actions/setup-node@v3\n      - run: npm ci\n      - run: npm run lint\n      - run: npm run test:coverage\n      - run: npm run build", 10.5);
  }

  // Slide 13: Локальная тестовая песочница Docker Compose
  {
    const s = cs(pres, "Локальная тестовая песочница Docker Compose");
    card(s, pres, MX, CY, 4.4, CH, C.ICE);
    s.addText("Оркестрация тестовой среды", { x: MX + 0.18, y: CY + 0.12, w: 4.04, h: 0.40,
      color: C.NAVY, fontSize: 13, bold: true, fontFace: "Cambria" });
    s.addText("Для запуска полноценных интеграционных и E2E тестов разработчику не нужно вручную настраивать базы данных на компьютере. Вся инфраструктура разворачивается одной командой `docker-compose -f docker-compose.test.yml up -d`.", { x: MX + 0.18, y: CY + 0.62, w: 4.04, h: 3.2,
      color: C.DARK, fontSize: 11.5, fontFace: "Calibri" });

    card(s, pres, MX + 4.7, CY, 4.46, CH, C.GRNL);
    s.addText("Тестовые контейнеры", { x: MX + 4.88, y: CY + 0.12, w: 4.1, h: 0.40,
      color: C.NAVY, fontSize: 13, bold: true, fontFace: "Cambria" });
    s.addText("• `test-db` — СУБД PostgreSQL с автоматически накатаными тестовыми схемами.\n• `test-s3` — легковесный MinIO для бинарных файлов.\n• `mock-1c` — симулятор учетной системы компании.\n• Контейнеры полностью изолированы от боевой среды и автоматически очищаются после прогона тестов.", { x: MX + 4.88, y: CY + 0.62, w: 4.1, h: 3.2,
      color: C.DARK, fontSize: 11, fontFace: "Calibri" });
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
