/**
 * UploadControllerController
 *
 * @description :: Server-side logic for managing Uploadcontrollers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var CoreReadDbService = require('../../../services/core/back/CoreReadDbService');
var CoreInsertDbService = require('../../../services/core/back/CoreInsertDbService');
var CoreDeleteDbService = require('../../../services/core/back/CoreDeleteDbService');

module.exports = {

    /**
     * `UploadControllerController.imageProduct()`
     */
    saveImageProduct: function (req, res, idProduct) {

        console.log('uploadController - imageProduct - idProduct', req.params.idProduct); // we have the product id

        var idProduct = req.params.idProduct;

        var fs = require("fs");

        console.info('image upload');

        req.file('file').upload(function (err, uploadedFiles) {

            console.info('uploaded file');
            console.info(uploadedFiles);

            if (uploadedFiles[0].fd) {
                var filePath = uploadedFiles[0].fd;
               // var productId = 1;


                var dir = 'assets/images/product/'+idProduct+ '/';
                var dir2 = '.tmp/public/images/product/'+idProduct+ '/';
               // var dir2 = '/images/product/'+idProduct+ '/';


                if (!fs.existsSync(dir)){
                    fs.mkdirSync(dir);
                }

                if (!fs.existsSync(dir2)){
                    fs.mkdirSync(dir2);
                }

                var filePathFinal1 = '/images/product/'+idProduct+ '/1.png';
                var filePathFinal2 = '.tmp/public/images/product/'+idProduct+ '/1.png';


                //TODO create the folder for this product with folder name = id

                // copy of the file to assets/images/
                fs.createReadStream(filePath).pipe(fs.createWriteStream('assets'+filePathFinal1));
                fs.createReadStream(filePath).pipe(fs.createWriteStream(filePathFinal2));

            }

            // add the imagePath for this product

            console.log('UploadController - saveImageProduct - start' );
           // CoreInsertDbService.saveImageProduct(idProduct, filePathFinal1);
           // CoreInsertDbService.saveImageProduct(idProduct, filePathFinal2);


        });

        return res.json({
            todo: 'imageProduct() is not implemented yet!'
        });
    }
};

