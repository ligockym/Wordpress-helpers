/**
 * Takes care of all ajax request for loading more articles, products, references, product filter.
 *
 * What I need to have in my code?
 * .ajax-insert - place where request will be inserted
 * .ajax-loading - class that is added for effect during loading
 *
 * In case of load_more use load_more: true for data
 *
 * @param obj (optional) - only if you want to capsulate ajax request - .ajax-insert has to be inside this element
 * @constructor
 * @author Marián Ligocký
 * @version 1.0.1
 */
var MyAjax = function (obj) {
    if (obj) {
        this.root_el = jQuery(obj);
    } else {
        this.root_el = jQuery('body');
    }
    this.core = new Core();
}

MyAjax.prototype.sendRequest = function (args, data, callbackAfterDone) {
    let default_data = {
        ajax_load_more: 'products',
        load_more: false, // set true if you want to add products and not remove previous
    }
    let default_args = {
        ajax_url: new URL(window.location.href).href,
        update_pagination: true,
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
        __this.core.lazyLoadBackground();

        if (args.update_pagination) {
            __this.buttonShowHide(result_data);
            __this.changePagination(result_data);
        }

        // Insert content by .ajax-insert tag
        if (__this.root_el.find('.ajax-insert').length == 0) {
            console.error('No ajax insert container');
        }
        if (data.load_more === true) {
            __this.root_el.find('.ajax-insert').append(result_data.dataView);
        } else {
            __this.root_el.find('.ajax-insert').html(result_data.dataView);
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
        __this.root_el.find('.load-more-button').hide();
    } else {
        __this.root_el.find('.load-more-button').show();
    }
}

/**
 * Change pagination - change active marker, add / remove pagination items if number of pages changes
 * @param data
 */
MyAjax.prototype.changePagination = function (data) {
    let number_shown_posts = data.currentItemsContained,
        allp = document.getElementById("current-shown-items");

    // insert number of posts shown into #current-shown-items
    allp.innerText = number_shown_posts;

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