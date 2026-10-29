// 프로젝트 데이터 — 실제 내용으로 교체하세요
const PROJECTS = [
  {
    title: '솔루션 연계 시스템 구축',
    desc: '자사 솔루션을 고객사 시스템과 연계하여 데이터 연동 및 업무 자동화를 구현했습니다.',
    tags: ['Java', 'Linux', 'REST API'],
    color: '#3b82f6',
    link: '#',
  },
  {
    title: '서버 환경 구성 및 배포',
    desc: '리눅스 서버 환경을 구성하고 배포 절차와 운영 스크립트를 정비해 안정성을 높였습니다.',
    tags: ['Linux', 'Shell', 'Deploy'],
    color: '#6366f1',
    link: '#',
  },
  {
    title: '업무 시스템 커스터마이징',
    desc: '고객 요구사항에 맞춰 솔루션 기능을 확장하고 성능을 개선한 프로젝트입니다.',
    tags: ['Java', 'SQL', 'Optimization'],
    color: '#22d3ee',
    link: '#',
  },
];

// 프로젝트 카드 렌더링
const grid = document.getElementById('project-grid');
PROJECTS.forEach((p) => {
  const card = document.createElement('article');
  card.className = 'glass-card project-card reveal';

  const bar = document.createElement('div');
  bar.className = 'top-line';
  bar.style.color = p.color;
  card.style.setProperty('--c', p.color);

  const title = document.createElement('h3');
  title.className = 'text-xl font-bold heading';
  title.textContent = p.title;

  const desc = document.createElement('p');
  desc.className = 'mt-3 text-sm leading-relaxed muted flex-1';
  desc.textContent = p.desc;

  const tags = document.createElement('div');
  tags.className = 'mt-5 flex flex-wrap gap-2';
  p.tags.forEach((t) => {
    const span = document.createElement('span');
    span.className = 'px-3 py-1 rounded-full text-xs font-semibold';
    span.style.color = p.color;
    span.style.background = 'color-mix(in srgb, currentColor 14%, transparent)';
    span.style.border = '1px solid color-mix(in srgb, currentColor 35%, transparent)';
    span.textContent = t;
    tags.appendChild(span);
  });

  const link = document.createElement('a');
  link.href = p.link;
  link.className = 'more mt-6 text-sm font-semibold hover:underline self-start';
  link.style.color = p.color;
  link.textContent = '자세히 보기 →';

  card.append(bar, title, desc, tags, link);
  grid.appendChild(card);
});

// 다크모드 토글
document.getElementById('theme-toggle').addEventListener('click', () => {
  const dark = document.documentElement.classList.toggle('dark');
  try { localStorage.setItem('theme', dark ? 'dark' : 'light'); } catch (e) {}
});

// 모바일 메뉴
const menuBtn = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
menuBtn.addEventListener('click', () => {
  const open = mobileMenu.classList.toggle('hidden') === false;
  menuBtn.setAttribute('aria-expanded', String(open));
});
mobileMenu.querySelectorAll('a').forEach((a) =>
  a.addEventListener('click', () => {
    mobileMenu.classList.add('hidden');
    menuBtn.setAttribute('aria-expanded', 'false');
  })
);

// 스크롤 등장 애니메이션 + 스킬 바
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add('visible');
      e.target.querySelectorAll('.bar').forEach((b) => (b.style.width = b.dataset.level + '%'));
      revealObserver.unobserve(e.target);
    });
  },
  { threshold: 0.15 }
);
document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

// 현재 섹션 네비게이션 표시
const navLinks = document.querySelectorAll('.nav-link');
const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      navLinks.forEach((l) => l.classList.toggle('active', l.dataset.section === e.target.id));
    });
  },
  { rootMargin: '-45% 0px -50% 0px' }
);
document.querySelectorAll('main section[id]').forEach((s) => sectionObserver.observe(s));

document.getElementById('year').textContent = new Date().getFullYear();
