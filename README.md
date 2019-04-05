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
Deze web component is niet alleen maar een wrapper rond de Webuniversum component.

Deze component gebruikt van de Webuniversum component enkel de markup en de css; niet de JavaScript, en ook niet de classes en data- attributen die worden gebruikt voor de binding van opties.

Deze component implementeert rechtstreek de Flatpickr datepicker/ Dat wil zeggen: eigen attributen worden rechtstreeks naar Flatpickr opties omgezet en de Flatpickr methods worden rechtstreeks aangesproken.

Deze component ondersteunt tenminste de opties die ook door de Webuniversum component worden Ondersteund:
* nederlandstalig
* instelbaar formaat
* vooringestelde datum
* minimum en maximum datum
* minimum en maximum tijd
* Volgende varianten: datepicker, timepicker, date-timepicker, date-rangepicker en date-time-rangepicker
* 24-uurs tijdsnotatie
* human-friendly format

De component ondersteunt daarnaast nog enkele andere Flatpickr opties:
* optioneel engels, frans en duits
* variant om in één keer meerdere datums te kiezen
* optie om bepaalde datums te disabelen  


## Credits
Zie de lijst van [ontwikkelaars](https://github.com/milieuinfo/webcomponent-vl-ui-datepicker/graphs/contributors) die meegewerkt hebben aan de webcomponent.

## Contact
Mail je suggesties, opmerkingen of tips naar [help@omgevingvlaanderen.be](mailto:help@omgevingvlaanderen.be)
