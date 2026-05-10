// ─── NAV ───
const nav       = document.getElementById('nav');
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 20));
navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

// ─── FADE-UP (static elements only) ───
const fadeEls = document.querySelectorAll(
  '.num-card, .about-card, .tl-item, .roadmap-row, .impact-row, .principle-item, .donate-card-box'
);
fadeEls.forEach(el => el.classList.add('fade-up'));
const io = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const siblings = [...entry.target.parentElement.children].filter(c => c.classList.contains('fade-up'));
    setTimeout(() => entry.target.classList.add('visible'), siblings.indexOf(entry.target) * 75);
    io.unobserve(entry.target);
  });
}, { threshold: 0.1 });
fadeEls.forEach(el => io.observe(el));

// ─── ESSAY MODAL (close only — openEssay is in guestbook.js) ───
function closeEssay(event) {
  const m = document.getElementById('essayModal');
  if (!event || event.target === m) {
    m.classList.remove('open');
    document.body.style.overflow = '';
  }
}

// ─── DONATE MODAL ───
const donateModal  = document.getElementById('donateModal');
const modalRegular = document.getElementById('modalRegular');
const modalOnce    = document.getElementById('modalOnce');

function openDonateModal(type) {
  modalRegular.style.display = type === 'regular' ? 'block' : 'none';
  modalOnce.style.display    = type === 'once'    ? 'block' : 'none';
  donateModal.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeDonateModal(event) {
  if (!event || event.target === donateModal) {
    donateModal.classList.remove('open');
    document.body.style.overflow = '';
  }
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') { closeEssay(); closeDonateModal(); }
});

// ─── COPY ACCOUNT ───
const toast = document.getElementById('toast');
function copyAccount() {
  const acc = '3333255616854';
  if (navigator.clipboard) navigator.clipboard.writeText(acc);
  else {
    const t = document.createElement('textarea');
    t.value = acc; document.body.appendChild(t); t.select();
    document.execCommand('copy'); document.body.removeChild(t);
  }
  showToast('계좌번호가 복사되었습니다.');
}
function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2800);
}

// ─── CONTACT FORM ───
const contactPlaceholders = {
  '':        '문의 내용을 자유롭게 적어주세요.',
  'apply':   '입주를 희망하는 기간과, 입주가 필요한 사정을 간략히 적어주세요.\n운영자와의 1:1 미팅을 통해 서로를 소개하는 시간을 갖고, 입주 여부를 함께 결정합니다.',
  'donate':  '후원과 관련해 궁금하신 점을 자유롭게 적어주세요.',
  'partner': '협력을 제안하시는 내용과 소속을 함께 적어주시면 감사합니다.',
  'other':   '문의 내용을 자유롭게 적어주세요.',
};

const contactType = document.getElementById('contactType');
const contactMessage = document.getElementById('contactMessage');

if (contactType && contactMessage) {
  contactType.addEventListener('change', function () {
    contactMessage.placeholder = contactPlaceholders[this.value] || contactPlaceholders[''];
    contactMessage.rows = this.value === 'apply' ? 7 : 5;
  });
}

document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault();
  showToast('메시지가 전송되었습니다. 감사합니다!');
  this.reset();
  if (contactMessage) contactMessage.placeholder = contactPlaceholders[''];
});

// ─── LIGHTBOX ───
const galleryImgs = [];
let lbIndex = 0;

function rebuildLightbox() {
  galleryImgs.length = 0;
  document.querySelectorAll('#galleryGrid .g-item').forEach((item, i) => {
    const img     = item.querySelector('img');
    const caption = item.querySelector('.g-caption');
    galleryImgs.push({ src: img.src, alt: img.alt || '', caption: caption ? caption.textContent : '' });
    item.style.cursor = 'zoom-in';
    item.onclick = () => openLightbox(i);
  });
}

function openLightbox(index) {
  lbIndex = index;
  renderLb();
  document.getElementById('lightbox').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function renderLb() {
  const { src, alt, caption } = galleryImgs[lbIndex];
  document.getElementById('lbImg').src = src;
  document.getElementById('lbImg').alt = alt;
  document.getElementById('lbCaption').textContent = caption;
}
function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
}
function lbNav(dir) {
  lbIndex = (lbIndex + dir + galleryImgs.length) % galleryImgs.length;
  renderLb();
}

document.getElementById('lbClose').addEventListener('click', closeLightbox);
document.getElementById('lbPrev').addEventListener('click',  () => lbNav(-1));
document.getElementById('lbNext').addEventListener('click',  () => lbNav(1));
document.getElementById('lightbox').addEventListener('click', e => {
  if (e.target === document.getElementById('lightbox')) closeLightbox();
});
document.addEventListener('keydown', e => {
  if (!document.getElementById('lightbox').classList.contains('open')) return;
  if (e.key === 'ArrowLeft')  lbNav(-1);
  if (e.key === 'ArrowRight') lbNav(1);
  if (e.key === 'Escape')     closeLightbox();
});

// ─── EXPOSE ───
window.openDonateModal  = openDonateModal;
window.closeDonateModal = closeDonateModal;
window.closeEssay       = closeEssay;
window.copyAccount      = copyAccount;
window.rebuildLightbox  = rebuildLightbox;

// 페이지 로드 시 로컬 기본 이미지에 라이트박스 적용
document.addEventListener('DOMContentLoaded', () => rebuildLightbox());
