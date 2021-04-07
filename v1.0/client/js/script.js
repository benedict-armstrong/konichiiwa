const product_url = "https://staging.konichiiwa.com/api/product";

//const product_url = "js/local.json";

$(document).ready(function () {

    
    $.get( product_url, function(products) {
        
        for (p of products) {
            sessionStorage.setItem(p.id, JSON.stringify(p));
            if (p.show) {
                let img_src = p.images[0];
                if (p.thumbnails.length > 0) {
                    img_src = p.thumbnails[0];
                }

                $(".products").append(
                    `<div class="col-md-4 col-6">
                        <div class="card product h-100 fade-in" product-id="` + p.id + `">
                            <div class="img-wrapper">
                                <img class="card-img-top product-img" src="` + img_src + `" product-id="` + p.id + `" alt="Card image">
                            </div>
                        </div>
                    </div>`
                );
                if (!p.availability) {
                    $(".product[product-id='" + p.id + "']").addClass("sold-out");
                    $(".product-img[product-id='" + p.id + "']").css("opacity",0.5);
                }
                $(".product-img[product-id='" + p.id + "']").css("background-color", "#" + p.background_color);
                //$(".product[product-id='" + p.id + "']").css("--price", p.price.value);
            }
            
        }
      });

    $("body").on("click", ".product", function () {
        if ($(this).hasClass("sold-out")) {
            alert("Sorry this product is sold out");
        } else {
            window.location = "product.html?product-id=" + $(this).attr("product-id");
        }
        
    });



})
