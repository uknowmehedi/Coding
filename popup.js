document.getElementById("start").addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const email = document.getElementById("email").value;
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: runFullAutomation,
    args: [email]
  });
});

function runFullAutomation(email) {
  const wait = ms => new Promise(res => setTimeout(res, ms));

  async function run() {
    // 1. Email span injection
    const spanSelector = 'span.x193iq5w';
    const fallbackSpan = [...document.querySelectorAll('span')]
      .find(s => s.innerText.includes('@') && s.innerText.length < 50);
    const emailSpan = document.querySelector(spanSelector) || fallbackSpan;

    if (emailSpan) {
      emailSpan.innerText = email;
      console.log("✅ Email set into span.");
    }

    await wait(1000);

    // 2. Uncheck Temporary Access
    const tempAccess = document.querySelector('input[type="checkbox"]:checked');
    if (tempAccess) tempAccess.click();

    await wait(1000);

    // 3. Click "Next"
    document.querySelectorAll("span").forEach(el => {
      if (el.innerText.includes("Next")) el.click();
    });

    await wait(2000);

    // 4. Full control & Manage
    document.querySelectorAll("span").forEach(el => {
      if (el.innerText.includes("Full control")) el.click();
    });

    await wait(1000);
    document.querySelectorAll("span").forEach(el => {
      if (el.innerText.includes("Advanced options")) el.click();
    });

    await wait(1000);
    document.querySelectorAll("span").forEach(el => {
      if (el.innerText.includes("Manage")) el.click();
    });

    await wait(1500);
    document.querySelectorAll("span").forEach(el => {
      if (el.innerText.includes("Switch to advanced assignment")) el.click();
    });

    await wait(1500);
    document.querySelectorAll("span").forEach(el => {
      if (el.innerText.includes("Select all")) el.click();
    });

    await wait(1000);
    document.querySelectorAll("span").forEach(el => {
      if (el.innerText.includes("Full control")) el.click();
    });

    await wait(1500);
    document.querySelectorAll("span").forEach(el => {
      if (el.innerText.includes("Next")) el.click();
    });

    await wait(1500);
    document.querySelectorAll("span").forEach(el => {
      if (el.innerText.includes("OK")) el.click();
    });
  }

  run();
}