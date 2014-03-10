chrome.runtime.sendMessage({method: 'getLocalStorage', key: STORAGE_KEY}, function(response){
    var
        eles = $('span[itemprop="price"], p[itemprop="price"]').length ? $('span[itemprop="price"], p[itemprop="price"]') : $('.current_price'),
        to_currencies = response.split(','),
        from_currency = 'HKD';

    var
        prices = $.map(eles, function(item, i) {
            return $(item).text().trim().slice(4).replace(',', '');
        }),
        parent_eles = $.map(eles, function(item, i) {
            return $(item).parent();
        });
    console.log(eles.length);
    cfg.prices = prices;
    cfg.parentEles = parent_eles;
    to_currencies.remove(from_currency);
    cfg.toCurrencies = to_currencies;
    cfg.fromCurrency = from_currency;
    currency_converter.init(cfg);
})
