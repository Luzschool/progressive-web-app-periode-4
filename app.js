/* ===== Mijn Gezondheid PWA v2 ===== */

// ===== STATE =====
let currentLang = localStorage.getItem('gezondheid-lang') || 'nl';
let currentTheme = localStorage.getItem('gezondheid-theme') || 'light';
let currentPage = 'dashboard';
let currentFilter = 'dag';
let deferredPrompt = null;
const WATER_GOAL = 2500; // ml per dag

// ===== I18N TRANSLATIONS =====
const translations = {
    nl: {
        appTitle: 'Mijn Gezondheid',
        navDashboard: 'Dashboard',
        navInvoer: 'Invoer',
        navOverzicht: 'Overzicht',
        navTools: 'Tools',
        dashboardTitle: 'Jouw Gezondheid Vandaag',
        labelKcal: 'kcal vandaag',
        labelKJ: 'kJ vandaag',
        labelActiviteiten: 'activiteiten',
        labelGemiddeld: 'gem. kcal/dag',
        waterTitle: 'Water Tracker',
        btnWater250: '+ 250 ml',
        btnWater500: '+ 500 ml',
        btnWaterReset: 'Reset',
        recentTitle: 'Recente invoer',
        emptyRecent: 'Nog geen gegevens ingevoerd',
        btnQuickAdd: '+ Snel toevoegen',
        invoerTitle: 'Gezondheidsgegevens Toevoegen',
        labelDatum: 'Datum',
        labelCategorie: 'Categorie',
        selectCategorie: '-- Kies categorie --',
        catOntbijt: 'Ontbijt',
        catLunch: 'Lunch',
        catDiner: 'Diner',
        catTussendoortje: 'Tussendoortje',
        catSport: 'Sport / Beweging',
        catWater: 'Water drinken',
        catSlaap: 'Slaap',
        labelOmschrijving: 'Omschrijving',
        placeholderOmschrijving: 'Bijv. Havermout met banaan',
        labelWaarde: 'Waarde',
        placeholderWaarde: 'Bijv. 250',
        labelEenheid: 'Eenheid',
        labelConverter: 'Converter',
        btnKcalToKJ: 'kcal → kJ',
        btnKJToKcal: 'kJ → kcal',
        btnMET: 'MET-calculator',
        btnOpslaan: 'Opslaan',
        btnReset: 'Reset formulier',
        overzichtTitle: 'Overzicht Gezondheidsgegevens',
        labelPeriode: 'Periode:',
        filterDag: 'Dag',
        filterWeek: 'Week',
        filterMaand: 'Maand',
        summaryTotaal: 'Totaal:',
        summaryGemiddeld: 'Gemiddeld:',
        summaryMin: 'Minimum:',
        summaryMax: 'Maximum:',
        emptyOverzicht: 'Geen gegevens gevonden voor deze periode',
        toolsTitle: 'Gezondheidstools',
        bmiTitle: 'BMI Calculator',
        bmiDesc: 'Bereken je Body Mass Index op basis van lengte en gewicht.',
        labelLengte: 'Lengte (cm)',
        placeholderLengte: '175',
        labelGewicht: 'Gewicht (kg)',
        placeholderGewicht: '70',
        btnBerekenBMI: 'Bereken BMI',
        slaapTitle: 'Slaapcalculator',
        slaapDesc: 'Bereken je slaapduur en kwaliteit op basis van bedtijd en wektijd.',
        labelBedtijd: 'Bedtijd',
        labelWektijd: 'Wektijd',
        btnBerekenSlaap: 'Bereken slaap',
        dataTitle: 'Data Beheer',
        dataDesc: 'Exporteer, importeer of reset alle gegevens.',
        btnExport: '📥 Exporteer JSON',
        btnImport: '📤 Importeer JSON',
        btnResetAll: '🗑️ Reset alle data',
        footerText: '© 2026 Mijn Gezondheid PWA',
        toastSaved: 'Gegevens opgeslagen!',
        toastDeleted: 'Item verwijderd',
        toastReset: 'Formulier gereset',
        toastConverted: 'Berekend: ',
        toastWaterAdded: 'Water toegevoegd!',
        toastWaterReset: 'Water tracker gereset',
        toastDataExported: 'Data geëxporteerd!',
        toastDataImported: 'Data geïmporteerd!',
        toastDataReset: 'Alle data is verwijderd',
        confirmDelete: 'Weet je zeker dat je dit item wilt verwijderen?',
        confirmResetAll: 'Weet je zeker dat je ALLE data wilt verwijderen? Dit kan niet ongedaan worden gemaakt.',
        installPrompt: 'Installeer Mijn Gezondheid op je startscherm',
        btnInstall: 'Installeren',
        btnDismiss: 'Nee, bedankt',
        bmiOndergewicht: 'Ondergewicht',
        bmiGezond: 'Gezond gewicht',
        bmiOvergewicht: 'Overgewicht',
        bmiObesitas: 'Obesitas',
        slaapGoed: 'Goede nachtrust',
        slaapMatig: 'Matige nachtrust',
        slaapSlecht: 'Onvoldoende slaap',
        errorInvoer: 'Vul alle velden correct in',
        errorBMI: 'Vul lengte en gewicht correct in',
        errorSlaap: 'Vul beide tijden in'
    },
    en: {
        appTitle: 'My Health',
        navDashboard: 'Dashboard',
        navInvoer: 'Add Entry',
        navOverzicht: 'Overview',
        navTools: 'Tools',
        dashboardTitle: 'Your Health Today',
        labelKcal: 'kcal today',
        labelKJ: 'kJ today',
        labelActiviteiten: 'activities',
        labelGemiddeld: 'avg. kcal/day',
        waterTitle: 'Water Tracker',
        btnWater250: '+ 250 ml',
        btnWater500: '+ 500 ml',
        btnWaterReset: 'Reset',
        recentTitle: 'Recent entries',
        emptyRecent: 'No data entered yet',
        btnQuickAdd: '+ Quick Add',
        invoerTitle: 'Add Health Data',
        labelDatum: 'Date',
        labelCategorie: 'Category',
        selectCategorie: '-- Select category --',
        catOntbijt: 'Breakfast',
        catLunch: 'Lunch',
        catDiner: 'Dinner',
        catTussendoortje: 'Snack',
        catSport: 'Exercise',
        catWater: 'Water intake',
        catSlaap: 'Sleep',
        labelOmschrijving: 'Description',
        placeholderOmschrijving: 'E.g. Oatmeal with banana',
        labelWaarde: 'Value',
        placeholderWaarde: 'E.g. 250',
        labelEenheid: 'Unit',
        labelConverter: 'Converter',
        btnKcalToKJ: 'kcal → kJ',
        btnKJToKcal: 'kJ → kcal',
        btnMET: 'MET calculator',
        btnOpslaan: 'Save',
        btnReset: 'Reset form',
        overzichtTitle: 'Health Data Overview',
        labelPeriode: 'Period:',
        filterDag: 'Day',
        filterWeek: 'Week',
        filterMaand: 'Month',
        summaryTotaal: 'Total:',
        summaryGemiddeld: 'Average:',
        summaryMin: 'Minimum:',
        summaryMax: 'Maximum:',
        emptyOverzicht: 'No data found for this period',
        toolsTitle: 'Health Tools',
        bmiTitle: 'BMI Calculator',
        bmiDesc: 'Calculate your Body Mass Index based on height and weight.',
        labelLengte: 'Height (cm)',
        placeholderLengte: '175',
        labelGewicht: 'Weight (kg)',
        placeholderGewicht: '70',
        btnBerekenBMI: 'Calculate BMI',
        slaapTitle: 'Sleep Calculator',
        slaapDesc: 'Calculate your sleep duration and quality based on bedtime and wake time.',
        labelBedtijd: 'Bedtime',
        labelWektijd: 'Wake time',
        btnBerekenSlaap: 'Calculate sleep',
        dataTitle: 'Data Management',
        dataDesc: 'Export, import or reset all data.',
        btnExport: '📥 Export JSON',
        btnImport: '📤 Import JSON',
        btnResetAll: '🗑️ Reset all data',
        footerText: '© 2026 My Health PWA',
        toastSaved: 'Data saved!',
        toastDeleted: 'Item deleted',
        toastReset: 'Form reset',
        toastConverted: 'Calculated: ',
        toastWaterAdded: 'Water added!',
        toastWaterReset: 'Water tracker reset',
        toastDataExported: 'Data exported!',
        toastDataImported: 'Data imported!',
        toastDataReset: 'All data has been deleted',
        confirmDelete: 'Are you sure you want to delete this item?',
        confirmResetAll: 'Are you sure you want to delete ALL data? This cannot be undone.',
        installPrompt: 'Install My Health on your home screen',
        btnInstall: 'Install',
        btnDismiss: 'No thanks',
        bmiOndergewicht: 'Underweight',
        bmiGezond: 'Healthy weight',
        bmiOvergewicht: 'Overweight',
        bmiObesitas: 'Obese',
        slaapGoed: 'Good night\'s sleep',
        slaapMatig: 'Moderate sleep',
        slaapSlecht: 'Insufficient sleep',
        errorInvoer: 'Please fill in all fields correctly',
        errorBMI: 'Please enter valid height and weight',
        errorSlaap: 'Please enter both times'
    }
};

