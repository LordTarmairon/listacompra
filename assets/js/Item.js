class Item {
    id="";
    fatherId="";
    name = "";
    amount = 0;
    img = "";

    //Normal Constructor
    constructor(name, amount, img, id, fatherId){
        this.name = name;
        this.amount = amount;
        this.img = img;
        this.id = id;
        this.fatherId = fatherId;

        console.log("New Item created. From: "+this.fatherId+", and ID: "+ id +" whit: "+ name + " and "+ amount)
    }

    /**
     * Show Shopping List Name
     * @returns String name
     */
    getName(){
        return this.name;
    }
    /**
     * Show Sopping List Description
     * @returns String description
     */
    getAmount(){
        return this.amount;
    }

    /**
     * Show Sopping List Img
     * @returns String img
     */
    getImg(){
        return this.img;
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
}