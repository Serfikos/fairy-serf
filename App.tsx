import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { 
  Menu, 
  X, 
  Clock, 
  Banknote, 
  Camera, 
  ShieldCheck, 
  TrendingUp, 
  Users, 
  MessageCircle, 
  Mail, 
  Phone, 
  Instagram, 
  Send,
  Globe,
  Loader2
} from 'lucide-react';

// --- Supabase Configuration ---
// ВАЖНО: Замените эти значения на свои из панели управления Supabase (Project Settings -> API)
// IMPORTANT: Replace these with your actual Supabase project credentials
const SUPABASE_URL = 'https://csphhqzxxtwvvvtsuxxyr.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_N-cl6PnOzzIZPGBPmrzRNg_7aNqWspI';

// Инициализация клиента Supabase
// Using the client library prevents SQL injection by sanitizing inputs automatically.
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// --- Translations ---

const content = {
  ru: {
    nav: {
      home: 'Главная',
      guarantees: 'Гарантии',
      services: 'Сервисы',
      contacts: 'Контакты',
      becomeModel: 'Стать моделью'
    },
    hero: {
      title: 'Работа WEB-моделью',
      subtitle: 'Доход в месяц с гарантией от',
      currency: '1000$',
      button: 'Подать заявку'
    },
    easyStart: {
      title: 'Простой старт!',
      text1: 'Мы поможем тебе избежать типичных ошибок начинающих веб-моделей и зарабатывать еще больше.',
      text2: 'Для девушек от 18 до 35 лет, желающих обрести финансовую независимость.'
    },
    benefits: {
      title: 'Работай с нами!',
      card1: 'Индивидуальный гибкий график',
      card2: 'Приведи подругу и получи 100-300$',
      card3: 'Фото и видео сессии'
    },
    guarantees: {
      title: 'Гарантируем!',
      text: 'Мы обучаем своих моделей и поддерживаем их во время работы. Беспокойся о работе, остальное на себя возьмем мы!',
      bar1: 'Безопасность',
      bar2: 'Конфиденциальность',
      bar3: 'Высокий доход от 1000$'
    },
    requirements: {
      title: 'Мы ждем тебя, если ты...',
      card1: 'Яркая и энергичная',
      card2: 'Уверена в себе',
      card3: 'Есть желание работать и зарабатывать!'
    },
    services: {
      title: 'Мы представлены на сервисах'
    },
    process: {
      title: 'Как работаем',
      subtitle: 'Работа вебкам моделью заключается в общении по видео с участниками чата',
      card1: 'Переписка в чате',
      card2: 'Флирт в общем чате',
      card3: 'Приватное шоу'
    },
    cta: 'Только ты решаешь, что делать онлайн',
    contacts: {
      title: 'Остались вопросы?',
      subtitle: 'С нами всегда можно легко связаться!'
    },
    about: {
      text1: 'FairySerf - это круг единомышленников, высокое финансовое положение которых не зависит от нестабильных внешних факторов и желания третьих лиц.',
      text2: 'Даже если у тебя нет опыта, мы обязательно научим!',
      stat1Val: '1',
      stat1Text: 'Год успешной работы',
      stat2Val: '20+',
      stat2Text: 'Счастливых моделей'
    },
    form: {
      title: 'Стать моделью',
      namePh: 'Имя',
      phonePh: 'Телефон (WhatsApp/Telegram)',
      exp: 'Опыт работы',
      submit: 'Отправить заявку',
      sending: 'Отправка...',
      alert: 'Спасибо за заявку! Мы свяжемся с Вами в ближайшее время.',
      error: 'Ошибка при отправке. Пожалуйста, попробуйте позже или напишите нам в Telegram.'
    },
    footer: {
      aboutTitle: 'О нас',
      aboutText: 'FairySerf - это мир ярких впечатлений и возможностей, мир преображения и новых достижений, мир независимости и подлинной свободы самовыражения.',
      rights: 'Все права защищены'
    }
  },
  en: {
    nav: {
      home: 'Home',
      guarantees: 'Guarantees',
      services: 'Services',
      contacts: 'Contacts',
      becomeModel: 'Become a Model'
    },
    hero: {
      title: 'Web Modeling Job',
      subtitle: 'Guaranteed monthly income from',
      currency: '$1000',
      button: 'Apply Now'
    },
    easyStart: {
      title: 'Easy Start!',
      text1: 'We help you avoid common beginner mistakes and earn even more.',
      text2: 'For women aged 18 to 35 who want to achieve financial independence.'
    },
    benefits: {
      title: 'Work with us!',
      card1: 'Flexible individual schedule',
      card2: 'Refer a friend and get $100-300',
      card3: 'Photo and video sessions'
    },
    guarantees: {
      title: 'We Guarantee!',
      text: 'We train our models and support them during work. Worry about the work, we handle the rest!',
      bar1: 'Security',
      bar2: 'Confidentiality',
      bar3: 'High income from $1000'
    },
    requirements: {
      title: 'We are waiting for you if you are...',
      card1: 'Bright and energetic',
      card2: 'Confident',
      card3: 'Eager to work and earn!'
    },
    services: {
      title: 'We are present on platforms'
    },
    process: {
      title: 'How It Works',
      subtitle: 'Webcam modeling involves video communication with chat participants',
      card1: 'Chatting',
      card2: 'Flirting in public chat',
      card3: 'Private shows'
    },
    cta: 'Only you decide what to do online',
    contacts: {
      title: 'Any questions?',
      subtitle: 'You can always contact us easily!'
    },
    about: {
      text1: 'FairySerf is a community of like-minded individuals whose financial success depends not on unstable external factors but on themselves.',
      text2: 'Even if you have no experience, we will teach you!',
      stat1Val: '1',
      stat1Text: 'Year of success',
      stat2Val: '20+',
      stat2Text: 'Happy models'
    },
    form: {
      title: 'Become a Model',
      namePh: 'Name',
      phonePh: 'Phone (WhatsApp/Telegram)',
      exp: 'Work experience',
      submit: 'Submit Application',
      sending: 'Sending...',
      alert: 'Thank you for your application! We will contact you shortly.',
      error: 'Error sending application. Please try again later or contact us on Telegram.'
    },
    footer: {
      aboutTitle: 'About Us',
      aboutText: 'FairySerf is a world of vivid impressions and opportunities, a world of transformation and new achievements, a world of independence and true freedom of self-expression.',
      rights: 'All rights reserved'
    }
  }
};

