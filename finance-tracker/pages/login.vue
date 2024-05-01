<template>
  <UCard v-if="!success">
    <template #header>
      Sign-in to Finance Tracker
    </template>
    <form @submit.prevent="handleLogin">
      <UFormGroup label="email" name="email" class="mb-4" :required="true" help="You will receive an email with the conformation link">
        <UInput type="email" placeholder="Email" required v-model="email"/>
      </UFormGroup>
      <UButton type="submit" variant="solid" color="black" :loading="pending" :disabled="pending">Sign-in</UButton>
    </form>
  </UCard>
  <UCard v-else>
    <template #header>
      Email has been sent
    </template>

    <div class="text-center">
      <p class="mb-4">We have sent an email to <strong>{{email}}</strong> with a link to sign in.</p>
      <p><strong>Important:</strong> The link will expire in 5 minutes</p>
    </div>
  </UCard>
</template>

<script setup>
import {useIsUserLoggedIn} from "~/composables/useIsUserLoggedIn.js";

const success = ref(false)
const email = ref('')
const pending = ref(false)
const toast = useToast()
const supabase = useSupabaseClient()

useIsUserLoggedIn()
const handleLogin = async () => {
  pending.value = true

  try {
    const {error} = await supabase.auth.signInWithOtp({
      email: email.value,
      options: {
        emailRedirectTo: 'http://127.0.0.1:3000/confirm'
      }
    })

    if (error) {
      toast.add({
        title: 'Error authenticated',
        icon: 'i-heroicons-exclamation-circle',
        description: error.message
      })
    } else {
      success.value = true
    }
  } finally {
    pending.value = false
  }
}
</script>