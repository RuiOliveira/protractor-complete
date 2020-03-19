const car = require("../objects/jsobjectsDemo");
const data = require("../../data/data-dataprovider-jasmine");
var using = require('jasmine-data-provider');

describe('Protracto babe steps', () => {
    
    beforeEach(() => {
        car.getURL();
    });

    //invoke jasmine data provider
    //data stores actual data
    //description stores sub object name
    //for every iteration one data set is picked
    using(data.dataDriver, function(data, description) {
        it('Should open Angular js site '+ description, async () => {

            car.firstInput.sendKeys(data.firstInput);
            car.secondInput.sendKeys(data.secondInput);
            car.goButton.click();
    
            expect(await car.result.getText()).toEqual(data.result);
        });
    });

    afterEach(() => {
        console.log("Testing is completed!");
    });
});