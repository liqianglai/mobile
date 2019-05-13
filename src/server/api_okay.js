import { get } from "./ajax";

export default {
  getRandom: () =>
    get(
      "/api_okayapi?service=App.Table.FreeRandOne&model_name=okayapi_message&logic=and&where=%5B%5B%22id%22%2C%22%3E%22%2C0%5D%5D&app_key=9CE5C376E0C7912DFE63D684DC9DED54&sign=1D3FBDB01FF41A6C73D7A36B27D94E1F"
    )
};