// ===== DOM READY =====
document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

function initApp() {
    document.getElementById('datum').valueAsDate = new Date();
    applyTheme(currentTheme);
    applyLanguage(currentLang);
    setupNavigation();
    setupForm();
    setupFilters();
    setupLanguageSwitch();
    setupThemeToggle();
    renderDashboard();
    renderOverzicht();
    registerServiceWorker();
    setupInstallPrompt();
}

// ===== THEME =====
function setupThemeToggle() {
    document.getElementById('themeToggle').addEventListener('click', () => {
        currentTheme = currentTheme === 'light' ? 'dark' : 'light';
        localStorage.setItem('gezondheid-theme', currentTheme);
        applyTheme(currentTheme);
    });
}

function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    const btn = document.getElementById('themeToggle');
    btn.textContent = theme === 'light' ? '🌙' : '☀️';
    btn.setAttribute('aria-label', theme === 'light' ? 'Donker thema' : 'Licht thema');
}

// ===== NAVIGATION =====
function setupNavigation() {
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            navigateTo(btn.dataset.page);
        });
    });
}

function navigateTo(page) {
    currentPage = page;
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.page === page);
    });
    document.querySelectorAll('.page').forEach(p => {
        p.classList.toggle('active', p.id === page);
    });
    if (page === 'dashboard') renderDashboard();
    if (page === 'overzicht') renderOverzicht();
    window.scrollTo(0, 0);
}

