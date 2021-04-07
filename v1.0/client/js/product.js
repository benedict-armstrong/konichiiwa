const base_url = "https://staging.konichiiwa.com"

const stripe = Stripe('pk_test_51HWoe8AHin6MlcyGd1fQXUVjAGFwUVea7gqqaRGPOblPK7MeykRIkjNItY246vIvxYL8rEsf4IuKrNcV8ya2Ui1s008mHjqkie');
const url = base_url + "/api/stripe/create-session"

$(document).ready(function () {

    var product = getProductById(getUrlParameter('product-id'));

    if (!product) {
        $.ajax({
            async: false,
            type: 'GET',
            url: "js/local.json", //base_url + '/api/product/' + getUrlParameter('product-id'),
            success: function (data) {
                console.log(data);
                product = data;
            }
        })
    }

    $("body").css("background-color", "#" + product.background_color);
    $(".product-img-detail").attr("src", product.images[0]);
    $("#product-name").text(product.name);

    if (product.size.length < 1) {
        $(".size").hide();
        $("#selected-info").html('Color: <span id="selected-color"></span>');
    } else {
       for (size of product.size) {
            $(".size-selector").append(`<button class="btn btn-size">` + size + `</button>`);
        }
        if (product.size.length < 3) {
            $(".size-selector").css({ "justify-content": "space-around" });
        } 
    }

    for (so of product.shipping_options) {
        $("#shipping-sel").append('<option type="' + so.type +'" price="' + so.price +'">' + so.text + '</option>');
    }
    
    $("#selected-color").html(product.primary_color.name);

    $(".btn-size:first").addClass("active");

    $(".price").text(product.price.value / 100);

    $("#selected-size").html($(".btn-size:first").text());
    sessionStorage.setItem('size', $(".btn-size:first").text());


    for (img of product.images) {
        $(".img-picker").append(`<img class="active" src="` + img + `" alt="image missing">`);
    }

    $(".img-picker img").click(function () {
        $(".img-picker img").removeClass("active");
        $(this).addClass("active");
        var url = $(this).attr("src");
        $(".product-img-detail").attr("src", url);
    });

    $(".btn-size").click(function () {
        $(".btn-size").removeClass("active");
        $(this).addClass("active");
        var size = $(this).text();
        $("#selected-size").html(size);
        sessionStorage.setItem('size', size);
    })

    $("#shipping-sel").change(function () {
        var shipping_price = $("#shipping-sel option:selected").attr("price");
        $("#final-price").html((parseFloat(product.price.value) / 100) + parseFloat(shipping_price)/100);
    });

    $("#checkout-button").click(function () {
        var shipping = true;
        var shipping_method = $("#shipping-sel option:selected").attr("type");

        if (shipping_method == "pickup") {
            shipping = false;
        }
        if (shipping_method == "none") {
            alert("Please select a shipping method an try again!");
            return;
        }

        if (!$('#tc').is(":checked")) {
            alert("Please accept the our Terms and Conditions before making a purchase");
            return;
        }

        $(this).hide();

        $(".lds-dual-ring").removeClass("hidden");

        fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                items: [{
                    product_id: product.id,
                    size: sessionStorage.getItem('size'),
                    primary_color: product.primary_color
                }],
                shipping_to: shipping_method
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        })
            .then(function (response) {
                return response.json();
            })
            .then(function (session) {
                return stripe.redirectToCheckout({
                    sessionId: session.id
                });
            })
            .then(function (result) {
                // If `redirectToCheckout` fails due to a browser or network
                // error, you should display the localized error message to your
                // customer using `error.message`.
                if (result.error) {
                    alert(result.error.message);
                }
            })
            .catch(function (error) {
                console.error('Error:', error);
                alert("Something went wrong, please try again!");
                document.location.reload()
            });
    })

})

var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
};

function getProductById(product_id) {
    return JSON.parse(sessionStorage.getItem(product_id));
}