
var ArticleAjax = function (paged) {
    this.paged = paged;
}

ArticleAjax.prototype.init = function () {
    // when clicked on
    this._prepareCategoryLinks();
}


ArticleAjax.prototype.ajaxRequest = function (extra_args, extra_data) {
    let result_args = extra_args || {},
        result_data = extra_data || {};

    result_data['paged'] = this.paged;
    result_data['ajax_type'] = 'articles';

    jQuery('.ajax-insert').addClass('ajax-loading');

    // TODO: Use your own library or use Navigation from helpers
    // scroll up
    /**var navigation = new Navigation();
     navigation.scrollTo($('.box_filter_tabs'), -70); *//

    var myAjax = new MyAjax();
    myAjax.sendRequest(result_args, result_data, function (request_data) {
        $('.ajax-insert').removeClass('ajax-loading');
        let urlData = {
            category: extra_data.category || '',
            paged: request_data.currentPage || ''
        };
        myAjax.updateUrl(urlData);
    });
}


ArticleAjax.prototype._prepareCategoryLinks = function () {
    let __this = this;
    $('.category-links li').on('click', function (e) {
        e.preventDefault();
        var category = $(this).data('category');
        __this.paged = 1;

        __this.ajaxRequest({category: category});
    });
}


jQuery(function ($) {
    if (jQuery('.js-ajax-article').length > 0) {
        var ajaxArticle = new ArticleAjax(jQuery('.js-ajax-article').data('paged'));
        ajaxArticle.init();
    }
});