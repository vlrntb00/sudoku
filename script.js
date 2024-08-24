function handleEntryClick(event) {
  for (let e of Array.from(document.getElementsByClassName('highlighted'))) {
    e.classList.remove('highlighted');
  }
  this.classList.add('highlighted');
}

function handleCentryClick(event) {
  let target = document.getElementsByClassName('highlighted')[0];
  if (!target) return;
  window[`c${target.id}`].innerText = this.innerText;
  window[`c${target.id}`].classList.remove('hidden');
  window[`s${target.id}`].classList.add('hidden');
}

function handleSentryClick(event) {
  let target = document.getElementsByClassName('highlighted')[0];
  if (!target) return;
  window[`s${target.id}`].children[this.innerText - 1].classList.add('hidden');
}

for (let i = 0; i < 81; i++) {
  let entry = document.createElement('div');
  entry.id = `entry${i}`;
  entry.classList.add('entry');
  if (i % 9 === 0) entry.classList.add('newline');
  if (i % 9 === 2 || i % 9 === 5) entry.classList.add('rightborder');
  if (Math.floor(i / 9) === 2 || Math.floor(i / 9) === 5) entry.classList.add('bottomborder');
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
  entry.appendChild(sentry);

  for (let k = 0; k < 9; k++) {
    let sentryd = document.createElement('div');
    sentryd.id = `sentryd${k}`;
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
  window.seldigits.appendChild(child);
}

