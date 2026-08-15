/**
 * micronturbo.com contact form endpoint.
 *
 * Appends one row per submission to the bound Sheet.
 * Columns, in order: timestamp | lang | name | email | subject | message
 *
 * Every field the page collects is mandatory, so REQUIRED covers all of them.
 * There is no company field: it was cut from the form and its header removed
 * from the Sheet, and appendRow must stay in step with that header or every
 * value after the gap lands one column left of its heading.
 *
 * The page POSTs JSON with Content-Type text/plain so the browser treats it as a
 * simple request and skips the CORS preflight, which Apps Script cannot answer.
 * The body therefore arrives in e.postData.contents, not e.parameter.
 */

/**
 * Bumped by hand whenever this file changes. doGet reports it, so opening the
 * /exec URL says which version is actually deployed.
 *
 * This exists because saving the editor does not deploy: the /exec URL serves
 * the version its deployment was published with, and a redeploy that silently
 * did not take is otherwise indistinguishable from one that did. It cost two
 * rounds of rows filed under the wrong headings to learn that.
 */
var VERSION = '2026-08-15 · 6 columns';

var SHEET_NAME = 'Sheet1';
var REQUIRED = ['name', 'email', 'subject', 'message'];
var MAX = { name: 200, email: 320, subject: 300, message: 5000 };
var MIN_ELAPSED_MS = 3000;

function doPost(e) {
  var lock = LockService.getScriptLock();

  try {
    if (!e || !e.postData || !e.postData.contents) {
      return respond(false, 'empty request');
    }

    var data;
    try {
      data = JSON.parse(e.postData.contents);
    } catch (err) {
      return respond(false, 'malformed request');
    }

    // Honeypot. A real visitor never sees this field, so anything in it is a bot.
    // Returns success on purpose: telling a bot it failed tells it what to fix.
    if (String(data.website || '').length > 0) {
      return respond(true, '');
    }

    // Timing check. A human cannot fill this form in under three seconds.
    var elapsed = Number(data.elapsed);
    if (isFinite(elapsed) && elapsed >= 0 && elapsed < MIN_ELAPSED_MS) {
      return respond(true, '');
    }

    var row = {
      lang: data.lang === 'zh-Hans' ? 'zh-Hans' : 'en',
      name: clean(data.name, MAX.name),
      email: clean(data.email, MAX.email),
      subject: clean(data.subject, MAX.subject),
      message: clean(data.message, MAX.message)
    };

    for (var i = 0; i < REQUIRED.length; i++) {
      if (!row[REQUIRED[i]]) {
        return respond(false, 'missing required field');
      }
    }

    if (!/^[^@\s]+@[^@\s.]+\.[^@\s]+$/.test(row.email)) {
      return respond(false, 'invalid email');
    }

    lock.waitLock(20000);

    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    if (!sheet) {
      return respond(false, 'sheet not found');
    }

    sheet.appendRow([
      new Date(),
      row.lang,
      row.name,
      row.email,
      row.subject,
      row.message
    ]);

    return respond(true, '');

  } catch (err) {
    return respond(false, 'server error');
  } finally {
    try { lock.releaseLock(); } catch (ignored) {}
  }
}

/**
 * Health check. Visiting the /exec URL in a browser should return ok:true.
 */
function doGet() {
  return respond(true, 'micronturbo contact endpoint · ' + VERSION);
}

/**
 * Trim, cap length, and defuse spreadsheet formula injection.
 *
 * A value opening with = + - or @ is evaluated as a formula by Sheets and by
 * Excel when the sheet is exported, so a message field is a live attack surface.
 * A leading apostrophe forces Sheets to store the value as text.
 */
function clean(value, limit) {
  var s = String(value === undefined || value === null ? '' : value).trim();
  if (s.length > limit) {
    s = s.substring(0, limit);
  }
  if (/^[=+\-@]/.test(s)) {
    s = "'" + s;
  }
  return s;
}

function respond(ok, message) {
  return ContentService
    .createTextOutput(JSON.stringify({ ok: ok, message: message }))
    .setMimeType(ContentService.MimeType.JSON);
}
