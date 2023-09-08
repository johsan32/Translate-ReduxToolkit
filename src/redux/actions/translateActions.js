import { createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import { options } from "../../constant/constant";

export const getLanguages = createAsyncThunk("getLanguages", async () => {
  const res = await axios.request(options);
  const data = res.data.data.languages;

  const language = data.map((item) => ({
    value: item.code,
    label: item.name,
  }));
  return language;
});


export const translateQuery = createAsyncThunk(
  "translateQuery",
async (params) => {
  const encodedParams = new URLSearchParams();
  encodedParams.set('source_language', params.currentLang.value);
  encodedParams.set('target_language', params.targetLang.value);
  encodedParams.set('text', params.query);
  
  const options = {
    method: 'POST',
    url: 'https://text-translator2.p.rapidapi.com/translate',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'X-RapidAPI-Key': 'apikey ekleyin',
      'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
    },
    data: encodedParams,
  };
  const res = await axios.request(options);
  console.log(res.data);
	return res.data.data.translatedText;
}

)