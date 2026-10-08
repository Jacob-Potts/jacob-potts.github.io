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

   Each pin is something real from experience or coursework.
   Edit the entries below to change labels or descriptions:
   [pin label, source, title, description]

   Pins 1–8 run down the left side, 9–16 up the right
   side, the same way a real DIP package is numbered.
   ========================================================= */

const pins = [
  ['USB-C', 'RAVE Aerospace', 'USB-C power detection',
    'Wrote acceptance and production test software that detects how a unit is being powered over USB-C, applies the power requirements for that specific hardware, and alerts the operator when power is insufficient.'],
  ['HAL', 'RAVE Aerospace', 'Embedded Linux HAL',
    'Contributed to the hardware abstraction layer of an embedded Linux system: one consistent interface for test and diagnostic tools to read device identification, hardware revisions, temperatures, and voltages.'],
  ['GPIO', 'RAVE Aerospace', 'GPIO through the HAL',
    'Part of the HAL work: GPIO data available through the same interface used for automated testing and diagnostics.'],
  ['WDT', 'RAVE Aerospace', 'Watchdog status',
    'Part of the HAL work: watchdog status available through the same interface used for automated testing and diagnostics.'],
  ['BT', 'RAVE Aerospace', 'Live Bluetooth status',
    'Added real-time Bluetooth connection status to the qualification-testing GUI, giving operators immediate feedback and a way to troubleshoot connections mid-test.'],
  ['GUI', 'RAVE Aerospace', 'Qualification-testing GUI',
    'Added automatic hardware compatibility detection and responsive 1080p/4K scaling to the qualification-testing GUI.'],
  ['NET', 'RAVE Aerospace', 'Network validation',
    'Validated test-machine networking with bidirectional iPerf testing, and configured the switch on a production burn-in test-equipment rack.'],
  ['RACK', 'RAVE Aerospace', 'Burn-in rack debugging',
    'Diagnosed USB-hub related power shutdowns on a production burn-in rack, identified 7 of 10 cables as faulty, and corrected the cabling to improve reliability.'],
  ['DHCP', 'RAVE Aerospace', 'Boot-state failure fix',
    'Resolved a boot-state failure by tracking which hardware was connected and updating DHCP configuration files, so an outdated configuration was no longer applied after switching devices.'],
  ['HW-ID', 'RAVE Aerospace', 'Automatic hardware identification',
    'Added automatic hardware identification to performance-verification test software.'],
  ['VHDL', 'CSUF · Digital Logic', 'Digital logic design',
    'Designed combinational and sequential logic and simulated the VHDL in Questa.'],
  ['ASM', 'CSUF · Computer Organization', 'Assembly programming',
    'Programmed with registers, memory addressing, and bitwise operations, and analyzed low-level hardware/software behavior.'],
  ['C++', 'CSUF · Object-Oriented Programming', 'C++ and OOP',
    'Object-oriented programming in C++.'],
  ['CKT', 'CSUF · Circuit Analysis', 'Circuits on the bench',
    'Built and tested resistor circuits on breadboards and simulated them in Multisim, measuring with oscilloscopes, multimeters, function generators, and DC power supplies.'],
  ['MATLAB', 'CSUF · Signals & Systems', 'Modeling and simulation',
    'Modeled and simulated signals and systems in MATLAB.'],
  ['CAD', 'CSUF · Engineering Design', 'Mechanical CAD',
    'Designed dimensioned parts and mechanical components in AutoCAD and Fusion 360.']
];

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
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

  const svg = make('svg', { viewBox: `0 0 ${W} ${H}` }, chip);

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
  const readSrc = document.getElementById('pin-src');
  const readTitle = document.getElementById('pin-title');
  const readDesc = document.getElementById('pin-desc');
  const readout = document.querySelector('.pin-readout');
  const pinEls = [];
  let current = 0;

  const select = (index) => {
    const [name, source, title, desc] = pins[index];
    current = index;
    readNum.textContent = index + 1;
    readName.textContent = name;
    readSrc.textContent = source;
    readTitle.textContent = title;
    readDesc.textContent = desc;
    pinEls.forEach((el, i) => el.classList.toggle('is-active', i === index));

    readout.classList.remove('flash');
    void readout.offsetWidth;
    readout.classList.add('flash');
  };

  // Auto-cycle through pins until the visitor interacts.
  let cycleTimer = null;
  const stopCycle = () => {
    clearInterval(cycleTimer);
    cycleTimer = null;
  };
  const startCycle = () => {
    if (reduceMotion || cycleTimer) {
      return;
    }
    cycleTimer = setInterval(() => select((current + 1) % pins.length), 4500);
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
      'aria-label': `Pin ${i + 1}, ${pins[i][2]}`,
      style: `--i: ${row}`
    }, svg);

    make('rect', {
      class: 'pin-hit',
      x: left ? 0 : bodyX + bodyW,
      y: y - pitch / 2,
      width: bodyX,
      height: pitch
    }, pin);

    make('rect', {
      class: `pin-leg ${left ? 'pin-leg-left' : 'pin-leg-right'}`,
      x: legX,
      y: y - 6,
      width: 26,
      height: 12,
      rx: 1
    }, pin);

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

    const choose = () => {
      stopCycle();
      select(i);
    };

    pin.addEventListener('pointerenter', choose);
    pin.addEventListener('focus', choose);
    pin.addEventListener('click', choose);
    pin.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        choose();
      }
    });

    pinEls.push(pin);
  });

  select(0);

  // "Power on" the chip the first time it scrolls into view.
  if ('IntersectionObserver' in window && !reduceMotion) {
    const chipObserver = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        chip.classList.add('powered');
        setTimeout(startCycle, 1800);
        chipObserver.disconnect();
      }
    }, { threshold: 0.35 });
    chipObserver.observe(chip);
  } else {
    chip.classList.add('powered');
  }
}


