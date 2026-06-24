const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, 'output');
if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
    console.log(`📁 Создана папка: ${outDir}`);
} else {
    // Удаляем все старые .pptx, чтобы перезаписать их
    const files = fs.readdirSync(outDir);
    let deleted = 0;
    for (const file of files) {
        if (file.endsWith('.pptx')) {
            fs.unlinkSync(path.join(outDir, file));
            deleted++;
        }
    }
    if (deleted > 0) {
        console.log(`🗑️ Удалено ${deleted} старых презентаций.`);
    }
}

const TOTAL = 6;
const created = [];

(async () => {
    for (let i = 1; i <= TOTAL; i++) {
        const fileName = `${i}.cjs`;
        const filePath = path.join(__dirname, fileName);

        if (!fs.existsSync(filePath)) {
            console.log(`⚠️ Файл ${fileName} не найден – пропускаем: ${filePath}`);
            continue;
        }

        try {
            const module = require(filePath);
            const funcName = `createP${i}`;

            if (typeof module[funcName] === 'function') {
                console.log(`🔄 Генерация презентации P${i}...`);
                await module[funcName](outDir);
                created.push(`P${i}`);
                console.log(`✅ Презентация P${i} создана.`);
            } else {
                console.log(`⚠️ В файле ${fileName} нет функции ${funcName} – пропускаем.`);
            }
        } catch (err) {
            console.error(`❌ Ошибка при создании P${i}:`, err.message, err.stack);
        }
    }

    if (created.length === 0) {
        console.log('❌ Ни одна презентация не была создана.');
    } else {
        console.log(`\n🎉 Готово! Созданы: ${created.join(', ')}`);
        console.log(`📂 Все файлы лежат в папке: ${outDir}`);
    }
})();
