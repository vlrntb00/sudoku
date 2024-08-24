function handleEntryClick(event) {
  for (let e of Array.from(document.getElementsByClassName('highlighted'))) {
    e.classList.remove('highlighted');
  }
  this.classList.toggle('highlighted');
}

function handleCentryClick(event) {
  let target = document.getElementsByClassName('highlighted')[0];
  if (!target) return;
  window[`c${target.id}`].innerText = this.innerText;
  window[`c${target.id}`].classList.remove('hidden');
  window[`s${target.id}`].classList.add('hidden');
  let h = document.getElementsByClassName('highlighteddigit')[0];
  if (h && h.innerText === this.innerText) {
    window[`c${target.id}`].classList.add('highlighteddigit');
  } else {
    window[`c${target.id}`].classList.remove('highlighteddigit');
  }
}

function handleSentryClick(event) {
  let target = document.getElementsByClassName('highlighted')[0];
  if (!target) return;
  if (this.innerText === 'V') {
    if (window[`c${target.id}`].classList.contains('hidden')) {
      window[`s${target.id}`].classList.toggle('hidden');
    }
  } else {
    window[`s${target.id}`].children[this.innerText - 1].classList.add('hidden');
  }
}

function handleDigitClick(event) {
  for (let i = 0; i < 81; i++) {
    if (window[`centry${i}`].innerText === this.innerText) {
      window[`centry${i}`].classList.add('highlighteddigit');
    } else {
      window[`centry${i}`].classList.remove('highlighteddigit');
    }
    for (let k = 0; k < 9; k++) {
      if (window[`sentry${i}d${k}`].innerText === this.innerText) {
        window[`sentry${i}d${k}`].classList.add('highlighteddigit');
      } else {
        window[`sentry${i}d${k}`].classList.remove('highlighteddigit');
      }
    }
  }
}

for (let i = 0; i < 81; i++) {
  let entry = document.createElement('div');
  entry.id = `entry${i}`;
  entry.classList.add('entry');
  if (i % 9 === 0) entry.classList.add('newline');
  if (i % 9 === 2 || i % 9 === 5) entry.classList.add('rightborder');
  if (Math.floor(i / 9) === 2 || Math.floor(i / 9) === 5) entry.classList.add('bottomborder');
  if (i % 9 === 0) entry.classList.add('noleftborder');
  if (i % 9 === 8) entry.classList.add('norightborder');
  if (Math.floor(i / 9) === 0) entry.classList.add('notopborder');
  if (Math.floor(i / 9) === 8) entry.classList.add('nobottomborder');
  window.entries.appendChild(entry);
  entry.addEventListener('click', handleEntryClick.bind(entry));

  let centry = document.createElement('div');
  centry.id = `centry${i}`;
  centry.classList.add('centry');
  centry.classList.add('hidden');
  centry.innerText = '0';
  entry.appendChild(centry);

  let sentry = document.createElement('div');
  sentry.id = `sentry${i}`;
  sentry.classList.add('sentry');
  sentry.classList.add('hidden');
  entry.appendChild(sentry);

  for (let k = 0; k < 9; k++) {
    let sentryd = document.createElement('div');
    sentryd.id = `sentry${i}d${k}`;
    sentryd.classList.add('sentryd');
    if (k % 3 === 0) sentryd.classList.add('newline');
    sentryd.innerText = k + 1;
    sentry.appendChild(sentryd);
  }
}

for (let i = 1; i <= 9; i++) {
  let child = document.createElement('div');
  child.innerText = i;
  child.addEventListener('click', handleSentryClick.bind(child));
  window.selsentry.appendChild(child);
  child = document.createElement('div');
  child.innerText = i;
  child.addEventListener('click', handleCentryClick.bind(child));
  window.selcentry.appendChild(child);
  child = document.createElement('div');
  child.innerText = i;
  child.addEventListener('click', handleDigitClick.bind(child));
  window.seldigits.appendChild(child);
}

let child = document.createElement('div');
child.innerText = 'V';
child.addEventListener('click', handleSentryClick.bind(child));
window.selsentry.appendChild(child);

child = document.createElement('div');
child.innerText = 'C';
child.addEventListener('click', handleDigitClick.bind(child));
window.seldigits.appendChild(child);