// --- Components ---

const Button = ({ children, onClick, className = "", fullWidth = false, disabled = false }: { children: React.ReactNode, onClick?: () => void, className?: string, fullWidth?: boolean, disabled?: boolean }) => (
  <button 
    onClick={onClick}
    disabled={disabled}
    className={`px-8 py-4 rounded-full font-semibold text-white transition-all transform hover:-translate-y-1 hover:shadow-lg bg-gradient-primary disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0 ${fullWidth ? 'w-full' : ''} ${className}`}
  >
    {children}
  </button>
);

const Section = ({ id, className = "", children }: { id?: string, className?: string, children: React.ReactNode }) => (
  <section id={id} className={`py-16 md:py-24 ${className}`}>
    {children}
  </section>
);

const Card = ({ icon: Icon, title, text }: { icon: React.ElementType, title: string, text?: string }) => (
  <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 flex flex-col items-center text-center h-full transition-transform hover:-translate-y-2">
    <div className="mb-6 p-4 bg-purple-50 rounded-full text-primary">
      <Icon size={48} />
    </div>
    <h3 className="text-xl font-bold mb-4">{title}</h3>
    {text && <p className="text-gray-600 leading-relaxed">{text}</p>}
  </div>
);

const ProgressBar = ({ label, value }: { label: string, value: number }) => (
  <div className="mb-6">
    <div className="flex justify-between mb-2">
      <span className="font-semibold text-lg">{label}</span>
      <span className="font-semibold text-primary">{value}%</span>
    </div>
    <div className="w-full bg-gray-200 rounded-full h-3">
      <div 
        className="bg-primary h-3 rounded-full transition-all duration-1000 ease-out" 
        style={{ width: `${value}%` }}
      ></div>
    </div>
  </div>
);

