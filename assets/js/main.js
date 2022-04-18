const LISTS = [];

$( document ).ready(function() {
    const OBJECTLIST =  jsonRead();
    //Cheeck if the page is loaded and We have a List save in LocalStore
    if(LISTS.length === 0){
        if(localStorage.length !== 0){
            for(var x = 0; x <= localStorage.length -1; x++) {
               var id =  JSON.parse(localStorage.getItem(localStorage.key(x)))['id'];
               var name = JSON.parse(localStorage.getItem(localStorage.key(x)))['name'];
               var de = JSON.parse(localStorage.getItem(localStorage.key(x)))['description'];
               var item = JSON.parse(localStorage.getItem(localStorage.key(x)))['item'];
             
                LISTS.push(new List(name, de, id));
                
                //Si hay items recorremos el array LISTS para buscar el ID actual e insertar los items
                if(item.length != 0){
                    for(var o = 0; o< LISTS.length; o++){
                        if(LISTS[o].getId() === id){
                            for(var i= 0; i< item.length; i++){
                                LISTS[o].newItem(new Item(item[i].name, item[i].amount, item[i].img, item[i].id, item[i].fatherId, item[i].price))
                            }
                            break;
                        }
                    }
                }
            }
            LISTS.reverse();
            LISTS.forEach(element => {
                createList(element.getName(), element.getDescription(), element.getId());
            });
            
        } else {
            $("#noLists").show();
        }
    } else {
        $("#noLists").hide();
    }


    //Show Modal Windows for create a new List
    $("#newList").on("click", function(){
        $("#createNewList").modal("show");
    });


    //Create a new Object List an save on LIST array.
    $("#btn-newList").on("click", function(e){
        hideErrorImputs();
        e.preventDefault();
        let name = $("#name").val();
        let description = $("#description").val();

        if(name === ""){
            $("#name").addClass("error");
            $("#errorName").show();
            $("#name").focus();
            toastr["error"]("Missing Name.");

            return;
        }

        if(description === ""){
            $("#description").addClass("error");
            $("#errorDes").show();
            $("#description").focus();
            toastr["error"]("Missing Description.");

            return;
        }

        $("#createNewList").modal("hide");
        createList(name, description);   
        return; 
    });


    //If you pull the drop button the event drop the List
    $(document).on("click", ".btn-dropList", function(){
        dropList($(this).attr("data-id"));
    });

    //If you pull the viewList button the event show the List
    $(document).on("click", ".btn-viewList", function(){
        var valorSave = $(this).attr("data-id");
        var ListShopping ;

        LISTS.forEach(element => {
            if(element.getId() === valorSave){
                ListShopping = element;
            } else {
                console.log("It didn't find the element with de ID: "+ valorSave);
            }
        });

        showLisit(ListShopping);
    });

    $(document).on("click", ".btn-Clean", function(){
        var result = confirm("Are you sure that you want clean the List?");
        if(result){
           var list =  LISTS.find(element => element.getId() === $(this).attr("data-id"));
           list.item = [];
            saveJson($(this).attr("data-id"), list);
        }
    });

    $(document).on("dblclick", ".btn-itemInList", function(){
        $(this).addClass('disabled');
        $("img#iconEye", this).addClass('d-none');
        $("img#iconCheck", this).removeClass('d-none');

        var idPadre =  $(this).attr("data-id-father");
        var idItem =  $(this).attr("data-id");

        var list = LISTS.find(element => element.getId() === idPadre);

        for(var i = 0; i< list.getItem().length; i++){
            if(list.getItem()[i].getId() === idItem){
                list.getItem().splice(i,1);
                break;
            }
        }
        saveJson(idPadre, list);
        
    });


var elf = "elf";
    con = `             <tr>
    <td> <img src="./assets/img/eye.png" alt=""></td>
    <td>Ratona</td>
    <td>${elf}</td>
    <td>Prosiuta</td>
</tr>
<tr>
    <td><img src="./assets/img/eye.png" alt=""></td>
    <td>Hola</td>
    <td>Mamona</td>
    <td>Loba</td>
</tr>
<tr>
    <td><img src="./assets/img/eye.png" alt=""></td>
    <td>Suminero</td>
    <td>Ucorno</td>
    <td>Lolo</td>
</tr>`;
$( "#aqui" ).append(con); //<- The new one first
    //DATATABLE
    
    function showLisit(List){
        $('#noItems').addClass("d-block");
        $('#noItems').removeClass("d-none");

        $('#listContentTitle').text(List.getName());

        if(List.getItem().length === 0){
            $("#itemsHere").empty();
            $('#noItems').addClass("d-block");
            $('#noItems').removeClass("d-none");

        } else {
            $('#noItems').addClass("d-none");
            $('#noItems').removeClass("d-block");

            pintItems(List);
        }

        $("#btn-newItem").attr("data-id", List.getId());
        $(".btn-Clean").attr("data-id", List.getId());

        $("#listContent").modal("show");
    }

    //If you pull the drop button the event drop the List
    $(document).on("click", ".btn-newItem", function(){
        hideErrorImputs();
        $("#createNewItem").modal("show");
    });

    $("#btn-newItem").on("click", function(e){
        e.preventDefault();
        let idList = $("#btn-newItem").attr("data-id");

        let productName = $("#productName").val();
        let amount = parseInt($("#amount").val());
        let price = parseInt($("#price").val());

        if(productName === ""){
            $("#productName").addClass("error");
            $("#errorProductName").show();
            $("#productName").focus();
            toastr["error"]("Missing Name.");

            return;
        }

        if (amount <= 0 && amount >= 20){
            $("#amount").addClass("error");
            $("#errorAmount").show();
            $("#amount").focus();
            toastr["error"]("Missing or wrong Amount");
            return;
        }
        //Call the function for create a Item
        var list = LISTS.find(element => element.getId() === idList);
        var copyProduct = list.getItem().find(item => item.getName() === productName);
        if(copyProduct == undefined || copyProduct == ''){
            createItem(productName, amount, idList, price);
        } else {
            var result = confirm("Already you have a product whit the name: "+productName+" Do you want to add again?");
            if(result){
                createItem(productName, amount, idList);
            }
        }
        $("#noItems").removeClass("d-block");
        $("#noItems").addClass("d-none");

        $("#productName").val("");
        $("#amount").val("");
    })


    //Show the modal windows with the information about the product 
    $(document).on("click", ".productAccess", function(){
        var padre = $(this).attr("data-id-father");
        var product = $(this).attr("data-id");
        $("#btn-editProduct").attr("data-id-father", padre);
        $("#btn-editProduct").attr("data-id", product);

        padre = LISTS.find(element => element.getId() === padre);
        product = padre.getItem().find(item => item.getId() === product);

        $("#imgProduct").attr("src", product.getImg());
        $("#titleProducto").html("Edit Product: "+product.getName());
        $("#nameEdit").val(product.getName());
        $("#amountEdit").val(product.getAmount());
        $("#priceEdit").val(product.getPrice());        
    
        $("#editProduct").modal("show");
    });

    $(document).on("click", "#btn-editProduct", function(){
        $("#editProduct").modal("hide");
        editItem($(this).attr("data-id"), $(this).attr("data-id-father"), $("#nameEdit").val(), $("#amountEdit").val(), $("#priceEdit").val());
    });


    function editItem(idProduct, idList, name, amount, price,){
        var father = LISTS.find(element => element.getId() === idList);
        var product = father.getItem().find(product => product.getId() === idProduct);
        
        if(product.getName() !== name){
            product.setName(name);
        }

        if(product.getAmount() !== amount){
            product.setAmount(amount);
        }

        if(product.getPrice() !== price){
            product.setPrice(price);
        }
        //Update new dates
        saveJson(idList, father); 
        pintItems(father);
    }
    
    //This function will create a Item
    function createItem(name, amount, idList, prices){
        var perc; 
        var auxP = 0;
        var img;
        var price;

        $.each(OBJECTLIST, function(indice, objeto){
            perc = Math.round(similarity(name, objeto.name)*10000)/100;

            if(perc > 50 && perc > auxP){
                auxP = perc;
                img = objeto.url;
                price = objeto.price;
            }
        });
        if(prices != 0){
            price = prices;
        }
        for(var i = 0; i< LISTS.length; i++){
            if(LISTS[i].getId() === idList){
                LISTS[i].newItem(new Item(name, amount, img, hashGenerator(), idList, price));
                saveJson(idList, LISTS[i]); 
                pintItems(LISTS[i]);
                break;
            }
        }
        toastr["success"]("New Product add: "+ name);
    }

    function pintItems(List){
        $("#itemsHere").empty();
        var totalPrice = 0;
        List.getItem().forEach(item => {
            totalPrice += (item.getPrice() * item.getAmount());
            var column = `<tr class='btn-itemInList' data-id='${item.getId()}' data-id-father='${item.getFatherId()}'`;
            if(item.getImg() != undefined){
                column += `><td style='background-image: url(${item.getImg()}); padding: 0.5%; background-repeat: no-repeat; background-size: contain; background-position: center;'>`;
                
            } else {
                column += `><td style='background-image: url(https://cdn-icons-png.flaticon.com/512/1312/1312307.png); padding: 0.5%; background-repeat: no-repeat; background-size: contain; background-position: center;'>`;
            }
            column += `</td><td class='productAccess' data-id='${item.getId()}' data-id-father='${item.getFatherId()}'> ${item.getName()} </td><td> ${item.getAmount()}   
            </td><td><img id='iconEye' src='./assets/img/eye.png' alt='Check Icon'><img id='iconCheck' class='d-none' src='./assets/img/check.png' alt='Check Icon'></td></tr>`;

            $( "#itemsHere" ).append(column); //<- The new one first
        }); 
        var finalRow = `<tr class='table-info'><td></td><td colspan='2'>Total Products: </td><td>${List.getItem().length}</td></tr>`;
        var priceRow = `<tr class='table-primary' ><td></td><td  colspan='2' >Approximate price: </td><td>$${totalPrice.toFixed(2)}</td></tr>`;
        $( "#itemsHere" ).append(finalRow); //<- The new one first
        $( "#itemsHere" ).append(priceRow); //<- The new one first
               
    }
    
    function dropList(id){
        for(var i = 0; i <= LISTS.length -1; i++) {
    
            if(LISTS[i].getId() === id){
                var result = confirm("Are you sure that you want delete the list whit name: "+LISTS[i].getName()+"?");

                if(!result){
                    return;
                }
                toastr["warning"]("The list with the name: "+ LISTS[i].getName()+" was deleted.");
                delete LISTS[i];
                LISTS.splice(i,1);
                localStorage.removeItem(id);
                $("#"+id).remove();
                if(LISTS.length === 0){
                    $("#noLists").show();
                }

            } else {
                console.log("it couldn't find the Item with ID: "+ id);
            }
        }
        return;
    }

    function hideErrorImputs(){
        $("#name").removeClass("error");
        $("#errorName").hide();
        $("#description").removeClass("error");
        $("#errorDes").hide();

        $("#productName").removeClass("error");
        $("#errorProductName").hide();
        $("#amount").removeClass("error");
        $("#errorAmount").hide();
    }

    //This function is gonna create a new List Object and HTML
    function createList(name, description, hash=""){
        //We check if the function call at loading the page or not. If the function call at loading the page
        //is because localStorage has elements
        if(hash === ""){
            let newHash = hashGenerator();
            LISTS.push(new List(name, description, newHash));
            hash = newHash;
        }
        toastr["success"]("A new List was created: "+ name);

        //Clear localStorage and Save de LISTS objects
        localStorage.clear();
        LISTS.forEach(element => {
            saveJson(element.getId(), element); 
        });


        //Create a new list HTML
        var listHtml = ""
            listHtml += "<article id='"+hash+"' class='card' style='width: 15rem;'>";
            listHtml += "<img src='./assets/img/cardShopping.jpg' class='card-img-top' alt='card shopping img'>";
            listHtml += "<div class='card-body'>";
            listHtml += "<h5 class='card-title'>"+name+"</h5>";
            listHtml += "<p class='card-text'>"+description+"</p>";
            listHtml += "<div class='buttons col-md-12 text-center flex-between'>";
            listHtml += "<button data-id='"+hash+"' class='btn-viewList btn btn-primary'>View List</button>";
            listHtml += "<button data-id='"+hash+"' class='btn-dropList btn btn-danger'>Drop List</button>";
            listHtml += "</div>";
            listHtml += "</div>";
            listHtml += "</article> ";
        //END HTML LIST
        $("#noLists").hide();
        //$(listHtml).insertBefore( "#noLists" ); <- The new one at the end
        $(listHtml).insertAfter( "#noLists" ); //<- The new one first

        console.log("Element crated.")
        return;
    }

    function saveJson(id, List){
        localStorage.setItem (id, JSON.stringify(List));
    }

    function hashGenerator(){
        var hash = Math.random().toString(36).substring(7);
        return hash;
    }

    function similarity(s1, s2) {
        var longer = s1;
        var shorter = s2;
        if (s1.length < s2.length) {
          longer = s2;
          shorter = s1;
        }
        var longerLength = longer.length;
        if (longerLength === 0) {
          return 1.0;
        }
        return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength);
    }
      
    function editDistance(s1, s2) {
    s1 = s1.toLowerCase();
    s2 = s2.toLowerCase();
    
    var costs = new Array();
    for (var i = 0; i <= s1.length; i++) {
        var lastValue = i;
        for (var j = 0; j <= s2.length; j++) {
        if (i == 0)
            costs[j] = j;
        else {
            if (j > 0) {
            var newValue = costs[j - 1];
            if (s1.charAt(i - 1) != s2.charAt(j - 1))
                newValue = Math.min(Math.min(newValue, lastValue),
                costs[j]) + 1;
            costs[j - 1] = lastValue;
            lastValue = newValue;
            }
        }
        }
        if (i > 0)
        costs[s2.length] = lastValue;
    }
    return costs[s2.length];
    }

    function jsonRead(){
        var ob = [];
        var url   = "./assets/js/checkList.json";
        $.ajax({
            dataType: "json",
            type: 'GET',
            url: url,
        }).done((data) => {
            $.each(data, function(indice, objeto){
                ob.push(objeto);
            })          
        });
        return ob;
    }

});
