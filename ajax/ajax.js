/**
 * Takes care of all ajax request for loading more articles, products, references, product filter.
 *
 * What I need to have in my code?
 * .ajax-insert - place where request will be inserted
 * .ajax-loading - class that is added for effect during loading
 *
 * In case of load_more use load_more: true for data
 *
 * @param obj (optional) - jQuery object - only if you want to capsule ajax request - .ajax-insert has to be inside this element
 * @author Marián Ligocký
 * @version 1.0.2
 */
var MyAjax = function (obj, settings) {
    if (obj) {
        this.root_el = jQuery(obj);
    } else {
        this.root_el = jQuery('body');
    }

    let default_settings = {
        load_more_btn: this.root_el.find('.load-more-button'),
        ajax_insert: this.root_el.find('ajax-insert'),
        pagination: {
            current_shown: this.root_el.find('.ajax-current-shown-items')
        }
    }

    this.settings = Object.assign(default_settings, settings);
}

/**
 * Sends request
 * @param args for all options see default_args
 * @param data any data object
 * @param callbackAfterDone optionally run MyAjax.updateUrl()
 */
MyAjax.prototype.sendRequest = function (args, data, callbackAfterDone) {
    let default_data = {
        ajax: 'articles', // specifies which ajax request you are performing
        load_more: false, // set true if you want to add products and not remove previous
    }
    let default_args = {
        ajax_url: new URL(window.location.href).href, // this url
        update_pagination: true, // whether MyAjax.updatePagination() is called
    }
    let __this = this;

    // Merge default and parameter values to create settings
    args = Object.assign(default_args, args);
    data = Object.assign(default_data, data);

    // Request itself
    $.ajax({
        url: args.ajax_url,
        data: data,

    }).done(function (result_data, textStatus, jqXHR) {
        if (args.update_pagination) {
            __this.buttonShowHide(result_data);
            __this.changePagination(result_data);
        }

        // Insert content by .ajax-insert tag
        if (__this.settings.ajax_insert.length == 0) {
            console.error('No ajax insert container');
        }
        if (data.load_more === true) {
            __this.settings.ajax_insert.append(result_data.dataView);
        } else {
            __this.settings.ajax_insert.html(result_data.dataView);
        }

        // custom callback
        if (typeof callbackAfterDone == 'function') {
            callbackAfterDone(result_data);
        }
    });
}

MyAjax.prototype.buttonShowHide = function (data) {
    var __this = this;
    if (data.total <= data.currentItemsContained) {
        __this.settings.load_more_btn.hide();
    } else {
        __this.settings.load_more_btn.show();
    }
}

/**
 * Change pagination - change active marker, add / remove pagination items if number of pages changes
 * @param data
 */
MyAjax.prototype.changePagination = function (data) {
    let number_shown_posts = data.currentItemsContained;

    // insert number of posts shown
    this.settings.pagination.current_shown.text(number_shown_posts);

    let page_numbers = this.root_el.find('.page-numbers');
    page_numbers.removeClass('active');
    let template = page_numbers.first().clone(),
        parent = page_numbers.parent();

    // remove all .page-number
    page_numbers.remove();

    // add new .page-number for each page
    for (var i = 1; i <= data.numberOfPages; i++) {
        let new_page_number = (template.clone()).appendTo(parent);
        new_page_number.text(i);
        if (i === data.currentPage) {
            new_page_number.addClass('active');
        }
    }
}

/**
 * Updates url to contain urlData
 * @param urlData - object
 */
MyAjax.prototype.updateUrl = function(urlData) {
    // remove ajax parameter
    let urlDataParsed = jQuery.param( urlData );
    window.history.pushState({}, '', '?' + urlDataParsed);
}