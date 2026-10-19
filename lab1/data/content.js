// Заголовки — реальні новини з https://ztu.edu.ua (жовтень 2026).
// Обкладинки згенеровані локально у фірмових кольорах університету.
export const news = [
  {
    id: '1',
    title: 'Європейський інвестиційний банк в Житомирській політехніці представив можливості для громад',
    date: 'Жовтень 2026 р.',
    excerpt:
      'Представники Європейського інвестиційного банку розповіли громадам про доступні програми фінансування та підтримки проєктів.',
    image: require('../assets/images/news/n1.jpg'),
    url: 'https://news.ztu.edu.ua/2026/10/yevropejskyj-investytsijnyj-bank-v-zhytomyrskij-politehnitsi-predstavyv-mozhlyvosti-dlya-gromad/',
  },
  {
    id: '2',
    title: 'Відкрита зустріч з експертною групою з акредитації ОП «Міжнародні економічні відносини»',
    date: 'Жовтень 2026 р.',
    excerpt:
      'Запрошуємо здобувачів освіти, випускників і роботодавців долучитися до відкритої зустрічі з експертною групою.',
    image: require('../assets/images/news/n2.jpg'),
    url: 'https://news.ztu.edu.ua/2026/10/vidkryta-zustrich-z-ekspertnoyu-grupoyu-z-akredytatsiyi-op-mizhnarodni-ekonomichni-vidnosyny/',
  },
  {
    id: '3',
    title:
      'Представник Житомирської політехніки взяла участь у зустрічі експертів Веймарського регіонального трикутника в Польщі',
    date: 'Жовтень 2026 р.',
    excerpt: 'Міжнародна зустріч експертів, присвячена регіональній співпраці України, Польщі та Німеччини.',
    image: require('../assets/images/news/n3.jpg'),
    url: 'https://news.ztu.edu.ua/2026/10/predstavnyk-zhytomyrskoyi-politehniky-vzyala-uchast-u-zustrichi-ekspertiv-vejmarskogo-regionalnogo-trykutnyka-v-polshhi/',
  },
  {
    id: '4',
    title: 'Еразмус +КА171: академічна мобільність на базі Університету м. Малага (Іспанія)',
    date: 'Жовтень 2026 р.',
    excerpt: 'Програма академічної мобільності Erasmus+ KA171 відкриває можливості навчання в Університеті Малаги.',
    image: require('../assets/images/news/n4.jpg'),
    url: 'https://news.ztu.edu.ua/2026/10/erazmus-ka171-akademichna-mobilnist-na-bazi-universytetu-m-malaga-ispaniya/',
  },
  {
    id: '5',
    title: 'Якість освіти очима студентів: відкритий діалог у Житомирській політехніці',
    date: 'Жовтень 2026 р.',
    excerpt: 'Студенти та адміністрація обговорили, як зробити освітній процес кращим.',
    image: require('../assets/images/news/n5.jpg'),
    url: 'https://news.ztu.edu.ua/2026/10/yakist-osvity-ochyma-studentiv-vidkrytyj-dialog-u-zhytomyrskij-politehnitsi/',
  },
  {
    id: '6',
    title:
      'Перше підсумкове засідання Living Lab Офісу Конгресу місцевих та регіональних влад при Президентові України',
    date: 'Жовтень 2026 р.',
    excerpt: 'Учасники Living Lab підбили перші підсумки спільної роботи.',
    image: require('../assets/images/news/n6.jpg'),
    url: 'https://news.ztu.edu.ua/2026/10/pershe-pidsumkove-zasidannya-living-lab-ofisu-kongresu-mistsevyh-ta-regionalnyh-vlad-pry-prezydentovi-ukrayiny/',
  },
  {
    id: '7',
    title:
      'Erasmus+ KA171: конкурс для студентів на навчання та стажування в Технічному університеті м. Дрезден (Німеччина)',
    date: 'Жовтень 2026 р.',
    excerpt: 'Оголошено конкурс для студентів на навчання та стажування в TU Dresden.',
    image: require('../assets/images/news/n7.jpg'),
    url: 'https://news.ztu.edu.ua/2026/10/erasmus-ka171-konkurs-dlya-studentiv-na-navchannya-ta-stazhuvannya-v-tehnichnomu-universyteti-m-drezden-nimechchyna/',
  },
  {
    id: '8',
    title: 'Аспірантці Житомирської політехніки Ніні Попович призначено академічну стипендію Президента України',
    date: 'Жовтень 2026 р.',
    excerpt: 'Вітаємо аспірантку з призначенням академічної стипендії Президента України!',
    image: require('../assets/images/news/n8.jpg'),
    url: 'https://news.ztu.edu.ua/2026/10/aspiranttsi-zhytomyrskoyi-politehniky-nini-popovych-pryznacheno-akademichnu-stypendiyu-prezydenta-ukrayiny/',
  },
];

const galleryImages = [
  require('../assets/images/gallery/g1.jpg'),
  require('../assets/images/gallery/g2.jpg'),
  require('../assets/images/gallery/g3.jpg'),
  require('../assets/images/gallery/g4.jpg'),
  require('../assets/images/gallery/g5.jpg'),
  require('../assets/images/gallery/g6.jpg'),
  require('../assets/images/gallery/g7.jpg'),
  require('../assets/images/gallery/g8.jpg'),
  require('../assets/images/gallery/g9.jpg'),
  require('../assets/images/gallery/g10.jpg'),
  require('../assets/images/gallery/g11.jpg'),
  require('../assets/images/gallery/g12.jpg'),
];

const captions = [
  'Головний корпус',
  'Лабораторія ІКТ',
  'День відкритих дверей',
  'Студентська конференція',
  'Хакатон',
  'Бібліотека',
  'Спортивний комплекс',
  'Посвята у студенти',
  'Наукова виставка',
  'Кампус восени',
  'Випускний',
  'Міжнародний тиждень',
];

export const gallery = galleryImages.map((image, i) => ({
  id: String(i + 1),
  image,
  caption: captions[i],
}));
