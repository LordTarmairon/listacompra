class List {
    id = "";
    name = "";
    item = [];

    //Normal Constructor
    constructor(name, description, id, item=[]){
        this.name = name;
        this.description = description;
        this.id = id;
        this.item = item;

        console.log("New Item created. "+id+" "+ name + " "+ description);
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
    getDescription(){
        return this.description;
    }

    /**
     * Show Shopping List Id
     * @returns String Id
     */
    getId() {
        return this.id;
    }
    /**
     * Show Shopping List Item
     * @returns Array Item
     */
     getItem() {
        return this.item;
    }



    /**
     * Insert on the Sopping List a new Object Item.
     * @param Item
     * @returns void
     */
    newItem(item){
        this.item.push(item);
        console.log("New Itemm Add: "+ item.getName())
        return;
    }
}