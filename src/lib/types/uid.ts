/**
 * Create clean UIDs for the app
 */
export { UID };

const crytptoLib = window.crypto;

const UID = {
  
  uuid4: function(): string {
    return crytptoLib.randomUUID().replace(/-/g,'');
  },
}
