const langToggle = document.getElementById('langToggle');
let currentLang = 'ar';
function setLanguage(lang){
  currentLang = lang;
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  document.body.dir = lang === 'ar' ? 'rtl' : 'ltr';
  document.querySelectorAll('[data-ar][data-en]').forEach(el => {
    const value = el.dataset[lang];
    if (value !== undefined) el.innerHTML = value;
  });
  langToggle.textContent = lang === 'ar' ? 'English' : 'العربية';
  langToggle.setAttribute('aria-label', lang === 'ar' ? 'Switch to English' : 'التبديل إلى العربية');
  document.title = lang === 'ar' ? 'Smart Agents | الوكيل الذكي' : 'Smart Agents | Your Smart Choice';
  localStorage.setItem('smartAgentsLang', lang);
}
langToggle.addEventListener('click', () => setLanguage(currentLang === 'ar' ? 'en' : 'ar'));
document.getElementById('year').textContent = new Date().getFullYear();
document.getElementById('contactForm').addEventListener('submit', event => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const subject = encodeURIComponent('Smart Agents service inquiry / طلب خدمة');
  const body = encodeURIComponent(
    `Name: ${form.get('name')}\nEmail: ${form.get('email')}\nService: ${form.get('service')}\nProject summary: ${form.get('message')}`
  );
  // Replace this placeholder with the company's real contact email before launch.
  window.location.href = `mailto:REPLACE_WITH_COMPANY_EMAIL@example.com?subject=${subject}&body=${body}`;
});
setLanguage(localStorage.getItem('smartAgentsLang') || 'ar');
if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
  window.addEventListener('load', () => navigator.serviceWorker.register('./service-worker.js').catch(()=>{}));
}