// ===== LOCALSTORAGE DATA =====
function getEntries() {
    const data = localStorage.getItem('gezondheid-data');
    return data ? JSON.parse(data) : [];
}

function saveEntries(entries) {
    localStorage.setItem('gezondheid-data', JSON.stringify(entries));
}

function addEntry(entry) {
    const entries = getEntries();
    entry.id = Date.now().toString();
    entries.push(entry);
    saveEntries(entries);
    return entry;
}

function deleteEntry(id) {
    const entries = getEntries().filter(e => e.id !== id);
    saveEntries(entries);
}

// ===== WATER TRACKER =====
function getWaterData() {
    const data = localStorage.getItem('gezondheid-water');
    return data ? JSON.parse(data) : {};
}

function saveWaterData(data) {
    localStorage.setItem('gezondheid-water', JSON.stringify(data));
}

function getTodayWater() {
    const waterData = getWaterData();
    const today = new Date().toISOString().split('T')[0];
    return waterData[today] || 0;
}

function addWater(amount) {
    const waterData = getWaterData();
    const today = new Date().toISOString().split('T')[0];
    waterData[today] = (waterData[today] || 0) + amount;
    saveWaterData(waterData);
    renderWaterTracker();
    showToast(t('toastWaterAdded'));
}

function resetWaterToday() {
    const waterData = getWaterData();
    const today = new Date().toISOString().split('T')[0];
    delete waterData[today];
    saveWaterData(waterData);
    renderWaterTracker();
    showToast(t('toastWaterReset'));
}

