import { test, expect } from '@playwright/test';
import { faker } from "@faker-js/faker";

test('contact form as submit', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.fill('#name', faker.person.firstName());
  await page.fill('#email', faker.internet.email());
  await page.fill('#titre', faker.lorem.sentence(5));
  await page.fill('#content', faker.lorem.paragraph());
  await page.click('button[type="submit"]');
  await page.waitForSelector('.toast-message');

  const confirmationMessage = await page.textContent('.toast-message');

  expect(confirmationMessage).toContain('Formulaire envoyé. Nous vous répondrons sous les plus brefs délais');
});

