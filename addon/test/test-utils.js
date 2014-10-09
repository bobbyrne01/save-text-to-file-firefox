var Utils = require("./Utils");

//(/[\/\\|":*?<>]/g,'_')
exports["test sanitizeFilename"] = function(assert) {
  assert.ok(Utils.sanitizeFilename("test") == "test", "sanitizeFilename .. Input: test, Output: " + Utils.sanitizeFilename("test"));
  assert.ok(Utils.sanitizeFilename("t-st") == "t-st", "sanitizeFilename .. Input: t-st, Output: " + Utils.sanitizeFilename("t-st"));
  assert.ok(Utils.sanitizeFilename("t:st") == "t_st", "sanitizeFilename .. Input: t:st, Output: " + Utils.sanitizeFilename("t:st"));
  assert.ok(Utils.sanitizeFilename("t::st") == "t__st", "sanitizeFilename .. Input: t::st, Output: " + Utils.sanitizeFilename("t::st"));
  assert.ok(Utils.sanitizeFilename("t*st") == "t_st", "sanitizeFilename .. Input: t*st, Output: " + Utils.sanitizeFilename("t*st"));
  assert.ok(Utils.sanitizeFilename("t**st") == "t__st", "sanitizeFilename .. Input: t**st, Output: " + Utils.sanitizeFilename("t**st"));
  assert.ok(Utils.sanitizeFilename("t?st") == "t_st", "sanitizeFilename .. Input: t?st, Output: " + Utils.sanitizeFilename("t?st"));
  assert.ok(Utils.sanitizeFilename("t??st") == "t__st", "sanitizeFilename .. Input: t??st, Output: " + Utils.sanitizeFilename("t??st"));
  assert.ok(Utils.sanitizeFilename("t<st") == "t_st", "sanitizeFilename .. Input: t<st, Output: " + Utils.sanitizeFilename("t<st"));
  assert.ok(Utils.sanitizeFilename("t<<st") == "t__st", "sanitizeFilename .. Input: t<<st, Output: " + Utils.sanitizeFilename("t<<st"));
  assert.ok(Utils.sanitizeFilename("t>st") == "t_st", "sanitizeFilename .. Input: t>st, Output: " + Utils.sanitizeFilename("t>st"));
  assert.ok(Utils.sanitizeFilename("t>>st") == "t__st", "sanitizeFilename .. Input: t>>st, Output: " + Utils.sanitizeFilename("t>>st"));
  assert.ok(Utils.sanitizeFilename("t\"st") == "t_st", "sanitizeFilename .. Input: t\"st, Output: " + Utils.sanitizeFilename("t\"st"));
  assert.ok(Utils.sanitizeFilename("t\"\"st") == "t__st", "sanitizeFilename .. Input: t\"\"st, Output: " + Utils.sanitizeFilename("t\"\"st"));
};

//function(preferedFormat, currentDate) .. new Date(100000000) == Fri Jan 02 1970 04:46:40 GMT+0100 (IST)
exports["test createDateString"] = function(assert) {
  assert.ok(Utils.createDateString(0, new Date(100000000)) == "02-01-1970", "createDateString .. Input: 0, new Date(100000000), Output: " + Utils.createDateString(0, new Date(100000000)));
  assert.ok(Utils.createDateString(1, new Date(100000000)) == "01-02-1970", "createDateString .. Input: 1, new Date(100000000), Output: " + Utils.createDateString(1, new Date(100000000)));
  assert.ok(Utils.createDateString(2, new Date(100000000)) == "1970-01-02", "createDateString .. Input: 2, new Date(100000000), Output: " + Utils.createDateString(2, new Date(100000000)));
  assert.ok(Utils.createDateString(3, new Date(100000000)) == "1970-02-01", "createDateString .. Input: 3, new Date(100000000), Output: " + Utils.createDateString(3, new Date(100000000)));
};

//function(currentDate) .. new Date(100000000) == Fri Jan 02 1970 04:46:40 GMT+0100 (IST)
exports["test createTimeString"] = function(assert) {
  assert.ok(Utils.createTimeString(new Date(100000000)) == "04-46-40", "createTimeString .. Input: new Date(100000000), Output: " + Utils.createTimeString(new Date(100000000)));
};

require("sdk/test").run(exports);