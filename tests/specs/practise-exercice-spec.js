
describe('Practise exercice', () => {

    function selectItems(items){
         //check if title matchs
         element.all(by.tagName("app-card")).each((item)=> {
            item.element(by.css("h4[class='card-title']")).getText().then(()=>{
                if(text===items){
                    item.element(by.css("button[class='btn-info']")).click();
                }
            })
        })
    }

    it('Should open non Angular Js sites', () => {
        debugger;
        //browser.waitForAgularEnabled("false");
        browser.get("https://qaclickacademy.github.io/protocommerce/");

        element(by.name("name")).sendKeys("Mystudents");
        element(by.css("input[name='email']")).sendKeys("mystudents@gmail.com");
        element(by.id("exampleInputPassword1")).sendKeys("password2");
        element(by.id("exampleCheck1")).click();
        element(by.cssContainingText("[id='exampleFormControlSelect1'] option", "Female")).click();
        element.all(by.name("inlineRadioOptions")).first().click();
        
        element(by.buttonText("Submit")).click().then((text)=>{
            element(by.css("div[class='success']")).getText().then((text)=> {
                console.log(text);
            })
            element(by.name("name")).clear();
            element(by.name("name")).sendKeys("M").then(()=>{
                element(by.css("[class='alert alert-danger']")).getText().then((text)=>{
                    console.log(text);
                })
            })
        })
        element(by.linkText("Shop")).click();

        selectItems("Samsung Note 8");
    
        element(by.partialLinkText("Checkout")).getText().then((text)=>{
            let spliptedResult = text.split("(");
            let toInt = Number(spliptedResult[1].trim().charAt(0));
            expect(toInt).toEqual(2);
        })
    });
});