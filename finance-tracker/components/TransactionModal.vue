<template>
  <UModal v-model="isOpen">
    <UCard>
      <template #header>
        Add Transaction
      </template>
      <UForm :state="state" :schema="schema" ref="form" @submit.prevent="save">
        <UFormGroup :required="true" label="Transaction type" hint="Optional" class="mb-4" name="type">
          <USelect placeholder="Select the transaction type" :options="types" v-model="state.type"/>
        </UFormGroup>
        <UFormGroup label="Amount" :required="true" class="mb-4" name="amount">
          <UInput type="number" placeholder="Amount" v-model.number="state.amount"/>
        </UFormGroup>
        <UFormGroup label="Transaction date" :required="true" class="mb-4" name="created_at">
          <UInput type="date" icon="i-heroicons-calendar-days-20-solid" v-model="state.created_at"/>
        </UFormGroup>
        <UFormGroup label="Description" hint="Optional" class="mb-4" name="description">
          <UInput placeholder="Description" v-model="state.description"/>
        </UFormGroup>
        <UFormGroup :required="true" label="Category" hint="Optional" class="mb-4" name="category" v-if="state.type === 'Expense'">
          <USelect placeholder="Category" :options="categories" v-model="state.category"/>
        </UFormGroup>
        <UButton type="submit" color="black" variant="solid" label="Save" />
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

const emit = defineEmits(['update:modelValue'])

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

const form = ref()

const save = async () => {
  form.value.validate()
}

const state = ref({
  type: undefined,
  amount: 0,
  created_at: undefined,
  description: undefined,
  category: undefined
})

const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})
</script>