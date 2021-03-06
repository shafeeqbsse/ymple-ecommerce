/**
 * CategoryController
 *
 * @description :: Server-side logic for managing Categories
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var async = require('async');

var pathToService = '../../../services/core/';

var CoreReadDbService = require(pathToService + 'back/CoreReadDbService');
var CoreInsertDbService = require(pathToService + 'back/CoreInsertDbService');

var pathTemplateFrontCore =  sails.config.globals.templatePathFrontCore;

var theme = sails.config.globals.theme;






module.exports = {

    list: function (req, res) {
        var result = {
            user: (req.session.hasOwnProperty('user')) ? req.session.user : undefined
        };

        var query = {
            isSelling: true
        }

        if (req.query.name) {
            // query.name = new RegExp('/\s?[^a-z0-9\_]'+req.query.name+'[^a-z0-9\_]/i', 'g', 'gi');
            query.name = new RegExp(req.query.name);
            query.name = req.query.name;
            console.info('productController - query.name', query.name);
            product_query = req.query.name;
        }
        else {
            product_query = ''; //default value, return all the product
        }

        async.waterfall([
            function GetProductList(next) {

                Product.find({
                    name: {
                        'contains': product_query
                    }
                }, function (err, products) {
                    if (err) next(err);

                    result.products = products

                    console.info('productController products', products)

                    return next(null);
                });
            },

            function getCategoryList(next) {

                var newIdProduct = CoreReadDbService.getCategoryList().then(function (categoryList) {

                    console.log('promise return value categoryList:', categoryList);
                    result.categoryList = categoryList;
                    return next(null, categoryList);
                });

            },

        ], function (err) {
            if (err) return res.serverError(err);

            if (req.session.hasOwnProperty('cart')){
                result.cart = req.session.cart;
            }
            else {
                result.cart = [];
            }
            result.query = req.query.name;
            result.showSearchMenu = 1;



            return res.view(theme + 'index.ejs', result);
        });
    },

};