function renderWaterTracker() {
    const current = getTodayWater();
    const percentage = Math.min((current / WATER_GOAL) * 100, 100);
    document.getElementById('waterFill').style.height = percentage + '%';
    document.getElementById('waterPercentage').textContent = Math.round(percentage) + '%';
    document.getElementById('waterGoalText').textContent = `${current} / ${WATER_GOAL} ml`;
}

// ===== FORM =====
function setupForm() {
    const form = document.getElementById('invoerForm');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const entry = {
            datum: document.getElementById('datum').value,
            categorie: document.getElementById('categorie').value,
            omschrijving: document.getElementById('omschrijving').value.trim(),
            waarde: parseFloat(document.getElementById('waarde').value),
            eenheid: document.getElementById('eenheid').value
        };
        if (!entry.datum || !entry.categorie || !entry.omschrijving || isNaN(entry.waarde)) {
            showToast(t('errorInvoer'));
            return;
        }
        addEntry(entry);
        showToast(t('toastSaved'));
        form.reset();
        document.getElementById('datum').valueAsDate = new Date();
        renderDashboard();
    });
    form.addEventListener('reset', () => {
        setTimeout(() => { document.getElementById('datum').valueAsDate = new Date(); }, 0);
        showToast(t('toastReset'));
    });
}

// ===== CONVERTERS =====
function convertKcalToKJ() {
    const waarde = parseFloat(document.getElementById('waarde').value);
    if (isNaN(waarde)) { showConverterResult(t('errorInvoer')); return; }
    const kj = (waarde * 4.184).toFixed(1);
    showConverterResult(`${waarde} kcal = ${kj} kJ`);
}

function convertKJToKcal() {
    const waarde = parseFloat(document.getElementById('waarde').value);
    if (isNaN(waarde)) { showConverterResult(t('errorInvoer')); return; }
    const kcal = (waarde / 4.184).toFixed(1);
    showConverterResult(`${waarde} kJ = ${kcal} kcal`);
}

function calculateMET() {
    const waarde = parseFloat(document.getElementById('waarde').value);
    const eenheid = document.getElementById('eenheid').value;
    if (isNaN(waarde)) { showConverterResult(t('errorInvoer')); return; }
    const metWaarden = {
        'Wandelen (langzaam)': 3.0, 'Wandelen (snel)': 4.5, 'Joggen': 7.0,
        'Hardlopen': 11.0, 'Fietsen (rustig)': 4.0, 'Fietsen (intensief)': 8.0,
        'Zwemmen': 6.0, 'Krachttraining': 5.0, 'Yoga': 2.5, 'Voetbal': 7.0
    };
    let result = '<strong>MET-calculator</strong><br>';
    if (eenheid === 'minuten' || eenheid === 'uren') {
        const uren = eenheid === 'uren' ? waarde : waarde / 60;
        result += `Duur: ${uren.toFixed(2)} uur<br><br>`;
        Object.entries(metWaarden).forEach(([activiteit, met]) => {
            const kcal = Math.round(met * 70 * uren);
            result += `${activiteit} (MET ${met}): ~${kcal} kcal<br>`;
        });
    } else {
        result += currentLang === 'nl' ? 'Selecteer "minuten" of "uren" als eenheid.' : 'Select "minutes" or "hours" as unit.';
    }
    showConverterResult(result);
}

