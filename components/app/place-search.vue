<script setup lang="ts">
import type { FetchError } from "ofetch";

import { toTypedSchema } from "@vee-validate/zod";
import { Field, Form } from "vee-validate";

import type { NominatimResult } from "~/lib/types";

import { SearchSchema } from "~/lib/zod-schemas";

const emit = defineEmits<{
  resultSelected: [result: NominatimResult];
}>();

const searchResults = ref<NominatimResult[]>([]);
const form = useTemplateRef("form");
const loading = ref(false);
const hasSearched = ref(false);
const errorMessage = ref("");

async function onSubmit(query: Record<string, string>) {
  try {
    loading.value = true;
    hasSearched.value = true;
    errorMessage.value = "";
    searchResults.value = [];
    const results: NominatimResult[] = await $fetch("/api/search", {
      query,
    });
    searchResults.value = results;
  }
  catch (e) {
    const error = e as FetchError;
    errorMessage.value = getFetchErrorMessage(error);
  }
  finally {
    loading.value = false;
  }
};

function setLocation(result: NominatimResult) {
  emit("resultSelected", result);
  searchResults.value = [];
  errorMessage.value = "";
  hasSearched.value = false;
  if (form.value) {
    form.value.resetForm();
  }
}
</script>

<template>
  <div class="flex flex-col gap-2">
    <div class="flex justify-center">
      <Form
        ref="form"
        class="flex"
        :validation-schema="toTypedSchema(SearchSchema)"
        @submit="onSubmit"
      >
        <div>
          <label class="input border-r-0 rounded-r-none">
            <Icon name="tabler:search" />
            <Field
              :disabled="loading"
              type="text"
              name="q"
              placeholder="Search for a location..."
              required
            />
          </label>
        </div>
        <button
          :disabled="loading"
          class="btn btn-primary rounded-l-none grow"
        >
          Search
        </button>
      </Form>
    </div>
    <div
      v-if="!loading && errorMessage"
      role="alert"
      class="alert alert-error"
    >
      {{ errorMessage }}
    </div>
    <div
      v-if="hasSearched && !searchResults.length && !loading"
      role="alert"
      class="alert alert-warning"
    >
      No results found.
    </div>
    <div class="flex flex-col overflow-auto gap-2 max-h-60">
      <div v-if="loading" class="flex justify-center">
        <div class="loading loading-lg" />
      </div>
      <div
        v-for="result in searchResults"
        v-else
        :key="result.place_id"
        class="card-sm bg-base-300 rounded-md"
      >
        <div class="card-body">
          <div class="card-title">
            <h4>{{ result.display_name }}</h4>
          </div>
          <div class="justify-end card-actions">
            <button class="btn btn-sm btn-warning" @click="setLocation(result)">
              Set location
              <Icon name="tabler:map-pin-share" size="18" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
