function handleEntryClick(event) {
  for (let e of Array.from(document.getElementsByClassName('highlighted-entry'))) {
    e.classList.remove('highlighted-entry');
  }
  this.parentElement.classList.add('highlighted-entry');
  event.preventDefault();
  return false;
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
  centry.innerText = '0';
  entry.appendChild(centry);

  let sentries = document.createElement('div');
  sentries.id = `sentries${i}`;
  sentries.classList.add('sentries');
  entry.appendChild(sentries);

  for (let k = 0; k < 9; k++) {
    let sentry = document.createElement('div');
    sentry.id = `sentry${k}`;
    sentry.classList.add('sentry');
    if (k % 3 === 0) sentry.classList.add('newline');
    sentry.innerText = k + 1;
    sentries.appendChild(sentry);
  }
}


