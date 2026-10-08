/* =========================================================
   PROJECT CARD LINKS

   To update a project:
   1. Replace its url with the project page or repository.
   2. Set enabled to true or false.
   3. Use newTab: false for pages on this website.
   ========================================================= */

const projectLinks = {
  'digital-logic': {
    enabled: true,
    url: 'https://github.com/Jacob-Potts',
    newTab: true
  },
  'computer-organization': {
    enabled: true,
    url: 'https://github.com/Jacob-Potts',
    newTab: true
  },
  'cad-design': {
    enabled: true,
    url: 'https://github.com/Jacob-Potts',
    newTab: true
  }
};

document.querySelectorAll('.project-card[data-project]').forEach((card) => {
  const settings = projectLinks[card.dataset.project];

  if (!settings?.enabled || !settings.url) {
    return;
  }

  const link = document.createElement('a');
  link.className = 'project-card-link';
  link.href = settings.url;
  link.setAttribute(
    'aria-label',
    `View project: ${card.querySelector('h3')?.textContent.trim() || 'project'}`
  );

  if (settings.newTab) {
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
  }

  while (card.firstChild) {
    link.appendChild(card.firstChild);
  }

  card.appendChild(link);
  card.classList.add('project-card-enabled');
});


/* =========================================================
   PIN DIAGRAM

   Each pin is one skill. Edit names/descriptions here.
   Pins 1–8 run down the left side, 9–16 up the right
   side, the same way a real DIP package is numbered.
   ========================================================= */

const pins = [
  ['C', 'Low-level language for embedded and systems work.'],
  ['C++', 'Object-oriented programming, from CSUF coursework onward.'],
  ['PY', 'Python for scripting, automation, and test tooling.'],
  ['BASH', 'Shell scripting and getting around Linux systems.'],
  ['VHDL', 'Combinational and sequential logic, simulated in Questa.'],
  ['MATLAB', 'Modeling and simulation of signals and systems.'],
  ['QML', 'Qt Quick markup for building user interfaces.'],
  ['GND', 'Common reference: Corona, California.'],
  ['GPIO', 'GPIO data exposed through an embedded Linux HAL at RAVE Aerospace.'],
  ['EEPROM', 'Non-volatile storage on embedded hardware.'],
  ['USB-C', 'Test software that detects USB-C power configurations and flags insufficient power.'],
  ['NET', 'Bidirectional iPerf validation and switch configuration on a production burn-in rack.'],
  ['LINUX', 'Embedded Linux HAL: device ID, hardware revisions, temperatures, voltages, watchdog status.'],
  ['GIT', 'Version control with Git, GitHub, SVN, and Bitbucket.'],
  ['QT', 'Qt framework for desktop and test-station GUIs.'],
  ['VCC', 'Power supply. Fed by the CSUF blended B.S./M.S. program through May 2028.']
];

const chip = document.getElementById('chip');

