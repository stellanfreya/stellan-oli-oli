(() => {
  const albums = document.querySelector('#albums');
  if (!albums || document.querySelector('#era-quiz')) return;

  const section = document.createElement('section');
  section.className = 'section era-quiz';
  section.id = 'era-quiz';
  section.innerHTML = `
    <div class="section-head">
      <div>
        <div class="label">a tiny fan personality quiz</div>
        <h2>Which Olivia<br><em>era is yours?</em></h2>
      </div>
      <div class="section-note">Three quick picks.<br>One very-you soundtrack.</div>
    </div>
    <form class="era-quiz-form">
      <fieldset>
        <legend>Your perfect night looks like…</legend>
        <label><input type="radio" name="night" value="SOUR" required> A heart-to-heart and a nostalgic playlist</label>
        <label><input type="radio" name="night" value="GUTS"> Loud music, big energy, no overthinking</label>
        <label><input type="radio" name="night" value="LOVE"> Dressing up and seeing where the night goes</label>
      </fieldset>
      <fieldset>
        <legend>Pick a color for your current mood.</legend>
        <label><input type="radio" name="color" value="SOUR" required> Soft purple</label>
        <label><input type="radio" name="color" value="GUTS"> Electric red</label>
        <label><input type="radio" name="color" value="LOVE"> Rose pink</label>
      </fieldset>
      <fieldset>
        <legend>When life gets messy, you…</legend>
        <label><input type="radio" name="mess" value="SOUR" required> Feel it all and make meaning of it</label>
        <label><input type="radio" name="mess" value="GUTS"> Turn it into confidence and keep moving</label>
        <label><input type="radio" name="mess" value="LOVE"> Follow your heart, even when it’s complicated</label>
      </fieldset>
      <button class="pill" type="submit">find my era ↗</button>
    </form>
    <div class="era-quiz-result" role="status" aria-live="polite" hidden>
      <div class="label">your result</div>
      <h3></h3>
      <p></p>
      <button class="era-quiz-again" type="button">try again ↻</button>
    </div>`;
  albums.after(section);

  const descriptions = {
    SOUR: 'You feel things deeply and turn little moments into something meaningful. Your soundtrack makes room for every feeling.',
    GUTS: 'You bring fearless, electric energy to whatever comes next. Your soundtrack is bold, messy, and completely yours.',
    LOVE: 'You are a romantic with a soft spot for beautiful complications. Your soundtrack always leaves room for a plot twist.'
  };
  const form = section.querySelector('.era-quiz-form');
  const result = section.querySelector('.era-quiz-result');

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    const scores = { SOUR: 0, GUTS: 0, LOVE: 0 };
    const answers = new FormData(form);
    for (const value of answers.values()) scores[value] += 1;
    const winner = Object.keys(scores).reduce((best, era) => scores[era] >= scores[best] ? era : best);
    result.querySelector('h3').textContent = `You’re in your ${winner} era.`;
    result.querySelector('p').textContent = descriptions[winner];
    result.hidden = false;
    result.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'nearest' });
  });

  section.querySelector('.era-quiz-again').addEventListener('click', () => {
    form.reset();
    result.hidden = true;
    form.querySelector('input').focus();
  });
})();
