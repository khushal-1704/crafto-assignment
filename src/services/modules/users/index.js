import { api } from "../../api";
import {
  login,
} from "./builder";

export const userApi = api.injectEndpoints({
  endpoints: (build) => ({
    login: login(build),
  }),
  overrideExisting: true,
});

export const {
 useLoginMutation,
} = userApi;