if (chip) {
  const svgNS = 'http://www.w3.org/2000/svg';
  const make = (tag, attrs, parent) => {
    const el = document.createElementNS(svgNS, tag);
    Object.entries(attrs).forEach(([key, value]) => el.setAttribute(key, value));
    parent?.appendChild(el);
    return el;
  };

  const W = 460;
  const H = 380;
  const bodyX = 150;
  const bodyW = 160;
  const bodyY = 14;
  const bodyH = 352;
  const pitch = 41;
  const firstY = bodyY + 32;

  const svg = make('svg', {
    viewBox: `0 0 ${W} ${H}`,
    'aria-hidden': 'false'
  }, chip);

  make('rect', { class: 'body', x: bodyX, y: bodyY, width: bodyW, height: bodyH, rx: 4 }, svg);
  make('path', {
    class: 'notch',
    d: `M ${bodyX + bodyW / 2 - 16} ${bodyY} a 16 16 0 0 0 32 0 z`
  }, svg);
  make('circle', { class: 'dot', cx: bodyX + 18, cy: bodyY + 18, r: 5 }, svg);

  const g = make('g', { transform: `translate(${bodyX + bodyW / 2} ${bodyY + bodyH / 2}) rotate(-90)` }, svg);
  make('text', { class: 'marking marking-main', x: 0, y: -4 }, g).textContent = 'JP-2028';
  make('text', { class: 'marking marking-sub', x: 0, y: 16 }, g).textContent = 'CSUF · CPE · REV 26';

  const readNum = document.getElementById('pin-num');
  const readName = document.getElementById('pin-name');
  const readDesc = document.getElementById('pin-desc');
  const pinEls = [];

  const select = (index) => {
    const [name, desc] = pins[index];
    readNum.textContent = index + 1;
    readName.textContent = name;
    readDesc.textContent = desc;
    pinEls.forEach((el, i) => el.classList.toggle('is-active', i === index));
  };

  pins.forEach(([name], i) => {
    const left = i < 8;
    const row = left ? i : 15 - i;
    const y = firstY + row * pitch;
    const legX = left ? bodyX - 26 : bodyX + bodyW;

    const pin = make('g', {
      class: 'pin',
      tabindex: 0,
      role: 'button',
      'aria-label': `Pin ${i + 1}, ${name}`
    }, svg);

    make('rect', {
      class: 'pin-hit',
      x: left ? 0 : bodyX + bodyW,
      y: y - pitch / 2,
      width: bodyX,
      height: pitch
    }, pin);

    make('rect', { class: 'pin-leg', x: legX, y: y - 6, width: 26, height: 12, rx: 1 }, pin);

    make('text', {
      class: 'pin-num',
      x: left ? bodyX + 10 : bodyX + bodyW - 10,
      y: y + 4,
      'text-anchor': left ? 'start' : 'end'
    }, pin).textContent = i + 1;

    make('text', {
      class: 'pin-name',
      x: left ? legX - 10 : legX + 36,
      y: y + 4.5,
      'text-anchor': left ? 'end' : 'start'
    }, pin).textContent = name;

    pin.addEventListener('pointerenter', () => select(i));
    pin.addEventListener('focus', () => select(i));
    pin.addEventListener('click', () => select(i));
    pin.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        select(i);
      }
    });

    pinEls.push(pin);
  });

  select(15);
}


/* =========================================================
   PROGRAM PROGRESS (Aug 2024 → May 2028)
   ========================================================= */

const progressFill = document.getElementById('progress-fill');
const progressPct = document.getElementById('progress-pct');

if (progressFill && progressPct) {
  const start = new Date(2024, 7, 19).getTime();
  const end = new Date(2028, 4, 20).getTime();
  const pct = Math.min(100, Math.max(0, ((Date.now() - start) / (end - start)) * 100));
  const rounded = Math.round(pct);

  progressPct.textContent = rounded >= 100 ? 'Complete' : `${rounded}% complete`;

  requestAnimationFrame(() => {
    progressFill.style.width = `${pct}%`;
  });
}


/* =========================================================
   THEME TOGGLE
   ========================================================= */

const themeToggle = document.querySelector('.theme-toggle');

if (themeToggle) {
  const root = document.documentElement;
  const isDark = () =>
    root.dataset.theme
      ? root.dataset.theme === 'dark'
      : window.matchMedia('(prefers-color-scheme: dark)').matches;

  const sync = () => themeToggle.setAttribute('aria-pressed', String(isDark()));
  sync();

  themeToggle.addEventListener('click', () => {
    const next = isDark() ? 'light' : 'dark';
    root.dataset.theme = next;
    try {
      localStorage.setItem('theme', next);
    } catch (e) {
      // Storage unavailable; theme still applies for this visit.
    }
    sync();
  });
}


/* =========================================================
   SECTION REVEAL
   ========================================================= */

const revealItems = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.06 }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('visible'));
}


/* =========================================================
   ACTIVE NAVIGATION SECTION
   ========================================================= */

const navLinks = [...document.querySelectorAll('.site-header nav a[href^="#"]')];

const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

if ('IntersectionObserver' in window) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        navLinks.forEach((link) => {
          if (link.getAttribute('href') === `#${entry.target.id}`) {
            link.setAttribute('data-active', 'true');
          } else {
            link.removeAttribute('data-active');
          }
        });
      });
    },
    { rootMargin: '-35% 0px -55% 0px' }
  );

  sections.forEach((section) => sectionObserver.observe(section));
}
