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
    body: `처음 나그네방을 열었을 땐, 이곳이 누군가에게 어떤 의미가 될지 상상하지 못했습니다.
그저 방 하나를 내어줄 수 있다는 것,
누군가에게 잠시 기댈 공간이 된다는 것만으로도 충분하다고 생각했으니까요.
하지만 시간이 흐르며 알게 되었습니다.
그 '잠시'가, '기댐'이,
어떤 이들에게는 살아내는 데 꼭 필요한 기댈 곳이 되어주었다는 것을요.

나그네방에서 함께 살아간 사람들은 각기 다른 이유로 이곳에 왔습니다.
학업을 마치고 서울살이를 시작한 사람,
가정에서 나오게 된 사람,
일터를 옮기며 짧은 기간 거처가 필요했던 사람,
마음의 어려움을 겪고 새로운 시작을 준비하던 사람.
이유는 달랐지만, 모두 이곳에서
'혼자이지만, 혼자 두지 않는' 어떤 울타리를 경험했습니다.

식탁에 함께 앉아 밥을 먹는 일,
퇴근 후 말없이 마주 앉아 있는 시간,
서로가 서로에게 불빛처럼 존재해주는 순간들.
작은 행동이 모여, 이 공간은 언제나 열려 있으면서도
단단하게 사람들을 품을 수 있었습니다.

나그네방에는 '입주'도, '계약서'도 없지만,
이곳을 거쳐 간 이들이 하나같이 이야기했습니다.
"나그네방은 내가 내 삶을 회복할 수 있도록 도와준 곳이었다고."

그러니 우리는 이 울타리를
크게 만들기보다, 단단하게 지키는 쪽을 선택해왔습니다.
많은 사람을 들이는 것보다, 한 사람을 잘 품어내는 일이
더 깊고 오래 기억된다는 것을 알게 되었기 때문입니다.`,
  },
  op2: {
    date: '2025. 8. 24',
    title: '한 칸의 방에서 피어난 세계',
    author: '운영자 유하영',
    body: `2018년 여름, 서울 온수역 근처.
집을 구하던 저와 친구는 오래된 연립주택 화랑빌라의 마지막 매물을 보러 갔습니다.
아카시아 향이 퍼진 골목, 아이들 웃음소리가 들려오는 집.
그 집은 햇살이 잘 드는 쓰리룸이었고, 친구와 둘이 살기엔 방이 하나 남았습니다.
그 빈 방을 어떻게 쓸지 고민하던 어느 날,
문득 그 방이 우리가 아니라, 누군가를 위해 비워두는 것이 맞겠다는 생각이 들었습니다.
누구나 잠시 머물 수 있는 방. 기댈 수 있는 공간.
그렇게 남은 방 하나에 이름을 붙였습니다.

"나그네방."

조건 없는 사랑을 흘려보내기 위해 만든 집.
하영과 예빈이 사는 집이기도 하지만,
누군가에게는 하룻밤을, 한 달을, 혹은 긴 회복의 시간을 허락하는 방이 되기를 바랐습니다.

그 후로 나그네방은 여섯 해 넘게 이어져 왔습니다.
누군가 떠날 즈음, 어김없이 새로운 사람이 방을 찾았고,
스무 명이 넘는 사람들이 이곳에 머물다 갔습니다.
소개로, 소문으로, 어떤 사람은 SNS를 통해.
신기하게도, 최근 몇 년 간 이 방에 들어온 사람 중 제가 미리 알고 있던 이는 거의 없었습니다.

이곳의 규칙은 단 하나였습니다.
"나보다 이 방이 더 필요한 사람이 나타나면, 그에게 방을 내어준다."
하지만 단 한 번도
"내가 이 방보다 더 필요한 사람이야"라고 말한 사람은 없었습니다.
그저 머문 이들이 스스로 이야기했습니다.
"이제 저도 독립하겠습니다."
그러면 곧 또 다른 누군가가 문을 두드렸습니다.

햇살이 들던 작은 빌라의 한 칸에서 시작된 나그네방은,
이제 운영자의 손길을 넘어
자신만의 방식으로, 조용히 세상을 바꾸는 중입니다.`,
  },
  op3: {
    date: '2025. 10. 28',
    title: '함께여서 가능했던 7년',
    author: '운영자 유하영',
    body: `잔치 준비로 분주하던 어느 날, 이상하게도 마음이 가라앉았습니다. 몸은 움직이는데, 기세가 오르지 않았어요. 날씨 탓도, 일정 탓도 아닌 것 같았습니다. 그동안 걸어온 나그네방의 시간이 잔치를 앞두고 조금 색다르게 느껴지는 듯했어요.

행사를 준비하며 머릿속이 복잡했습니다. 무슨 메시지를 전해야 할지, 누구를 초대해야 할지, 동선을 어떻게 짜야 할지도 좀처럼 감이 잡히지 않았어요. 아무리 계획을 세워도 마음속 불안이 느껴졌습니다.

결국 함께하는 예빈에게 털어놓았어요. "나그네방 행사를 해야 하는데 감이 안 잡혀. 어떻게 해야 할까?"
사실 이번 잔치는 나그네방을 좋아해주시는 분들을 초대한 자리였어요. 그러니 제가 조금 실수하고 더듬어도 부담이 되지 않는 자리였지요. 그런데, 그래서 더 잘 보이고 싶었나봐요. 좋아하는 사람들 앞에서 우리 이만큼 성장했다고 성숙한 모습을 보여드리고 싶었던 거예요. 그 부담감에 정말 머리가 돌아가지 않았습니다.

저의 앞선 물음에 예빈이 답했어요.
"왜 그렇게 긴장해. 다 같이 어울려 노는 생일잔치라며, 그럼 잔치답게 먹을 것도 많이 준비하고, 공연에 경품도 나눠주면 되지. 즐겁게 해."

친구의 말을 듣고나니, 성숙한 모습을 보이려 부담감을 갖기보다 자연스럽게 우리다운 모습을 보여드리면 된다는 생각이 자라났습니다. 그동안 밖으로 내보이지 않았던 나그네들의 이야기를 그들의 입으로 직접 들려드리는 토크의 장을 열고, 나그네방을 함께 둘러보는 투어에 축하 공연과 경품 추첨을 준비했습니다.

세상의 수많은 콩쥐들을 잔치 보낸다던 나그네방이 원님 없이 우리만의 신명나는 잔치를 열게 된 날이었어요.

잔치에는 음식과 마실 것이 넉넉히 준비됐고, 멋진 공연과 놀이도 마련되었습니다. 나그네로 살았던 지원이가 전문 사회자로 변신해 행사를 이끌었고, 뮤지션 지혜는 자작곡으로 무대를 채워줬어요.

시즌1부터 시즌4까지 나그네방을 거쳐간 친구들이 자연스럽게 이야기를 이어가는 동안, 나그네방에는 도대체 누가 어떻게 알고 찾아 오는지, 어떤 방식으로 살아가는지 등 우리에 관한 궁금증이 풀려갔습니다.

서로 다른 나그네들이 모였지만, 그날의 공기만큼은 오래 알고 지낸 사람들처럼 편안했어요. 함께 웃고, 듣고, 나누는 시간 속에서 나그네방이 왜 이 사회에 필요한지, 우리가 지속되어야 하는 이유를 서로 더 깊이 인식하게 되었지요.

지난 7년 동안, 우리는 아주 작은 공동체의 모습으로, 서울 도심 속에서 서로에게 기댈 수 있는 단단한 커뮤니티를 만들어 왔습니다.

그리고 이제 7년을 꽉 채웠어요. 올해 나그네방은 그 어느 때보다 많은 응원을 받았고, 처음으로 우리를 외부에 소개할 수 있는 시간을 가졌습니다.

행사를 마치고 한 나그네가 찾아와 말했어요.
"그간 나그네방이 걸어온 시간에 대해 칭찬과 인정을 받는 시기가 찾아온 것 같아요."

7년 동안 우리를 찾아온 수많은 나그네들, 그리고 빈틈없이 채워놓았던 수고로운 손길과 마음이 오늘을 만들었습니다. 앞으로도 나그네방은 조건 없는 사랑을 집안 구석구석 채워 둘게요. 서울의 나그네방부터 안동의 나그네방까지, 그리고 더 많은 나그네들의 기댈 곳이 될 미래까지 말이에요.

멀리서 보내주시는 여러분의 성원에 빚진 마음으로 살아갑니다. 그 빚진 마음이 우리를 더 나은 존재로 만드는 묵직하고 든든한 응원이 되어줘요.

함께해 주신 여러분 고맙습니다. 우리 오래 보아요.

나그네방의 밑빠진 독을 채워가는 두꺼비 하영 올림.`,
  },
  pt2: {
    date: '2025. 8. 30',
    title: '나그네로 왔다 갑니다',
    author: '나그네 무나민',
    body: `나그네방에서 나그네로써의 삶을 회고하고자 이 글을 써봅니다. 저는 작년 8월에 졸업을 하고, 원하는 진로를 더 준비하고 자립하고자 본가에서 나오게 되었습니다. 집에 충분히 작업할 공간이 없던 것도 사실이지만, 졸업한 후에 스스로 삶을 지탱하는 연습을 해보고 싶었던 것 같아요. 하지만 현실적으로 방을 구해서 살기는 어렵고, 취업을 준비하기 위해 기술을 쌓으려는 학원은 멀고, 본가에는 혼자서 온전히 쓸 수 있는 공간이 없어서 어찌 할까 고민하던 때에 '나그네방'을 떠올리게 되었어요.

저는 나그네방을 사람들에게 소개하던 사람이었어요. 사람들이 살아가는 것에 관심이 많은 터라, 졸업 논문도 주거 관련해서 쓰고 했는데 어느 날 나그네방을 운영하는 운영자님과 만날 기회가 있었거든요. 이후 누군가 방이 필요하다고 하면, '나그네방이라는 곳이 있어'하고 소개해주곤 했지요. 그치만 제가 나그네로써 문을 두드려본 적은 없었기에, 학원 개강 시기에 맞추어 연락을 남기게 되었어요. 마침 나그네방도 시즌3을 마치고 새로운 곳에서 시즌4를 준비하고 있던 터라, 시기가 맞아 2024년 10월 말, 성북동 나그네방에서 생활할 수 있게 되었습니다.

1. 나그네방에서의 생활

성북동 나그네방은 4호선 한성대입구역에서 마을 버스를 타고 5분 되는 거리에 있습니다. 동네에는 아기자기한 소품샵과 밀곳간이라는 맛있는 빵집이 있지요. 처음 나그네방을 보러왔던 날, 서울에 이런 동네가 있어? 하고 놀랐던 기억이 납니다. 경복궁 거리 같으면서도 사람 냄새가 나는 동네랄까요. 나그네방은 한양도성도 가까이 위치해서 산책하기 좋고, 언덕 밑이어서 힘들게 오르내리는 일도 없었어요.

나그네방에는 운영자 하영님을 포함해 총 3명의 나그네가 살고 있어요. 셋은 참 좋은 숫자 같아요. 하나보단 둘이 낫고, 둘보단 셋이 낫더라고요. 덕분에 사람의 온기가 가득한 나그네방에서 첫 독립(?) 생활을 보낼 수 있었어요. 저는 당시 파트타임 알바로 생활했던 무직이었어서 책임비 10만원을 내며 지냈습니다. 이마저도 벅찰 때는 하영님께 말씀드려, 다른 방법으로 나그네방을 돕기로 했어요. 저는 나그네방 로고와 웹사이트를 디자인 했습니다. ^__^ vV

2. 가장 기억에 남는 일

처음 하영님이 성북동을 소개시켜주며 산책했던 날이 기억에 남아요. 아침부터 밀곳간에 들러 그 날 먹고 싶은 빵을 사서 한양도성을 산책했던 날이요. 나그네방에 입주한 지 얼마 안 된 시기인데, 아침부터 나와 시간을 보낼 수 있는 누군가가 집에 있다는 것, 빵순이로써 밀곳간이라는 빵집이 집 바로 근처에 있고 햇살이 많은 날 너무 아름다운 동네에 살게 되었다는 것 등등 기대감으로 벅차오르던 시간이었던 것 같아요.

셋이 어느 날 다같이 모여 저녁 먹고, <오만과 편견> 영화를 본 날도 기억에 남아요. 셋이서 수다 떨고, 정말 잘 만들어진 영화를 보고 또 수다 떨고, 아 이런 소소한 날들이 너무 그리울 거 같아요. 셋이서 한 식탁에 앉아서 삶을 나누었던 모든 날들이 사실 좋았어요. 좋은 일, 재밌는 일뿐만 아니라 힘들었던 일들까지도 술술 털어놓을 수 있었어요.

3. 장점과 단점

나그네방에 사는 장점은, 말그대로 진짜 자립을 준비할 수 있다는 것이에요. 빨래, 요리, 집 정리 등 살면서 당연히 해야 되는 것들을 당연스레 할 수 있어서 좋았어요. 온전한 내 방이 있다는 것도 참 좋았어요. 부담되지 않는 정도의 월세 지출에 따스한 동네 성북동에서 살 수 있다는 것, 내가 외롭거나 힘들 때 집에 사람이 있다는 것. 바로 부모님 그늘에서 벗어나 혼자 삶을 지탱해야 하는 게 아니라, 천천히 내 삶을 어떻게 꾸려나갈지 준비할 수 있던 시간을 가질 수 있다는 게 엄청난 장점이 아닐까요.

단점은 ,,, 혼자만 사는 게 아니니까 불편할 수 있다는 점? 그래도 항상 누군가와 방을 공유해왔던 저에게는 딱히 단점은 없었던 것 같아요.

4. 나에게 나그네방은?

졸업 이후 인생에서 새로운 시기를 앞두고 준비하고 있던 시기에 나그네방에서 살 수 있었는데요. 변화 많고 아무것도 없고 불안정했던 날들에 나그네방이 있어서, 이 시기에만 느낄 수 있는 감정들을 온전히 누릴 수 있었던 것 같아요.

잠시 머물렀다 가지만, 참 정이 많이 들었어요. 그리울 거에요 — 나그네방과 같이 살았던 나그네들, 그리고 나그네방에 왔던 손님들과 친구들과 함께 했던 시간들 모두.

성북동은 눈 여겨 보고 있다가 기회가 되고 시기가 맞으면, 다시 오고싶어요 히히 따스한 동네 💛`,
  },
  pt1: {
    date: '2026. 2. 25',
    title: '갈대상자',
    author: '나그네 어머니',
    body: `사춘기를 보내고 고등학교 3년
예민함은 점점 더해졌고
대학 합격을 하고나서는 정점을 찍었어요
아무것도 해주지 못하는 부모에 원망이였을까요
많은 동생들틈에 자기를 봐달라는 외침이였을까요
그 아이를 품어내지 못하는 나의 문제 였을꺼예요

서울 학교앞 반지하  누울곳도 없다던 몇곳을
보고와서 쏟아놓던 그날
우린 긴 대화를 했어요
그 아이의 표정이 바뀌던 순간을 잊을수가 없네요

그리고 그 다음날 아침 하영님에게
우리 아이를 품고싶다는 연락을 받았어요
모든것이 감사였어요
어찌나 순서가 정확한지 몰라요
마음에 응어리가 풀리고
거할곳이 해결되고 재정까지 해결해 주셨어요

그리고 드디어 이동
하영님의 마음이 담긴글과 함께
나그네방에 도착했어요

VAB 프로젝트할때 우리 서로 모르던 그때
우물가 엄마인 저를 페르소나로 잡았다고 하셨는데
너무나 그렇게 되었어요

따듯하게 잘 잤다고 연락이 왔어요
자립이라는 말이 더 맞을꺼예요
자립하기에 더 겁이 났었겠죠

너무나 따듯하고 안전한 갈대상자에
저는 세상이라는 강에 아이를 보내요
기도할 뿐이죠

감사합니다
품어주셔서
기도하겠습니다`,
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
