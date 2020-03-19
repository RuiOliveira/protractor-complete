describe('Protracto babe steps', () => {
    
    it('Should open Angular js site', () => {
        browser.get("https://angularjs.org").then(() => {
            console.log("Success")
        }).catch((err) => {
            console.log(err)
        });
        
    });
});