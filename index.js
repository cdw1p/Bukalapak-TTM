const puppeteer = require('puppeteer')
const delay = require('delay')

// Pupetter config
const puppeteerOptions = {
    headless: false,
    ignoreDefaultArgs: ['--disable-extensions'],
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu', '--single-process', '--no-first-run', '--disable-notifications']
}

;(async () => {
  try {
    const options = { waitUntil: 'networkidle2' }
    browser = await puppeteer.launch(puppeteerOptions)

    // BukaLapak configuration
    let username = '' // your username
    let nohp = '' // your number phone

    for (var i=1; i>0; i++) {
        // Start new page
        const page = await browser.newPage()

        // Start button
        await page.goto(`https://bukalapak2.typeform.com/to/wuRc3I?username=${username}`, options)
        const startButton = await page.$('button[data-qa=start-button]')
        await startButton.focus()
        await startButton.click()
        await startButton.dispose()
        await delay(1000)

        // Input number phone field
        const nohpField = await page.$('input[data-qa=phone-number-input]')
        await nohpField.click()
        await nohpField.type(nohp)
        await nohpField.dispose()
        await delay(1000)

        // Submit button
        await page.keyboard.down('Control')
        await page.keyboard.press('Enter')
        await delay(1000)

        // Close current page
        await page.close()
    }
  } catch(e) {
    console.log(e)
  }
})()