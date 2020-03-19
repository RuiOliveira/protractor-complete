
describe('Chain locators', () => {
    it('should chain all locators', () => {
        
        browser.get("http://juliemr.github.io/protractor-demo/");

        element(by.model("first")).sendKeys("25");
        element(by.model("second")).sendKeys("25");
        element(by.id("gobutton")).click();

        element(by.repeater("result in memory")).element(by.css("td:nth-child(2)")).getText().then( (text) =>{
            console.log(text);
        })
    });
});