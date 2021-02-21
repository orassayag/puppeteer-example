const puppeteer = require('puppeteer');
const { textUtils } = require('../utils');

class CrawlLogic {

    constructor() { }

    async run() {

        (async () => {
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            await page.setRequestInterception(true);
            page.on('request', (request) => {
                if (['image', 'stylesheet', 'font', 'script'].indexOf(request.resourceType()) !== -1) {
                    request.abort();
                } else {
                    request.continue();
                }
            });

            const url = 'https://search.infospace.com/serp?q=%D7%93%D7%A8%D7%95%D7%A9%D7%94+%D7%9E%D7%A0%D7%94%D7%9C%D7%AA&page=3&sc=z0oJpdvGyMzA1UZy-A-iHrgkKez0bVU6QNQuoALVpCqRkY1i_Cvm971VTlJoltnOOFDZ4HubWMckljyirce16LWikuiXxcJILznf64-Y7-YhB6HtxeR2QB14XGCQwoAmwpg3FXzUK9dN0AxbCyEoXokdyLVZhwPG78Qm9RS1asxIwbaJeIu_p5oim6sheud2YbtAqBWprrnhsJrRivJWUnAzFF5rLFJbAV4RYgomArYG_AiWC42Xcx8YT5pPBQh2bkjgQUKPVlYht8xYCLZ4hMep9df1_dWSqdQc-SGfXyTWSJO-yfEhKIJ3O-0FNClodoIMgFZ5oVSPYCKNtSczE47ns9bvS3WySa53pYY_gOksZwS735d_mpMLMEfdAA621IuaV2vGqL0i0S_UtESCLmOudmmsNqE49JOnYA1qpCgA7OAmT2nUoElswVrjOUtTlC-NxBZ0h9MsrKhreVK3KAWdMFtmSxOYfK-fL3lGrMtOidDNipg106lAp5wwv_rI0BNXAKykijSFtZ_xhxzJf_3nY0ThLmIatLEX_9ucd3kJqpkfVJ6v8miHa59_AjZLc7guRG63Qik1L1XYEH5ChwSwNW4KOtPUbYn7iWdV96sKbLdX6otybTwcWO0spJ6WFb122k64dSkkL0olMpprzVDtXJN1N8o8LYl8fXIne7iEbqX_guGcPMm4OYzpSiKsYTLetR3Upf3PWmG0LO4BEGTNVG1_p3Pf3M-8BfQ4T1n0J0JifcnaFYehSrHXxmq3-FfUqolqfAUuGa8hTCF22v9DKVO_sdPlXKnvhs1mIuig2cY0-Nd7T74Ds3_kcYN6PNoC_4emi4dajAYbZovVyWXSGI9hsHBL4o5kMhQPeOpS0KLgw6JEJGTyUpZtPXFbQeDyjzg8dClWEQ9OUtF24CRGyscfeINZjwS-BcZxxnNxMdXtKyzPHNTd_bOQXIpKO4KeIeIKSCna-4DO4gxVngeK3WZdQVDhwJXPukaGd-dvPytH09ASWgZ328-pwSAB6iC6jfX2MTCT3eDjzsgWGI6Ouj-Z4ZLoSRq2d6g4X8Zarl5GpNrES53BWgl8qINxaITNHwFRC5tbynJU9tHuAFpTrLf1P9sPQStskQE8YyRE_h07H7FWStZEmkXsQ9_bfVnDjN6TgxU7AO-uMtNdGFzt7WbVSRMm258rew8S65ZzRItTlvKEbFWR76YWvbrfgfPFgqM91ITfk3z0aPLOez6IxiYKRTONF-w3_Y3yRt60vH17to5fNoSTXUOp9PYaOdCiVdnJ3l991EkIdH0blKSBUGGJ7AxinRZ9ZNSHOpNSAWW68i6W_B5oTJSdp1ONl1z-SVM1maSgQWtnLjAKwUwXVZvUR8uoPSdmxbVY25YVJPtkR50wtYQuJTo';
            await page.goto(url,
                {
                    waitUntil: 'load',
                    timeout: 0
                });

            await page.waitForFunction(
                'document.querySelector("body")'
            );

            const content = await page.content();
            const URLs = textUtils.getURLAddresses(content);
            URLs.forEach(e => console.log(e));

            await browser.close();
        })();
    }
}

module.exports = CrawlLogic;