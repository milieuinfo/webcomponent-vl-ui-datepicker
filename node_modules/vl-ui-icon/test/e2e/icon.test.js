
const { assert, driver } = require('vl-ui-core').Test.Setup;
const VlIconPage = require('./pages/vl-icon.page');

describe('vl-icon', async () => {
    const vlIconPage = new VlIconPage(driver);

    before(() => {
        return vlIconPage.load();
    });

    it('als gebruiker wil ik het verschil kunnen zien tussen een klein en een gewoon icon', async () => {
        const icon = await vlIconPage.getIcon();
        const smallIcon = await vlIconPage.getSmallIcon();
        await assert.eventually.isFalse(icon.isSmallSize());
        await assert.eventually.isTrue(smallIcon.isSmallSize());
    });    
    
    it('als gebruiker wil ik het verschil kunnen zien tussen een licht en een gewoon icon', async () => {
        const icon = await vlIconPage.getIcon();
        const lightIcon = await vlIconPage.getLightIcon();
        await assert.eventually.isFalse(icon.isLight());
        await assert.eventually.isTrue(lightIcon.isLight());
    });    
    
    it('als gebruiker wil ik het verschil kunnen zien tussen een groot en een gewoon icon', async () => {
        const icon = await vlIconPage.getIcon();
        const largeIcon = await vlIconPage.getLargeIcon();
        await assert.eventually.isFalse(icon.isLargeSize());
        await assert.eventually.isTrue(largeIcon.isLargeSize());
    });    
    
    it('als gebruiker wil ik het verschil kunnen zien tussen een icoon dat 90 graden gedraaid is en een gewoon icon', async () => {
        const icon = await vlIconPage.getIcon();
        const icon90degree = await vlIconPage.getIcon90();
        await assert.eventually.isFalse(icon.is90Degrees());
        await assert.eventually.isTrue(icon90degree.is90Degrees());
    });   
    
    it('als gebruiker wil ik het verschil kunnen zien tussen een icoon dat 180 graden gedraaid is en een gewoon icon', async () => {
        const icon = await vlIconPage.getIcon();
        const icon180degree = await vlIconPage.getIcon180();
        await assert.eventually.isFalse(icon.is180Degrees());
        await assert.eventually.isTrue(icon180degree.is180Degrees());
    });    
    
    it('als gebruiker wil ik het verschil kunnen zien tussen een icoon waar gedefinieerd is dat het voor een tekst staat en een gewoon icoon', async () => {
        const icon = await vlIconPage.getIcon();
        const beforeIcon = await vlIconPage.getIconBefore();
        await assert.eventually.isFalse(icon.isBefore());
        await assert.eventually.isTrue(beforeIcon.isBefore());
    });    
    
    it('als gebruiker wil ik het verschil kunnen zien tussen een icoon waar gedefinieerd is dat het achter een tekst staat en een gewoon icoon', async () => {
        const icon = await vlIconPage.getIcon();
        const iconAfter = await vlIconPage.getIconAfter();
        await assert.eventually.isFalse(icon.isAfter());
        await assert.eventually.isTrue(iconAfter.isAfter());
    });

    after((done) => { 
        if (driver) {
            driver.quit();
        }
        done();
    });
});
