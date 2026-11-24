(() => {
  const events = document.querySelector('#events');
  if (!events) return;

  const holidays = [
    { name: 'Halloween', month: 9, day: 31, note: 'A little spooky, a lot of sparkle.' },
    { name: 'Christmas', month: 11, day: 25, note: 'The coziest countdown of the year.' },
    { name: 'New Year', month: 0, day: 1, note: 'New year, new memories to soundtrack.' }
  ];
  const section = document.createElement('section');
  section.className = 'section holiday-section';
  section.id = 'holidays';
  section.setAttribute('aria-labelledby', 'holidayTitle');
  section.innerHTML = `
    <div class="section-head">
      <div>
        <div class="label">little moments worth counting down to</div>
        <h2 id="holidayTitle">Save the<br><em>celebration.</em></h2>
      </div>
      <div class="section-note">Local countdowns to<br>your favorite dates.</div>
    </div>
    <div class="holiday-countdowns"></div>`;
  events.after(section);

  const startOfToday = () => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    return date;
  };
  const cards = holidays.map((holiday) => {
    const today = startOfToday();
    let date = new Date(today.getFullYear(), holiday.month, holiday.day);
    if (date < today) date = new Date(today.getFullYear() + 1, holiday.month, holiday.day);

    const card = document.createElement('article');
    card.className = 'holiday-card';
    card.innerHTML = `
      <span class="label">${holiday.name}</span>
      <h3></h3>
      <p>${holiday.note}</p>
      <div class="holiday-clock" role="timer" aria-live="off"></div>`;
    const heading = card.querySelector('h3');
    const clock = card.querySelector('.holiday-clock');
    const units = ['days', 'hours', 'minutes'];
    const values = units.map((unit) => {
      const item = document.createElement('div');
      item.className = 'holiday-unit';
      const number = document.createElement('strong');
      const label = document.createElement('span');
      label.textContent = unit;
      item.append(number, label);
      clock.append(item);
      return number;
    });

    const update = () => {
      const remaining = Math.max(0, date.getTime() - Date.now());
      const totalMinutes = Math.floor(remaining / 60000);
      const parts = [
        Math.floor(totalMinutes / 1440),
        Math.floor((totalMinutes % 1440) / 60),
        totalMinutes % 60
      ];
      values.forEach((value, index) => {
        value.textContent = String(parts[index]).padStart(2, '0');
      });
      heading.textContent = remaining === 0
        ? `It’s ${holiday.name}!`
        : date.toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' });
    };

    update();
    window.setInterval(update, 60000);
    return card;
  });

  section.querySelector('.holiday-countdowns').append(...cards);
})();
