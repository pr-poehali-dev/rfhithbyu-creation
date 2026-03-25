import { useState } from "react";
import Icon from "@/components/ui/icon";
import CarMap from "@/components/CarMap";

const CAR_IMAGE = "https://cdn.poehali.dev/projects/87e28bcf-5430-4a7e-9f83-f80ec1a87efa/files/4b60a295-b045-483e-9a93-6988092f6124.jpg";
const TRAILER_IMAGE = "https://cdn.poehali.dev/projects/87e28bcf-5430-4a7e-9f83-f80ec1a87efa/files/ce10242f-8dab-46f0-a456-926880fd0f80.jpg";

const NAV_LINKS = [
  { label: "Главная", href: "#hero" },
  { label: "Автопарк", href: "#fleet" },
  { label: "Тарифы", href: "#tariffs" },
  { label: "Бронирование", href: "#booking" },
  { label: "Отзывы", href: "#reviews" },
  { label: "Контакты", href: "#contacts" },
  { label: "Поддержка", href: "#support" },
];

const CARS = [
  { name: "Tesla Model 3", class: "Электро", price: "4.5", range: "580 км", power: "283 л.с.", rating: 4.9, reviews: 142, tag: "ХИТ", tagColor: "bg-cyan-400 text-black" },
  { name: "BMW i4", class: "Бизнес", price: "6.2", range: "590 км", power: "340 л.с.", rating: 4.8, reviews: 87, tag: "НОВИНКА", tagColor: "bg-purple-500 text-white" },
  { name: "Kia EV6", class: "Комфорт", price: "3.8", range: "528 км", power: "229 л.с.", rating: 4.7, reviews: 213, tag: null, tagColor: "" },
  { name: "Hyundai IONIQ 5", class: "Семейный", price: "4.1", range: "507 км", power: "217 л.с.", rating: 4.8, reviews: 176, tag: null, tagColor: "" },
];

const TRAILERS = [
  { name: "ЧМЗАП 9990", spec: "Низкорамный трал", price: "850", payload: "70 т", length: "18 м", axles: "4 оси", rating: 4.9, reviews: 34, tag: "ХИТ", tagColor: "bg-orange-400 text-black" },
  { name: "Goldhofer STZ-L6", spec: "Модульный трал", price: "1200", payload: "70 т", length: "22 м", axles: "6 осей", rating: 4.8, reviews: 18, tag: "ТЯЖЁЛЫЙ", tagColor: "bg-red-500 text-white" },
  { name: "Нефаз 9334", spec: "Низкорамный трал", price: "750", payload: "70 т", length: "17 м", axles: "3 оси", rating: 4.7, reviews: 41, tag: null, tagColor: "" },
];

const TARIFFS = [
  { name: "СТАРТ", icon: "Zap", price: "2.9", period: "руб/мин", features: ["До 50 км/час", "Страховка включена", "Городские маршруты", "Тех. поддержка 24/7"], highlighted: false },
  { name: "БИЗНЕС", icon: "Star", price: "5.5", period: "руб/мин", features: ["Без ограничений", "Премиум автопарк", "Бизнес-залы", "Персональный менеджер", "Приоритетная поддержка"], highlighted: true },
  { name: "УЛЬТРА", icon: "Rocket", price: "9.9", period: "руб/мин", features: ["VIP автопарк", "Трансферы в аэропорт", "Консьерж-сервис", "0% депозит", "Бесплатная парковка"], highlighted: false },
];

const REVIEWS = [
  { name: "Алексей М.", rating: 5, text: "Невероятно удобно — открыл приложение, выбрал Tesla, через 3 минуты уже за рулём. Интерфейс на уровне SpaceX.", car: "Tesla Model 3", date: "15 марта 2026", avatar: "А" },
  { name: "Светлана К.", rating: 5, text: "Пользуюсь уже полгода. Машины всегда чистые, заряженные. Техподдержка отвечает быстрее, чем я успеваю написать.", car: "BMW i4", date: "10 марта 2026", avatar: "С" },
  { name: "Дмитрий В.", rating: 4, text: "Отличный сервис для командировок. Рейтинговая система честная — видно, кто реально заботится об авто.", car: "Kia EV6", date: "5 марта 2026", avatar: "Д" },
];