// --- Main App ---

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lang, setLang] = useState<'ru' | 'en'>('ru');
  const [isLoading, setIsLoading] = useState(false);

  const t = content[lang];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleLang = () => setLang(prev => prev === 'ru' ? 'en' : 'ru');

  // Unified Form Handler
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      phone: formData.get('phone'),
      experience: formData.get('experience') === 'on' ? true : false,
      submitted_at: new Date().toISOString(),
    };

    try {
      if (SUPABASE_URL === 'https://your-project-url.supabase.co') {
        // Fallback for demo purposes if keys aren't set
        console.warn('Supabase keys not set. Simulating success.');
        await new Promise(resolve => setTimeout(resolve, 1500));
        alert(t.form.alert);
      } else {
        // Actual Database Insertion
        // Note: Make sure to create a table named 'applications' in Supabase
        const { error } = await supabase
          .from('applications')
          .insert([data]);

        if (error) throw error;
        
        alert(t.form.alert);
      }
      
      // Reset form
      (e.target as HTMLFormElement).reset();
      if (isModalOpen) closeModal();
      
    } catch (error) {
      console.error('Error submitting form:', error);
      alert(t.form.error);
    } finally {
      setIsLoading(false);
    }
  };

  const navLinks = [
    { name: t.nav.home, href: '#' },
    { name: t.nav.guarantees, href: '#guarantees' },
    { name: t.nav.services, href: '#services' },
    { name: t.nav.contacts, href: '#contacts' },
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans text-dark">
      
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-primary/95 shadow-md py-2' : 'bg-transparent py-4'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <a href="#" className="text-2xl font-bold text-white tracking-wide">FairySerf</a>
          
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="text-white hover:text-purple-200 font-medium transition-colors">
                {link.name}
              </a>
            ))}
            
            <button onClick={toggleLang} className="flex items-center space-x-1 text-white hover:text-purple-200 transition-colors">
              <Globe size={20} />
              <span className="uppercase font-bold">{lang}</span>
            </button>

            <button onClick={openModal} className="px-6 py-2 bg-white text-primary rounded-full font-bold hover:bg-gray-100 transition-colors">
              {t.nav.becomeModel}
            </button>
          </div>

          <div className="lg:hidden flex items-center space-x-4">
             <button onClick={toggleLang} className="text-white flex items-center space-x-1">
                <Globe size={24} />
                <span className="uppercase font-bold text-sm">{lang}</span>
             </button>
            <button onClick={toggleMenu} className="text-white">
              {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-primary/95 shadow-xl p-6 flex flex-col space-y-4 lg:hidden">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={() => setIsMenuOpen(false)}
                className="text-white text-lg font-medium text-center"
              >
                {link.name}
              </a>
            ))}
            <button onClick={() => { openModal(); setIsMenuOpen(false); }} className="w-full py-3 bg-white text-primary rounded-full font-bold">
              {t.nav.becomeModel}
            </button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <header className="relative min-h-[80vh] flex items-center justify-center text-white text-center px-4 bg-gray-900">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://picsum.photos/id/338/1920/1080" 
            alt="Background" 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/60 to-purple-900/80 mix-blend-multiply" />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto mt-16">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            {t.hero.title}
          </h1>
          <p className="text-xl md:text-2xl font-light mb-10 text-gray-100">
            {t.hero.subtitle} <strong>{t.hero.currency}</strong>
          </p>
          <Button onClick={openModal} className="text-lg px-10 py-5">
            {t.hero.button}
          </Button>
        </div>
      </header>

      {/* Feature Section 1 (Easy Start) */}
      <Section className="bg-primary text-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="w-full lg:w-1/2">
              <img 
                src="https://picsum.photos/id/64/800/600" 
                alt="Easy Start" 
                className="rounded-3xl shadow-2xl w-full object-cover h-[400px]"
              />
            </div>
            <div className="w-full lg:w-1/2 text-left">
              <h2 className="text-4xl md:text-5xl font-bold mb-8">{t.easyStart.title}</h2>
              <div className="grid md:grid-cols-2 gap-8 text-lg">
                <p>{t.easyStart.text1}</p>
                <p>{t.easyStart.text2}</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Benefits Cards */}
      <Section className="bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">{t.benefits.title}</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card 
              icon={Clock} 
              title={t.benefits.card1} 
            />
            <Card 
              icon={Banknote} 
              title={t.benefits.card2} 
            />
            <Card 
              icon={Camera} 
              title={t.benefits.card3} 
            />
          </div>
        </div>
      </Section>

      {/* Guarantees / Progress */}
      <Section id="guarantees" className="bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="w-full lg:w-5/12">
              <img 
                src="https://picsum.photos/id/250/600/800" 
                alt="Camera" 
                className="rounded-3xl shadow-xl w-full object-cover"
              />
            </div>
            <div className="w-full lg:w-7/12">
              <h2 className="text-4xl font-bold mb-6">{t.guarantees.title}</h2>
              <p className="text-lg text-gray-600 mb-10">
                {t.guarantees.text}
              </p>
              <div className="space-y-6">
                <ProgressBar label={t.guarantees.bar1} value={100} />
                <ProgressBar label={t.guarantees.bar2} value={100} />
                <ProgressBar label={t.guarantees.bar3} value={100} />
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Requirements */}
      <Section className="bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">{t.requirements.title}</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card icon={TrendingUp} title={t.requirements.card1} />
            <Card icon={ShieldCheck} title={t.requirements.card2} />
            <Card icon={Banknote} title={t.requirements.card3} />
          </div>
        </div>
      </Section>

      {/* Services / Platforms */}
      <Section id="services" className="bg-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">{t.services.title}</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
            {['Stripchat', 'XCams', 'BongaCams', 'CamSoda', 'Chaturbate', 'MyFreeCams'].map((platform) => (
              <div key={platform} className="p-4 bg-gray-100 rounded-xl font-bold text-primary hover:bg-purple-50 hover:shadow-md transition-all">
                {platform}
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Process (How it works) */}
      <Section className="bg-primary/5">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.process.title}</h2>
            <p className="text-lg text-gray-600">{t.process.subtitle}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card icon={Users} title={t.process.card1} />
            <Card icon={MessageCircle} title={t.process.card2} />
            <Card icon={Mail} title={t.process.card3} />
          </div>
        </div>
      </Section>

      {/* CTA Overlay */}
      <Section className="relative bg-dark py-32 text-center text-white overflow-hidden">
         <div className="absolute inset-0 z-0">
          <img src="https://picsum.photos/id/129/1920/600" alt="CTA" className="w-full h-full object-cover opacity-20" />
        </div>
        <div className="relative z-10 container mx-auto px-6">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">{t.cta}</h2>
        </div>
      </Section>

      {/* Contact Info */}
      <Section id="contacts" className="bg-white text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.contacts.title}</h2>
          <p className="text-xl text-gray-600 mb-12">{t.contacts.subtitle}</p>
          
          <div className="flex flex-col md:flex-row justify-center gap-8 mb-12">
            <a href="https://t.me/Serfi9938" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-3 text-xl font-bold text-primary hover:scale-105 transition-transform">
              <div className="bg-blue-500 text-white p-3 rounded-full">
                <Send size={24} />
              </div>
              @Serfi9938
            </a>
            <a href="https://www.instagram.com/fairyserf/" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-3 text-xl font-bold text-primary hover:scale-105 transition-transform">
              <div className="bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 text-white p-3 rounded-full">
                <Instagram size={24} />
              </div>
              @fairyserf
            </a>
          </div>
        </div>
      </Section>

      {/* About/Team */}
      <Section className="relative bg-dark py-24 text-white">
        <div className="absolute inset-0 bg-primary/20 backdrop-blur-sm z-0"></div>
        <img src="https://picsum.photos/id/331/1920/1080" alt="bg" className="absolute inset-0 w-full h-full object-cover opacity-20 z-[-1]" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="w-full lg:w-1/3">
              <img src="https://picsum.photos/id/65/500/500" alt="Team" className="rounded-full w-64 h-64 lg:w-96 lg:h-96 object-cover border-4 border-white/20 mx-auto shadow-2xl" />
            </div>
            <div className="w-full lg:w-2/3 text-center lg:text-left">
              <h3 className="text-2xl md:text-3xl leading-relaxed font-light mb-8">
                {t.about.text1}
              </h3>
              <h3 className="text-2xl md:text-3xl font-bold">
                {t.about.text2}
              </h3>
              
              <div className="flex flex-wrap justify-center lg:justify-start gap-8 mt-12">
                <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10 min-w-[160px] text-center lg:text-left">
                    <p className="text-5xl font-bold text-primary mb-2">{t.about.stat1Val}</p>
                    <p className="text-sm text-gray-300 uppercase font-semibold tracking-wider">{t.about.stat1Text}</p>
                </div>
                <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10 min-w-[160px] text-center lg:text-left">
                    <p className="text-5xl font-bold text-secondary mb-2">{t.about.stat2Val}</p>
                    <p className="text-sm text-gray-300 uppercase font-semibold tracking-wider">{t.about.stat2Text}</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </Section>

      {/* Bottom Form */}
      <Section className="bg-gray-50">
        <div className="container mx-auto px-6 max-w-2xl">
          <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl">
             <h2 className="text-3xl font-bold mb-8 text-center">{t.form.title}</h2>
             <form className="space-y-6" onSubmit={handleFormSubmit}>
               <div>
                 <input name="name" type="text" placeholder={t.form.namePh} required className="w-full px-6 py-4 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all" />
               </div>
               <div>
                 <input name="phone" type="tel" placeholder={t.form.phonePh} required className="w-full px-6 py-4 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all" />
               </div>
               <div className="flex items-center space-x-3">
                 <input name="experience" type="checkbox" id="experience" className="w-5 h-5 text-primary rounded focus:ring-primary" />
                 <label htmlFor="experience" className="text-gray-600">{t.form.exp}</label>
               </div>
               <Button fullWidth disabled={isLoading}>
                 {isLoading ? <span className="flex items-center justify-center gap-2"><Loader2 className="animate-spin" size={20} /> {t.form.sending}</span> : t.form.submit}
               </Button>
             </form>
          </div>
        </div>
      </Section>

      {/* Footer */}
      <footer className="bg-dark text-white py-12">
        <div className="container mx-auto px-6">
          <div className="md:w-1/2">
            <h4 className="text-xl font-bold mb-4">{t.footer.aboutTitle}</h4>
            <p className="text-gray-400 leading-relaxed mb-4">
              {t.footer.aboutText}
            </p>
            <p className="text-gray-500 text-sm">
              {t.footer.rights} © {new Date().getFullYear()}.
            </p>
          </div>
        </div>
      </footer>

      {/* Floating Button */}
      <button 
        onClick={openModal}
        className="fixed bottom-6 left-6 z-40 bg-gradient-primary w-16 h-16 rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform animate-pulse"
      >
        <Phone size={32} />
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-8 w-full max-w-md relative animate-fade-in-up">
            <button 
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-dark p-2"
            >
              <X size={24} />
            </button>
            
            <h2 className="text-2xl font-bold mb-6 text-center">{t.form.title}</h2>
            
            <form className="space-y-4" onSubmit={handleFormSubmit}>
               <div>
                 <input name="name" type="text" placeholder={t.form.namePh} required className="w-full px-5 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:border-primary" />
               </div>
               <div>
                 <input name="phone" type="tel" placeholder={t.form.phonePh} required className="w-full px-5 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:border-primary" />
               </div>
               <div className="flex items-center space-x-2">
                 <input name="experience" type="checkbox" id="modal-exp" className="w-4 h-4 text-primary rounded focus:ring-primary" />
                 <label htmlFor="modal-exp" className="text-sm text-gray-600">{t.form.exp}</label>
               </div>
               <Button fullWidth className="py-3 text-lg" disabled={isLoading}>
                 {isLoading ? <span className="flex items-center justify-center gap-2"><Loader2 className="animate-spin" size={20} /> {t.form.sending}</span> : t.form.submit}
               </Button>
             </form>
          </div>
        </div>
      )}

    </div>
  );
}