/* =========================================================
   PROGRAM PROGRESS (Aug 2024 → May 2028)

   Recalculated from today's date every time the page loads.
   ========================================================= */

const progressFill = document.getElementById('progress-fill');
const progressPct = document.getElementById('progress-pct');

if (progressFill && progressPct) {
  const start = new Date(2024, 7, 19).getTime();
  const end = new Date(2028, 4, 20).getTime();
  const pct = Math.min(100, Math.max(0, ((Date.now() - start) / (end - start)) * 100));
  const rounded = Math.round(pct);

  progressPct.textContent = rounded >= 100 ? 'Complete' : `${rounded}% complete`;

  const fill = () => {
    progressFill.style.width = `${pct}%`;
  };

  if ('IntersectionObserver' in window && !reduceMotion) {
    const progressObserver = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        fill();
        progressObserver.disconnect();
      }
    }, { threshold: 0.5 });
    progressObserver.observe(progressFill);
  } else {
    fill();
  }
}


/* =========================================================
   QR CODE DIALOG

   Opens from the header button, the contact section, or
   by visiting jacob-potts.github.io/#qr directly.
   ========================================================= */

const qrDialog = document.getElementById('qr');

if (qrDialog && typeof qrDialog.showModal === 'function') {
  const openQr = () => {
    if (!qrDialog.open) {
      qrDialog.showModal();
    }
  };

  const closeQr = () => {
    qrDialog.close();
  };

  document.querySelectorAll('[data-qr-open]').forEach((trigger) => {
    trigger.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopImmediatePropagation();
      openQr();
    });
  });

  qrDialog.querySelector('[data-qr-close]')?.addEventListener('click', closeQr);

  // Click outside the card closes it.
  qrDialog.addEventListener('click', (event) => {
    if (event.target === qrDialog) {
      closeQr();
    }
  });

  qrDialog.addEventListener('close', () => {
    if (location.hash === '#qr') {
      history.replaceState(null, '', location.pathname + location.search);
    }
  });

  if (location.hash === '#qr') {
    openQr();
  }

  window.addEventListener('hashchange', () => {
    if (location.hash === '#qr') {
      openQr();
    }
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
