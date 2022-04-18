class Item {
    id="";
    fatherId="";
    name = "";
    amount = 0;
    img = "";
    price = 0;

    //Normal Constructor
    constructor(name, amount, img, id, fatherId, price = 0){
        this.name = name;
        this.amount = amount;
        this.img = img;
        this.id = id;
        this.fatherId = fatherId;
        this.price = price;
        console.log("New Item created. From: "+this.fatherId+", and ID: "+ id +" whit: "+ name + " and "+ amount)
    }

    /**
     * Show Shopping List Name
     * @returns String name
     */
    getName(){
        return this.name;
    }

    setName(name){
        this.name = name;
    }
    /**
     * Show Sopping List Description
     * @returns String description
     */
    getAmount(){
        return this.amount;
    }

    setAmount(amount){
        this.amount = amount;
    }

    /**
     * Show Sopping List Img
     * @returns String img
     */
    getImg(){
        return this.img;
    }

    setImg(img){
        this.img = img;
    }
    
    /**
     * Show Shopping List fatherId
     * @returns string fatherId
     */
    getFatherId() {
        return this.fatherId;
    }
    
    /**
     * Show Shopping List Id
     * @returns string iD
     */
    getId() {
        return this.id;
    }

    /**
     * Show Shopping List price
     * @returns float price
     */
         getPrice() {
            return this.price;
        }
        setPrice(price){
            this.price = price;
        }
}