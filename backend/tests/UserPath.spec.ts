import { test, expect } from '@playwright/test';
import { faker } from "@faker-js/faker";

test('User path to create account / log in / create file / write a code on it / execute / return the right result', async ({ page }) => {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const userName = faker.internet.userName();
  const email = faker.internet.email();
  const password = faker.internet.password({
    length: 8,
    prefix: "@A",
  });
  const fileName = faker.word.adjective();

  await page.goto('http://localhost:3000/');
  await page.getByRole('link', { name: 'S\'inscrire' }).click();
  await page.getByPlaceholder('Prénom').fill(firstName);
  await page.getByPlaceholder('Nom', { exact: true }).fill(lastName);
  await page.getByPlaceholder('Pseudo*').fill(userName);
  await page.getByPlaceholder('Email*').fill(email);
  await page.getByPlaceholder('Mot de passe*').fill(password);
  await page.getByRole('button', { name: 'S\'inscrire' }).click();
  await page.getByRole('button', { name: 'Mon compte' }).click();
  await page.getByRole('link', { name: 'Mes fichers' }).click();
  await page.getByRole('button', { name: 'Fichier' }).click();
  await page.getByPlaceholder('Nom du fichier').fill(fileName);
  await page.selectOption( '#languages', 'javascript');
  await page.getByLabel('Langage').selectOption('1');
  await page.getByRole('button', { name: 'Valider' }).click();
  await page.waitForLoadState('domcontentloaded');
  await page.getByRole('button', { name: 'Valider' }).click();
  await page.getByRole('code').locator('div').filter({ hasText: '// Write a code' }).nth(3).click();
  await page.waitForLoadState('domcontentloaded');
  await page.getByLabel('Editor content;Press Alt+F1').fill('console.log(4+4)');
  await page.locator('div').filter({ hasText: /^console\.log\(4\+4\)$/ }).nth(3).click();
  await page.getByLabel('Editor content;Press Alt+F1').fill('console.log(4+4);');
  await page.getByRole('button', { name: 'Executer' }).click();
  await page.waitForTimeout(2000);

  const console = await page.textContent('.console');
  expect(console).toContain('8');
});

