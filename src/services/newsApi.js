import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

const newsApiHeaders = {
  "x-bingapis-sdk": "true",
  "x-rapidapi-host": "bing-news-search1.p.rapidapi.com",
  "x-rapidapi-key": "15060a89dcmsh4c5bec2760d15bdp1e34b4jsn225519261bf8",
};
const createRequest = (url) => ({ url, headers: newsApiHeaders });
const baseUrl = "https://bing-news-search1.p.rapidapi.com";

export const newsApi = createApi({
  reducerPath: "newsApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getNews: builder.query({
      query: ({ topic, count }) =>
        createRequest(
          `/news/search?q=${topic}&freshness=day&textFormat=Raw&safeSearch=Off&count=${count}`
        ),
    }),
  }),
});

export const { useGetNewsQuery } = newsApi;
