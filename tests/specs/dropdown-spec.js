const chai = require("chai");

describe('Chain locators', () => {

    async function calculation(inputAa, inputB, operation){
        element(by.model("first")).sendKeys(inputAa);
        element(by.model("second")).sendKeys(inputB);

        element.all(by.tagName("option")).each((item)=> {
            item.getAttribute("value").then((option)=>{
                if(option===operation){
                    item.click();
                }
            })
        })

        element(by.id("gobutton")).click();
    }

    it('should chain all locators', () => {
        
        browser.get("http://juliemr.github.io/protractor-demo/");

        calculation(10, 10, "MULTIPLICATION");
        
        expect(element(by.css("h2[class='ng-binding']")).getText()).toEqual("100");

        element(by.repeater("result in memory")).element(by.css("td:nth-child(2)")).getText().then( (text) =>{
            console.log(text);
        })
    });
});