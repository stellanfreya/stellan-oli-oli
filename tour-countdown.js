(() => {
  const events = Array.from(document.querySelectorAll('#events .event-row'));
  const monthNumbers = {
    JAN: 0, FEB: 1, MAR: 2, APR: 3, MAY: 4, JUN: 5,
    JUL: 6, AUG: 7, SEP: 8, OCT: 9, NOV: 10, DEC: 11
  };
  const upcoming = events.map((event) => {
    const dateText = event.querySelector('.event-date')?.innerText
      || event.querySelector('.event-date')?.textContent
      || '';
    const match = dateText.match(/([A-Z]{3})\s*(\d{1,2})\s*[·,]\s*(\d{4})/i);
    if (!match || monthNumbers[match[1].toUpperCase()] === undefined) return null;
    const [, month, day, year] = match;
    const date = new Date(Number(year), monthNumbers[month.toUpperCase()], Number(day));
    if (Number.isNaN(date.getTime())) return null;
    return { event, date };
  }).filter((item) => item && item.date >= new Date(new Date().setHours(0, 0, 0, 0)))
    .sort((a, b) => a.date - b.date)[0];

  const eventList = document.querySelector('#events .event-list');
  if (!eventList) return;

  const panel = document.createElement('section');
  panel.className = 'tour-countdown';
  panel.setAttribute('aria-label', 'Countdown to the next listed tour date');
  panel.innerHTML = `
    <div class="tour-countdown-copy">
      <span class="label">the next sing-along</span>
      <h3 class="tour-countdown-title"></h3>
      <p class="tour-countdown-location"></p>
    </div>
    <div class="tour-countdown-clock" role="timer" aria-live="off"></div>`;
  eventList.before(panel);

  const title = panel.querySelector('.tour-countdown-title');
  const location = panel.querySelector('.tour-countdown-location');
  const clock = panel.querySelector('.tour-countdown-clock');
  if (!upcoming) {
    title.textContent = 'No upcoming dates listed';
    location.textContent = 'Check back when new shows are announced.';
    clock.remove();
    return;
  }

  const city = upcoming.event.querySelector('.event-city')?.textContent.trim() || 'The next show';
  const venue = upcoming.event.querySelector('.event-venue')?.textContent.trim() || '';
  title.textContent = city;
  location.textContent = `${venue}${venue ? ' · ' : ''}${upcoming.date.toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}`;
  const units = ['days', 'hours', 'minutes', 'seconds'];
  const values = units.map((unit) => {
    const item = document.createElement('div');
    item.className = 'tour-countdown-unit';
    const number = document.createElement('strong');
    number.textContent = '00';
    const label = document.createElement('span');
    label.textContent = unit;
    item.append(number, label);
    clock.append(item);
    return number;
  });

  const update = () => {
    const remaining = Math.max(0, upcoming.date.getTime() - Date.now());
    const seconds = Math.floor(remaining / 1000);
    const parts = [
      Math.floor(seconds / 86400),
      Math.floor((seconds % 86400) / 3600),
      Math.floor((seconds % 3600) / 60),
      seconds % 60
    ];
    values.forEach((value, index) => {
      value.textContent = String(parts[index]).padStart(2, '0');
    });
    if (remaining === 0) {
      title.textContent = `Show day, ${city}!`;
      clearInterval(timer);
    }
  };

  let timer;
  update();
  timer = setInterval(update, 1000);
})();
