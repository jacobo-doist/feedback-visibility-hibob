# Chrome Web Store listing

Copy-paste source for the Developer Dashboard fields. Upload `dist/feedback-visibility-hibob.zip` (from `scripts/package.sh`, or attached to the GitHub release) as the package.

## Store listing tab

**Name** (from the manifest): Feedback Visibility Default for HiBob

**Summary** (from the manifest): Pre-selects 'Employee and manager' in HiBob's 'Who will see this feedback?' field.

**Description:**

```
When you give or request feedback in HiBob, the "Who will see this feedback?" field starts on "Managers". This extension switches it to "Employee and manager" as soon as the form opens, so feedback reaches the person it is about by default.

It changes the field once, when the form opens, and shows a small note under the field saying so. If you pick something else, your choice stays and the note goes away.

- Works on the Give feedback and Request feedback forms.
- Touches only that one field. Everywhere else in HiBob it does nothing.
- Runs only on app.hibob.com. Chrome describes this as "read and change your data on app.hibob.com"; in practice it only reads and sets the visibility field above.
- Collects no data, sends nothing anywhere, stores nothing.
- Needs HiBob in English (it matches the option labels).

This is an independent project, not made by or affiliated with HiBob.

Source code: https://github.com/jacobo-doist/feedback-visibility-hibob
```

**Category:** Workflow & Planning

**Language:** English

**Store icon:** `extension/icons/icon-128.png`

**Screenshot (1280x800):** `store/screenshot-1280x800.png`

**Homepage URL:** https://github.com/jacobo-doist/feedback-visibility-hibob

**Support URL:** https://github.com/jacobo-doist/feedback-visibility-hibob/issues

## Privacy tab

**Single purpose:**

```
Pre-select "Employee and manager" in the "Who will see this feedback?" field of HiBob's Give feedback and Request feedback forms.
```

**Host permission justification** (app.hibob.com):

```
The extension's only code is a content script that runs on app.hibob.com, the HiBob web app, to change the default value of one field in its feedback forms. It needs the whole app.hibob.com origin rather than one path because HiBob is a single-page app: moving between its sections does not reload the page, so a script limited to the feedback section's address would not load when users navigate there from elsewhere in the app. On every other page the script does nothing. It runs on no other site.
```

**Are you using remote code?** No.

**Data usage:** tick none of the data types. Tick all three certifications (no selling, no unrelated use, no creditworthiness use).

**Privacy policy URL:** not needed, the extension handles no user data.

## Distribution tab

**Visibility:** Unlisted

**Regions:** All regions
