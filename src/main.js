const CONTACT_EMAIL = 'clickmorphy@gmail.com';

const EMAIL_SUBJECT_PREFIX = '[Clickmorphy Website]';

function buildEmailTemplate({ name, email, phone, message }) {
  const lines = [
    'Hello Clickmorphy Team,',
    '',
    'A new inquiry has been submitted via your website contact form.',
    '',
    '--- Contact Details ---',
    `Name: ${name}`,
    `Email: ${email}`,
    phone ? `Phone: ${phone}` : 'Phone: (not provided)',
    '',
    '--- Message ---',
    message,
    '',
    '---',
    'This email was generated from the Clickmorphy website contact form.',
    `Submitted on: ${new Date().toLocaleString('en-IN', { dateStyle: 'full', timeStyle: 'short' })}`,
  ];
  return lines.join('\n');
}

function buildMailtoUrl({ name, email, phone, message }) {
  const subject = `${EMAIL_SUBJECT_PREFIX} New inquiry from ${name}`;
  const body = buildEmailTemplate({ name, email, phone, message });
  const params = new URLSearchParams({
    subject,
    body,
    cc: email,
  });
  return `mailto:${CONTACT_EMAIL}?${params.toString()}`;
}

function updateEmailPreview(data) {
  const preview = document.getElementById('email-preview');
  if (!preview) return;
  const { name, email, phone, message } = data;
  if (!name && !email && !message) {
    preview.textContent = 'Fill the form to preview your email…';
    return;
  }
  preview.textContent = buildEmailTemplate({
    name: name || '…',
    email: email || '…',
    phone: phone || '',
    message: message || '…',
  });
}

function initHeader() {
  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');

  const onScroll = () => {
    header?.classList.toggle('scrolled', window.scrollY > 40);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  toggle?.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!open));
    nav?.classList.toggle('open', !open);
  });

  nav?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      toggle?.setAttribute('aria-expanded', 'false');
      nav?.classList.remove('open');
    });
  });
}

function initReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (!window.IntersectionObserver) {
    reveals.forEach((el) => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  reveals.forEach((el) => observer.observe(el));
}

function initContactForm() {
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  if (!form) return;

  const fields = ['name', 'email', 'phone', 'message'];

  const getFormData = () => {
    const data = {};
    fields.forEach((id) => {
      const el = document.getElementById(id);
      data[id] = el?.value?.trim() ?? '';
    });
    return data;
  };

  const syncPreview = () => updateEmailPreview(getFormData());

  fields.forEach((id) => {
    document.getElementById(id)?.addEventListener('input', syncPreview);
  });
  syncPreview();

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = getFormData();

    if (!data.name || !data.email || !data.message) {
      status.textContent = 'Please fill in name, email, and message.';
      status.className = 'form-note error';
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      status.textContent = 'Please enter a valid email address.';
      status.className = 'form-note error';
      return;
    }

    const mailtoUrl = buildMailtoUrl(data);

    status.textContent = 'Opening your email app with a pre-filled message to clickmorphy@gmail.com…';
    status.className = 'form-note success';

    window.location.href = mailtoUrl;

    setTimeout(() => {
      status.textContent =
        'If your email app did not open, email us directly at clickmorphy@gmail.com or copy the preview on the right.';
      status.className = 'form-note';
    }, 2500);
  });
}

function initYear() {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
}

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initReveal();
  initContactForm();
  initYear();
});
