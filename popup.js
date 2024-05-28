const toggleImaginaryBtn = document.querySelector('.toggleImaginaryBtn');
const footerSpan = document.querySelector('.footerSpan');

let isImaginary = false;

footerSpan.innerText = 'Imaginary Mode is OFF';

async function toggleImaginary() {
  try {
    console.log('I am inside the webpage console');
    // const newDivExists = document.querySelector('.new-div');

    const spans = document.querySelectorAll('span');
    const divs = document.querySelectorAll('div');
    const paragraphs = document.querySelectorAll('p');
    const sections = document.querySelectorAll('section');
    const articles = document.querySelectorAll('article');

    if (!isImaginary) {
      isImaginary = true;
      // const newDiv = document.createElement('div');
      // newDiv.classList.add('new-div');
      // newDiv.style.width = '100%';
      // newDiv.style.height = '300px';
      // newDiv.style.backgroundColor = 'rgba(255, 255, 255, 1)';
      // const bodyElm = document.body;
      // bodyElm.insertBefore(newDiv, bodyElm.firstChild);

      spans.forEach((span) => {
        span.style.borderColor = 'red';
      });

      divs.forEach((div) => {
        div.style.borderColor = 'blue';
      });

      paragraphs.forEach((p) => {
        p.style.borderColor = 'green';
      });

      sections.forEach((section) => {
        section.style.borderColor = 'yellow';
      });

      articles.forEach((article) => {
        article.style.borderColor = 'purple';
      });

      return 'ON';
    } else {
      // newDivExists.remove();
      isImaginary = false;

      spans.forEach((span) => {
        span.style.borderColor = 'transparent';
      });

      divs.forEach((div) => {
        div.style.borderColor = 'transparent';
      });

      paragraphs.forEach((p) => {
        p.style.borderColor = 'transparent';
      });

      sections.forEach((section) => {
        section.style.borderColor = 'transparent';
      });

      articles.forEach((article) => {
        article.style.borderColor = 'transparent';
      });

      return 'OFF';
    }
  } catch (err) {
    console.error(err);
    return null;
  }
}

toggleImaginaryBtn.addEventListener('click', async () => {
  chrome.storage.sync.get('state', ({ state }) => {
    if (state) {
      isImaginary = state.isImaginary;
      if (isImaginary) {
        footerSpan.innerText = `Imaginary Mode is ${isImaginary}`;
      }
    }
  });

  // Get the active tab in the current window of the browser
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  console.log('I am inside the extension console');

  chrome.scripting.executeScript(
    {
      target: { tabId: tab.id },
      func: toggleImaginary,
    },
    async (injectionResults) => {
      console.log('I am inside the extension console - callback');

      if (!injectionResults || injectionResults.length === 0) {
        console.error('No injection results');
        return;
      }

      const result = injectionResults[0].result;

      if (isImaginary) {
        footerSpan.innerText = `Imaginary Mode is ${result}`;
      } else {
        footerSpan.innerText = `Imaginary Mode is ${result}`;
      }
    }
  );
});

// document.addEventListener('DOMContentLoaded', function() {});
