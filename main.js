(() => {
  const site = window.SITE, projects = window.PROJECTS;
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  // one version string for every resume link
  document.querySelectorAll('[data-resume]').forEach(a => { a.href = `resume.pdf?v=${site.resumeVersion}`; });
  // resume preview: Download button always downloads; Preview (JS-only) opens the PDF in a dialog
  const rd = document.getElementById('resume-dialog'), rf = document.getElementById('resume-frame');
  const pdf = `resume.pdf?v=${site.resumeVersion}`;
  const pb = document.getElementById('resume-preview-btn');
  pb.hidden = false;
  pb.addEventListener('click', () => { if (!rf.getAttribute('src')) rf.src = pdf + '#view=FitH'; rd.showModal(); });
  document.getElementById('resume-close').addEventListener('click', () => rd.close());
  rd.addEventListener('click', e => { if (e.target === rd) rd.close(); }); // backdrop click

  const u = document.getElementById('updated');
  u.textContent = u.dateTime = site.lastUpdated;

  // projects are tied together by number (01-04), not colour
  const num = i => `<span class="num">${i + 1}</span>`;
  document.getElementById('tiles').innerHTML = projects.map((p, i) =>
    `<a class="tile" href="#view-${esc(p.slug)}" data-slug="${esc(p.slug)}"><small>${num(i)}${esc(p.title)}</small><b>${esc(p.metric.value)}</b><span>${esc(p.metric.label)}</span></a>`).join('');

  // hovering/focusing a tile lifts its card so the link between them is obvious
  document.querySelectorAll('.tile').forEach(t => {
    const card = () => document.getElementById(t.dataset.slug);
    ['pointerenter', 'focus'].forEach(ev => t.addEventListener(ev, () => card().classList.add('peek')));
    ['pointerleave', 'blur'].forEach(ev => t.addEventListener(ev, () => card().classList.remove('peek')));
  });

  document.getElementById('cards').innerHTML = projects.map((p, i) => `
    <article class="card" id="${esc(p.slug)}">
      <h3>${num(i)}<a href="${esc(p.url)}">${esc(p.title)}</a></h3>
      <p class="outcome">${esc(p.outcome)}</p>
      <p>${esc(p.snippet)}</p>
      <ul class="chips">${p.tags.map(t => `<li>${esc(t)}</li>`).join('')}</ul>
    </article>`).join('');

  // project viewer: card click loads the project page in an iframe below the grid.
  // Without JS (or with a modified click) the card is a normal link, so it still redirects.
  const viewer = document.getElementById('viewer'), frame = document.getElementById('viewer-frame');
  // Same-site (deployed): plain src. Cross-origin (e.g. localhost): the browser would hide the
  // frame's clicks from us, so fetch the page (github.io sends CORS *) and use srcdoc + <base>.
  const load = p => {
    frame.removeAttribute('srcdoc');
    if (new URL(p.url).origin === location.origin) { frame.src = p.url; return; }
    fetch(p.url).then(r => r.text()).then(t => {
      if (frame.dataset.slug === p.slug) frame.srcdoc = t.replace(/<head[^>]*>/i, h => `${h}<base href="${p.url}">`);
    }).catch(() => { frame.src = p.url; });
  };
  const show = slug => {
    const p = projects.find(x => x.slug === slug);
    document.querySelectorAll('.card').forEach(c => c.classList.toggle('lift', !!p && c.id === slug));
    if (!p) { viewer.hidden = true; frame.removeAttribute('srcdoc'); frame.removeAttribute('src'); delete frame.dataset.slug; return; }
    if (frame.dataset.slug !== slug) { frame.dataset.slug = slug; load(p); }
    document.getElementById('viewer-title').textContent = p.title;
    document.getElementById('viewer-open').href = p.url;
    viewer.hidden = false;
    viewer.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  };
  // links inside the project frame that leave this site (e.g. to github.com, which refuses
  // framing) get a confirm dialog, then open in the whole window. Needs same-origin frames,
  // which holds on <user>.github.io; cross-origin (e.g. localhost testing) is skipped.
  const dlg = document.getElementById('leave');
  const confirmLeave = a => {
    const mail = a.protocol === 'mailto:';
    const who = mail ? a.pathname : a.hostname;
    document.getElementById('leave-msg').replaceChildren(
      mail ? 'This will open your email app to write to ' : 'This will take you to ',
      Object.assign(document.createElement('strong'), { textContent: who }),
      mail ? '.' : ' and leave this page.');
    document.getElementById('leave-url').textContent = mail ? '' : a.href;
    dlg.returnValue = '';
    dlg.onclose = () => { if (dlg.returnValue === 'go') location.href = a.href; };
    dlg.showModal();
  };
  // contact/social links on this page
  document.querySelectorAll('a[data-confirm]').forEach(a => a.addEventListener('click', e => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button) return;
    e.preventDefault(); confirmLeave(a);
  }));
  frame.addEventListener('load', () => {
    let doc; try { doc = frame.contentDocument; } catch { return; }
    if (!doc) return;
    doc.addEventListener('click', e => {
      const a = e.target.closest && e.target.closest('a[href]');
      if (!a || !/^https?:$/.test(a.protocol) || a.hostname === location.hostname || a.hostname === 't6523.github.io') return;
      e.preventDefault(); confirmLeave(a);
    }, true);
  });
  document.getElementById('cards').addEventListener('click', e => {
    const a = e.target.closest('h3 a');
    if (!a || e.metaKey || e.ctrlKey || e.shiftKey || e.button) return;
    e.preventDefault();
    location.hash = 'view-' + a.closest('.card').id;
  });
  const route = () => show(location.hash.startsWith('#view-') ? location.hash.slice(6) : null);
  addEventListener('hashchange', route);
  route();

  // everything below is motion: skipped for reduced motion or if GSAP failed to load
  if (!window.gsap || matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  // name: letter reveal, then a colour wave (CSS) and a hover jump per letter
  const h1 = document.getElementById('name');
  let n = 0;
  h1.innerHTML = h1.textContent.split(' ').map(w => `<span class="word">${[...w].map(c => `<span class="ch" aria-hidden="true" style="--i:${n++}">${esc(c)}</span>`).join('')}</span>`).join(' ');
  gsap.from(h1.querySelectorAll('.ch'), { opacity: 0, y: 20, duration: .6, stagger: 0.04, ease: 'power2.out' });
  h1.addEventListener('pointerover', e => {
    if (e.target.classList.contains('ch') && !gsap.isTweening(e.target))
      gsap.to(e.target, { y: -10, rotation: gsap.utils.random(-12, 12), duration: .18, yoyo: true, repeat: 1, ease: 'power1.out' });
  });

  // handle: T6523 <-> Tee, scrambled both ways, looping forever
  const el = document.getElementById('handle');
  const glyphs = 'T6523eE#@$%&01';
  const scramble = (from, to) => {
    const s = { p: 0 };
    return gsap.to(s, {
      p: 1, duration: .9, ease: 'none',
      onUpdate() {
        const len = Math.round(from.length + (to.length - from.length) * s.p);
        el.textContent = Array.from({ length: len }, (_, i) =>
          i / len < s.p ? (to[i] ?? '') : glyphs[Math.floor(Math.random() * glyphs.length)]).join('');
      },
      onComplete() { el.textContent = to; }
    });
  };
  el.textContent = 'T6523';
  gsap.timeline({ repeat: -1 })
    .add(scramble('T6523', 'Tee'), '+=2')
    .add(scramble('Tee', 'T6523'), '+=2');
})();
