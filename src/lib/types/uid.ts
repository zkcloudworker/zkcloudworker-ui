/**
 * Create clean UIDs for the app
 */
import { Field } from "o1js";
export { UID };

const crytptoLib = window.crypto;

const UID = {

  uuid4: function (): string {
    return crytptoLib.randomUUID().replace(/-/g, '');
  },
  fromField: function(f: Field): string {
    return f.toBigInt().toString(16); // convert it to a Hex string!
  },

  toField: function(uid: string): Field {
    let s = `0x${uid}`;
    return Field(s);
  },

  toFields: function(uid: string): Field[] {
    return UID.toField(uid).toFields();
  }
}
