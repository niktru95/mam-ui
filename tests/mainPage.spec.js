import { test, expect } from "@playwright/test";
import BasePage from "../pages/BasePage";
import mainPage from "../selectors/mainPage";
import * as allure from "allure-js-commons";

const URL = "https://niktru95.github.io/practiceLayout/";
const cityName = "Москва";
const baseURL = "https://api.openweathermap.org";

test.describe("Главная страница", () => {
  test("Пара проверок на главной странице", async ({ page }) => {
    const basePage = new BasePage(page);

    await allure.step("Перейти по ссылке", async () => {
      await allure.step("Открыть страницу", async () => {
        await basePage.goto(URL);
      });
      await allure.step("Проверить URL страницы", async () => {
        await basePage.checkUrl(URL);
      });
    });

    await allure.step("Исследовать заголовок страницы", async () => {
      await allure.step("Проверить заголовок", async () => {
        await basePage.checkTitle("MA,m — Ледокольный газовоз");
      });
    });

    await allure.step("Исследовать кнопку Подробнее", async () => {
      await allure.step("Проверить видимость кнопки", async () => {
        await basePage.checkVisible(mainPage.moreButton);
      });
      await allure.step("Кликнуть на кнопку", async () => {
        await basePage.click(mainPage.moreButton);
      });
      await allure.step("Проверить переход на новую страницу", async () => {
        await basePage.checkUrl(
          "https://mintrans.gov.ru/press-center/news/9557"
        );
      });
    });
  });
});

test.describe("API тесты", () => {
  test("Проверка API погода", async ({ playwright }) => {
    const apiContext = await playwright.request.newContext();
    const response = await apiContext.get(
      `${baseURL}/data/2.5/weather?q=${cityName}&appid=${process.env.API_KEY}`
    );
    const dataResponse = await response.json();

    await allure.step("Проверить статус ответа", async () => {
      await allure.step("Статус ответа 200", async () => {
        expect(response.status()).toBe(200);
      });
    });

    await allure.step("Исследовать содержимое ответа", async () => {
      await allure.step("Название города - Москва", async () => {
        expect(dataResponse.name).toBe("Moscow");
      });
      await allure.step("Код страны - RU", async () => {
        expect(dataResponse.sys.country).toBe("RU");
      });
    });
  });
});
