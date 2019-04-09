# "vl-datepicker" Web Component
De ["datepicker" component van Webuniversum Vlaanderen](https://overheid.vlaanderen.be/webuniversum/v3/documentation/forms/vl-ui-datepicker/) als Web Component.

## Installation
```
npm install --save vl-ui-datepicker
```

## Demo
```
npm run demo
```

## Kanttekening
Deze web component is niet zomaar een wrapper rond de Webuniversum component.

De web component gebruikt van de Webuniversum component enkel de markup en de css.

De web component gebruikt NIET de JavaScript van de Webuniversum component, 
en ook niet de classes en data-attributen die dienen voor aansturing van de 
achterliggende Flatpickr code; de web component implementeert de Flatpickr 
datepicker rechtstreek, dat wil zeggen, eigen attributen worden rechtstreeks 
naar Flatpickr opties omgezet en de Flatpickr methods worden rechtstreeks 
aangesproken.

**Deze component ondersteunt tenminste de features die ook door de Webuniversum component worden ondersteund:**
* datepicker, timepicker, date-timepicker en date-rangepicker
* standaard nederlandstalig
* instelbaar formaat
* standaard formaat dd-mm-jjjj
* human-friendly formaat
* voorinstelbare datum
* minimum en maximum datum
* minimum en maximum tijd
* standaard 24-uurs tijdnotatie
* optioneel 12-uurs AM/PM notatie

**De web component ondersteunt daarnaast nog enkele andere Flatpickr features:**
* optioneel engels, frans en duits
* de multiple-date modus (variant om in één keer meerdere datums te kiezen)
* de optie om weekeinden en/of willekeurige datums te disabelen

**Volgende features worden NIET ondersteund:**

* De variant om een date-range met tijden te selecteren
* De variant om meerdere datums met tijden te selecteren
* De variant om een tijd-range te selecteren

Voor deze varianten is dit geen geschikte component. 

Flatpickr biedt daarnaast nog een hoop andere opties die in deze component NIET worden ondersteund.

**Bijzonder punt van aandacht:**

Standaard wordt de flatpickr datepicker aan het eind van de body-tag gehangen.
Ook bij de Webuniversum component is dit zo.

Voor de Web Component zouden we, omwille van encapsulatie, 
de picker liever binnen de shadow DOM van de web component houden
(met behulp van de 'appendTo' optie van flatpickr) maar dit geeft problemen:
in combinatie met een fixed, absolute, of relative gepositioneerde container 
(zoals een modal) is de positionering van de picker dan niet meer correct.

Bovendien kan het gevolgen hebben voor de effectiviteit van de z-index:
als de webcomponent een 'ancestor' heeft met een z-index,
heeft de z-index van de picker enkel effect binnen de 'stacking context'
van deze ancestor.

Voor nu is de datepicker dus geïmplementeerd zoals de Webuniversum component 
en zoals de standaard Flatpickr, en dus met gobal styling.

## Credits
Zie de lijst van [ontwikkelaars](https://github.com/milieuinfo/webcomponent-vl-ui-datepicker/graphs/contributors) die meegewerkt hebben aan de webcomponent.

## Contact
Mail je suggesties, opmerkingen of tips naar [help@omgevingvlaanderen.be](mailto:help@omgevingvlaanderen.be)
