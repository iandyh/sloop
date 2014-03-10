chrome.runtime.sendMessage({method: 'getLocalStorage', key: STORAGE_KEY}, function(response){
    var
       price_selector;
        to_currencies = response.split(',');

    if ($('#priceblock_ourprice').text()) {
        price_selector = '#priceblock_ourprice';
    } else {
        price_selector = '.priceLarge';
    }
    from_currency = 'USD';

    cfg.prices = [$(price_selector).text().slice(1).trim().replace(',', '')];
    cfg.parentEles = [$(price_selector).parent()];
    to_currencies.remove(from_currency);
    cfg.toCurrencies = to_currencies;
    cfg.fromCurrency = from_currency;
    cfg.hasHoverEvent = true;
    cfg.hoverElement = $('.swatchInnerText');
    cfg.priceSelParents = '.swatchOuter';
    cfg.priceSelector = price_selector;
    cfg._type = 'amazon-us';

    currency_converter.init(cfg);
})
