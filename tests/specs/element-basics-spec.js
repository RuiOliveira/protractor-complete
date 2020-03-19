const car = require("../objects/jsobjectsDemo");
const data = require("../../data/data");
describe('Protracto babe steps', () => {
    
    beforeEach(() => {
        car.getURL();
    });

    it('Should open Angular js site', async () => {
    //    await browser.get("http://juliemr.github.io/protractor-demo/").then(() => {
    //         console.log("Success")
    //     }).catch((err) => {
    //         console.log(err)
    //     });

    

        // element(by.model("first")).sendKeys("25");
        // element(by.model("second")).sendKeys("25");
        // await element(by.id("gobutton")).click();
        //Data driver
        car.firstInput.sendKeys(data.datadrive.firstInput);
        car.secondInput.sendKeys(data.datadrive.secondInput);
        car.goButton.click();

        /*
        element(by.css("h2[class='ng-binding']")).getText().then(async (text) => {
            console.log(text);
        });
        */

        //Is the same
        // console.log(await element(by.css("h2[class='ng-binding']")).getText());
        
        // let result = element(by.css("h2[class='ng-binding']"));
        expect(await car.result.getText()).toEqual("5");
    });

    afterEach(() => {
        console.log("Testing is completed!");
    });
});