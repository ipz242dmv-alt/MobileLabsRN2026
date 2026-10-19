// Генерація локальних масивів даних (щонайменше по 50 записів)

export const NEWS_STATUSES = ['Опубліковано', 'Чернетка', 'На перевірці'];
export const NEWS_CATEGORIES = ['Освіта', 'Наука', 'Студентам', 'Міжнародне', 'Спорт', 'Події', 'ІТ'];
export const USER_ROLES = ['Адміністратор', 'Редактор', 'Автор', 'Читач'];
export const USER_STATUSES = ['Активний', 'Заблокований'];

export const LOG_TYPES = {
  LOGIN: { label: 'Вхід у систему', icon: 'log-in-outline', color: '#4CAD3B' },
  LOGOUT: { label: 'Вихід із системи', icon: 'log-out-outline', color: '#6B7486' },
  NEWS_CREATE: { label: 'Створення новини', icon: 'add-circle-outline', color: '#224A98' },
  NEWS_UPDATE: { label: 'Редагування новини', icon: 'create-outline', color: '#EE781C' },
  NEWS_DELETE: { label: 'Видалення новини', icon: 'trash-outline', color: '#E53E23' },
  USER_STATUS: { label: 'Зміна статусу користувача', icon: 'person-circle-outline', color: '#7B4FC8' },
};

const TITLES = [
  'Стартував прийом заявок на програму академічної мобільності',
  'Студенти перемогли у всеукраїнському хакатоні',
  'Відкрито нову лабораторію штучного інтелекту',
  'Оголошено конкурс наукових робіт молодих учених',
  'Університет підписав меморандум з IT-компанією',
  'Збірна університету здобула золото на чемпіонаті області',
  'Відбулася зустріч студентів з роботодавцями',
  'Бібліотека отримала доступ до нових наукових баз',
  'Розпочалася реєстрація на літню школу програмування',
  'Викладачі пройшли стажування в європейському університеті',
  'Студентська рада презентувала план заходів на семестр',
  'Ярмарок вакансій зібрав понад 30 компаній',
  'У кампусі відкрили новий коворкінг',
];

const BODY =
  'Подія зібрала студентів, викладачів і запрошених гостей. Учасники обговорили актуальні питання та поділилися досвідом.\n\n' +
  'Детальну інформацію можна отримати в деканаті або на офіційному сайті університету.';

const FIRST = ['Олена', 'Андрій', 'Марія', 'Дмитро', 'Ірина', 'Олег', 'Наталія', 'Сергій', 'Юлія', 'Віктор', 'Тетяна', 'Богдан'];
const LAST = ['Коваленко', 'Бондар', 'Шевчук', 'Мельник', 'Ткаченко', 'Кравчук', 'Олійник', 'Лисенко', 'Гнатюк', 'Савчук'];
const TRANSLIT = {
  Олена: 'olena', Андрій: 'andrii', Марія: 'mariia', Дмитро: 'dmytro', Ірина: 'iryna', Олег: 'oleh',
  Наталія: 'nataliia', Сергій: 'serhii', Юлія: 'yuliia', Віктор: 'viktor', Тетяна: 'tetiana', Богдан: 'bohdan',
  Коваленко: 'kovalenko', Бондар: 'bondar', Шевчук: 'shevchuk', Мельник: 'melnyk', Ткаченко: 'tkachenko',
  Кравчук: 'kravchuk', Олійник: 'oliinyk', Лисенко: 'lysenko', Гнатюк: 'hnatiuk', Савчук: 'savchuk',
};

const HOUR = 60 * 60 * 1000;
const NOW = new Date('2026-10-18T18:00:00').getTime();

export function createSeedNews(count = 60) {
  return Array.from({ length: count }, (_, i) => {
    const id = String(count - i);
    return {
      id,
      title: TITLES[i % TITLES.length],
      category: NEWS_CATEGORIES[i % NEWS_CATEGORIES.length],
      status: NEWS_STATUSES[(i * 7) % 3 === 0 ? 0 : i % 3],
      imageUrl: `https://picsum.photos/seed/admin-news-${id}/800/500`,
      text: BODY,
      createdAt: new Date(NOW - i * 9 * HOUR).toISOString(),
    };
  });
}

export function createSeedUsers(count = 60) {
  return Array.from({ length: count }, (_, i) => {
    const first = FIRST[i % FIRST.length];
    const last = LAST[(i * 3) % LAST.length];
    const role = i < 3 ? USER_ROLES[0] : USER_ROLES[1 + (i % 3)];
    return {
      id: String(i + 1),
      name: `${first} ${last}`,
      email: `${TRANSLIT[first]}.${TRANSLIT[last]}${i + 1}@ztu.edu.ua`,
      role,
      status: i % 7 === 5 ? 'Заблокований' : 'Активний',
    };
  });
}

export function createSeedLogs(count = 50) {
  const types = Object.keys(LOG_TYPES);
  return Array.from({ length: count }, (_, i) => {
    const type = types[i % types.length];
    const details = {
      LOGIN: 'admin@ztu.edu.ua',
      LOGOUT: 'admin@ztu.edu.ua',
      NEWS_CREATE: `«${TITLES[i % TITLES.length]}»`,
      NEWS_UPDATE: `«${TITLES[(i + 3) % TITLES.length]}»`,
      NEWS_DELETE: `«${TITLES[(i + 5) % TITLES.length]}»`,
      USER_STATUS: `${FIRST[i % FIRST.length]} ${LAST[i % LAST.length]} → ${i % 2 ? 'Заблокований' : 'Активний'}`,
    }[type];
    return {
      id: `seed-${count - i}`,
      type,
      details,
      actor: 'admin@ztu.edu.ua',
      createdAt: new Date(NOW - (i + 1) * 2.5 * HOUR).toISOString(),
    };
  });
}

export function formatDateTime(iso) {
  const d = new Date(iso);
  return `${d.toLocaleDateString('uk-UA', { day: '2-digit', month: '2-digit', year: 'numeric' })} ${d.toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' })}`;
}

export function formatDate(iso) {
  return new Date(iso).toLocaleDateString('uk-UA', { day: 'numeric', month: 'long', year: 'numeric' });
}
