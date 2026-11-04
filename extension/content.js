// Feedback Visibility Default for HiBob
//
// HiBob's Give feedback and Request feedback dialogs default "Who will see
// this feedback?" to "Managers". When one of those dialogs opens, this script
// switches the field to "Employee and manager" once. Anything the user picks
// afterwards is left alone.

(() => {
  "use strict";

  const FIELD_SELECTOR = 'b-single-select[formelement="visibility"]';
  const FROM = "Managers";
  const TO = "Employee and manager";
  const DONE_MARK = "feedbackVisibilityHibob";
  const BUSY_CLASS = "feedback-visibility-hibob-busy";
  const NOTE_CLASS = "feedback-visibility-hibob-note";

  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // The value is set by opening the dropdown and clicking the option, as a
  // user would. While that happens, the dropdown is made invisible so the
  // user only sees the field's value change.
  const style = document.createElement("style");
  style.textContent = `
    html.${BUSY_CLASS} .cdk-overlay-pane:has(b-single-list) { opacity: 0 !important; }
    .${NOTE_CLASS} { margin-top: 6px; font-size: 12px; line-height: 16px; color: #6b6b6b; white-space: nowrap; }
  `;
  document.head.append(style);

  // Tells the user the value was pre-selected for them. Removed as soon as
  // the field holds anything else, since the choice is then theirs.
  function addNote(field, trigger) {
    const note = document.createElement("div");
    note.className = NOTE_CLASS;
    note.textContent = `Pre-selected by the Feedback Visibility extension.`;
    field.after(note);

    const watcher = new MutationObserver(() => {
      if (!field.isConnected || trigger.textContent.trim() !== TO) {
        note.remove();
        watcher.disconnect();
      }
    });
    watcher.observe(trigger, { childList: true, characterData: true, subtree: true });
  }

  // The dropdown options render in an overlay at the end of <body>, not
  // inside the field itself.
  const findOption = () =>
    [...document.querySelectorAll('.cdk-overlay-container b-single-list .option[role="treeitem"]')]
      .find((el) => el.textContent.trim() === TO);

  // The field exists before the dialog finishes opening, and clicks on it are
  // ignored until then. The dialog gets this class once it is ready.
  async function waitForDialogReady(field) {
    const dialog = field.closest("mat-dialog-container");
    for (let i = 0; i < 40 && dialog && !dialog.classList.contains("mdc-dialog--open"); i++) {
      await wait(50);
    }
    return dialog;
  }

  async function setDefault(field) {
    field.dataset[DONE_MARK] = "1";

    const dialog = await waitForDialogReady(field);
    const trigger = field.querySelector('[role="button"][aria-haspopup]');
    if (!trigger || field.getAttribute("aria-disabled") === "true") return;
    if (trigger.textContent.trim() !== FROM) return;

    const focused = document.activeElement;
    document.documentElement.classList.add(BUSY_CLASS);
    try {
      let option;
      for (let attempt = 0; attempt < 5 && !option; attempt++) {
        trigger.click();
        for (let i = 0; i < 10 && !option; i++) {
          await wait(50);
          option = findOption();
        }
      }

      if (option) {
        option.click();
      } else if (trigger.getAttribute("aria-expanded") === "true") {
        trigger.click(); // close the dropdown we opened
      }
    } finally {
      // Let the dropdown finish closing before it can be seen again.
      await wait(200);
      document.documentElement.classList.remove(BUSY_CLASS);
    }

    if (trigger.textContent.trim() === TO) addNote(field, trigger);
    if (dialog && focused && dialog.contains(focused)) focused.focus();
  }

  function scan() {
    for (const field of document.querySelectorAll(`${FIELD_SELECTOR}:not([data-feedback-visibility-hibob])`)) {
      setDefault(field);
    }
  }

  new MutationObserver(scan).observe(document.body, { childList: true, subtree: true });
  scan();
})();
