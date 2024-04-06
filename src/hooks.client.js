import { getCurrentSession, getDefaultSession } from "$lib/store/sessions";
import { API } from "$lib/api/api-client";

let activeSession = getCurrentSession();
let user;

console.log("hook.client.js activeSession=", activeSession);
if ('serviceWorker' in navigator) {
  console.log('hook.clients.js: serviceWorker in navigator = true')
}

if (activeSession) {
  API.init(activeSession);  
  // user = await getCurrentUser();
  const apiStatus = await API.status({ metrics: true });
  console.log("API status=", apiStatus);
} 
else {
  API.init(getDefaultSession());  
}
