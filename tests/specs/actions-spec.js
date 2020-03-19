const chai = require("chai");

describe('Actions', () => {
    it('should open posse website', () => {
        
        browser.get("http://posse.com/");        

        element(by.model("userInputQuery")).sendKeys("river");
        browser.actions().mouseMove(element(by.model("locationQuery")).sendKeys("London")).perform();

        await browser.actions.sendKeys(protractor.Key.ARROW_DOWN).perform();
        await browser.actions.sendKeys(protractor.Key.ENTER).perform();

        browser.getAllWindowHandles().then((handles)=>{
            browser.switchTo().window(handles[1]);
            
            let title = browser.getTitle();

            console.log("The title of the page is " + await title);

            browser.switchTo().window(handles[0]);
            
            browser.alert()
        })
    });
});