function showConverterResult(text) {
    const el = document.getElementById('converterResult');
    el.innerHTML = text;
    el.classList.add('show');
}

// ===== BMI CALCULATOR =====
function calculateBMI() {
    const lengte = parseFloat(document.getElementById('bmiLengte').value);
    const gewicht = parseFloat(document.getElementById('bmiGewicht').value);
    if (!lengte || !gewicht || lengte < 50 || lengte > 300 || gewicht < 20 || gewicht > 300) {
        showToast(t('errorBMI')); return;
    }
    const lengteM = lengte / 100;
    const bmi = (gewicht / (lengteM * lengteM)).toFixed(1);
    let category, colorClass;
    if (bmi < 18.5) { category = t('bmiOndergewicht'); colorClass = 'bmi-under'; }
    else if (bmi < 25) { category = t('bmiGezond'); colorClass = 'bmi-normal'; }
    else if (bmi < 30) { category = t('bmiOvergewicht'); colorClass = 'bmi-over'; }
    else { category = t('bmiObesitas'); colorClass = 'bmi-obese'; }
    document.getElementById('bmiValue').textContent = bmi;
    document.getElementById('bmiCategory').textContent = category;
    document.getElementById('bmiCategory').className = 'bmi-category ' + colorClass;
    const position = Math.min((bmi / 40) * 100, 100);
    document.getElementById('bmiMarker').style.left = position + '%';
    document.getElementById('bmiResult').classList.add('show');
}

// ===== SLAAP CALCULATOR =====
function calculateSlaap() {
    const start = document.getElementById('slaapStart').value;
    const eind = document.getElementById('slaapEind').value;
    if (!start || !eind) { showToast(t('errorSlaap')); return; }
    const [startH, startM] = start.split(':').map(Number);
    const [eindH, eindM] = eind.split(':').map(Number);
    let startMin = startH * 60 + startM;
    let eindMin = eindH * 60 + eindM;
    if (eindMin < startMin) eindMin += 24 * 60;
    const duurMin = eindMin - startMin;
    const uren = Math.floor(duurMin / 60);
    const minuten = duurMin % 60;
    let quality, qualityClass;
    const totaalUren = duurMin / 60;
    if (totaalUren >= 7 && totaalUren <= 9) { quality = t('slaapGoed'); qualityClass = 'quality-goed'; }
    else if (totaalUren >= 6 && totaalUren < 7) { quality = t('slaapMatig'); qualityClass = 'quality-matig'; }
    else { quality = t('slaapSlecht'); qualityClass = 'quality-slecht'; }
    document.getElementById('slaapHours').textContent = `${uren}h ${minuten}m`;
    document.getElementById('slaapQuality').textContent = quality;
    document.getElementById('slaapQuality').className = 'slaap-quality ' + qualityClass;
    document.getElementById('slaapResult').classList.add('show');
}

