for (let i = 0; i < 9; i++) {
  window.board.appendChild(document.createElement('tr'));
  for (let j = 0; j < 9; j++) {
    window.board.children[i].appendChild(document.createElement('td'));
    window.board.children[i].children[j].appendChild(document.createElement('table'));
    let entries = document.createElement('tbody');
    entries.id = `board${i}${j}`;
    entries.classList.add('entries');
    window.board.children[i].children[j].children[0].appendChild(entries);
    let committedEntry = document.createElement('div');
    committedEntry.id = `centry${i}${j}`;
    entries.appendChild(committedEntry);
    committedEntry.innerText = '0';
    for (let k = 1; k < 4; k++) {
      entries.appendChild(document.createElement('tr'));
      for (let l = 0; l < 3; l++) {
        let speculativeEntry = document.createElement('td');
        speculativeEntry.id = `sentry${i}${j}${k * 3 + l + 1}`;
        entries.children[k].appendChild(speculativeEntry);
        entries.children[k].children[l].innerText = k * 3 + l + 1;
      }
    }
  }
}


