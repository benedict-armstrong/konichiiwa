'use strict';Object.defineProperty(exports,'__esModule',{value:true});exports.Csv_product=void 0;class Csv_product{constructor(product){this.id=product.id;this.title=product.name;this.description=product.description;this.availability=product.availability&&product.show?'in stock':'out of stock';this.inventory=1;this.condition='new';this.price=''+product.price.value/100+' EUR';this.url=process.env.DOMAIN+'/product/'+product.id;this.image_link=process.env.DOMAIN+'/assets/'+product.images[0];this.brand='Konichiiwa';this.color=product.primary_color.name;}}exports.Csv_product=Csv_product;