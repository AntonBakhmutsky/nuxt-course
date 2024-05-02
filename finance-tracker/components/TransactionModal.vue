<template>
  <UModal v-model="isOpen">
    <UCard>
      <template #header>
        Add Transaction
      </template>
      <UForm
          ref="form"
          :state="state"
          :schema="schema"
          @submit.prevent="save"
      >
        <UFormGroup :required="true" label="Transaction type" hint="Optional" class="mb-4" name="type">
          <USelect placeholder="Select the transaction type" :options="types" v-model="state.type"/>
        </UFormGroup>
        <UFormGroup label="Amount" :required="true" class="mb-4" name="amount">
          <UInput type="number" placeholder="Amount" v-model.number="state.amount"/>
        </UFormGroup>
        <UFormGroup label="Transaction date" :required="true" class="mb-4" name="created_at" >
          <UInput type="date" icon="i-heroicons-calendar-days-20-solid" v-model="state.created_at"/>
        </UFormGroup>
        <UFormGroup label="Description" hint="Optional" class="mb-4" name="description">
          <UInput placeholder="Description" v-model="state.description"/>
        </UFormGroup>
        <UFormGroup :required="true" label="Category" hint="Optional" class="mb-4" name="category" v-if="state.type === 'Expense'">
          <USelect placeholder="Category" :options="categories" v-model="state.category"/>
        </UFormGroup>
        <UButton type="submit" color="black" variant="solid" label="Save" :loading="isLoading"/>
      </UForm>
    </UCard>
  </UModal>
</template>

<script setup>
import {categories, types} from "~/constants.js";
import {z} from 'zod'

const props = defineProps({
  modelValue: Boolean
})

const supabase = useSupabaseClient()
const {toastSuccess, toastError} = useAppToast()

const emit = defineEmits(['update:modelValue', 'saved'])


const defaultSchema = z.object({
  created_at: z.string(),
  description: z.string().optional(),
  amount: z.number().positive('Amounts needs to be more than 0')
})

const incomeSchema = z.object({
  type: z.literal('Income')
})

const expenseSchema = z.object({
  type: z.literal('Expense'),
  category: z.enum(categories)
})

const investmentSchema = z.object({
  type: z.literal('Investment'),
})

const savingSchema = z.object({
  type: z.literal('Saving'),
})

const schema = z.intersection(
    z.discriminatedUnion('type', [incomeSchema, expenseSchema, investmentSchema, savingSchema]),
    defaultSchema
)

const isLoading = ref(false)
const isJaPerdole = ref(false)
const form = ref()

const save = async () => {
  isJaPerdole.value = false
  await form.value.validate().catch(() => isJaPerdole.value = true)

  if (isJaPerdole.value) return

  isLoading.value = true

  try {
    const {error} = await supabase.from('transactions')
        .upsert({...state.value})

    if (!error) {
      toastSuccess({
        title: 'Transactions saved',
      })
      isOpen.value = false
      emit('saved')
    } else {
      throw error
    }

  } catch(e) {
    toastError({
      title: 'Transaction not saved',
      description: e.message,
    })
  } finally {
    isLoading.value = false
  }
}

const initialState = {
  type: undefined,
  amount: 0,
  created_at: undefined,
  description: undefined,
  category: undefined
}

const state = ref({
  ...initialState
})

const resetForm = () => {
  Object.assign(state.value, initialState)
}

const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => {
    if (!value) resetForm()
    emit('update:modelValue', value)
  }
})
</script>