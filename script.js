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

// ─── STATIC ESSAYS (Firebase 없이도 전문 읽기 가능) ───
const staticEssays = {
  op1: {
    date: '2025. 8. 24',
    title: '작지만 단단한 울타리',
    author: '운영자 유하영',
    body: `처음 나그네방을 열었을 땐, 이곳이 누군가에게 어떤 의미가 될지 상상하지 못했습니다. 그저 방 하나를 내어줄 수 있다는 것, 누군가에게 잠시 기댈 공간이 된다는 것만으로도 충분하다고 생각했습니다.

그런데 시간이 지나면서 알게 됐습니다. 방 한 칸이 단순한 잠자리가 아니라는 것을. 누군가에게 그 방은 처음으로 부모님 품 밖에서 혼자 서보는 공간이고, 어떤 이에게는 가장 힘들었던 시절을 버텨낸 장소이며, 또 다른 이에게는 세상으로 나가기 전 마지막으로 쉬어가는 곳이었습니다.

작은 방이지만, 그 방 안에서 일어나는 일들은 결코 작지 않았습니다. 사람은 안전한 공간이 있어야 꿈을 꿀 수 있다는 것을, 나그네방은 해마다 저에게 가르쳐주었습니다.

앞으로도 이 작은 울타리가 필요한 사람에게 닿기를 바랍니다. 화려하지 않아도 괜찮습니다. 작지만 단단한 울타리, 그것으로 충분합니다.`,
  },
  op2: {
    date: '2025. 8. 24',
    title: '한 칸의 방에서 피어난 세계',
    author: '운영자 유하영',
    body: `2018년 여름, 서울 온수역 근처. 친구와 둘이 살기엔 방이 하나 남았습니다. 그 빈 방을 어떻게 쓸지 고민하던 어느 날, 문득 그 방이 누군가를 위해 열려 있어야 한다는 생각이 들었습니다.

처음엔 그게 무엇을 의미하는지 몰랐습니다. 그냥 필요한 사람에게 내어주면 되겠지, 하는 마음이었습니다. 그렇게 첫 번째 나그네가 들어왔고, 두 번째, 세 번째... 어느새 40명이 넘는 사람들이 그 방을 거쳐갔습니다.

한 사람, 한 사람을 떠올려보면 참 다양합니다. 취업 준비생, 대학원생, 이직을 고민하는 직장인, 아픔을 잠시 내려두러 온 사람. 저마다의 이유로 이 작은 방을 찾아왔고, 저마다의 속도로 다음을 준비하다 떠났습니다.

방 한 칸이 이렇게 많은 세계를 담을 수 있다는 것. 처음엔 몰랐던 일입니다. 그게 7년이 지난 지금도 저를 이 일로 이끄는 이유입니다.`,
  },
  op3: {
    date: '2025. 10. 28',
    title: '함께여서 가능했던 7년',
    author: '운영자 유하영',
    body: `잔치 준비로 분주하던 어느 날, 이상하게도 마음이 가라앉았습니다. 7년 동안 우리를 찾아온 수많은 나그네들, 그리고 빈틈없이 채워놓았던 수고로운 손길과 마음이 한꺼번에 밀려왔기 때문입니다.

7년이라는 시간이 짧지 않습니다. 나그네방이 처음 생겼을 때는 몰랐습니다. 이 공간이 이렇게 오래 지속될 것이라는 것을. 그리고 함께하는 사람들이 이렇게 많아질 것이라는 것을.

7주년 잔치 날, 운영자, 나그네, 후원자 25명이 한자리에 모였습니다. 지난 7년의 이야기를 나누고, 앞으로의 7년을 상상했습니다. 누군가는 눈물을 보이기도 했습니다. 그냥 흘러가는 시간이 아니라, 서로가 서로에게 기댔던 시간이었다는 것을 모두가 알고 있었기 때문입니다.

혼자였다면 결코 7년을 버텨내지 못했을 것입니다. 함께였기에 가능했습니다.`,
  },
  pt1: {
    date: '2026. 2. 25',
    title: '갈대상자',
    author: '나그네 어머니',
    body: `사춘기를 보내고 고등학교 3년, 예민함은 점점 더해졌고 대학 합격을 하고나서는 정점을 찍었어요. 그리고 드디어 이동, 하영님의 마음이 담긴 글과 함께 나그네방에 들어가게 되었습니다.

엄마로서는 솔직히 두려웠어요. 낯선 공간, 낯선 사람들. 아이가 적응할 수 있을까, 또 힘들어하면 어떡하지. 그런데 한 달, 두 달이 지나면서 아이가 조금씩 달라지는 것을 느꼈습니다.

전화 목소리에 여유가 생겼어요. 밥을 잘 챙겨먹는다고 했고, 같이 사는 사람들과 저녁을 함께 먹는다고 했습니다. 부모 품 안에서는 오히려 더 웅크리고 있던 아이가, 낯선 곳에서 조금씩 펴지고 있었던 거예요.

갈대는 바람에 흔들려도 부러지지 않는다고 하잖아요. 나그네방이 제 아이에게 그런 공간이 되어주었습니다. 무너지지 않고 흔들릴 수 있는 공간. 그 공간을 마련해주신 운영자님께 진심으로 감사드립니다.`,
  },
};

window.openStaticEssay = function (id) {
  const e = staticEssays[id];
  if (!e) return;
  const modal   = document.getElementById('essayModal');
  const content = document.getElementById('essayContent');
  content.innerHTML = `
    <p class="em-date">${e.date}</p>
    <h2>${e.title}</h2>
    <div class="em-body">${e.body.split('\n\n').map(p =>
      `<p>${p.replace(/\n/g, '<br />')}</p>`
    ).join('')}</div>
    <p class="em-author">— ${e.author}</p>`;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
  modal.querySelector('.modal-box').scrollTop = 0;
};

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
