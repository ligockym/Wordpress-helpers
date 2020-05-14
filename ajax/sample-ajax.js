/**
 * Steps:
 * 1. add js-ajax-sample class somewhere with attribute data-paged
 * 2. remove unneccessary
 *
 * @param paged
 * @constructor
 */

let AjaxSample = function (paged) {
    this.paged = paged;
}

AjaxSample.prototype.init = function () {
    this._prepareLoadMore();
    // when clicked on
    this._preparePagination();
    this._prepareCategoryLinks();
}

AjaxSample.prototype.ajaxRequest = function (extra_args, extra_data) {
    let result_args = extra_args || {},
        result_data = extra_data || {};

    result_data['paged'] = this.paged;
    result_data['ajax_type'] = 'articles-all';

    $('.ajax-insert').addClass('ajax-loading');

    // TODO: Use your own library or use Navigation from helpers
    // scroll up
    /**let navigation = new Navigation();
    navigation.scrollTo($('.box_filter_tabs'), -70); *//

    let myAjax = new MyAjax();
    myAjax.sendRequest({}, result_data, function (request_data) {
        $('.ajax-insert').removeClass('ajax-loading');
        let urlData = {
            category: extra_data.category || '',
            paged: request_data.currentPage || ''
        };
        myAjax.updateUrl(urlData);
    });
}

AjaxSample.prototype._prepareLoadMore = function () {
    let __this = this;
    jQuery('.load-more-button').click(function (e) {
        e.preventDefault();
        __this.paged += 1;
        __this.ajaxRequest({load_more: true});
    });
}

AjaxSample.prototype._preparePagination = function () {
    let __this = this;
    $('body').on('click', '.page-numbers', function (e) {
        e.preventDefault()
        jQuery('.active.page-numbers').removeClass('active');
        jQuery(this).addClass('active');
        __this.paged = parseInt(jQuery(this).text());
        setTimeout(function() {
            __this.ajaxRequest();
        }, 10);
    });
}

AjaxSample.prototype.makeSubnavActive = function(newActiveItem) {
    $('.magazine-categories a').removeClass('active');
    newActiveItem.find('a').addClass('active');
}

AjaxSample.prototype._prepareCategoryLinks = function () {
    let __this = this;
    $('.magazine-categories li').on('click', function (e) {
        e.preventDefault();
        let category = $(this).data('category');
        __this.paged = 1;

        __this.makeSubnavActive($(this));
        __this.ajaxRequest({category: category});
    });
}

jQuery(function ($) {
    if (jQuery('.js-ajax-sample').length > 0) {
        let ajaxSample = new AjaxSample(jQuery('.js-ajax-sample').data('paged'));
        ajaxSample.init();
    }
});