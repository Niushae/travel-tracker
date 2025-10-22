import type { FetchError } from "ofetch";

export default function getFetchErrorMessage(error: FetchError) {
  return error.data?.message || error.message || "An unknown error occurred.";
}
