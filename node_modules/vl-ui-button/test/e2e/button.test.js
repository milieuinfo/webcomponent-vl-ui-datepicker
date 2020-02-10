
const { assert, driver } = require('vl-ui-core').Test.Setup;
const VlButtonPage = require('./pages/vl-button.page');

describe('vl-button', async () => {
    const vlButtonPage = new VlButtonPage(driver);

    before(() => {
        return vlButtonPage.load();
    });

    it('als gebruiker wil ik dat mijn klik geregistreerd wordt wanneer ik op een knop klik', async () => {
        const button = await vlButtonPage.getPrimaryButton();
        await assert.eventually.equal(button.getText(), 'Gegevens opslaan');
        await button.click();
        await assert.eventually.equal(button.getText(), 'Klik geregistreerd');
    });

    it('als gebruiker wil ik niet dat mijn klik geregistreerd wordt wanneer ik op een disabled knop klik', async () => {
        const button = await vlButtonPage.getDisabledButton();
        await assert.eventually.equal(button.getText(), 'Gegevens opslaan'),
        await button.click(),
        await assert.eventually.equal(button.getText(), 'Gegevens opslaan');
        await assert.eventually.equal(button.isEnabled(), false);
        await assert.eventually.equal(button.isDisabled(), true);
    });

    it('als gebruiker wil ik het verschil kunnen zien tussen een error en een gewone knop', async () => {
        const primaryButton = await vlButtonPage.getPrimaryButton();
        const errorButton = await vlButtonPage.getErrorButton();
        await assert.eventually.equal(primaryButton.isError(), false);
        await assert.eventually.equal(errorButton.isError(), true);
    });

    it('als gebruiker wil ik het verschil kunnen zien tussen een knop met en zonder icoon', async () => {
        const primaryButton = await vlButtonPage.getPrimaryButton();
        const iconBeforeButton = await vlButtonPage.getIconBeforeButton();
        const iconBeforeButtonIcon = await iconBeforeButton.getIcon();
        await assert.eventually.equal(primaryButton.hasIcon(), false);
        await assert.eventually.equal(iconBeforeButton.hasIcon(), true);
        await assert.eventually.equal(iconBeforeButtonIcon.getIcon(), 'location');
    });

    it('als gebruiker wil ik een icoon voor en na de tekst in de knop kunnen zien', async () => {
        const iconBeforeButton = await vlButtonPage.getIconBeforeButton();
        const iconAfterButton = await vlButtonPage.getIconAfterButton();
        const iconBeforeButtonIcon = await iconBeforeButton.getIcon();
        const iconAfterButtonIcon = await iconAfterButton.getIcon();
        await assert.eventually.equal(iconBeforeButton.getText(), 'Contactpersoon opslaan');
        await assert.eventually.equal(iconBeforeButtonIcon.isBefore(), true);
        await assert.eventually.equal(iconBeforeButtonIcon.isAfter(), false);
        await assert.eventually.equal(iconAfterButton.getText(), 'Contactpersoon opslaan');
        await assert.eventually.equal(iconAfterButtonIcon.isBefore(), false);
        await assert.eventually.equal(iconAfterButtonIcon.isAfter(), true);
    });

    it('als gebruiker wil ik het verschil kunnen zien tussen een block en een gewone knop', async () => {
        const primaryButton = await vlButtonPage.getPrimaryButton();
        const blockButton = await vlButtonPage.getBlockButton();
        await assert.eventually.equal(primaryButton.isBlock(), false);
        await assert.eventually.equal(blockButton.isBlock(), true);
    });

    it('als gebruiker wil ik het verschil kunnen zien tussen een large en een gewone knop', async () => {
        const primaryButton = await vlButtonPage.getPrimaryButton();
        const largeButton = await vlButtonPage.getLargeButton();
        await assert.eventually.equal(primaryButton.isLarge(), false);
        await assert.eventually.equal(largeButton.isLarge(), true);
    });

    it('als gebruiker wil ik het verschil kunnen zien tussen een wide en een gewone knop', async () => {
        const primaryButton = await vlButtonPage.getPrimaryButton();
        const wideButton = await vlButtonPage.getWideButton();
        await assert.eventually.equal(primaryButton.isWide(), false);
        await assert.eventually.equal(wideButton.isWide(), true);
    });

    it('als gebruiker wil ik het verschil kunnen zien tussen een narrow en een gewone knop', async () => {
        const primaryButton = await vlButtonPage.getPrimaryButton();
        const narrowButton = await vlButtonPage.getNarrowButton();
        await assert.eventually.equal(primaryButton.isNarrow(), false);
        await assert.eventually.equal(narrowButton.isNarrow(), true);
    });

    it('als gebruiker wil ik het verschil kunnen zien tussen een loading en een gewone knop', async () => {
        const primaryButton = await vlButtonPage.getPrimaryButton();
        const loadingButton = await vlButtonPage.getLoadingButton();
        await assert.eventually.equal(primaryButton.isLoading(), false);
        await assert.eventually.equal(loadingButton.isLoading(), true);
    });

    it('als gebruiker wil ik het verschil kunnen zien tussen een secondary en een gewone knop', async () => {
        const primaryButton = await vlButtonPage.getPrimaryButton();
        const secondaryButton = await vlButtonPage.getSecondaryButton();
        await assert.eventually.equal(primaryButton.isSecondary(), false);
        await assert.eventually.equal(secondaryButton.isSecondary(), true);
    });

    it('als gebruiker wil ik het verschil kunnen zien tussen een tertiary en een gewone knop', async () => {
        const primaryButton = await vlButtonPage.getPrimaryButton();
        const tertiaryButton = await vlButtonPage.getTertiaryButton();
        await assert.eventually.equal(primaryButton.isTertiary(), false);
        await assert.eventually.equal(tertiaryButton.isTertiary(), true);
    });

    it('als gebruiker wil ik een knop kunnen zien met alleen maar een icoon', async () => {
        const primaryButton = await vlButtonPage.getPrimaryButton();
        const iconButton = await vlButtonPage.getIconButton();
        await assert.eventually.equal(primaryButton.hasText(), true);
        await assert.eventually.equal(primaryButton.hasIcon(), false);
        await assert.eventually.equal(iconButton.hasText(), false);
        await assert.eventually.equal(iconButton.hasIcon(), true);
    });

    it('als gebruiker wil ik het verschil kunnen zien tussen een link en een gewone knop', async () => {
        const primaryButton = await vlButtonPage.getPrimaryButton();
        const linkButton = await vlButtonPage.getLinkButton();
        await assert.eventually.equal(primaryButton.isLink(), false);
        await assert.eventually.equal(primaryButton.hasIcon(), false);
        await assert.eventually.equal(linkButton.getText(), 'Ga naar startpagina');
    });

    it('als gebruiker wil ik het verschil kunnen zien tussen een pill en een gewone knop', async () => {
        const primaryButton = await vlButtonPage.getPrimaryButton();
        const pillButton = await vlButtonPage.getPillButton();
        await assert.eventually.equal(primaryButton.isPill(), false);
        await assert.eventually.equal(pillButton.isPill(), true);
        await assert.eventually.equal(pillButton.getText(), 'Optie 1');
    });

    // type gaat gewijzigd worden naar data-vl-type omdat er nu een clash is met het default type attribuut
    it('als gebruiker wil ik het verschil kunnen zien tussen een pill knop van een bepaald type en een gewone pill knop', async () => {
        const pillButton = await vlButtonPage.getPillButton();
        const pillSuccessButton = await vlButtonPage.getPillSuccessButton();
        const pillWarningButton = await vlButtonPage.getPillWarningButton();
        const pillErrorButton = await vlButtonPage.getPillErrorButton();
        await assert.eventually.equal(pillButton.isPill(), true);
        await assert.eventually.equal(pillButton.isSuccessPill(), false);
        await assert.eventually.equal(pillButton.isWarningPill(), false);
        await assert.eventually.equal(pillButton.isErrorPill(), false);
        await assert.eventually.equal(pillButton.getText(), 'Optie 1');
        await assert.eventually.equal(pillButton.getPillType(), undefined);
        await assert.eventually.equal(pillSuccessButton.isPill(), true);
        await assert.eventually.equal(pillSuccessButton.isSuccessPill(), true);
        await assert.eventually.equal(pillSuccessButton.isWarningPill(), false);
        await assert.eventually.equal(pillSuccessButton.isErrorPill(), false);
        await assert.eventually.equal(pillSuccessButton.getText(), 'Optie 1');
        await assert.eventually.equal(pillSuccessButton.getPillType(), 'success');
        await assert.eventually.equal(pillWarningButton.isPill(), true);
        await assert.eventually.equal(pillWarningButton.isSuccessPill(), false);
        await assert.eventually.equal(pillWarningButton.isWarningPill(), true);
        await assert.eventually.equal(pillWarningButton.isErrorPill(), false);
        await assert.eventually.equal(pillWarningButton.getText(), 'Optie 1');
        await assert.eventually.equal(pillWarningButton.getPillType(), 'warning');
        await assert.eventually.equal(pillErrorButton.isPill(), true);
        await assert.eventually.equal(pillErrorButton.isSuccessPill(), false);
        await assert.eventually.equal(pillErrorButton.isWarningPill(), false);
        await assert.eventually.equal(pillErrorButton.isErrorPill(), true);
        await assert.eventually.equal(pillErrorButton.getText(), 'Optie 1');
        await assert.eventually.equal(pillErrorButton.getPillType(), 'error');
    });

    it('als gebruiker wil ik het verschil kunnen zien tussen een input addon en een gewone knop', async () => {
        const primaryButton = await vlButtonPage.getPrimaryButton();
        const inputAddonButton = await vlButtonPage.getInputAddonButton();
        const inputAddonButtonIcon = await inputAddonButton.getIcon();
        await assert.eventually.equal(primaryButton.isInputAddon(), false);
        await assert.eventually.equal(inputAddonButton.isInputAddon(), true);
        await assert.eventually.equal(inputAddonButton.hasText(), false);
        await assert.eventually.equal(inputAddonButtonIcon.getIcon(), 'location');
    });

    after((done) => { 
        if (driver) {
            driver.quit();
        }
        done();
    });
});
