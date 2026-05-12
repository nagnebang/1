// ─── FIREBASE APP ───
if (typeof FIREBASE_CONFIG === 'undefined') {
  console.warn('firebase-config.js 설정이 필요합니다.');
} else {
  if (!firebase.apps.length) firebase.initializeApp(FIREBASE_CONFIG);

  const db   = firebase.firestore();
  const auth = firebase.auth();
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  googleProvider.setCustomParameters({ prompt: 'select_account' });

  // ─── 유틸 ───
  function esc(str) {
    return String(str)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  function fmtDate(d) {
    return `${d.getFullYear()}. ${d.getMonth() + 1}. ${d.getDate()}`;
  }
  function fbShowToast(msg) {
    const t = document.getElementById('toast');
    if (!t) return;
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 3500);
  }

  // 에세이는 정적 HTML로만 관리 — Firestore 불러오기 없음

  window.openEssay = function (id) {
    const e = undefined;
    if (!e) return;
    const modal   = document.getElementById('essayModal');
    const content = document.getElementById('essayContent');
    content.innerHTML = `
      <p class="em-date">${esc(e.date || '')}</p>
      <h2>${esc(e.title || '')}</h2>
      <div class="em-body">${(e.body || '').split('\n\n').map(p =>
        `<p>${esc(p).replace(/\n/g, '<br />')}</p>`
      ).join('')}</div>
      <p class="em-author">— ${esc(e.author || '')}</p>`;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    modal.querySelector('.modal-box').scrollTop = 0;
  };

  // ═══════════════════════════════
  //  갤러리
  // ═══════════════════════════════
  db.collection('gallery').orderBy('order').onSnapshot(snap => {
    const grid = document.getElementById('galleryGrid');
    if (!grid) return;
    if (snap.empty) return; // 로컬 기본 이미지 유지
    grid.innerHTML = snap.docs.map(doc => {
      const d = doc.data();
      const sz = d.size === 'tall' ? ' g-tall' : d.size === 'wide' ? ' g-wide' : '';
      return `<div class="g-item${sz}" data-docid="${doc.id}">
        <img src="${esc(d.imageUrl || '')}" alt="${esc(d.alt || '')}" loading="lazy" />
        <div class="g-caption">${esc(d.caption || '')}</div>
      </div>`;
    }).join('');
    if (typeof window.rebuildLightbox === 'function') window.rebuildLightbox();
  }, err => console.log('Gallery:', err.message));

  // ═══════════════════════════════
  //  방명록 (Guestbook)
  // ═══════════════════════════════
  let currentUser = null;

  const userArea    = document.getElementById('gbUserArea');
  const userPhoto   = document.getElementById('gbUserPhoto');
  const userName    = document.getElementById('gbUserName');
  const logoutBtn   = document.getElementById('gbLogoutBtn');
  const gbForm      = document.getElementById('gbForm');
  const gbText      = document.getElementById('gbText');
  const gbCharCount = document.getElementById('gbCharCount');
  const gbMessages  = document.getElementById('gbMessages');
  const gbPending   = document.getElementById('gbPending');
  const gbSubmitBtn = gbForm ? gbForm.querySelector('button[type=submit]') : null;

  auth.onAuthStateChanged(user => {
    currentUser = user;
    if (user) {
      if (userArea) userArea.style.display = 'flex';
      if (userPhoto) { userPhoto.src = user.photoURL || ''; userPhoto.style.display = user.photoURL ? 'block' : 'none'; }
      if (userName) userName.textContent = user.displayName || user.email;
      if (gbForm) gbForm.style.display = 'block';
      checkPending(user.uid);
    } else {
      if (userArea) userArea.style.display = 'none';
      if (gbForm) gbForm.style.display = 'none';
      if (gbPending) gbPending.style.display = 'none';
    }
  });

  if (logoutBtn) logoutBtn.addEventListener('click', () => auth.signOut());

  window.openMessageForm = function () {
    const targetEl = document.getElementById('gb-form-area');
    if (currentUser) {
      if (targetEl) targetEl.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => { if (gbText) gbText.focus(); }, 600);
      return;
    }
    auth.signInWithPopup(googleProvider)
      .then(() => {
        if (targetEl) targetEl.scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => { if (gbText) gbText.focus(); }, 800);
      })
      .catch(err => {
        if (err.code === 'auth/popup-blocked') {
          auth.signInWithRedirect(googleProvider);
        } else {
          fbShowToast('로그인에 실패했습니다. (' + (err.code || '오류') + ')');
        }
      });
  };

  if (gbText) gbText.addEventListener('input', () => {
    gbCharCount.textContent = `${gbText.value.length} / 300`;
  });

  if (gbForm) gbForm.addEventListener('submit', async e => {
    e.preventDefault();
    const msg = gbText.value.trim();
    if (!msg || !currentUser) return;
    gbSubmitBtn.disabled = true;
    try {
      await db.collection('messages').add({
        uid: currentUser.uid, name: currentUser.displayName || '익명',
        email: currentUser.email, photoURL: currentUser.photoURL || '',
        message: msg, createdAt: firebase.firestore.FieldValue.serverTimestamp(), approved: false,
      });
      gbText.value = '';
      gbCharCount.textContent = '0 / 300';
      fbShowToast('메시지가 등록되었습니다. 운영자 검토 후 공개됩니다 💛');
      checkPending(currentUser.uid);
    } catch (err) {
      fbShowToast('오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
    }
    gbSubmitBtn.disabled = false;
  });

  async function checkPending(uid) {
    try {
      const snap = await db.collection('messages').where('uid','==',uid).where('approved','==',false).limit(1).get();
      if (gbPending) gbPending.style.display = snap.empty ? 'none' : 'block';
    } catch (_) {}
  }

  if (gbMessages) {
    db.collection('messages').where('approved','==',true).orderBy('createdAt','desc').limit(50)
      .onSnapshot(snap => {
        if (snap.empty) {
          gbMessages.innerHTML = '<p class="gb-empty">아직 등록된 응원 메시지가 없어요.<br />첫 번째 응원의 글을 남겨주세요!</p>';
          return;
        }
        gbMessages.innerHTML = snap.docs.map(doc => {
          const d = doc.data();
          const date = d.createdAt ? fmtDate(d.createdAt.toDate()) : '';
          const avatar = d.photoURL
            ? `<img class="gb-avatar" src="${esc(d.photoURL)}" alt="${esc(d.name)}" />`
            : `<div class="gb-avatar-ph">${esc(d.name)[0] || '?'}</div>`;
          return `<div class="gb-msg">${avatar}
            <div class="gb-msg-body">
              <div class="gb-msg-header"><strong>${esc(d.name)}</strong><span class="gb-msg-date">${date}</span></div>
              <p>${esc(d.message).replace(/\n/g,'<br />')}</p>
            </div></div>`;
        }).join('');
      }, err => {
        if (gbMessages) gbMessages.innerHTML = '<p class="gb-empty">메시지를 불러오지 못했습니다.</p>';
      });
  }
}
