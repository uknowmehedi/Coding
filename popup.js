document.getElementById('start').addEventListener('click', async () => {
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  if (!email) return alert("Please enter an email!");

  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: (email, message) => {
      window.emailToInvite = email;
      window.inviteMessage = message;
    },
    args: [email, message]
  });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['content.js']
  });
});