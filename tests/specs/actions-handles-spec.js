
describe('Alerts and Frames', () => {
    it('Open non Angular Js sites', () => {
        
        browser.waitForAgularEnabled("false");
        browser.get("http://https://www.rahulshettyacademy.com/AutomationPractice/");
        element(by.id("confirmbtn")).click();
        
        browser.switchTo().alert().dismiss();
        });

    fit('Should deal with iframes', () => {    
        //browser.waitForAgularEnabled("false");
        browser.get("https://www.rahulshettyacademy.com/AutomationPractice/");
        
        browser.switchTo().frame("courses-iframe");
        element(by.css("a[href*=sign_in]")).getText();
        
        element(by.name("courses-iframe")).element(by.class("theme-btn"))
        

    });
});

