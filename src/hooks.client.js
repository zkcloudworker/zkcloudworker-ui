import { getCurrentSession, getDefaultSession } from "$lib/store/sessions";
import { setNavigationPath } from "$lib/store/navigation";
import { API } from "$lib/api/api-client";

let activeSession = getCurrentSession();
let user;

console.log("hook.client.js activeSession=", activeSession);
if ('serviceWorker' in navigator) {
  console.log('hook.clients.js: serviceWorker in navigator = true')
}

// set defualt values for this global
setNavigationPath({
  from: "", 
  to: "",
  type: ""
})

if (activeSession) {
  API.init(activeSession);  
  // user = await getCurrentUser();
  setTimeout(async () => {
    const apiStatus = await API.status({ metrics: true });
    console.log("API status=", apiStatus);
  }, 100)
} 
else {
  API.init(getDefaultSession());  
}
