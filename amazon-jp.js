chrome.runtime.sendMessage({method: 'getLocalStorage', key: STORAGE_KEY}, function(response){
    var
        eles = $('span.red.bld.lrg').length ? $('span.red.bld.lrg') : [$('.priceLarge')],
        price = $('.priceLarge'),
        to_currencies = response.split(','),
        from_currency = 'JPY';
    var
        prices = $.map(eles, function(item, i) {
            return $(item).text().slice(2).trim().replace(',', '');
        }),
        parent_eles = $.map(eles, function(item, i){
            return $(item).parent();
        })
    cfg.prices = prices;
    cfg.parentEles = parent_eles;
    to_currencies.remove(from_currency);
    cfg.toCurrencies = to_currencies;
    cfg.fromCurrency = from_currency;
    cfg.hasHoverEvent = price ? true : false;
    cfg.hoverElement = $('.swatchInnerText');
    cfg.priceSelector = '.priceLarge';
    cfg.priceSelParents = '.swatchOuter';
    cfg._type = 'amazon-jp';
    cfg.eles = eles;
    currency_converter.init(cfg);
})
