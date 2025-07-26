function waitForSelector(selector, timeout = 10000) {
  return new Promise((resolve, reject) => {
    const interval = 100;
    let waited = 0;
    const check = () => {
      const el = document.querySelector(selector);
      if (el) resolve(el);
      else if (waited >= timeout) reject('Timeout: ' + selector);
      else { waited += interval; setTimeout(check, interval); }
    };
    check();
  });
}

async function runAutomation() {
  try {
    const email = window.emailToInvite;
    if (!email) return alert("No email found in window context!");

    const input = await waitForSelector('input[type="email"]');
    input.value = email;
    input.dispatchEvent(new Event('input', { bubbles: true }));

    const checkbox = document.querySelector('input[type="checkbox"]');
    if (checkbox && checkbox.checked) {
      checkbox.click(); // Untick Temporary access
    }

    await waitForSelector('button:enabled');
    [...document.querySelectorAll('button')].find(b => b.textContent.includes("Next"))?.click();

    // Wait & select all assets
    await new Promise(r => setTimeout(r, 2000));
    const selectAll = document.querySelector('input[type="checkbox"]');
    if (selectAll && !selectAll.checked) selectAll.click();

    // Full control
    const fullControl = [...document.querySelectorAll('label')]
      .find(l => l.textContent.includes('Manage ad accounts'))?.querySelector('input');
    if (fullControl && !fullControl.checked) fullControl.click();

    // Next button again
    await new Promise(r => setTimeout(r, 1000));
    [...document.querySelectorAll('button')].find(b => b.textContent.includes("Next"))?.click();

    // Final Send Invitation
    await new Promise(r => setTimeout(r, 1000));
    [...document.querySelectorAll('button')].find(b => b.textContent.includes("Send invitation"))?.click();

  } catch (err) {
    console.error("Automation Error:", err);
    alert("Something went wrong: " + err);
  }
}

runAutomation();