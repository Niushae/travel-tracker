<script lang="ts" setup>
import type { FetchError } from "ofetch";

import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { onBeforeRouteLeave, useRouter } from "vue-router";

import type { NominatimResult } from "~/lib/types";

import { CENTER_USA } from "~/lib/constants";
import { InsertLocation } from "~/lib/db/schema/location";

const router = useRouter();
const loading = ref(false);
const submitted = ref(false);
const submitError = ref("");
const mapStore = useMapStore();

const { handleSubmit, errors, meta, setErrors, setFieldValue, controlledValues } = useForm({
  validationSchema: toTypedSchema(InsertLocation),
  initialValues: {
    name: "",
    description: "",
    long: CENTER_USA[0],
    lat: CENTER_USA[1],
  },
});

const onSubmit = handleSubmit(async (values) => {
  try {
    submitError.value = "";
    loading.value = true;
    await useCsrfFetch("/api/locations", {
      method: "POST",
      body: values,
    });
    submitted.value = true;
    navigateTo("/dashboard");
  }
  catch (e) {
    const error = e as FetchError;
    if (error.data?.data) {
      setErrors(error.data?.data);
    }
    submitError.value = getFetchErrorMessage(error);
  }
  loading.value = false;
});

function formatNumber(value?: number) {
  if (!value)
    return 0;
  return value.toFixed(5);
};

function searchResultSelected(result: NominatimResult) {
  setFieldValue("name", result.display_name);
  mapStore.addedPoint = {
    id: result.place_id.toString(),
    name: "Added Point",
    description: "",
    long: Number(result.lon),
    lat: Number(result.lat),
    centerMap: true,
  };
}

effect(() => {
  if (mapStore.addedPoint) {
    setFieldValue("long", mapStore.addedPoint.long);
    setFieldValue("lat", mapStore.addedPoint.lat);
  }
});

onMounted(() => {
  mapStore.addedPoint = {
    id: "1",
    name: "Added Point",
    description: "",
    long: CENTER_USA[0],
    lat: CENTER_USA[1],
  };
});

onBeforeRouteLeave(() => {
  if (meta.value.dirty && !submitted.value) {
    // eslint-disable-next-line no-alert
    const confirm = window.confirm("Are you sure you want to leave? Any unsaved changes will be lost");
    if (!confirm) {
      return false;
    }
  }
  mapStore.addedPoint = null;
  return true;
});
</script>

<template>
  <div class="container max-w-md ml-auto mr-10">
    <div class="my-4">
      <h1 class="text-2xl mb-2">
        Add location
      </h1>
      <p>
        A location is a place you have traveled or will travel to. It can be a city, country, state or point of interest. You can add specific times you visited this location after adding it.
      </p>
      <br>
      <p>To set the coordinates: </p>
      <ul class="list-disc ml-4">
        <li class="text-sm">
          Drag the <Icon name="tabler:map-pin" class="text-warning" /> marker to your desired location.
        </li>
        <li class="text-sm">
          Double click on your desired location.
        </li>
        <li class="text-sm">
          Search for a location below.
        </li>
      </ul>
    </div>
    <div
      v-if="submitError"
      role="alert"
      class="alert alert-error"
    >
      <span>{{ submitError }}</span>
    </div>
    <form class="flex flex-col gap-2" @submit.prevent="onSubmit">
      <AppFormField
        :disabled="loading"
        name="name"
        label="Name"
        :error="errors.name"
      />
      <AppFormField
        :disabled="loading"
        name="description"
        label="Description"
        field-type="textarea"
        :error="errors.description"
      />
      <p class="text-xs text-gray-500">
        Curent coordinates: {{ formatNumber(controlledValues.lat) }}, {{ formatNumber(controlledValues.long) }}
      </p>

      <div class="flex justify-end gap-2">
        <button
          :disabled="loading"
          type="button"
          class="btn btn-outline"
          @click="router.back()"
        >
          Cancel
          <Icon name="tabler:cancel" size="24" />
        </button>
        <button
          :disabled="loading"
          type="submit"
          class="btn btn-primary"
        >
          Add
          <span v-if="loading" class="loading loading-spinner loading-sm" />
          <Icon
            v-else
            name="tabler:circle-plus-filled"
            size="24"
          />
        </button>
      </div>
    </form>
    <div class="divider" />
    <AppPlaceSearch @result-selected="searchResultSelected" />
  </div>
</template>
