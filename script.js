const questionIds = ['q1', 'q2', 'q3', 'q4'];
const savedEl = document.getElementById('saved');
let timeoutId;

questionIds.forEach(function (id) {
  const textarea = document.getElementById(id);
  textarea.value = localStorage.getItem(id) || '';

  textarea.addEventListener('input', function () {
    localStorage.setItem(id, textarea.value);
    savedEl.textContent = 'Guardado';

    clearTimeout(timeoutId);
    timeoutId = setTimeout(function () {
      savedEl.textContent = '';
    }, 1500);
  });
});

document.getElementById('downloadPdf').addEventListener('click', function () {
  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    alert('Permite las ventanas emergentes para descargar el PDF.');
    return;
  }

  printWindow.document.write(
    '<!DOCTYPE html>' +
    '<html lang="es">' +
    '<head><meta charset="UTF-8"><title>El Hombre y la Serpiente</title>' +
    '<style>' +
    'body { font-family: Georgia, serif; color: #2c2416; padding: 30px 40px; line-height: 1.8; }' +
    'h1 { text-align: center; color: #5a3e1a; margin-bottom: 24px; font-size: 1.6rem; }' +
    'h2 { text-align: center; color: #5a3e1a; margin-top: 28px; font-size: 1.2rem; }' +
    'p { margin: 0 0 14px; }' +
    'blockquote { background: #faf2dd; border-left: 5px solid #b37b32; padding: 10px 14px; margin: 10px 0 16px; font-style: italic; }' +
    '.reflection { background: #fdf6e8; border-left: 4px solid #c9a04a; padding: 8px 12px; margin: 6px 0; }' +
    '.answer { margin: 0 0 16px 16px; white-space: pre-wrap; }' +
    '.label { font-weight: bold; }' +
    '@media print { body { padding: 0; } }' +
    '</style></head>' +
    '<body>' +
    '<h1>El Hombre y la Serpiente</h1>' +

    '<p>Un viajero caminaba por el bosque cuando vio una gran hoguera. Entre las llamas distinguió una serpiente que se retorcía, atrapada por el fuego.</p>' +
    '<p>Movido por la compasión, tomó una rama y la acercó para que la serpiente pudiera subir y escapar.</p>' +
    '<p>La serpiente se deslizó por la rama. Pero, al llegar a la mano del hombre, lo mordió.</p>' +
    '<p>El hombre, dolorido, la dejó caer.</p>' +
    '<p>Otro viajero que había visto la escena le preguntó:</p>' +
    '<blockquote>—¿Por qué intentaste salvarla si sabías que podía morderte?</blockquote>' +
    '<p>El hombre respondió:</p>' +
    '<blockquote>—Porque esa es su naturaleza. Pero que ella muerda no significa que yo deba dejar de actuar conforme a la mía.</blockquote>' +
    '<p>El otro preguntó:</p>' +
    '<blockquote>—¿Y cuál es tu naturaleza?</blockquote>' +
    '<p>El hombre respondió:</p>' +
    '<blockquote>—Si ella solo puede dar veneno, yo quiero dar compasión.</blockquote>' +

    '<h2>Reflexión</h2>' +
    '<p class="reflection">Cada persona entrega aquello que lleva en su interior.</p>' +
    '<p class="reflection">Quien alberga odio suele repartir heridas. Quien cultiva amor, ofrece paz.</p>' +
    '<p class="reflection">No permitas que la amargura de otros transforme la bondad de tu corazón.</p>' +
    '<p class="reflection">La verdadera nobleza consiste en seguir haciendo el bien, incluso cuando el mundo no siempre responde con gratitud.</p>' +

    '<h2>Preguntas de reflexión</h2>' +
    '<p class="label">1. Jesús dice «no resistas al que te haga algún mal» (Mt 5:39). ¿Cómo se relaciona esto con la actitud del viajero al salvar a la serpiente?</p>' +
    '<p class="answer">' + getAnswer(0) + '</p>' +
    '<p class="label">2. ¿En qué situaciones de tu vida te cuesta «poner la otra mejilla» cuando alguien te lastima o responde con ingratitud?</p>' +
    '<p class="answer">' + getAnswer(1) + '</p>' +
    '<p class="label">3. Jesús nos llama a «amar a los enemigos y orar por quienes nos persiguen» (Mt 5:44). ¿Qué paso concreto puedes dar esta semana para vivir ese mandato?</p>' +
    '<p class="answer">' + getAnswer(2) + '</p>' +
    '<p class="label">4. «Sean perfectos como su Padre celestial es perfecto» (Mt 5:48). ¿Cómo refleja esta historia el amor del Padre, que hace salir el sol sobre malos y buenos?</p>' +
    '<p class="answer">' + getAnswer(3) + '</p>' +

    '</body></html>'
  );

  printWindow.document.close();
  printWindow.focus();

  printWindow.onload = function () {
    printWindow.print();
  };
});

function getAnswer(index) {
  const value = localStorage.getItem(questionIds[index]);
  return value || 'Sin respuesta';
}