const STATS = [
  { value: "15,000+", label: "Водителей" },
  { value: "850+", label: "Автомобилей" },
  { value: "4.8", label: "Рейтинг" },
  { value: "24/7", label: "Поддержка" },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star} className={star <= Math.floor(rating) ? "rating-star" : "text-gray-600"}>★</span>
      ))}
    </div>
  );
}

function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-cyan-400/10">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#hero" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded neon-border flex items-center justify-center">
            <Icon name="Zap" size={16} className="text-cyan-400" />
          </div>
          <span className="font-exo font-black text-xl tracking-widest neon-text">DRIVE</span>
        </a>
        <ul className="hidden lg:flex items-center gap-7">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="font-mono text-xs tracking-widest uppercase text-gray-400 hover:text-cyan-400 transition-colors">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-3">
          <button className="hidden lg:block neon-btn px-4 py-2 rounded text-xs font-mono tracking-widest uppercase">Войти</button>
          <button className="hidden lg:block neon-btn-filled px-4 py-2 rounded text-xs font-mono tracking-widest uppercase">Скачать</button>
          <button className="lg:hidden text-cyan-400" onClick={() => setOpen(!open)}>
            <Icon name={open ? "X" : "Menu"} size={22} />
          </button>
        </div>
      </div>
      {open && (
        <div className="lg:hidden border-t border-cyan-400/10 bg-[#080c14]/95 backdrop-blur-xl">
          <ul className="px-6 py-4 flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="font-mono text-sm tracking-widest uppercase text-gray-300 hover:text-cyan-400 transition-colors" onClick={() => setOpen(false)}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}

export default function Index() {
  const [activeTab, setActiveTab] = useState<"hourly" | "daily">("hourly");
  const [fleetTab, setFleetTab] = useState<"cars" | "heavy">("cars");
  const [nearbyCars, setNearbyCars] = useState<{ id: number; name: string; price: string; charge: number; dist?: number }[]>([
    { id: 1, name: "Tesla Model 3", price: "4.5", charge: 92 },
    { id: 3, name: "Kia EV6", price: "3.8", charge: 74 },
    { id: 2, name: "BMW i4", price: "6.2", charge: 87 },
  ]);

  return (
    <div className="min-h-screen star-bg">
      <Navbar />

      {/* HERO */}
      <section id="hero" className="relative min-h-screen flex items-center grid-bg overflow-hidden pt-16">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-400/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-600/5 rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center py-20">
          <div>
            <div className="inline-flex items-center gap-2 neon-border px-3 py-1.5 rounded-full mb-6 animate-fade-in-up">
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span className="font-mono text-xs text-cyan-400 tracking-widest uppercase">Версия 3.0 — доступна сейчас</span>
            </div>
            <h1 className="font-exo font-black text-5xl lg:text-7xl leading-tight mb-6 animate-fade-in-up delay-100">
              КАРШЕРИНГ{" "}
              <span className="block neon-text">БУДУЩЕГО</span>
              <span className="block text-gray-400 text-3xl lg:text-4xl font-light mt-2">уже сегодня</span>
            </h1>
            <p className="font-sans text-gray-400 text-lg leading-relaxed mb-8 max-w-lg animate-fade-in-up delay-200">
              Электромобили premium-класса в одном приложении. Мгновенное бронирование, прозрачные тарифы, система рейтингов для каждого водителя.
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-in-up delay-300">
              <button className="neon-btn-filled px-8 py-3.5 rounded-lg font-exo font-bold tracking-wider text-sm">НАЧАТЬ БЕСПЛАТНО</button>
              <button className="neon-btn px-8 py-3.5 rounded-lg font-exo font-bold tracking-wider text-sm flex items-center gap-2">
                <Icon name="Play" size={14} />
                Как это работает
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12 animate-fade-in-up delay-400">
              {STATS.map((stat) => (
                <div key={stat.label} className="glass-card rounded-lg p-3 text-center">
                  <div className="font-exo font-black text-xl neon-text">{stat.value}</div>
                  <div className="font-mono text-xs text-gray-500 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative animate-float">
            <div className="absolute -inset-8 bg-cyan-400/5 rounded-full blur-2xl" />
            <div className="relative neon-border rounded-2xl overflow-hidden">
              <img src={CAR_IMAGE} alt="Электромобиль DRIVE" className="w-full h-80 object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080c14] via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="glass-card rounded-xl p-4 flex items-center justify-between">
                  <div>
                    <div className="font-mono text-xs text-gray-400 mb-1">ДОСТУПНО РЯДОМ</div>
                    <div className="font-exo font-bold text-white">Tesla Model 3</div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-xs text-gray-400 mb-1">ОТ</div>
                    <div className="font-exo font-bold neon-text">4.5 ₽/мин</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <span className="font-mono text-xs text-gray-500 tracking-widest">ЛИСТАЙ ВНИЗ</span>
          <Icon name="ChevronDown" size={18} className="text-cyan-400" />
        </div>
      </section>

      {/* FLEET */}
      <section id="fleet" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="font-mono text-xs text-cyan-400 tracking-widest uppercase mb-3">// 001 — АВТОПАРК</div>
            <h2 className="font-exo font-black text-4xl lg:text-5xl text-white">
              {fleetTab === "cars" ? <>Электрический <span className="neon-text">автопарк</span></> : <>Тяжёлая <span className="neon-text">техника</span></>}
            </h2>
            <p className="font-sans text-gray-500 mt-4 max-w-xl mx-auto">
              {fleetTab === "cars" ? "Только электромобили последнего поколения с полным зарядом и рейтингом" : "Низкорамные тралы грузоподъёмностью 70 тонн — для перевозки спецтехники и негабарита"}
            </p>

            <div className="inline-flex mt-8 glass-card rounded-full p-1 gap-1">
              <button
                onClick={() => setFleetTab("cars")}
                className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-mono tracking-wider transition-all ${fleetTab === "cars" ? "bg-cyan-400 text-black font-bold" : "text-gray-400 hover:text-white"}`}
              >
                <Icon name="Car" size={14} />
                Легковые
              </button>
              <button
                onClick={() => setFleetTab("heavy")}
                className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-mono tracking-wider transition-all ${fleetTab === "heavy" ? "bg-orange-400 text-black font-bold" : "text-gray-400 hover:text-white"}`}
              >
                <Icon name="Truck" size={14} />
                Спецтехника
                <span className="bg-orange-400/20 text-orange-400 text-xs px-1.5 py-0.5 rounded-full font-bold">70т</span>
              </button>
            </div>
          </div>

          {/* Cars grid */}
          {fleetTab === "cars" && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {CARS.map((car, i) => (
                <div key={car.name} className="glass-card rounded-2xl overflow-hidden group" style={{ animationDelay: `${i * 0.1}s` }}>
                  <div className="relative h-44 overflow-hidden bg-gradient-to-br from-gray-900 to-[#0d1420]">
                    <img src={CAR_IMAGE} alt={car.name} className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d1420] via-transparent to-transparent" />
                    {car.tag && (
                      <span className={`absolute top-3 right-3 px-2 py-0.5 rounded text-xs font-exo font-black tracking-wider ${car.tagColor}`}>{car.tag}</span>
                    )}
                    <div className="absolute bottom-3 left-3">
                      <span className="font-mono text-xs text-cyan-400 bg-black/40 px-2 py-1 rounded backdrop-blur-sm">{car.class}</span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-exo font-bold text-white text-lg">{car.name}</h3>
                    <div className="flex items-center gap-2 mt-2 mb-4">
                      <StarRating rating={car.rating} />
                      <span className="font-mono text-xs text-gray-400">{car.rating} ({car.reviews})</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      <div className="bg-black/30 rounded-lg p-2 text-center">
                        <div className="font-mono text-xs text-gray-500">Запас хода</div>
                        <div className="font-exo font-bold text-sm text-white mt-0.5">{car.range}</div>
                      </div>
                      <div className="bg-black/30 rounded-lg p-2 text-center">
                        <div className="font-mono text-xs text-gray-500">Мощность</div>
                        <div className="font-exo font-bold text-sm text-white mt-0.5">{car.power}</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-exo font-black text-xl neon-text">{car.price} ₽</span>
                        <span className="font-mono text-xs text-gray-500">/мин</span>
                      </div>
                      <button className="neon-btn px-3 py-1.5 rounded-lg text-xs font-exo font-bold tracking-wider">ЗАБРОНИРОВАТЬ</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Heavy equipment grid */}
          {fleetTab === "heavy" && (
            <>
              <div className="glass-card rounded-2xl p-5 mb-8 flex flex-wrap items-center gap-4 border border-orange-400/20">
                <div className="w-10 h-10 rounded-xl bg-orange-400/10 border border-orange-400/30 flex items-center justify-center flex-shrink-0">
                  <Icon name="AlertTriangle" size={18} className="text-orange-400" />
                </div>
                <div>
                  <div className="font-exo font-bold text-white text-sm">Требуется специальное разрешение</div>
                  <div className="font-sans text-xs text-gray-400 mt-0.5">Для аренды необходимы: удостоверение тракториста-машиниста, спецпропуск на негабарит, договор ответственности. Оформление — 1 рабочий день.</div>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {TRAILERS.map((trailer, i) => (
                  <div key={trailer.name} className="glass-card rounded-2xl overflow-hidden group" style={{ animationDelay: `${i * 0.1}s` }}>
                    <div className="relative h-52 overflow-hidden bg-gradient-to-br from-gray-900 to-[#0d1420]">
                      <img src={TRAILER_IMAGE} alt={trailer.name} className="w-full h-full object-cover opacity-75 group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0d1420] via-transparent to-transparent" />
                      {trailer.tag && (
                        <span className={`absolute top-3 right-3 px-2 py-0.5 rounded text-xs font-exo font-black tracking-wider ${trailer.tagColor}`}>{trailer.tag}</span>
                      )}
                      <div className="absolute bottom-3 left-3 flex gap-2">
                        <span className="font-mono text-xs text-orange-400 bg-black/50 px-2 py-1 rounded backdrop-blur-sm">{trailer.spec}</span>
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="font-exo font-bold text-white text-xl">{trailer.name}</h3>
                      <div className="flex items-center gap-2 mt-2 mb-4">
                        <StarRating rating={trailer.rating} />
                        <span className="font-mono text-xs text-gray-400">{trailer.rating} ({trailer.reviews})</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2 mb-5">
                        <div className="bg-black/30 rounded-lg p-2 text-center">
                          <div className="font-mono text-xs text-gray-500">Грузоп.</div>
                          <div className="font-exo font-bold text-sm text-orange-400 mt-0.5">{trailer.payload}</div>
                        </div>
                        <div className="bg-black/30 rounded-lg p-2 text-center">
                          <div className="font-mono text-xs text-gray-500">Длина</div>
                          <div className="font-exo font-bold text-sm text-white mt-0.5">{trailer.length}</div>
                        </div>
                        <div className="bg-black/30 rounded-lg p-2 text-center">
                          <div className="font-mono text-xs text-gray-500">Осей</div>
                          <div className="font-exo font-bold text-sm text-white mt-0.5">{trailer.axles}</div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-exo font-black text-xl text-orange-400">{trailer.price} ₽</span>
                          <span className="font-mono text-xs text-gray-500">/час</span>
                        </div>
                        <button className="px-3 py-1.5 rounded-lg text-xs font-exo font-bold tracking-wider border border-orange-400/50 text-orange-400 hover:bg-orange-400/10 transition-colors">
                          ЗАПРОСИТЬ
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* TARIFFS */}
      <section id="tariffs" className="py-24 relative grid-bg">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="font-mono text-xs text-cyan-400 tracking-widest uppercase mb-3">// 002 — ТАРИФЫ</div>
            <h2 className="font-exo font-black text-4xl lg:text-5xl text-white">Прозрачные <span className="neon-text">тарифы</span></h2>
            <div className="inline-flex mt-6 glass-card rounded-full p-1">
              <button onClick={() => setActiveTab("hourly")} className={`px-6 py-2 rounded-full text-sm font-mono tracking-wider transition-all ${activeTab === "hourly" ? "bg-cyan-400 text-black font-bold" : "text-gray-400"}`}>Поминутно</button>
              <button onClick={() => setActiveTab("daily")} className={`px-6 py-2 rounded-full text-sm font-mono tracking-wider transition-all ${activeTab === "daily" ? "bg-cyan-400 text-black font-bold" : "text-gray-400"}`}>Посуточно</button>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {TARIFFS.map((tariff) => (
              <div key={tariff.name} className={`relative rounded-2xl p-8 transition-all duration-300 ${tariff.highlighted ? "border border-cyan-400/60 bg-gradient-to-b from-cyan-400/10 to-transparent shadow-[0_0_40px_rgba(0,245,255,0.15)]" : "glass-card"}`}>
                {tariff.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-cyan-400 text-black text-xs font-exo font-black px-4 py-1 rounded-full tracking-widest">ПОПУЛЯРНЫЙ</div>
                )}
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${tariff.highlighted ? "bg-cyan-400/20 neon-border" : "bg-white/5 border border-white/10"}`}>
                    <Icon name={tariff.icon as "Zap"} size={18} className="text-cyan-400" />
                  </div>
                  <span className="font-exo font-black text-lg tracking-wider text-white">{tariff.name}</span>
                </div>
                <div className="mb-8">
                  <span className="font-exo font-black text-4xl neon-text">{tariff.price} ₽</span>
                  <span className="font-mono text-gray-500 text-sm ml-2">/{tariff.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {tariff.features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5 font-sans text-sm text-gray-300">
                      <Icon name="Check" size={14} className="text-cyan-400 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-3 rounded-xl font-exo font-bold tracking-wider text-sm ${tariff.highlighted ? "neon-btn-filled" : "neon-btn"}`}>
                  ВЫБРАТЬ ТАРИФ
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOOKING */}
      <section id="booking" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="font-mono text-xs text-cyan-400 tracking-widest uppercase mb-3">// 003 — БРОНИРОВАНИЕ</div>
            <h2 className="font-exo font-black text-4xl lg:text-5xl text-white">Забронировать <span className="neon-text">авто</span></h2>
            <p className="font-sans text-gray-500 mt-4">Выберите автомобиль на карте или укажите маршрут — подберём ближайший</p>
          </div>

          <div className="grid lg:grid-cols-5 gap-6 items-start">
            {/* MAP */}
            <div className="lg:col-span-3 h-[520px]">
              <CarMap onNearbyCars={setNearbyCars} />
            </div>

            {/* FORM */}
            <div className="lg:col-span-2 glass-card rounded-2xl p-6 neon-border">
              <div className="font-mono text-xs text-cyan-400 tracking-widest uppercase mb-5 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                Параметры поездки
              </div>

              <div className="space-y-4">
                <div>
                  <label className="font-mono text-xs text-gray-500 tracking-widest uppercase block mb-2">Откуда</label>
                  <div className="relative">
                    <Icon name="MapPin" size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-cyan-400" />
                    <input type="text" placeholder="Адрес подачи" className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 pl-10 font-sans text-sm text-white placeholder-gray-600 focus:outline-none focus:border-cyan-400/60 transition-colors" />
                  </div>
                </div>

                <div>
                  <label className="font-mono text-xs text-gray-500 tracking-widest uppercase block mb-2">Куда</label>
                  <div className="relative">
                    <Icon name="Navigation" size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-cyan-400" />
                    <input type="text" placeholder="Пункт назначения" className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 pl-10 font-sans text-sm text-white placeholder-gray-600 focus:outline-none focus:border-cyan-400/60 transition-colors" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-mono text-xs text-gray-500 tracking-widest uppercase block mb-2">Дата</label>
                    <div className="relative">
                      <Icon name="Calendar" size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-cyan-400" />
                      <input type="date" className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-2.5 pl-9 font-sans text-sm text-white focus:outline-none focus:border-cyan-400/60 transition-colors" />
                    </div>
                  </div>
                  <div>
                    <label className="font-mono text-xs text-gray-500 tracking-widest uppercase block mb-2">Время</label>
                    <div className="relative">
                      <Icon name="Clock" size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-cyan-400" />
                      <input type="time" className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-2.5 pl-9 font-sans text-sm text-white focus:outline-none focus:border-cyan-400/60 transition-colors" />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="font-mono text-xs text-gray-500 tracking-widest uppercase block mb-2">Класс авто</label>
                  <select className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 font-sans text-sm text-white focus:outline-none focus:border-cyan-400/60 transition-colors appearance-none">
                    <option value="">Любой класс</option>
                    <option>Электро</option>
                    <option>Комфорт</option>
                    <option>Бизнес</option>
                    <option>Семейный</option>
                  </select>
                </div>

                <div className="pt-1">
                  <button className="w-full neon-btn-filled py-3.5 rounded-xl font-exo font-black text-sm tracking-widest flex items-center justify-center gap-2">
                    <Icon name="Search" size={16} />
                    НАЙТИ АВТОМОБИЛЬ
                  </button>
                </div>

                <div className="border-t border-white/5 pt-4">
                  <div className="font-mono text-xs text-gray-600 text-center mb-3 tracking-wider flex items-center justify-center gap-2">
                    БЛИЖАЙШИЕ АВТО
                    {nearbyCars[0]?.dist !== undefined && (
                      <span className="text-cyan-400/60">· по геолокации</span>
                    )}
                  </div>
                  <div className="space-y-2">
                    {nearbyCars.map((car) => (
                      <div key={car.id} className="flex items-center justify-between bg-black/20 rounded-xl px-3 py-2.5 border border-white/5 hover:border-cyan-400/30 cursor-pointer transition-colors">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-lg bg-cyan-400/10 flex items-center justify-center">
                            <Icon name="Car" size={13} className="text-cyan-400" />
                          </div>
                          <div>
                            <div className="font-exo font-bold text-white text-xs">{car.name}</div>
                            <div className="font-mono text-xs text-gray-500">
                              {car.dist !== undefined
                                ? `${car.dist < 1 ? Math.round(car.dist * 1000) + " м" : car.dist.toFixed(1) + " км"} · заряд ${car.charge}%`
                                : `заряд ${car.charge}%`}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-exo font-black text-sm neon-text">{car.price} ₽</div>
                          <div className="font-mono text-xs text-gray-600">/мин</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="py-24 relative grid-bg">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="font-mono text-xs text-cyan-400 tracking-widest uppercase mb-3">// 004 — ОТЗЫВЫ</div>
            <h2 className="font-exo font-black text-4xl lg:text-5xl text-white">Реальные <span className="neon-text">оценки</span></h2>
            <p className="font-sans text-gray-500 mt-4">Рейтинг водителей и автомобилей — честная система без накруток</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {REVIEWS.map((review) => (
              <div key={review.name} className="glass-card rounded-2xl p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400/30 to-blue-600/30 neon-border flex items-center justify-center flex-shrink-0">
                    <span className="font-exo font-black text-cyan-400">{review.avatar}</span>
                  </div>
                  <div>
                    <div className="font-exo font-bold text-white">{review.name}</div>
                    <div className="font-mono text-xs text-gray-500">{review.car}</div>
                  </div>
                </div>
                <StarRating rating={review.rating} />
                <p className="font-sans text-sm text-gray-300 leading-relaxed mt-3 mb-4">"{review.text}"</p>
                <div className="font-mono text-xs text-gray-600 border-t border-white/5 pt-3">{review.date}</div>
              </div>
            ))}
          </div>
          <div className="mt-12 glass-card rounded-2xl p-8 text-center neon-border">
            <div className="grid grid-cols-3 gap-8">
              <div>
                <div className="font-exo font-black text-4xl neon-text">4.9</div>
                <StarRating rating={5} />
                <div className="font-mono text-xs text-gray-500 mt-2">Средняя оценка авто</div>
              </div>
              <div>
                <div className="font-exo font-black text-4xl neon-text">4.7</div>
                <StarRating rating={5} />
                <div className="font-mono text-xs text-gray-500 mt-2">Рейтинг водителей</div>
              </div>
              <div>
                <div className="font-exo font-black text-4xl neon-text">2,400+</div>
                <div className="font-mono text-xs text-gray-500 mt-4">Отзывов за месяц</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PERSONAL CABINET */}
      <section id="cabinet" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="font-mono text-xs text-cyan-400 tracking-widest uppercase mb-3">// 005 — ЛИЧНЫЙ КАБИНЕТ</div>
            <h2 className="font-exo font-black text-4xl lg:text-5xl text-white">Всё под <span className="neon-text">контролем</span></h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: "BarChart3", title: "Статистика поездок", desc: "Детальная аналитика: пробег, расходы, маршруты. Полная история за любой период." },
              { icon: "Star", title: "Ваш рейтинг", desc: "Прозрачная система оценок от других водителей. Повышайте рейтинг — получайте бонусы." },
              { icon: "CreditCard", title: "Платежи и баланс", desc: "Быстрое пополнение, история транзакций, кэшбэк за каждую поездку." },
              { icon: "Shield", title: "Страховка", desc: "Автоматическое КАСКО на каждую поездку. Документы в приложении." },
              { icon: "Bell", title: "Уведомления", desc: "Умные push-уведомления о состоянии авто, скидках и акциях." },
              { icon: "Settings", title: "Настройки профиля", desc: "Управляйте подпиской, настройками маршрутов и предпочтениями." },
            ].map((item) => (
              <div key={item.title} className="glass-card rounded-2xl p-6 group">
                <div className="w-12 h-12 rounded-xl bg-cyan-400/10 neon-border flex items-center justify-center mb-4 group-hover:bg-cyan-400/20 transition-colors">
                  <Icon name={item.icon as "BarChart3"} size={22} className="text-cyan-400" />
                </div>
                <h3 className="font-exo font-bold text-white text-lg mb-2">{item.title}</h3>
                <p className="font-sans text-sm text-gray-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-24 relative grid-bg">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="font-mono text-xs text-cyan-400 tracking-widest uppercase mb-3">// 006 — КОНТАКТЫ</div>
            <h2 className="font-exo font-black text-4xl lg:text-5xl text-white">Свяжитесь <span className="neon-text">с нами</span></h2>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              {[
                { icon: "Phone", label: "Телефон", value: "+7 (800) 555-0100", sub: "Бесплатно по России" },
                { icon: "Mail", label: "Email", value: "hello@drive.ru", sub: "Ответим в течение часа" },
                { icon: "MapPin", label: "Офис", value: "Москва, ул. Будущего, 1", sub: "Пн–Пт 9:00–21:00" },
              ].map((contact) => (
                <div key={contact.label} className="glass-card rounded-xl p-5 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl neon-border bg-cyan-400/10 flex items-center justify-center flex-shrink-0">
                    <Icon name={contact.icon as "Phone"} size={20} className="text-cyan-400" />
                  </div>
                  <div>
                    <div className="font-mono text-xs text-gray-500 tracking-wider">{contact.label}</div>
                    <div className="font-exo font-bold text-white">{contact.value}</div>
                    <div className="font-sans text-xs text-gray-500">{contact.sub}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="glass-card rounded-2xl p-8 neon-border">
              <h3 className="font-exo font-bold text-white text-xl mb-6">Напишите нам</h3>
              <div className="space-y-4">
                <input type="text" placeholder="Ваше имя" className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 font-sans text-sm text-white placeholder-gray-600 focus:outline-none focus:border-cyan-400/60 transition-colors" />
                <input type="email" placeholder="Email" className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 font-sans text-sm text-white placeholder-gray-600 focus:outline-none focus:border-cyan-400/60 transition-colors" />
                <textarea rows={4} placeholder="Ваше сообщение..." className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 font-sans text-sm text-white placeholder-gray-600 focus:outline-none focus:border-cyan-400/60 transition-colors resize-none" />
                <button className="w-full neon-btn-filled py-3 rounded-xl font-exo font-black tracking-wider">ОТПРАВИТЬ</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SUPPORT */}
      <section id="support" className="py-24 relative">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="font-mono text-xs text-cyan-400 tracking-widest uppercase mb-3">// 007 — ПОДДЕРЖКА</div>
            <h2 className="font-exo font-black text-4xl lg:text-5xl text-white">Частые <span className="neon-text">вопросы</span></h2>
          </div>
          <div className="space-y-3">
            {[
              { q: "Как зарегистрироваться в сервисе?", a: "Скачайте приложение DRIVE, введите номер телефона и загрузите фото водительского удостоверения. Верификация занимает до 15 минут." },
              { q: "Какой залог требуется?", a: "На тарифе УЛЬТРА залог не требуется. На остальных тарифах — от 1000 ₽, возвращается после каждой поездки автоматически." },
              { q: "Что делать при ДТП?", a: "Нажмите кнопку SOS в приложении — мы свяжемся с вами в течение 2 минут. Все автомобили застрахованы по КАСКО." },
              { q: "Как работает система рейтинга?", a: "После каждой поездки вы оцениваете автомобиль, другие водители оценивают вас. Рейтинг влияет на доступные тарифы и бонусы." },
              { q: "Можно ли путешествовать за город?", a: "Да, на тарифах БИЗНЕС и УЛЬТРА. Стоимость рассчитывается по пробегу, зарядка включена на всём маршруте." },
            ].map((item, i) => (
              <details key={i} className="glass-card rounded-xl overflow-hidden group">
                <summary className="px-6 py-4 font-exo font-semibold text-white cursor-pointer flex items-center justify-between hover:text-cyan-400 transition-colors list-none">
                  {item.q}
                  <Icon name="ChevronDown" size={16} className="text-cyan-400 group-open:rotate-180 transition-transform" />
                </summary>
                <div className="px-6 pb-5 font-sans text-sm text-gray-400 leading-relaxed border-t border-white/5 pt-4">{item.a}</div>
              </details>
            ))}
          </div>
          <div className="mt-10 glass-card rounded-2xl p-8 text-center neon-border">
            <div className="w-16 h-16 rounded-full bg-cyan-400/10 neon-border flex items-center justify-center mx-auto mb-4">
              <Icon name="MessageCircle" size={28} className="text-cyan-400" />
            </div>
            <h3 className="font-exo font-bold text-white text-xl mb-2">Нужна помощь?</h3>
            <p className="font-sans text-gray-400 text-sm mb-6">Наша команда онлайн 24/7 — ответим за 2 минуты</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <button className="neon-btn-filled px-6 py-2.5 rounded-xl font-exo font-bold text-sm tracking-wider">НАПИСАТЬ В ЧАТ</button>
              <button className="neon-btn px-6 py-2.5 rounded-xl font-exo font-bold text-sm tracking-wider">ПОЗВОНИТЬ</button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-cyan-400/10 py-12 grid-bg">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-10">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded neon-border flex items-center justify-center">
                  <Icon name="Zap" size={16} className="text-cyan-400" />
                </div>
                <span className="font-exo font-black text-xl tracking-widest neon-text">DRIVE</span>
              </div>
              <p className="font-sans text-sm text-gray-500 leading-relaxed">Каршеринг нового поколения. Электромобили premium-класса для города будущего.</p>
            </div>
            {[
              { title: "Сервис", links: ["Автопарк", "Тарифы", "Бронирование", "Личный кабинет"] },
              { title: "Компания", links: ["О нас", "Вакансии", "Пресса", "Партнёрам"] },
              { title: "Поддержка", links: ["FAQ", "Написать нам", "Правила", "Конфиденциальность"] },
            ].map((col) => (
              <div key={col.title}>
                <div className="font-mono text-xs text-cyan-400 tracking-widest uppercase mb-4">{col.title}</div>
                <ul className="space-y-2">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="font-sans text-sm text-gray-500 hover:text-cyan-400 transition-colors">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="font-mono text-xs text-gray-600">© 2026 DRIVE. Каршеринг нового поколения.</div>
            <div className="flex gap-4">
              {["Telegram", "VK", "YouTube"].map((social) => (
                <a key={social} href="#" className="font-mono text-xs text-gray-600 hover:text-cyan-400 transition-colors tracking-wider">{social}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}