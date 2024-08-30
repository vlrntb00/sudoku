let puzzle = '600050007030000000080409200015300000008000300000007590009501030000000080200070004';
puzzle = '100800570000009210090040000300900050007000300020006008000020040071400000064007003';
function solve(state, i=0) {
  if (i === 81) {
    return state;
  }
  if (state[i] !== '0') {
    return solve(state, i + 1);
  }
  attempt: for (let vi = 1; vi <= 9; vi++) {
    let v = `${vi}`;
    for (let c = i % 9; c < 81; c += 9) {
      if (state[c] === v) {
        continue attempt;
      }
    }
    let rl = 9 * Math.floor(i / 9);
    let rh = rl + 9;
    for (let r = rl; r < rh; r++) {
      if (state[r] === v) {
        continue attempt;
      }
    }
    let gr = 3 * Math.floor(Math.floor(i / 9) / 3);
    let gc = 3 * Math.floor((i % 9) / 3);
    for (let gi = 0; gi < 3; gi++) {
      for (let gj = 0; gj < 3; gj++) {
        if (state[9 * (gr + gi) + (gc + gj)] === v) {
          continue attempt;
        }
      }
    }
    state[i] = v;
    if (solve(state, i + 1)) {
      return state;
    }
    state[i] = '0';
  }
}

let solution = solve(puzzle.split(''));

function handleEntryClick(event) {
  for (let e of Array.from(document.getElementsByClassName('highlighted'))) {
    e.classList.remove('highlighted');
  }
  this.classList.toggle('highlighted');
  event.preventDefault();
  return false;
}

function handleCentryClick(event) {
  let target = document.getElementsByClassName('highlighted')[0];
  if (!target) {
    event.preventDefault();
    return false;
  }
  if (this.innerText !== solution[target.id.replace('entry', '')]) {
    alert('incorrect action prevented');
    event.preventDefault();
    return false;
  }
  window[`c${target.id}`].innerText = this.innerText;
  window[`c${target.id}`].classList.remove('hidden');
  window[`s${target.id}`].classList.add('hidden');
  let h = document.getElementsByClassName('highlighteddigit')[0];
  if (h && h.innerText === this.innerText) {
    window[`c${target.id}`].classList.add('highlighteddigit');
  } else {
    window[`c${target.id}`].classList.remove('highlighteddigit');
  }
  event.preventDefault();
  return false;
}

function handleSentryClick(event) {
  let target = document.getElementsByClassName('highlighted')[0];
  if (!target) {
    event.preventDefault();
    return false;
  }
  if (this.innerText === solution[target.id.replace('entry', '')]) {
    alert('incorrect action prevented');
    event.preventDefault();
    return false;
  }
  window[`s${target.id}`].children[this.innerText - 1].classList.add('hidden');
  event.preventDefault();
  return false;
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
  if (i % 9 === 0) entry.classList.add('noleftborder');
  if (i % 9 === 8) entry.classList.add('norightborder');
  if (Math.floor(i / 9) === 0) entry.classList.add('notopborder');
  if (Math.floor(i / 9) === 8) entry.classList.add('nobottomborder');
  window.entries.appendChild(entry);
  entry.addEventListener('touchstart', handleEntryClick.bind(entry));

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

puzzle.split('').forEach((c, i) => {
  if (c === '0') return;
  window[`centry${i}`].innerText = c;
  window[`centry${i}`].classList.remove('hidden');
  window[`centry${i}`].classList.add('fixed');
})

function handleClick(event) {
  if (this.classList.contains('inputhighlight')) handleDigitClick.call(this, event);
  else if (this.classList.contains('inputfinalized')) handleCentryClick.call(this, event);
  else if (this.classList.contains('inputspeculate')) handleSentryClick.call(this, event);
  event.preventDefault();
  return false;
}

for (let i = 1; i <= 9; i++) {
  let child = document.createElement('div');
  child.innerText = i;
  child.classList.add('inputdigit');
  child.classList.add('inputhighlight');
  child.addEventListener('touchstart', handleClick.bind(child));
  inputs.appendChild(child);
}

function selectInputHighlight(event) {
  for (let e of Array.from(document.getElementsByClassName('inputdigit'))) {
    e.classList.remove('inputspeculate');
    e.classList.remove('inputfinalized');
    e.classList.add('inputhighlight');
  }
  handleDigitClick.call({}, event);
}
inputhighlight.addEventListener('touchstart', selectInputHighlight);

function selectInputFinalized(event) {
  for (let e of Array.from(document.getElementsByClassName('inputdigit'))) {
    e.classList.remove('inputspeculate');
    e.classList.remove('inputhighlight');
    e.classList.add('inputfinalized');
  }
}
inputfinalized.addEventListener('touchstart', selectInputFinalized);

function selectInputSpeculate(event) {
  for (let e of Array.from(document.getElementsByClassName('inputdigit'))) {
    e.classList.remove('inputfinalized');
    e.classList.remove('inputhighlight');
    e.classList.add('inputspeculate');
  }
  let target = document.getElementsByClassName('highlighted')[0];
  if (!target) {
    event.preventDefault();
    return false;
  }
  window[`s${target.id}`].classList.toggle('hidden');
}
inputspeculate.addEventListener('touchstart', selectInputSpeculate);

document.body.addEventListener('touchstart', function (event) {
  event.preventDefault();
  return false;
});
