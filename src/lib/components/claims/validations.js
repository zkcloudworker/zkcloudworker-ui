/**
 * Validate fields according to specification in MasterPlan
 */

const IS_OK = "IS_OK";
const IS_EMPTY = "IS_EMPTY";
const TOO_LONG = "TOO_LONG";
const TOO_MANY = "TOO_MANY";

const ErrorMessages = {
  "IS_OK": "",
  "IS_EMPTY": "This is a required field. Please fill it !",
  "TOO_LONG": "The text is too long !",
  "TOO_MANY": "There are too many items !"
}

const handleValidation = {
  "text": validateText,
  "note": validateText,
  "radio": validateRadio,
  "checks": validateChecks,
  "images": validateLinks,
  "links": validateLinks,
  "files": validateLinks
};

function validateText(field, value) {
  if (!(["text","note"].includes(field.type))) return IS_OK;
  console.log("field",field, "value", field);
  const len = (value || "").trim().length;
  if (field.required && len === 0) return IS_EMPTY;
  if (field.extras.max && len >= field.extras.max) return TOO_LONG; 
  return IS_OK;
}

function validateRadio(field, value) {
  if (!(field.type === "radio")) return IS_OK;
  const len = (value || "").trim().length;
  if (field.required && len === 0) return IS_EMPTY;
  return IS_OK;
}

function validateChecks(field, value) {
  if (!(field.type === "checks")) return IS_OK;
  const len = (value || []).length;
  if (field.required && len === 0) return IS_EMPTY;
  let selecteds = (value || []).filter((t) => t.trim() !== "");
  if (field.required && selecteds.length === 0) return IS_EMPTY;
  return IS_OK;
}

function validateLinks(field, value) {
  if (!(["links","images","files"].includes(field.type))) return IS_OK;
  const len = (value || []).length;
  if (field.required && len === 0) return IS_EMPTY;
  if (len > field.extras.max) return TOO_MANY;
  return IS_OK;
}

export function isValid(field, value) {
  if (! handleValidation[field.type]) return true;
  return handleValidation[field.type](field, value) === IS_OK;
}

export function hasMessage(field, value) {
  if (! handleValidation[field.type]) return "";
  const isCase = handleValidation[field.type](field, value);
  return ErrorMessages[isCase];
}

export function isAllValid(fields, data) {
  for (let index=0; index < (fields || []).length; index++) {
    if (!isValid(fields[index], data[index].value)) 
      return false;
  };
  return true;
}