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

require("sdk/test").run(exports);