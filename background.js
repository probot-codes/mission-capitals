function getRandomInterval() {
  // Returns a random interval between 10 minutes and 2 hours
  const min = 10 * 60 * 1000; // 10 minutes
  const max = 2 * 60 * 60 * 1000; // 2 hours
  return Math.random() * (max - min) + min;
}

function createRandomAlarm() {
  const interval = getRandomInterval();
  console.log(`Setting alarm to go off in ${interval} ms`);
  chrome.alarms.create("randomOpener", { delayInMinutes: interval / 60000 });
}

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "randomOpener") {
    chrome.tabs.create({
      url: "https://www.jetpunk.com/quizzes/world-capitals-learning-mode",
    });
    createRandomAlarm(); // Set the next random alarm
  }
});

chrome.runtime.onInstalled.addListener(() => {
  createRandomAlarm();
});

chrome.runtime.onStartup.addListener(() => {
  createRandomAlarm();
});