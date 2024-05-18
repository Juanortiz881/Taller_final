import { test, expect } from '@playwright/test';

test('login con vacio', async ({ page }) => {
  await page.goto('https://buggy.justtestit.org/');
  await page.getByRole('link', { name: 'Register' }).click();
  await page.getByLabel('Login').click();
  await page.getByLabel('Login').fill(' ');
  await page.getByLabel('First Name').click();
  await page.getByLabel('First Name').fill(' ');
  await page.getByLabel('Last Name').click();
  await page.getByLabel('Last Name').fill(' ');
  await page.getByLabel('Password', { exact: true }).click();
  await page.getByLabel('Password', { exact: true }).fill(' ');
  await page.getByLabel('Confirm Password').click();
  await page.getByLabel('Confirm Password').fill(' ');
  await page.getByRole('button', { name: 'Register' }).click();
  await page.getByText('InvalidParameter: 1').click();  
});
test('usuario repetido', async ({ page }) => {
  await page.goto('https://buggy.justtestit.org/');
  await page.getByRole('link', { name: 'Register' }).click();
  await page.getByLabel('Login').click();
  await page.getByLabel('Login').fill('pepo');
  await page.getByLabel('First Name').click();
  await page.getByLabel('First Name').fill('juan');
  await page.getByLabel('Last Name').click();
  await page.getByLabel('Last Name').fill('toro');
  await page.getByLabel('Password', { exact: true }).click();
  await page.getByLabel('Password', { exact: true }).fill('Juan123.');
  await page.getByLabel('Confirm Password').click();
  await page.getByLabel('Confirm Password').fill('Juan123.');
  await page.getByRole('button', { name: 'Register' }).click();
  await page.getByText('UsernameExistsException: User').click();
});
test('parametros de contraceña', async ({ page }) => {
  await page.goto('https://buggy.justtestit.org/');
  await page.getByRole('link', { name: 'Register' }).click();
  await page.getByLabel('Login').click();
  await page.getByLabel('Login').fill('pepo1');//tiene que ser un usuario que no se a registrado
  await page.getByLabel('First Name').click();
  await page.getByLabel('First Name').fill('juan');
  await page.getByLabel('Last Name').click();
  await page.getByLabel('Last Name').fill('toro');
  await page.getByLabel('Password', { exact: true }).click();
  await page.getByLabel('Password', { exact: true }).fill('Juan123');
  await page.getByLabel('Confirm Password').click();
  await page.getByLabel('Confirm Password').fill('Juan123');
  await page.getByRole('button', { name: 'Register' }).click();
  await page.getByText('InvalidPasswordException:').click();
  await page.getByLabel('Password', { exact: true }).click();
  await page.getByLabel('Password', { exact: true }).fill('Juan123.');
  await page.getByLabel('Confirm Password').click();
  await page.getByLabel('Confirm Password').fill('Juan123.');
  await page.getByRole('button', { name: 'Register' }).click();
  await page.getByText('Registration is successful').click();
});
test('mensajes de errores claros', async ({ page }) => {
  await page.goto('https://buggy.justtestit.org/');
  await page.getByRole('link', { name: 'Register' }).click();
  await page.getByLabel('Login').click();
  await page.getByLabel('Login').fill('" "');
  await page.getByLabel('First Name').click();
  await page.getByLabel('First Name').fill('juan');
  await page.getByLabel('Last Name').click();
  await page.getByLabel('Last Name').fill('toro');
  await page.getByLabel('Password', { exact: true }).click();
  await page.getByLabel('Password', { exact: true }).fill('Juan123.');
  await page.getByLabel('Confirm Password').click();
  await page.getByLabel('Confirm Password').fill('Juan123.');
  await page.getByText('InvalidParameterException: 1').click();
});
test('campos de texto con pista para llenarlo', async ({ page }) => {
  await page.goto('https://buggy.justtestit.org/');
  await page.getByPlaceholder('Login').click();
  await page.locator('input[name="password"]').click();
});
test('actualizacion de perfil', async ({ page }) => {
  await page.goto('https://buggy.justtestit.org/');
  await page.getByPlaceholder('Login').click();
  await page.getByPlaceholder('Login').fill('pepo');
  await page.locator('input[name="password"]').click();
  await page.locator('input[name="password"]').fill('Juan123.');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('link', { name: 'Profile' }).click();
  await page.getByLabel('First Name').click();
  await page.getByLabel('First Name').fill('juan andres');
  await page.getByLabel('Gender').click();
  await page.getByLabel('Gender').fill('Male');
  await page.getByLabel('Age', { exact: true }).click();
  await page.getByLabel('Age', { exact: true }).fill('20');
  await page.getByRole('button', { name: 'Save' }).click();
  await page.getByText('The profile has been saved').first().click();
});
test('usuario no registrado votar', async ({ page }) => {
  await page.goto('https://buggy.justtestit.org/');
  await page.locator('my-home').getByRole('link').nth(2).click();
  await page.getByRole('link', { name: 'Lamborghini Diablo' }).click();
  await page.getByText('You need to be logged in to').click();
});
test('votar una vez por el mismo auto', async ({ page }) => {
  await page.goto('https://buggy.justtestit.org/');
  await page.getByPlaceholder('Login').click();
  await page.getByPlaceholder('Login').fill('pepo1');//tiene que ser un usuario registrado que no halla votado
  await page.locator('input[name="password"]').click();
  await page.locator('input[name="password"]').fill('Juan123.');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.locator('my-home').getByRole('link').nth(2).click();
  await page.getByRole('link', { name: 'Lamborghini Diablo' }).click();
  await page.getByRole('button', { name: 'Vote!' }).click();
  await page.getByText('Thank you for your vote!').click();
});
test('aumento de numero en la votacion', async ({ page }) => {
  await page.goto('https://buggy.justtestit.org/');
  await page.getByPlaceholder('Login').click();
  await page.getByPlaceholder('Login').fill('pepo2');//tiene que ser un usuario registrado que no halla votado
  await page.locator('input[name="password"]').click();
  await page.locator('input[name="password"]').fill('Juan123.');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.locator('my-home').getByRole('link').nth(2).click();
  await page.getByRole('link', { name: 'Lamborghini Diablo' }).click();
  await page.getByRole('button', { name: 'Vote!' }).click();
  await page.getByRole('heading', { name: 'Votes:' }).click();
});
test('votar y comentar', async ({ page }) => {
  await page.goto('https://buggy.justtestit.org/');
  await page.getByPlaceholder('Login').click();
  await page.getByPlaceholder('Login').fill('pepo3');//tiene que ser un usuario registrado que no halla votado
  await page.locator('input[name="password"]').click();
  await page.locator('input[name="password"]').fill('Juan123.');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.locator('my-home').getByRole('link').nth(2).click();
  await page.getByRole('link', { name: 'Lamborghini Diablo' }).click();
  await page.getByLabel('Your Comment (optional)').click();
  await page.getByLabel('Your Comment (optional)').fill('hola');
  await page.getByRole('button', { name: 'Vote!' }).click();
  await page.getByText('Thank you for your vote!').click();
});