// ===== DATA MANAGEMENT =====
function exportData() {
    const data = { entries: getEntries(), water: getWaterData(), exportDate: new Date().toISOString(), version: '1.0' };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `gezondheid-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast(t('toastDataExported'));
}

function importData(input) {
    const file = input.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const data = JSON.parse(e.target.result);
            if (data.entries) saveEntries(data.entries);
            if (data.water) saveWaterData(data.water);
            renderDashboard(); renderOverzicht(); renderWaterTracker();
            showToast(t('toastDataImported'));
        } catch (err) { showToast('Ongeldig bestand'); }
    };
    reader.readAsText(file);
    input.value = '';
}

function resetAllDataConfirm() {
    if (confirm(t('confirmResetAll'))) {
        localStorage.removeItem('gezondheid-data');
        localStorage.removeItem('gezondheid-water');
        renderDashboard(); renderOverzicht(); renderWaterTracker();
        showToast(t('toastDataReset'));
    }
}

// ===== DASHBOARD =====
function renderDashboard() {
    const entries = getEntries();
    const today = new Date().toISOString().split('T')[0];
    const todayEntries = entries.filter(e => e.datum === today);
    let kcalToday = 0;
    todayEntries.forEach(e => {
        if (e.eenheid === 'kcal') kcalToday += e.waarde;
        else if (e.eenheid === 'kJ') kcalToday += e.waarde / 4.184;
    });
    document.getElementById('dashKcal').textContent = Math.round(kcalToday);
    document.getElementById('dashKJ').textContent = Math.round(kcalToday * 4.184);
    document.getElementById('dashActiviteiten').textContent = todayEntries.length;
    const allDates = [...new Set(entries.map(e => e.datum))];
    let totalKcal = 0;
    entries.forEach(e => {
        if (e.eenheid === 'kcal') totalKcal += e.waarde;
        else if (e.eenheid === 'kJ') totalKcal += e.waarde / 4.184;
    });
    const avgKcal = allDates.length > 0 ? Math.round(totalKcal / allDates.length) : 0;
    document.getElementById('dashGemiddeld').textContent = avgKcal;
    const recentList = document.getElementById('recentList');
    const recent = [...entries].sort((a, b) => new Date(b.datum) - new Date(a.datum)).slice(0, 5);
    if (recent.length === 0) {
        recentList.innerHTML = `<p class="empty-state">${t('emptyRecent')}</p>`;
    } else {
        recentList.innerHTML = recent.map(e => createEntryHTML(e, false)).join('');
    }
    renderWaterTracker();
}

// ===== OVERZICHT =====
function setupFilters() {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.periode;
            renderOverzicht();
        });
    });
}

function renderOverzicht() {
    const entries = getEntries();
    const now = new Date();
    let filtered = [];
    if (currentFilter === 'dag') {
        const today = now.toISOString().split('T')[0];
        filtered = entries.filter(e => e.datum === today);
    } else if (currentFilter === 'week') {
        const weekAgo = new Date(now); weekAgo.setDate(weekAgo.getDate() - 7);
        filtered = entries.filter(e => new Date(e.datum) >= weekAgo);
    } else if (currentFilter === 'maand') {
        const monthAgo = new Date(now); monthAgo.setMonth(monthAgo.getMonth() - 1);
        filtered = entries.filter(e => new Date(e.datum) >= monthAgo);
    }
    filtered.sort((a, b) => new Date(b.datum) - new Date(a.datum));
    const values = filtered.map(e => {
        if (e.eenheid === 'kcal') return e.waarde;
        if (e.eenheid === 'kJ') return e.waarde / 4.184;
        return e.waarde;
    }).filter(v => !isNaN(v));
    const totaal = values.reduce((a, b) => a + b, 0);
    const gemiddeld = values.length > 0 ? totaal / values.length : 0;
    const min = values.length > 0 ? Math.min(...values) : 0;
    const max = values.length > 0 ? Math.max(...values) : 0;
    document.getElementById('sumTotaal').textContent = `${Math.round(totaal)} kcal`;
    document.getElementById('sumGemiddeld').textContent = `${Math.round(gemiddeld)} kcal`;
    document.getElementById('sumMin').textContent = values.length > 0 ? `${Math.round(min)} kcal` : '-';
    document.getElementById('sumMax').textContent = values.length > 0 ? `${Math.round(max)} kcal` : '-';
    const list = document.getElementById('overzichtList');
    if (filtered.length === 0) {
        list.innerHTML = `<p class="empty-state">${t('emptyOverzicht')}</p>`;
    } else {
        list.innerHTML = filtered.map(e => createEntryHTML(e, true)).join('');
    }
}

function createEntryHTML(entry, showDelete) {
    const date = new Date(entry.datum);
    const dateStr = date.toLocaleDateString(currentLang === 'nl' ? 'nl-NL' : 'en-US', { weekday: 'short', day: 'numeric', month: 'short' });
    const catClass = `cat-${entry.categorie}`;
    const catLabel = t(`cat${entry.categorie.charAt(0).toUpperCase() + entry.categorie.slice(1)}`) || entry.categorie;
    let displayValue = `${entry.waarde} ${entry.eenheid}`;
    if (entry.eenheid === 'kcal') {
        const kj = (entry.waarde * 4.184).toFixed(1);
        displayValue = `${entry.waarde} kcal (${kj} kJ)`;
    } else if (entry.eenheid === 'kJ') {
        const kcal = (entry.waarde / 4.184).toFixed(1);
        displayValue = `${entry.waarde} kJ (${kcal} kcal)`;
    }
    return `
        <div class="entry-card" data-id="${entry.id}">
            <div class="entry-info">
                <div class="entry-date">${dateStr}</div>
                <div class="entry-title">${escapeHtml(entry.omschrijving)}</div>
                <span class="entry-cat ${catClass}">${catLabel}</span>
            </div>
            <div class="entry-value">${displayValue}</div>
            ${showDelete ? `<div class="entry-actions"><button class="btn-delete" onclick="handleDelete('${entry.id}')">🗑️</button></div>` : ''}
        </div>
    `;
}

function handleDelete(id) {
    if (confirm(t('confirmDelete'))) {
        const card = document.querySelector(`[data-id="${id}"]`);
        if (card) {
            card.classList.add('removing');
            setTimeout(() => {
                deleteEntry(id);
                showToast(t('toastDeleted'));
                renderDashboard(); renderOverzicht();
            }, 300);
        } else {
            deleteEntry(id);
            showToast(t('toastDeleted'));
            renderDashboard(); renderOverzicht();
        }
    }
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ===== LANGUAGE =====
function setupLanguageSwitch() {
    document.getElementById('langSwitch').addEventListener('click', () => {
        currentLang = currentLang === 'nl' ? 'en' : 'nl';
        localStorage.setItem('gezondheid-lang', currentLang);
        applyLanguage(currentLang);
        renderDashboard(); renderOverzicht();
    });
}

function applyLanguage(lang) {
    const btn = document.getElementById('langSwitch');
    btn.textContent = lang === 'nl' ? '🇳🇱 NL' : '🇬🇧 EN';
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;
        if (translations[lang][key]) el.textContent = translations[lang][key];
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.dataset.i18nPlaceholder;
        if (translations[lang][key]) el.placeholder = translations[lang][key];
    });
    document.documentElement.lang = lang;
}

function t(key) {
    return translations[currentLang][key] || key;
}

// ===== TOAST =====
function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => { toast.classList.remove('show'); }, 3000);
}

// ===== SERVICE WORKER =====
function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('sw.js')
            .then(reg => { console.log('Service Worker geregistreerd:', reg.scope); })
            .catch(err => { console.log('Service Worker registratie mislukt:', err); });
    }
}

// ===== INSTALL PROMPT =====
function setupInstallPrompt() {
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        showInstallPrompt();
    });
}

function showInstallPrompt() {
    if (window.matchMedia('(display-mode: standalone)').matches) return;
    const existing = document.querySelector('.install-prompt');
    if (existing) return;
    const prompt = document.createElement('div');
    prompt.className = 'install-prompt';
    prompt.innerHTML = `
        <p>${t('installPrompt')}</p>
        <div>
            <button class="btn-primary" id="btnInstall" style="padding:0.5rem 1rem;font-size:0.875rem">${t('btnInstall')}</button>
            <button class="btn-secondary" id="btnDismiss" style="padding:0.5rem 1rem;font-size:0.875rem">${t('btnDismiss')}</button>
        </div>`;
    document.body.appendChild(prompt);
    setTimeout(() => prompt.classList.add('show'), 500);
    document.getElementById('btnInstall').addEventListener('click', async () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            if (outcome === 'accepted') showToast(currentLang === 'nl' ? 'App geïnstalleerd!' : 'App installed!');
            deferredPrompt = null;
        }
        prompt.remove();
    });
    document.getElementById('btnDismiss').addEventListener('click', () => { prompt.remove(); });
}
