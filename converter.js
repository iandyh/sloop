var currency_converter = {

    YAHOO: 'http://query.yahooapis.com/v1/public/yql',

    init: function(cfg) {
        this.symbols = cfg.SYMBOLS;
        this.tmpl = cfg.tmpl;
        this.parentEles = cfg.parentEles;
        this.toCurrencies = cfg.toCurrencies

        var query = this.buildQuery(cfg.fromCurrency, cfg.toCurrencies);

        this.rate = this.getRate(query);
        this.showConvertedPrice(cfg.toCurrencies, cfg.prices, this.rate, this.parentEles);
        if (cfg.hasHoverEvent) {
            this.bindEvents(cfg.hoverElement, cfg.priceSelector, cfg.priceSelParents, cfg._type);
        }
    },

    showConvertedPrice: function(to_currencies, prices, rate, parent_eles) {
        var
            parsed_rates = this.parseRate(rate, to_currencies, prices);
        this.render(parsed_rates, parent_eles);
    },

    bindEvents: function(hover_ele, price_selector, price_sel_parents, _type){
        var self = this;
        hover_ele.click(function(){
            $('.converted-price').remove();
            var
            price = self.getSelectionPrices(price_selector, _type);
            self.showConvertedPrice(self.toCurrencies, [price], self.rate, [$(this).parents(cfg.priceSelParents)]);
        });
    },

    getSelectionPrices: function(price_selector, _type){
        switch (_type) {
            case 'amazon-jp':
                return $(price_selector).text().slice(2).trim().replace(',', '');
            case 'amazon-us':
                return $(price_selector).text().slice(1).trim().replace(',', '');
        }
    },

    buildQuery: function(from_currency, to_currencies) {
        var pair =
            $.map(to_currencies, function(item){
                return from_currency + item
            }).join(','),
            yql = 'select * from yahoo.finance.xchange where pair=';
        return  yql + '"' + pair + '"'
    },

    getRate: function(query) {
        var ret;
        $.ajax({
            url: this.YAHOO,
            data: {
                q: query,
                env: 'store://datatables.org/alltableswithkeys',
                format: 'json'
            },
            async: false,
            success: function(data){
                ret = data.query.results.rate;
            }
        });
        if (!(ret instanceof Array)) ret = [ret]
        return ret
    },

    parseRate: function(rate, to_currencies, prices) {
        var self = this;
        return $.map(prices, function(orig_price, i){
            var _ =  $.map(rate, function(item, j){
                var currency = to_currencies[j];
                return {
                    symbol: self.symbols[currency],
                    currency: currency,
                    price: Math.floor(parseInt(orig_price, 10) * item.Rate)
                }
            });
            return [_]
        });
    },

    render: function(rates, parents) {
        for (var i=0; i < parents.length; i++) {
            console.log(i);
            var rate = rates[i];
            $.template('tmpl', this.tmpl);
            $.tmpl('tmpl', rate).appendTo(parents[i]);
        }

    }

}


var SYMBOLS = {
    CNY: '&#165',
    USD: '&#36'
};

var STORAGE_KEY = 'converter';

var cfg = {
    tmpl : '<span class="converted-price" style="margin-left:10px; font-size:12px;">${symbol}${currency} ${price}</span>',
    SYMBOLS: SYMBOLS
}
