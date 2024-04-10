<script lang="ts">
  import { onMount } from "svelte";
  import { getCurrentSession } from "$lib/store/sessions";
  // import { requestOTP, login } from "apis/mutations";
  import { Card, Button, Label, Input, Checkbox, A  } from "flowbite-svelte";
  import { MetaTag } from "$lib/components";

  let session ;

  onMount(async () => {
    session = await getCurrentSession();
  })

  // const required = (t) => 
  //   `<span class="text-warning fw-bold">${t ? `Required` : ``}</span>.`;

//   async function getOTP() {
//     let rsp = await requestOTP({ 
//       email: data.email 
//     });
// 
//     if (rsp.error && rsp.error.code === 404) {
//       // No valid email, go to signup
//       data.message = "Could not find your email. Going to signup ..."
//       goto("/signup");
//       return;
//     }
// 
//     if (rsp.error) {
//       data.message = "Problem sending OTP request, please try again ..."
//       return;
//     }
// 
//     // success
//     session = rsp;
//     data.otp = "";
// 
//     // goto home
//     setTimeout(() => { 
//       goto(`/otp/${session.session_key}`); 
//     }, 500)
//   } 

  const path: string = '/login';
  const description: string = 'Socialcap Login';
  const title: string = 'Socialcap';
  const subtitle: string = 'Login';
</script>

<MetaTag {path} {description} {title} {subtitle} />

<main class="p-4 h-screen flex flex-col justify-center items-center pb-48">
  <p>&nbsp;</p>
  <div class="flex justify-center w-screen">
    <Card size="md">
      <form class="p-4" action="/">
        <h3 class="m-0 p-0 text-2xl font-bold text-gray-900 dark:text-white">
          Sign up
        </h3>
        <p class="m-0 p-0 mt-1.5 font-normal text-sm text-gray-500 dark:text-gray-200">
          Create a new account
        </p>

        <Label class="space-y-2 mt-6">
          <span class="text-sm font-semibold ps-1">
            Full Name
          </span>
          <Input type="text" size="lg" name="fullName" placeholder="" required />
        </Label>

        <Label class="space-y-2 mt-6">
          <span class="text-sm font-semibold ps-1">Email</span>
          <Input type="email" size="lg" name="email" placeholder="" required />
        </Label>

        <div class="mt-6 flex items-center justify-between">
          <Button color="light" href="/login" size="lg">
            <!-- Have an account ?  -->
            &nbsp; <span  class="text-blue-600">Sign in</span>
          </Button>
          <Button type="submit" size="lg">Sign up</Button>
        </div>
      </form>
    </Card>
  </div>
  <p class="mt-6">Terms and conditions apply ... etc</p>
  <p>&nbsp;</p>
</main>
